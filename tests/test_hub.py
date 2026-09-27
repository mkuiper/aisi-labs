import http.client
import json
from pathlib import Path
import tempfile
import threading
import unittest
from unittest.mock import patch

from catalogue import LABS, LESSONS, TOOLS
from server import Hub, make_server
from policy import POLICY
from logos import LOGO_FILES, logo_catalogue


class ProjectTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.hub = Hub(self.temp.name)
        self.hub.acknowledge(POLICY['version'])

    def test_every_lab_has_usable_isolated_starters(self):
        for lab in LABS:
            first = self.hub.create(lab['id'], lab['title'])
            second = self.hub.create(lab['id'], lab['title'])
            self.assertNotEqual(first['path'], second['path'])
            for file in lab['files']:
                self.assertTrue((Path(first['path']) / file).read_text())
            self.assertIn('public', (Path(first['path']) / 'BRIEF.md').read_text())

    def test_new_attempt_does_not_replace_learner_work(self):
        project = self.hub.create('first-steps', 'My page')
        file = Path(project['path']) / 'index.html'
        file.write_text('My edited page')
        self.hub.create('first-steps', 'My page')
        self.assertEqual(file.read_text(), 'My edited page')

    def test_checks_survive_new_hub(self):
        project = self.hub.create('evidence', 'Review')
        self.hub.save_checks(project['id'], [2, 0])
        reopened = Hub(self.temp.name).project(project['id'])
        self.assertEqual(reopened['checks'], [0, 2])
        with self.assertRaises(ValueError):
            self.hub.save_checks(project['id'], [99])

    def test_paths_cannot_escape_projects(self):
        for value in ['../', '/tmp', '.', 'a/b', 'x;touch test', [], None]:
            with self.subTest(value=value), self.assertRaises(ValueError):
                self.hub.project_path(value)
        (self.hub.projects / 'outside').symlink_to(Path(self.temp.name))
        with self.assertRaises(ValueError):
            self.hub.project_path('outside')

    def test_bad_metadata_is_preserved_and_reported(self):
        project = self.hub.create('blank', 'Test')
        metadata = Path(project['path']) / '.aisi-project.json'
        for malformed in ['not json', '[]', '{"id": "x"}']:
            metadata.write_text(malformed)
            projects, warnings = self.hub.list_projects()
            self.assertEqual(projects, [])
            self.assertEqual(len(warnings), 1)
            self.assertEqual(metadata.read_text(), malformed)

    def test_corrupt_progress_not_replaced(self):
        progress = self.hub.data / 'progress.json'
        progress.write_text('damaged')
        self.assertTrue(self.hub.bootstrap()['warnings'])
        with self.assertRaises(ValueError):
            self.hub.progress()
        self.assertEqual(progress.read_text(), 'damaged')

    def test_tool_allowlist_and_working_directory(self):
        project = self.hub.create('blank', '$(do not run)')
        with patch('server.executable', side_effect=lambda name: '/usr/bin/' + name):
            args, cwd = self.hub.launch_argv('codex', project['id'])
            self.assertIn('--working-directory=' + project['path'], args)
            self.assertEqual(cwd, Path(project['path']))
            self.assertEqual(args[-2:], ['-e', '/usr/bin/codex'])
            with self.assertRaises(ValueError):
                self.hub.launch_argv('bash -c echo bad')
            editor, _ = self.hub.launch_argv('editor', project['id'])
            self.assertEqual(editor, ['/usr/bin/code', project['path']])

    def test_preview_is_file_url_and_rejects_symlink(self):
        project = self.hub.create('first-steps', 'Preview')
        args, _ = self.hub.launch_argv('preview', project['id'])
        self.assertTrue(args[1].startswith('file:///'))
        file = Path(project['path']) / 'index.html'
        file.unlink()
        file.symlink_to(Path(project['path']) / 'BRIEF.md')
        with self.assertRaises(ValueError):
            self.hub.launch_argv('preview', project['id'])


class HttpTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.temp = tempfile.TemporaryDirectory()
        cls.server = make_server(0, cls.temp.name)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.port = cls.server.server_port

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join()
        cls.temp.cleanup()

    def request(self, method, path, payload=None, headers=None):
        connection = http.client.HTTPConnection('127.0.0.1', self.port, timeout=3)
        connection.request(method, path, body=json.dumps(payload) if payload is not None else None, headers=headers or {})
        response = connection.getresponse()
        body = response.read()
        result = (response.status, body, dict(response.getheaders()))
        connection.close()
        return result

    def auth(self):
        return {'Origin':f'http://127.0.0.1:{self.port}', 'X-Labs-Token':self.server.hub.token, 'Content-Type':'application/json'}

    def test_bootstrap_and_static_assets(self):
        code, body, _ = self.request('GET', '/api/bootstrap')
        self.assertEqual(code, 200)
        self.assertEqual(len(json.loads(body)['tools']), len(TOOLS))
        for path in ['/', '/app.js', '/programme.js', '/style.css', '/icon.svg']:
            code, body, headers = self.request('GET', path)
            self.assertEqual(code, 200)
            self.assertIn("frame-ancestors 'none'", headers['Content-Security-Policy'])
        _, html, _ = self.request('GET', '/')
        self.assertNotIn(b'__TOKEN__', html)

    def test_authenticated_workflow(self):
        code, _, _ = self.request('POST', '/api/acknowledge', {'version': POLICY['version']}, self.auth())
        self.assertEqual(code, 200)
        code, body, _ = self.request('POST', '/api/projects', {'lab':'consultation','name':'My consultation'}, self.auth())
        self.assertEqual(code, 200)
        project = json.loads(body)
        code, _, _ = self.request('POST', '/api/checks', {'project':project['id'], 'checks':[0]}, self.auth())
        self.assertEqual(code, 200)
        code, body, _ = self.request('POST', '/api/progress', {'lesson':'terminal', 'completed':True}, self.auth())
        self.assertEqual(code, 200)
        self.assertTrue(json.loads(body)['terminal'])

    def test_logos_are_explicit_static_assets_not_an_open_directory(self):
        code, body, _ = self.request('GET', '/api/bootstrap')
        self.assertEqual(json.loads(body)['logos'], logo_catalogue())
        for name in LOGO_FILES:
            code, body, headers = self.request('GET', '/logos/' + name)
            self.assertEqual(code, 200)
            self.assertTrue(headers['Content-Type'].startswith('image/svg+xml'))
            self.assertIn(b'<svg', body)
        for path in ['/logos/SOURCES.md','/logos/UPSTREAM-SOURCES.md','/logos/../server.py','/logos/missing.svg','/logos/%2e%2e/server.py']:
            self.assertEqual(self.request('GET', path)[0], 404)
        self.assertEqual(self.request('GET', '/logos/codex.svg', headers={'Host':'evil.example'})[0], 403)

    def test_cross_site_mutation_rejected(self):
        payload = {'tool':'terminal'}
        for headers in [{}, {'Origin':'https://evil.example'}, {**self.auth(),'Origin':'https://evil.example'}, {**self.auth(),'X-Labs-Token':'wrong'}]:
            self.assertEqual(self.request('POST', '/api/launch', payload, headers)[0], 403)

    def test_rebinding_and_cross_site_reads_rejected(self):
        self.assertEqual(self.request('GET', '/', headers={'Host':'evil.example'})[0], 403)
        self.assertEqual(self.request('GET', '/', headers={'Sec-Fetch-Site':'cross-site'})[0], 403)

    def test_no_arbitrary_files_or_commands(self):
        self.assertEqual(self.request('GET', '/../server.py')[0], 404)
        self.assertEqual(self.request('GET', '/projects/anything/index.html')[0], 404)
        self.assertEqual(self.request('POST', '/api/launch', {'tool':'arbitrary-command'}, self.auth())[0], 400)
        self.assertEqual(self.request('POST', '/api/projects', {'lab':'unknown','name':'Test'}, self.auth())[0], 400)

    def test_credential_api_requires_acknowledgement_and_never_returns_keys(self):
        self.server.hub.acknowledged = False
        fake = 'FAKE-HTTP-TEST-KEY-NOT-A-REAL-SECRET'
        payload = {'provider':'google', 'key':fake}
        self.assertEqual(self.request('POST', '/api/configuration/key', payload, self.auth())[0], 400)
        self.assertEqual(self.request('POST', '/api/configuration/key', payload)[0], 403)
        self.assertEqual(self.request('POST', '/api/acknowledge', {'version':POLICY['version']}, self.auth())[0], 200)
        code, body, _ = self.request('POST', '/api/configuration/key', payload, self.auth())
        self.assertEqual(code, 200)
        self.assertNotIn(fake.encode(), body)
        code, body, _ = self.request('GET', '/api/bootstrap')
        self.assertNotIn(fake.encode(), body)
        self.assertTrue(json.loads(body)['configuration']['providers'][2]['configured'])
        self.assertEqual(self.request('POST', '/api/configuration/forget', {'provider':'all'}, self.auth())[0], 200)

    def test_lessons_and_labs_have_valid_connections(self):
        for lesson in LESSONS:
            self.assertIn(lesson['lab'], {lab['id'] for lab in LABS})
            self.assertTrue(0 <= lesson['correct'] < len(lesson['options']))
        for lab in LABS:
            self.assertIn(lab['concept'], {lesson['id'] for lesson in LESSONS})

    def test_model_api_requires_auth_acknowledgement_and_valid_id(self):
        self.server.hub.acknowledged = False
        payload = {'tool':'grok','model':'test-model'}
        self.assertEqual(self.request('POST', '/api/configuration/model', payload)[0], 403)
        self.assertEqual(self.request('POST', '/api/configuration/model', payload, self.auth())[0], 400)
        self.server.hub.acknowledge(POLICY['version'])
        self.assertEqual(self.request('POST', '/api/configuration/model', payload, self.auth())[0], 200)
        for value in ['--yolo', [], None]:
            self.assertEqual(self.request('POST', '/api/configuration/model', {**payload,'model':value}, self.auth())[0], 400)

    def test_inventory_gate_and_explicit_online_boolean(self):
        self.server.hub.acknowledged = False
        with patch('server.inventory', return_value={'tools':[]}) as inspect:
            self.assertEqual(self.request('POST', '/api/maintenance', {'online':False}, self.auth())[0], 200)
            self.assertEqual(self.request('POST', '/api/maintenance', {'online':True}, self.auth())[0], 400)
            self.assertEqual(self.request('POST', '/api/maintenance', {'online':'yes'}, self.auth())[0], 400)
            self.assertEqual(self.request('POST', '/api/maintenance', {'online':False})[0], 403)
            self.assertEqual(inspect.call_count, 1)
            self.server.hub.acknowledge(POLICY['version'])
            self.assertEqual(self.request('POST', '/api/maintenance', {'online':True}, self.auth())[0], 200)
            self.assertTrue(inspect.call_args.kwargs['online'])


if __name__ == '__main__':
    unittest.main()
