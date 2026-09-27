#!/usr/bin/env python3
"""Local learning hub. Standard library only; no model calls or remote assets."""
import argparse
from datetime import datetime, timezone
import hmac
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
import json
import mimetypes
import os
from pathlib import Path
import re
import secrets
import shutil
import subprocess
import threading
import time
from urllib.parse import urlsplit
import uuid

from catalogue import LABS, LESSONS, TOOLS
from templates import starter_files
from configuration import Configuration
from policy import POLICY
from documentation import load_documents

ROOT = Path(__file__).resolve().parent
DEFAULT_DATA = Path.home() / ".local/share/aisi-labs-2"


def executable(command):
    wrapper = Path.home() / ".local/bin" / command
    if wrapper.is_file() and os.access(wrapper, os.X_OK):
        return str(wrapper)
    return shutil.which(command)


def atomic_json(path, value):
    temporary = path.with_name(path.name + ".tmp")
    temporary.write_text(json.dumps(value, indent=2) + "\n")
    os.replace(temporary, path)


class Hub:
    def __init__(self, data):
        self.data = Path(data).resolve()
        self.projects = self.data / "projects"
        self.projects.mkdir(parents=True, exist_ok=True)
        self.scratch = self.data / "playground"
        self.scratch.mkdir(exist_ok=True)
        self.lock = threading.RLock()
        self.token = secrets.token_urlsafe(32)
        self.configuration = Configuration()
        self.acknowledged = False

    def acknowledge(self, version):
        if version != POLICY["version"]:
            raise ValueError("Read and acknowledge the current learning rules first.")
        self.acknowledged = True
        return {"acknowledged": True}

    def require_acknowledgement(self):
        if not self.acknowledged:
            raise ValueError("Acknowledge the public-information and separate-network rules before starting.")

    def project_path(self, identifier):
        if not isinstance(identifier, str) or not re.fullmatch(r"[a-z0-9-]{1,90}", identifier):
            raise ValueError("Unknown project.")
        path = self.projects / identifier
        if path.is_symlink() or not path.is_dir() or path.resolve().parent != self.projects:
            raise ValueError("Project folder is missing or moved.")
        return path

    def project(self, identifier):
        path = self.project_path(identifier)
        meta = path / ".aisi-project.json"
        if meta.is_symlink():
            raise ValueError("Project metadata cannot be a link.")
        value = json.loads(meta.read_text())
        if not isinstance(value, dict):
            raise ValueError("Project metadata is invalid.")
        lab = next((x for x in LABS if x["id"] == value.get("lab")), None)
        if value.get("id") != identifier or lab is None:
            raise ValueError("Project metadata is invalid.")
        if not isinstance(value.get("name"), str) or not isinstance(value.get("created"), str):
            raise ValueError("Project metadata is invalid.")
        if not isinstance(value.get("checks"), list) or any(type(x) is not int or not 0 <= x < len(lab["checks"]) for x in value["checks"]):
            raise ValueError("Project metadata is invalid.")
        return {**value, "path": str(path), "preview": self.has_preview(path)}

    @staticmethod
    def has_preview(path):
        preview = path / "index.html"
        return preview.is_file() and not preview.is_symlink()

    def list_projects(self):
        result, warnings = [], []
        for path in self.projects.iterdir():
            try:
                result.append(self.project(path.name))
            except (ValueError, OSError, TypeError):
                warnings.append(f"Could not read project {path.name}. Its files have been preserved.")
        return sorted(result, key=lambda p: p["created"], reverse=True), warnings

    def progress(self):
        file = self.data / "progress.json"
        if not file.exists():
            return {}
        try:
            value = json.loads(file.read_text())
            if not isinstance(value, dict) or any(not isinstance(v, bool) for v in value.values()):
                raise ValueError()
            return value
        except (ValueError, OSError):
            raise ValueError("Learning progress could not be read. The existing file has been preserved.")

    def bootstrap(self):
        projects, warnings = self.list_projects()
        try:
            progress = self.progress()
        except ValueError as error:
            progress = {}
            warnings.append(str(error))
        tools = [{**tool, "available": bool(executable(tool["command"])), "account": "Uses your tool's account and model settings; sign-in or charges may apply." if tool["category"] != "Desktop tools" else "No AI account needed to open this application."} for tool in TOOLS]
        return {"tools": tools, "labs": LABS, "lessons": LESSONS, "projects": projects, "progress": progress, "warnings": warnings, "playground": str(self.scratch), "policy": POLICY, "acknowledged": self.acknowledged, "configuration": self.configuration.status(), "documents": load_documents()}

    def create(self, lab_id, name):
        self.require_acknowledgement()
        lab = next((x for x in LABS if x["id"] == lab_id), None)
        if lab is None:
            raise ValueError("Choose a known activity.")
        if not isinstance(name, str) or not 1 <= len(name.strip()) <= 80 or any(ord(c) < 32 for c in name):
            raise ValueError("Give your project a name between 1 and 80 characters.")
        identifier = f"{lab_id}-{datetime.now():%Y%m%d}-{uuid.uuid4().hex[:8]}"
        with self.lock:
            path = self.projects / identifier
            path.mkdir()
            for filename, body in starter_files(lab).items():
                (path / filename).write_text(body)
            atomic_json(path / ".aisi-project.json", {"id": identifier, "name": name.strip(), "lab": lab_id, "created": datetime.now(timezone.utc).isoformat(), "checks": []})
        return self.project(identifier)

    def save_checks(self, identifier, checks):
        with self.lock:
            project = self.project(identifier)
            lab = next(x for x in LABS if x["id"] == project["lab"])
            if not isinstance(checks, list) or any(type(x) is not int or x < 0 or x >= len(lab["checks"]) for x in checks):
                raise ValueError("Unknown project check.")
            project.pop("path")
            project.pop("preview")
            project["checks"] = sorted(set(checks))
            atomic_json(self.project_path(identifier) / ".aisi-project.json", project)
        return self.project(identifier)

    def launch_argv(self, tool_id, project_id=None):
        path = self.project_path(project_id) if project_id else self.scratch
        if tool_id == "preview":
            if not project_id or not self.has_preview(path):
                raise ValueError("This project does not have an index.html preview yet.")
            return ["/usr/bin/xdg-open", (path / "index.html").as_uri()], path
        tool = next((x for x in TOOLS if x["id"] == tool_id), None)
        if tool is None:
            raise ValueError("Unknown tool.")
        command = executable(tool["command"])
        if not command:
            raise ValueError(f"{tool['name']} is not available on this machine.")
        if tool_id == "editor":
            return [command, str(path)], path
        if tool_id == "files":
            return [command, str(path)], path
        if tool["category"] == "Desktop tools" and tool_id != "terminal":
            return [command], path
        ghostty = executable("ghostty")
        if not ghostty:
            raise ValueError("Ghostty is needed to open a terminal tool on this installation.")
        args = [ghostty, "--gtk-single-instance=false", "--class=TUI.float", f"--title=AISI Labs 2 · {tool['name']}", f"--working-directory={path}", "--wait-after-command", "-e", command]
        if executable("uwsm-app"):
            args = [executable("uwsm-app"), "--", *args]
        return args, path

    def launch(self, tool_id, project_id=None):
        self.require_acknowledgement()
        args, path = self.launch_argv(tool_id, project_id)
        env, extra = self.configuration.launch_settings(tool_id)
        if env is not None:
            # uwsm-app forwards argv to a daemon, not this process's environment.
            # Start the independent Ghostty process directly to inherit this key.
            if len(args) > 2 and Path(args[0]).name == "uwsm-app":
                args = args[2:]
            args.extend(extra)
            process = subprocess.Popen(args, cwd=path, env=env, stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)
        else:
            with (self.data / "launch.log").open("ab") as log:
                process = subprocess.Popen(args, cwd=path, stdin=subprocess.DEVNULL, stdout=log, stderr=log, start_new_session=True)
        try:
            code = process.wait(timeout=0.25)
        except subprocess.TimeoutExpired:
            threading.Thread(target=process.wait, daemon=True).start()
        else:
            if code:
                raise ValueError("The tool exited before opening. Check that it is installed and launch it again; key-enabled launch output is not logged by Labs.")
        return {"message": "Launch requested. Check the new window; the tool may ask you to sign in."}


class Handler(BaseHTTPRequestHandler):
    server_version = "AISI-Labs-2"

    def log_message(self, *_args):
        pass

    def send_body(self, status, body, content_type="application/json; charset=utf-8"):
        if not isinstance(body, bytes):
            body = json.dumps(body).encode()
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self.send_header("X-Content-Type-Options", "nosniff")
        self.send_header("Referrer-Policy", "no-referrer")
        self.send_header("Content-Security-Policy", "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'none'; form-action 'self'")
        self.end_headers()
        self.wfile.write(body)

    def valid_host(self):
        return self.headers.get("Host") == f"127.0.0.1:{self.server.server_port}"

    def do_GET(self):
        if not self.valid_host() or self.headers.get("Sec-Fetch-Site") == "cross-site":
            return self.send_body(403, {"error": "Open Labs from its local launcher."})
        route = urlsplit(self.path).path
        if route == "/health":
            return self.send_body(200, {"app": "aisi-labs-2", "root": str(ROOT)})
        if route == "/api/bootstrap":
            return self.send_body(200, self.server.hub.bootstrap())
        allowed = {"/": "index.html", "/app.js": "app.js", "/programme.js": "programme.js", "/style.css": "style.css", "/icon.svg": "icon.svg"}
        if route not in allowed:
            return self.send_body(404, {"error": "Page not found."})
        path = ROOT / "web" / allowed[route]
        body = path.read_bytes()
        if route == "/":
            body = body.replace(b"__TOKEN__", self.server.hub.token.encode())
        return self.send_body(200, body, (mimetypes.guess_type(path)[0] or "text/plain") + "; charset=utf-8")

    def do_POST(self):
        origin = f"http://127.0.0.1:{self.server.server_port}"
        if not self.valid_host() or self.headers.get("Origin") != origin or not hmac.compare_digest(self.headers.get("X-Labs-Token", "").encode(), self.server.hub.token.encode()):
            return self.send_body(403, {"error": "This request did not come from your Labs window. Reopen the app and try again."})
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if not 0 < length <= 8192:
                raise ValueError("Request is too large or empty.")
            payload = json.loads(self.rfile.read(length))
            if not isinstance(payload, dict):
                raise ValueError("Invalid request.")
            route = urlsplit(self.path).path
            hub = self.server.hub
            if route == "/api/projects":
                result = hub.create(payload.get("lab"), payload.get("name"))
            elif route == "/api/acknowledge":
                result = hub.acknowledge(payload.get("version"))
            elif route == "/api/configuration/key":
                hub.require_acknowledgement()
                result = hub.configuration.set_key(payload.get("provider"), payload.get("key"))
            elif route == "/api/configuration/forget":
                result = hub.configuration.forget(payload.get("provider"))
            elif route == "/api/checks":
                result = hub.save_checks(payload.get("project"), payload.get("checks"))
            elif route == "/api/launch":
                result = hub.launch(payload.get("tool"), payload.get("project"))
            elif route == "/api/progress":
                if payload.get("lesson") not in {x["id"] for x in LESSONS} or type(payload.get("completed")) is not bool:
                    raise ValueError("Invalid lesson progress.")
                with hub.lock:
                    result = hub.progress()
                    result[payload["lesson"]] = payload["completed"]
                    atomic_json(hub.data / "progress.json", result)
            else:
                return self.send_body(404, {"error": "Unknown action."})
            self.send_body(200, result)
        except (ValueError, TypeError, KeyError) as error:
            self.send_body(400, {"error": str(error) or "Invalid request."})
        except OSError:
            self.send_body(500, {"error": "Could not access a local file or start the application. Check file permissions and available disk space."})


def make_server(port=8768, data=DEFAULT_DATA):
    hub = Hub(data)
    server = ThreadingHTTPServer(("127.0.0.1", port), Handler)
    server.hub = hub
    server.daemon_threads = True
    return server


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8768)
    parser.add_argument("--data-dir", type=Path, default=DEFAULT_DATA)
    args = parser.parse_args()
    server = make_server(args.port, args.data_dir)
    print(f"AISI Labs 2: http://127.0.0.1:{server.server_port}", flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()
