#!/usr/bin/env python3
"""Start the local service on demand, then open its Omarchy app window."""
import fcntl
import argparse
import json
import os
from pathlib import Path
import re
import signal
import subprocess
import sys
import time
from urllib.error import URLError
from urllib.request import urlopen

from revision import runtime_revision

ROOT = Path(__file__).resolve().parent
DATA = Path.home() / ".local/share/aisi-labs-2"
URL = "http://127.0.0.1:8768"


def health():
    try:
        with urlopen(URL + "/health", timeout=0.4) as response:
            value = json.load(response)
            return value if isinstance(value, dict) else {}
    except (URLError, TimeoutError, ValueError, OSError):
        return {}


def own_service(value):
    return value.get("app") == "aisi-labs-2" and value.get("root") == str(ROOT)


def ready():
    value = health()
    return own_service(value) and value.get("startup_revision") == runtime_revision(ROOT)


def verified_process(entry):
    try:
        if entry.stat().st_uid != os.getuid():
            return False
        args = [arg.decode() for arg in (entry / 'cmdline').read_bytes().split(b'\0') if arg]
        return (len(args) == 2 and args[1] == str(ROOT / 'server.py')
                and Path(args[0]).is_absolute()
                and re.fullmatch(r'python(?:\d+(?:\.\d+)*)?', Path(args[0]).resolve().name) is not None
                and (entry / 'exe').samefile(Path(args[0])))
    except (OSError, UnicodeError):
        return False


def stop_own_server():
    """Stop only this checkout's default server; preserve unrelated/test servers."""
    value = health()
    if not own_service(value):
        return
    if "pid" in value:
        pid = value["pid"]
        candidates = [Path('/proc') / str(pid)] if type(pid) is int and pid > 0 else []
    else:
        candidates = [entry for entry in Path('/proc').iterdir() if entry.name.isdigit()]
    candidates = [entry for entry in candidates if verified_process(entry)]
    if len(candidates) != 1:
        raise RuntimeError('The running service could not be identified safely. No process was stopped.')
    os.kill(int(candidates[0].name), signal.SIGTERM)
    for _ in range(50):
        if not own_service(health()):
            return
        time.sleep(0.1)
    raise RuntimeError('The existing Labs service did not stop. No replacement was started.')


def main(restart=False, open_window=True):
    DATA.mkdir(parents=True, exist_ok=True)
    with (DATA / "launch.lock").open("w") as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        value = health()
        if own_service(value) and (restart or value.get("startup_revision") != runtime_revision(ROOT)):
            stop_own_server()
        if not ready():
            with (DATA / "server.log").open("ab") as log:
                process = subprocess.Popen([sys.executable, str(ROOT / "server.py")], cwd=ROOT, stdout=log, stderr=log, stdin=subprocess.DEVNULL, start_new_session=True)
            for _ in range(50):
                if ready():
                    break
                if process.poll() is not None:
                    raise RuntimeError("Could not start Labs. Port 8768 may be in use. See ~/.local/share/aisi-labs-2/server.log.")
                time.sleep(0.1)
            else:
                raise RuntimeError("Labs did not start in time. See ~/.local/share/aisi-labs-2/server.log.")
    if open_window:
        subprocess.Popen(["omarchy", "launch", "webapp", URL], stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, start_new_session=True)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--restart', action='store_true', help='Restart only this app service; clears session keys and acknowledgements')
    parser.add_argument('--no-open', action='store_true', help='Start/restart the service without opening another app window')
    args = parser.parse_args()
    try:
        main(restart=args.restart, open_window=not args.no_open)
    except (OSError, RuntimeError) as error:
        print(error, file=sys.stderr)
        subprocess.run(["notify-send", "AISI AI Labs could not open", str(error)], check=False)
        sys.exit(1)
