import json
import os
from pathlib import Path
import subprocess
import tempfile
import unittest
from unittest.mock import Mock, patch

from configuration import Configuration
from policy import POLICY
from server import Hub

FAKE = 'TEST-ONLY-NOT-A-REAL-PROVIDER-KEY'


class ConfigurationTests(unittest.TestCase):
    def test_key_never_returned_and_session_is_ephemeral(self):
        config = Configuration()
        status = config.set_key('openai', FAKE)
        self.assertTrue(status['providers'][0]['configured'])
        self.assertNotIn(FAKE, json.dumps(status))
        self.assertFalse(Configuration().status()['providers'][0]['configured'])
        self.assertFalse(config.forget('openai')['providers'][0]['configured'])

    def test_invalid_key_does_not_echo_or_overwrite(self):
        config = Configuration()
        config.set_key('openai', FAKE)
        for invalid in ['tiny', 'secret-with\nnewline', 'private key with spaces', None, 'x'*4097]:
            with self.assertRaises(ValueError) as error:
                config.set_key('openai', invalid)
            self.assertNotIn(str(invalid), str(error.exception))
        with self.assertRaises(ValueError):
            config.set_key('not-a-provider', FAKE)
        env, _ = config.launch_settings('codex')
        self.assertEqual(env['OPENAI_API_KEY'], FAKE)

    def test_keys_are_scoped_to_matching_tool(self):
        config = Configuration()
        config.set_key('openai', FAKE)
        config.set_key('anthropic', FAKE+'-anthropic')
        config.set_key('google', FAKE+'-google')
        with patch.dict(os.environ, {'ANTHROPIC_AUTH_TOKEN':'old-token','GOOGLE_GENAI_USE_VERTEXAI':'true','PATH':'/usr/bin'}, clear=True):
            for tool, name, suffix in [('codex','OPENAI_API_KEY',''),('claude','ANTHROPIC_API_KEY','-anthropic'),('gemini','GEMINI_API_KEY','-google')]:
                env, args = config.launch_settings(tool)
                self.assertEqual(env[name], FAKE+suffix)
                self.assertNotIn(FAKE, repr(args))
                for other in {'OPENAI_API_KEY','ANTHROPIC_API_KEY','GEMINI_API_KEY'}-{name}:
                    self.assertNotIn(other, env)
                self.assertNotIn('ANTHROPIC_AUTH_TOKEN', env)
                self.assertNotIn('GOOGLE_GENAI_USE_VERTEXAI', env)
            for tool in ['terminal','editor','opencode','copilot','files']:
                self.assertEqual(config.launch_settings(tool), (None, []))
        config.forget('all')
        self.assertTrue(all(not p['configured'] for p in config.status()['providers']))

    def test_codex_adapter_uses_environment_without_changing_auth_files(self):
        config = Configuration()
        config.set_key('openai', FAKE)
        _, args = config.launch_settings('codex')
        self.assertIn('--no-daemon', args)
        self.assertIn('model_providers.aisi_openai.env_key="OPENAI_API_KEY"', args)
        self.assertIn('model_providers.aisi_openai.requires_openai_auth=false', args)
        self.assertNotIn('login', args)

    def test_acknowledgement_gate_and_key_launch_path(self):
        with tempfile.TemporaryDirectory() as temporary:
            hub = Hub(temporary)
            with self.assertRaises(ValueError):
                hub.create('blank','Test')
            with self.assertRaises(ValueError):
                hub.launch('terminal')
            with self.assertRaises(ValueError):
                hub.acknowledge('old-version')
            hub.acknowledge(POLICY['version'])
            project = hub.create('first-steps','Test')
            hub.configuration.set_key('openai', FAKE)
            process = Mock()
            process.wait.return_value = 0
            with patch('server.executable', side_effect=lambda name:'/usr/bin/'+name), patch('server.subprocess.Popen', return_value=process) as launch:
                hub.launch('codex', project['id'])
                args, kwargs = launch.call_args
                self.assertEqual(args[0][0], '/usr/bin/ghostty')
                self.assertNotIn('/usr/bin/uwsm-app', args[0])
                self.assertNotIn(FAKE, repr(args))
                self.assertEqual(kwargs['env']['OPENAI_API_KEY'], FAKE)
                self.assertEqual(kwargs['stdout'], subprocess.DEVNULL)
                self.assertEqual(kwargs['stderr'], subprocess.DEVNULL)
            for path in Path(temporary).rglob('*'):
                if path.is_file():
                    self.assertNotIn(FAKE, path.read_text())
            self.assertNotIn(FAKE, json.dumps(hub.bootstrap()))
            self.assertFalse(Hub(temporary).acknowledged)

    def test_new_briefs_include_full_programme_boundaries(self):
        with tempfile.TemporaryDirectory() as temporary:
            hub = Hub(temporary)
            hub.acknowledge(POLICY['version'])
            project = hub.create('blank','Public practice')
            brief = (Path(project['path'])/'BRIEF.md').read_text()
            for phrase in ['ONLY public information','OFFICIAL','NEVER connect','professional development']:
                self.assertIn(phrase, brief)
            self.assertEqual(len(hub.bootstrap()['documents']), 5)


if __name__ == '__main__':
    unittest.main()
