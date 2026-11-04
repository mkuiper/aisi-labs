import json
import os
from pathlib import Path
import shutil
import signal
import socket
import subprocess
import sys
import tempfile
import time
import unittest
from unittest.mock import patch
from urllib.error import HTTPError
from urllib.request import urlopen

import launch
from revision import RUNTIME_FILES, runtime_revision


class LauncherTests(unittest.TestCase):
    def test_legacy_and_changed_service_are_not_ready(self):
        own = {"app": "aisi-labs-2", "root": str(launch.ROOT)}
        with patch('launch.health', return_value=own):
            self.assertFalse(launch.ready())
        with patch('launch.health', return_value={**own, "startup_revision": "old"}):
            self.assertFalse(launch.ready())
        with patch('launch.health', return_value={**own, "startup_revision": runtime_revision(launch.ROOT)}):
            self.assertTrue(launch.ready())

    def test_unrelated_and_ambiguous_services_are_not_stopped(self):
        with patch('launch.health', return_value={"app": "other"}), patch('launch.os.kill') as kill:
            launch.stop_own_server()
            kill.assert_not_called()
        own = {"app": "aisi-labs-2", "root": str(launch.ROOT)}
        with patch('launch.health', return_value=own), patch('launch.verified_process', return_value=True), patch('launch.os.kill') as kill:
            with self.assertRaisesRegex(RuntimeError, 'identified safely'):
                launch.stop_own_server()
            kill.assert_not_called()
        for pid in (False, -1, "123", os.getpid()):
            with patch('launch.health', return_value={**own, "pid": pid}), patch('launch.os.kill') as kill:
                with self.assertRaisesRegex(RuntimeError, 'identified safely'):
                    launch.stop_own_server()
                kill.assert_not_called()

    def test_custom_arguments_fail_process_verification(self):
        with tempfile.TemporaryDirectory() as temporary:
            entry = Path(temporary)
            (entry / 'exe').symlink_to(sys.executable)
            for args in ([sys.executable, str(launch.ROOT / 'server.py'), '--port', '1234'],
                         [sys.executable, str(launch.ROOT / 'server.py'), '--data-dir', '/tmp/fake'],
                         [sys.executable, '/tmp/other/server.py']):
                (entry / 'cmdline').write_bytes(b'\0'.join(arg.encode() for arg in args))
                self.assertFalse(launch.verified_process(entry))
            (entry / 'exe').unlink()
            (entry / 'exe').symlink_to('/bin/cat')
            (entry / 'cmdline').write_bytes(b'\0'.join(arg.encode() for arg in ['/bin/cat', str(launch.ROOT / 'server.py')]))
            self.assertFalse(launch.verified_process(entry))

    def test_legacy_service_update_restarts_and_fresh_service_is_reused(self):
        root_source = Path(__file__).resolve().parents[1]
        alternate = '/usr/bin/python3'
        if not Path(alternate).exists():
            alternate = sys.executable
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary) / 'checkout'
            root.mkdir()
            for name in RUNTIME_FILES:
                shutil.copy(root_source / name, root / name)
            for name in ('content', 'web', 'docs'):
                shutil.copytree(root_source / name, root / name)
            with socket.socket() as probe:
                probe.bind(('127.0.0.1', 0))
                port = probe.getsockname()[1]
            data = Path(temporary) / 'state'
            server = root / 'server.py'
            source = server.read_text()
            source = source.replace('DEFAULT_DATA = Path.home() / ".local/share/aisi-labs-2"', f'DEFAULT_DATA = Path({str(data)!r})')
            source = source.replace('parser.add_argument("--port", type=int, default=8768)', f'parser.add_argument("--port", type=int, default={port})')
            self.assertIn(f'default={port}', source)
            legacy = source.replace(', "startup_revision": STARTUP_REVISION, "pid": os.getpid()', '')
            legacy = legacy.replace(', "/feedback.js": "feedback.js"', '')
            server.write_text(legacy)
            process = subprocess.Popen([alternate, str(server)], cwd=root, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            new_pid = None
            started = []
            popen = subprocess.Popen
            def start(*args, **kwargs):
                child = popen(*args, **kwargs)
                started.append(child)
                return child
            address = f'http://127.0.0.1:{port}'
            try:
                for _ in range(100):
                    try:
                        with urlopen(address + '/health', timeout=.2) as response:
                            if json.load(response).get('root') == str(root):
                                break
                    except OSError:
                        time.sleep(.05)
                else:
                    self.fail('Isolated legacy server failed to start')
                with self.assertRaises(HTTPError) as missing:
                    urlopen(address + '/feedback.js', timeout=1)
                self.assertEqual(missing.exception.code, 404)
                data.mkdir(exist_ok=True)
                marker = data / 'preserve-fake-work.txt'
                marker.write_text('FAKE learner work must survive')
                server.write_text(source)
                with patch.multiple(launch, ROOT=root, DATA=data, URL=address), patch('launch.subprocess.Popen', side_effect=start):
                    launch.main(open_window=False)
                    with urlopen(address + '/health') as response:
                        health = json.load(response)
                    new_pid = health['pid']
                    self.assertNotEqual(new_pid, process.pid)
                    self.assertEqual(health['startup_revision'], runtime_revision(root))
                    with urlopen(address + '/feedback.js') as response:
                        self.assertEqual(response.status, 200)
                    launch.main(open_window=False)
                    with urlopen(address + '/health') as response:
                        self.assertEqual(json.load(response)['pid'], new_pid)
                    content = root / 'content' / 'session_guides.json'
                    content.write_text(content.read_text() + '\n')
                    launch.main(open_window=False)
                    with urlopen(address + '/health') as response:
                        updated = json.load(response)
                    self.assertNotEqual(updated['pid'], new_pid)
                    new_pid = updated['pid']
                    self.assertEqual(updated['startup_revision'], runtime_revision(root))
                    self.assertEqual(marker.read_text(), 'FAKE learner work must survive')
                    launch.stop_own_server()
                    new_pid = None
            finally:
                if new_pid is not None:
                    os.kill(new_pid, signal.SIGTERM)
                if process.poll() is None:
                    process.terminate()
                process.wait(timeout=5)
                for child in started:
                    child.wait(timeout=5)


if __name__ == '__main__':
    unittest.main()
