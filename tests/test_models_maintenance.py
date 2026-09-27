import json
import os
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest.mock import Mock, patch

from catalogue import TOOLS
from configuration import Configuration, MODEL_TOOLS
from maintenance import active_versions, comparison, inventory, latest_release, NoRedirect, RELEASES
from policy import POLICY
from server import Hub
from storage import atomic_json


class ModelTests(unittest.TestCase):
    def test_all_four_model_arguments_without_keys_and_reset(self):
        config = Configuration()
        for tool in MODEL_TOOLS:
            config.set_model(tool['id'], 'public-model-1.2')
            self.assertEqual(config.launch_settings(tool['id']), (None, ['--model', 'public-model-1.2']))
            config.set_model(tool['id'], '')
            self.assertEqual(config.launch_settings(tool['id']), (None, []))

    def test_models_persist_keys_do_not(self):
        with tempfile.TemporaryDirectory() as folder:
            path = Path(folder) / 'models.json'
            config = Configuration(path)
            config.set_key('openai', 'FAKE-KEY-TEST-ONLY')
            config.set_model('codex', 'test-model')
            self.assertEqual(config.launch_settings('codex')[1][:2], ['--model', 'test-model'])
            reopened = Configuration(path)
            self.assertEqual(reopened.launch_settings('codex'), (None, ['--model', 'test-model']))
            self.assertNotIn('FAKE-KEY', path.read_text())
            self.assertEqual(path.stat().st_mode & 0o777, 0o600)

    def test_flags_and_malformed_models_rejected_without_overwrite(self):
        config = Configuration()
        config.set_model('grok', 'valid-model')
        for value in ['--yolo', '-m', 'two words', 'x;touch', '$(command)', 'x\ny', None, [], {}, 'x'*161]:
            with self.subTest(value=value), self.assertRaises(ValueError):
                config.set_model('grok', value)
        for tool in [None, [], {}, 'terminal', 'not-a-tool']:
            with self.assertRaises(ValueError):
                config.set_model(tool, 'valid-model')
        self.assertEqual(config.launch_settings('grok')[1], ['--model', 'valid-model'])

    def test_bad_saved_models_preserved(self):
        with tempfile.TemporaryDirectory() as folder:
            path = Path(folder) / 'models.json'
            for value in ['not json', '[]', '{"grok": "--yolo"}']:
                path.write_text(value)
                config = Configuration(path)
                self.assertTrue(config.status()['warning'])
                self.assertEqual(config.launch_settings('grok'), (None, []))
                with self.assertRaises(ValueError):
                    config.set_model('grok', 'safe')
                self.assertEqual(path.read_text(), value)

    def test_launch_keeps_model_when_using_native_auth_and_uwsm(self):
        with tempfile.TemporaryDirectory() as folder:
            hub = Hub(folder)
            hub.acknowledge(POLICY['version'])
            hub.configuration.set_model('grok', 'test-grok-model')
            process = Mock()
            process.wait.return_value = 0
            with patch('server.executable', side_effect=lambda name:'/usr/bin/'+name), patch('server.subprocess.Popen', return_value=process) as launch:
                hub.launch('grok')
            args, kwargs = launch.call_args
            self.assertEqual(args[0][0], '/usr/bin/uwsm-app')
            self.assertEqual(args[0][-2:], ['--model', 'test-grok-model'])
            self.assertNotIn('env', kwargs)
            self.assertNotIn('shell', kwargs)

    def test_no_grok_key_adapter_claim(self):
        with self.assertRaises(ValueError):
            Configuration().set_key('xai', 'FAKE-KEY-TEST-ONLY')


class StorageTests(unittest.TestCase):
    def test_private_replace_does_not_follow_predictable_temp_symlink(self):
        with tempfile.TemporaryDirectory() as folder:
            root = Path(folder)
            victim = root / 'keep.txt'
            victim.write_text('keep me')
            (root / 'state.json.tmp').symlink_to(victim)
            (root / 'state.json').symlink_to(victim)
            atomic_json(root / 'state.json', {'ok': True})
            self.assertEqual(victim.read_text(), 'keep me')
            self.assertFalse((root / 'state.json').is_symlink())
            self.assertEqual((root / 'state.json').stat().st_mode & 0o777, 0o600)

    def test_failed_replace_keeps_old_state_and_cleans_temporary(self):
        with tempfile.TemporaryDirectory() as folder:
            path = Path(folder) / 'state.json'
            path.write_text('old state')
            with patch('storage.os.replace', side_effect=OSError('test')), self.assertRaises(OSError):
                atomic_json(path, {'changed': True})
            self.assertEqual(path.read_text(), 'old state')
            self.assertEqual(list(Path(folder).iterdir()), [path])


class MaintenanceTests(unittest.TestCase):
    def test_mise_uses_active_not_first_or_global_version(self):
        response = {'codex':[{'version':'1.0.0','active':False,'installed':True}, {'version':'1.2.0','active':True,'installed':True}]}
        with patch('maintenance.shutil.which', return_value='/usr/bin/mise'), patch('maintenance.subprocess.run', return_value=Mock(stdout=json.dumps(response))) as run:
            versions, warning = active_versions()
        self.assertEqual(versions, {'codex':'1.2.0'})
        self.assertEqual(warning, '')
        self.assertEqual(run.call_args.args[0], ['/usr/bin/mise','ls','--json'])
        self.assertNotIn('shell', run.call_args.kwargs)

    def test_mise_failure_is_unknown_not_current(self):
        with patch('maintenance.shutil.which', return_value='/usr/bin/mise'), patch('maintenance.subprocess.run', side_effect=subprocess.TimeoutExpired('mise', 4)):
            versions, warning = active_versions()
        self.assertEqual(versions, {})
        self.assertTrue(warning)

    def test_local_inventory_never_contacts_registry_or_runs_wrappers(self):
        with tempfile.TemporaryDirectory() as folder:
            wrapper = Path(folder) / 'test-wrapper'
            wrapper.write_text('#!/bin/sh\nmise use -g codex\n')
            with patch('maintenance.active_versions', return_value=({'codex':'1.0.0'},'')), patch('maintenance.latest_release') as online, patch('maintenance.subprocess.run') as run:
                result = inventory(lambda _command: str(wrapper))
            online.assert_not_called()
            run.assert_not_called()
            self.assertEqual(len(result['tools']), len(TOOLS))
            self.assertTrue(all(t['dynamic_wrapper'] for t in result['tools']))
            self.assertFalse(result['online'])

    def test_online_checks_only_fixed_packages_and_marks_failure(self):
        def release(package):
            if package == '@xai-official/grok':
                raise TimeoutError('test')
            return '1.2.0'
        with patch('maintenance.active_versions', return_value=({'codex':'1.1.0'},'')), patch('maintenance.latest_release', side_effect=release) as fetch:
            result = inventory(lambda _command:None, online=True)
        self.assertEqual(fetch.call_count, 4)
        self.assertEqual({c.args[0] for c in fetch.call_args_list}, {p for _, p in RELEASES.values()})
        rows = {t['id']:t for t in result['tools']}
        self.assertEqual(rows['codex']['status'], 'Newer release available')
        self.assertTrue(rows['grok']['status'].startswith('Check failed'))
        self.assertEqual(rows['claude']['status'], 'Version unknown')

    def test_version_comparison_is_numeric_and_conservative(self):
        self.assertEqual(comparison('1.9.0','1.10.0'), 'Newer release available')
        self.assertEqual(comparison('1.10.0','1.10.0'), 'Matches checked release')
        self.assertEqual(comparison('2.0.0','1.10.0'), 'Ahead of checked release')
        for value in [None, 'latest', '1.2.3-beta']:
            self.assertEqual(comparison(value, '1.0.0'), 'Version unknown')

    def test_release_request_is_allowlisted_bounded_and_unauthenticated(self):
        response = Mock()
        response.read.return_value = b'{"name":"@openai/codex","version":"1.2.3"}'
        opener = Mock()
        opener.open.return_value.__enter__ = Mock(return_value=response)
        opener.open.return_value.__exit__ = Mock(return_value=False)
        with patch('maintenance.build_opener', return_value=opener):
            self.assertEqual(latest_release('@openai/codex'), '1.2.3')
        request = opener.open.call_args.args[0]
        self.assertEqual(request.full_url, 'https://registry.npmjs.org/@openai%2Fcodex/latest')
        self.assertIsNone(request.get_header('Authorization'))
        self.assertIsNone(request.get_header('Cookie'))
        self.assertEqual(opener.open.call_args.kwargs['timeout'], 5)
        response.read.assert_called_once_with(262145)
        with self.assertRaises(ValueError):
            latest_release('https://evil.example')
        self.assertIsNone(NoRedirect().redirect_request(None))

    def test_bad_release_metadata_rejected(self):
        response = Mock()
        opener = Mock()
        opener.open.return_value.__enter__ = Mock(return_value=response)
        opener.open.return_value.__exit__ = Mock(return_value=False)
        for payload in [b'x'*262145, b'[]', b'{}', b'{"name":"@openai/codex","version":"1.2.3-beta"}']:
            response.read.return_value = payload
            with patch('maintenance.build_opener', return_value=opener), self.assertRaises(ValueError):
                latest_release('@openai/codex')


if __name__ == '__main__':
    unittest.main()
