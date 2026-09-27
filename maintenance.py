"""Read-only inventory; optional public release metadata, never installations.

Do not run tool wrappers to discover versions: they can install software.
Mise's active version is a hint, not proof of the binary a wrapper will launch.
"""
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
import json
from pathlib import Path
import re
import shutil
import subprocess
from urllib.request import Request, build_opener, HTTPRedirectHandler, ProxyHandler

from catalogue import TOOLS

RELEASES = {
    "codex": ("codex", "@openai/codex"),
    "claude": ("claude", "@anthropic-ai/claude-code"),
    "gemini": ("gemini", "@google/gemini-cli"),
    "grok": ("npm:@xai-official/grok", "@xai-official/grok"),
}
REVIEWED = "2026-09-27"


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, *_args, **_kwargs):
        return None


def latest_release(package):
    # A fixed official package allowlist; no user URLs, auth, proxies or redirects.
    if package not in {p for _, p in RELEASES.values()}:
        raise ValueError("Unknown release source.")
    url = "https://registry.npmjs.org/" + package.replace("/", "%2F") + "/latest"
    request = Request(url, headers={"Accept": "application/json", "User-Agent": "AISI-AI-Labs-release-check"})
    opener = build_opener(ProxyHandler({}), NoRedirect())
    with opener.open(request, timeout=5) as response:
        body = response.read(262145)
    if len(body) > 262144:
        raise ValueError("Release response too large.")
    value = json.loads(body)
    if not isinstance(value, dict) or value.get("name") != package:
        raise ValueError("Unexpected package metadata.")
    version = value.get("version")
    if not isinstance(version, str) or not re.fullmatch(r"\d+\.\d+\.\d+", version):
        raise ValueError("Stable version not recognised.")
    return version


def active_versions():
    command = shutil.which("mise")
    if not command:
        return {}, "Mise is not installed; versions are unknown."
    try:
        result = subprocess.run([command, "ls", "--json"], capture_output=True, text=True, timeout=4, check=True)
        entries = json.loads(result.stdout)
        if not isinstance(entries, dict):
            raise ValueError()
        versions = {}
        for tool, (name, _) in RELEASES.items():
            for item in entries.get(name, []):
                if item.get("active") and item.get("installed") and isinstance(item.get("version"), str):
                    versions[tool] = item["version"][:80]
        return versions, ""
    except (OSError, subprocess.SubprocessError, ValueError, TypeError, AttributeError):
        return {}, "Could not read Mise versions; no tool wrappers were executed."


def comparison(installed, latest):
    if not installed or not re.fullmatch(r"\d+\.\d+\.\d+", installed):
        return "Version unknown"
    left, right = (tuple(map(int, value.split("."))) for value in (installed, latest))
    return "Newer release available" if left < right else "Matches checked release" if left == right else "Ahead of checked release"


def inventory(resolve, online=False):
    versions, warning = active_versions()
    rows = []
    for tool in TOOLS:
        command = resolve(tool["command"])
        dynamic = False
        if command:
            try:
                with Path(command).open("rb") as stream:
                    source = stream.read(8192)
                dynamic = b"mise use" in source or b"MISE_MINIMUM_RELEASE_AGE" in source
            except OSError:
                pass
        rows.append({"id": tool["id"], "name": tool["name"], "detected": bool(command), "version": versions.get(tool["id"]), "dynamic_wrapper": dynamic, "latest": None, "status": "Not checked" if tool["id"] in RELEASES else "Manual version review", "source": "https://www.npmjs.com/package/" + RELEASES[tool["id"]][1] if tool["id"] in RELEASES else None})
    if online:
        def check(row):
            try:
                row["latest"] = latest_release(RELEASES[row["id"]][1])
                row["status"] = comparison(row["version"], row["latest"])
            except Exception:
                # No raw errors, URLs with credentials, or local environment in UI.
                row["status"] = "Check failed — offline, rate-limited or changed metadata"
        with ThreadPoolExecutor(max_workers=4) as pool:
            list(pool.map(check, [row for row in rows if row["id"] in RELEASES]))
    return {"checked_at": datetime.now(timezone.utc).isoformat(), "online": online, "content_reviewed": REVIEWED, "tools": rows, "warning": warning, "scope": "Active Mise versions for four AI tools; other versions require manual review. No authentication checks, model calls, installations or OS update checks."}
