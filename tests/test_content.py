from copy import deepcopy
from datetime import date
import json
import subprocess
import sys
import unittest
from urllib.parse import urlsplit

from catalogue import LABS, LESSONS, WEB_CHATS, RESOURCES, OMARCHY_HELP, SESSION_GUIDES, SETUP_GUIDANCE
from configuration import PROVIDERS
from content_review import ROOT, fingerprint, learning_units, review_report


class ContentTests(unittest.TestCase):
    def test_setup_guide_matches_key_adapters_and_safe_destinations(self):
        guide = SETUP_GUIDANCE
        self.assertEqual(guide['id'], 'tool-access')
        self.assertIn('guide:tool-access', learning_units())
        self.assertEqual([p['id'] for p in guide['providers']], [p['id'] for p in PROVIDERS])
        self.assertEqual({p['console']['url'] for p in guide['providers']}, {
            'https://platform.openai.com/api-keys',
            'https://platform.claude.com/settings/keys',
            'https://aistudio.google.com/api-keys'})
        for provider in guide['providers']:
            self.assertTrue(provider['signin'])
            self.assertEqual(len(provider['steps']), 3)
            self.assertEqual(len(provider['sources']), 2)
            for label, href in provider['sources'] + [(provider['console']['name'], provider['console']['url'])]:
                self.assertTrue(label)
                url = urlsplit(href)
                self.assertEqual(url.scheme, 'https')
                self.assertFalse(url.username or url.password or url.query or url.fragment)

    def test_setup_guide_preserves_boundaries_and_offline_options(self):
        guide = SETUP_GUIDANCE
        for phrase in ['ONLY public information', 'nothing OFFICIAL', 'NEVER', 'government accounts']:
            self.assertIn(phrase, guide['boundary'])
        self.assertIn('do not need an API key for every tool', guide['intro'])
        self.assertIn('no model calls', guide['offline']['body'])
        self.assertIn('no automatic key test', guide['verify']['body'])
        self.assertIn('not revocation', guide['problems'][-1]['body'])
        self.assertEqual(len(guide['problems']), 5)
        for label, href in guide['offline']['links'] + guide['verify']['links']:
            self.assertTrue(label)
            self.assertIn(href, {'#learn/web-chat', '#learn/terminal', '#tools', '#finish-session'})
        for route in guide['routes']:
            self.assertNotEqual('href' in route, 'section' in route)
            self.assertIn(route.get('href', route.get('section')), {'#web-chats', 'key-settings', 'native-settings'})

    def test_session_guides_are_versioned_local_routes_with_clear_limits(self):
        self.assertEqual({guide['id'] for guide in SESSION_GUIDES}, {'first-session','finish-session'})
        allowed = {'#programme','#omarchy-help','#learn/terminal','#configuration',
                   '#lab/first-steps','#projects','#finish-session','#docs/credentials','#docs/deployment',
                   '#learn/web-chat','#learn/ai-basics','#learn/chat-agents','#learn','#glossary'}
        for guide in SESSION_GUIDES:
            self.assertIn('guide:' + guide['id'], learning_units())
            self.assertEqual(len({step['id'] for step in guide['steps']}), len(guide['steps']))
            for phrase in ['ONLY public information', 'OFFICIAL', 'NEVER']:
                self.assertIn(phrase, guide['boundary'])
            for step in guide['steps'] + guide.get('paths', []) + ([guide['offline']] if 'offline' in guide else []):
                self.assertTrue(step['title'] and step['body'])
                for label, destination in step['links']:
                    self.assertTrue(label)
                    self.assertIn(destination, allowed)
        first, finish = SESSION_GUIDES
        self.assertEqual(first['title'], 'Getting started: a guide for beginners')
        self.assertEqual([path['id'] for path in first['paths']], ['chat','desktop','build'])
        self.assertEqual(len(first['steps']), 1)
        self.assertEqual(len(finish['steps']), 5)
        self.assertNotIn('minutes', json.dumps(first))
        self.assertIn('no timer', first['intro'])
        for path in first['paths']:
            self.assertEqual(len(path['steps']), 3)
            self.assertTrue(path['check'])
        for _, link in first['next_links']:
            self.assertIn(link, allowed)
        self.assertIn('not AI-generated work', first['offline']['body'])
        self.assertIn('not an automatic logout', finish['intro'])
        self.assertIn('reset on reload', finish['intro'])

    def test_beginner_glossary_and_examples_have_one_canonical_source(self):
        basics = next(lesson for lesson in LESSONS if lesson['id'] == 'ai-basics')
        terms = basics['glossary']
        self.assertEqual(len(terms), 12)
        self.assertEqual(len({term['id'] for term in terms}), len(terms))
        self.assertEqual([term['term'] for term in terms], sorted(term['term'] for term in terms))
        for term in terms:
            self.assertRegex(term['id'], r'^[a-z]+(?:-[a-z]+)*$')
            self.assertGreater(len(term['definition']), 30)
            self.assertIn(term['lesson'], {lesson['id'] for lesson in LESSONS})
        self.assertIn('lesson:ai-basics', learning_units())
        self.assertTrue(basics['sources'])
        self.assertIn('Training', json.dumps(basics))
        chat = next(lesson for lesson in LESSONS if lesson['id'] == 'web-chat')
        exercise = chat['exercise']
        self.assertIn('fictional', exercise['intro'])
        self.assertIn('offline', exercise['intro'])
        self.assertEqual(len(exercise['checks']), 3)
        for field in ['facts','prompt','sample','explanation','reflection']:
            self.assertGreater(len(exercise[field]), 40)
        for lesson in LESSONS:
            if 'worked_example' in lesson:
                self.assertEqual(set(lesson['worked_example']),
                                 {'title','context','before','after','question','explanation'})
                self.assertIn('Authored public practice', lesson['worked_example']['context'])
            for label, destination in lesson.get('next_links', []):
                self.assertTrue(label)
                self.assertIn(destination, {'#learn/web-chat','#learn/checking','#glossary','#web-chats','#finish-session'})

    def test_desktop_help_is_versioned_plain_content_with_sources(self):
        self.assertIn('help:omarchy', learning_units())
        self.assertIn('4.0.4-1', OMARCHY_HELP['baseline'])
        self.assertIn('not a live scan', OMARCHY_HELP['baseline'])
        shortcuts = [s for group in OMARCHY_HELP['groups'] for s in group['shortcuts']]
        self.assertEqual(len(shortcuts), len({s['id'] for s in shortcuts}))
        self.assertEqual(len(OMARCHY_HELP['groups'][0]['shortcuts']), 3)
        for shortcut in shortcuts:
            self.assertEqual(set(shortcut), {'id','keys','action','detail'})
            self.assertTrue(all(isinstance(key, str) and key for key in shortcut['keys']))
            self.assertTrue(shortcut['action'] and shortcut['detail'])
        indexed = {s['id']:s for s in shortcuts}
        self.assertEqual(indexed['menu']['keys'], ['Super','Space'])
        self.assertEqual(indexed['apps']['keys'], ['Super','Alt','Space'])
        self.assertEqual(indexed['bindings']['keys'], ['Super','K'])
        self.assertEqual(OMARCHY_HELP['priority_shortcuts'], ['fullscreen','close'])
        self.assertEqual(indexed['fullscreen']['keys'], ['Super','F'])
        self.assertEqual(indexed['close']['keys'], ['Super','W'])
        self.assertIn('Save first', indexed['close']['detail'])
        self.assertIn('OFFICIAL', OMARCHY_HELP['boundary'])
        self.assertIn('NEVER', OMARCHY_HELP['boundary'])
        for title, url in OMARCHY_HELP['sources']:
            self.assertTrue(title)
            self.assertEqual(urlsplit(url).scheme, 'https')
            self.assertEqual(urlsplit(url).hostname, 'omarchy.org')

    def test_review_inventory_covers_every_unit(self):
        records = json.loads((ROOT / 'content/reviews.json').read_text())
        # Fixed date tests structure, not whether a future editorial deadline passes.
        report = review_report(records, today=date(2026, 9, 29))
        self.assertEqual({row['id'] for row in report}, set(learning_units()))
        self.assertTrue(any(row['status'] == 'unreviewed' for row in report))

    def test_dates_hashes_and_revision_are_not_accuracy_claims(self):
        units = {'lesson:test': fingerprint({'text':'example'})}
        records = {'lesson:test': {'revision':1, 'reviewed_at':'2026-09-01', 'review_after_days':30, 'sha256':units['lesson:test'], 'notes':'Example review'}}
        self.assertEqual(review_report(records, date(2026,9,28), units)[0]['status'], 'in-date')
        self.assertEqual(review_report(records, date(2026,10,1), units)[0]['status'], 'due')
        changed = {'lesson:test':fingerprint({'text':'changed'})}
        self.assertEqual(review_report(records, date(2026,9,28), changed)[0]['status'], 'changed')
        records['lesson:test']['reviewed_at'] = None
        self.assertEqual(review_report(records, date(2026,9,28), units)[0]['status'], 'unreviewed')

    def test_invalid_or_missing_records_rejected(self):
        units = {'test':fingerprint('example')}
        record = {'revision':1, 'reviewed_at':None, 'review_after_days':30, 'sha256':units['test'], 'notes':'Baseline'}
        for field, value in [('revision',True), ('reviewed_at','2099-01-01'), ('reviewed_at','not-a-date'), ('reviewed_at',''), ('review_after_days',0), ('sha256','bad'), ('notes','')]:
            bad = deepcopy(record)
            bad[field] = value
            with self.subTest(field=field,value=value), self.assertRaises(ValueError):
                review_report({'test':bad}, date(2026,9,28), units)
        with self.assertRaises(ValueError):
            review_report({}, date(2026,9,28), units)

    def test_chat_destinations_are_fixed_https_without_payloads(self):
        self.assertEqual(len({x['id'] for x in WEB_CHATS}), len(WEB_CHATS))
        expected = {'chatgpt.com','claude.ai','gemini.google.com','grok.com','copilot.microsoft.com','www.perplexity.ai','chat.mistral.ai','chat.qwen.ai','huggingface.co','firefly.adobe.com','www.midjourney.com','app.runwayml.com','docs.comfy.org'}
        self.assertEqual({urlsplit(x['url']).hostname for x in WEB_CHATS if x['url']}, expected)
        for chat in WEB_CHATS:
            if chat['kind'] == 'reference':
                self.assertIsNone(chat['url'])
                continue
            url = urlsplit(chat['url'])
            self.assertEqual(url.scheme, 'https')
            self.assertFalse(url.username or url.password or url.query or url.fragment)
            self.assertTrue(chat['source'].startswith('https://'))

    def test_profiles_have_teaching_context_and_primary_source_links(self):
        for chat in WEB_CHATS:
            self.assertIn(chat['kind'], {'chat', 'library', 'reference', 'creative'})
            for field in ['description', 'openness', 'useful_for', 'exercise', 'limits', 'considerations']:
                self.assertGreater(len(chat[field]), 30)
            self.assertTrue(chat['sources'])
            for title, url in chat['sources']:
                self.assertTrue(title)
                self.assertEqual(urlsplit(url).scheme, 'https')
        deepseek = next(x for x in WEB_CHATS if x['id']=='deepseek')
        self.assertEqual(deepseek['kind'], 'reference')
        self.assertIsNone(deepseek['url'])
        self.assertIn('001-2025', deepseek['considerations'])

    def test_new_lessons_are_connected_and_have_sources_and_checks(self):
        ids = [lesson['id'] for lesson in LESSONS]
        self.assertEqual(len(ids), len(set(ids)))
        for lesson in LESSONS:
            self.assertIn(lesson['lab'], {lab['id'] for lab in LABS})
            self.assertTrue(0 <= lesson['correct'] < len(lesson['options']))
        for identifier in ['web-chat','open-models','image-video','reading-leaderboards']:
            lesson = next(x for x in LESSONS if x['id'] == identifier)
            self.assertTrue(lesson['sources'])
            self.assertGreater(len(lesson['sections']), 3)
            for _, url in lesson['sources']:
                self.assertEqual(urlsplit(url).scheme, 'https')

    def test_every_lesson_has_choice_specific_explanations(self):
        for lesson in LESSONS:
            with self.subTest(lesson=lesson['id']):
                self.assertEqual(len(lesson['options']), 3)
                self.assertEqual(len(set(lesson['options'])), 3)
                self.assertEqual(len(lesson['option_feedback']), 3)
                self.assertEqual(len(set(lesson['option_feedback'])), 3)
                self.assertEqual(lesson['feedback'], lesson['option_feedback'][lesson['correct']])
                self.assertTrue(all(isinstance(text, str) and len(text) > 40
                                    for text in lesson['option_feedback']))

    def test_terminal_lesson_distinguishes_shortcuts_from_shell_commands(self):
        terminal = next(lesson for lesson in LESSONS if lesson['id'] == 'terminal')
        section = next(body for title, body in terminal['sections']
                       if title == 'Fullscreen and closing a window')
        for phrase in ['Super + F', 'Super + W', 'Save work', 'not commands to type']:
            self.assertIn(phrase, section)

    def test_resources_are_reviewed_fixed_destinations_with_reading_guidance(self):
        self.assertEqual(len(RESOURCES), 5)
        self.assertEqual(len({r['id'] for r in RESOURCES}), len(RESOURCES))
        self.assertEqual({urlsplit(r['url']).hostname for r in RESOURCES},
                         {'artificialanalysis.ai','arena.ai','crfm.stanford.edu','www.swebench.com','huggingface.co'})
        units = learning_units()
        for resource in RESOURCES:
            self.assertIn('resource:' + resource['id'], units)
            for field in ['description','check','caution']:
                self.assertGreater(len(resource[field]), 40)
            for destination in [resource['url'], resource['source'][1]]:
                url = urlsplit(destination)
                self.assertEqual(url.scheme, 'https')
                self.assertFalse(url.username or url.password or url.query or url.fragment)

    def test_creative_profiles_keep_hosted_and_installation_boundaries_clear(self):
        creative = {p['id']: p for p in WEB_CHATS if p['kind']=='creative'}
        self.assertEqual(set(creative), {'firefly','midjourney','runway','comfyui'})
        self.assertEqual(creative['comfyui']['url'], 'https://docs.comfy.org/')
        self.assertIn('neither installs', creative['comfyui']['limits'])
        self.assertIn('open by default', creative['midjourney']['considerations'])
        self.assertIn('provider claim', creative['firefly']['considerations'])
        for identifier in ['image-video','reading-leaderboards']:
            lesson = next(x for x in LESSONS if x['id']==identifier)
            self.assertIn('OFFICIAL', json.dumps(lesson))
            self.assertIn('authored', json.dumps(lesson).lower())

    def test_hugging_face_has_actionable_source_backed_risk_checks(self):
        profile = next(x for x in WEB_CHATS if x['id']=='huggingface')
        self.assertEqual(len(profile['risk_checks']), 4)
        for check in profile['risk_checks']:
            self.assertTrue(check['title'] and check['body'])
            self.assertIn(check['source'], profile['sources'])
            self.assertEqual(urlsplit(check['source'][1]).hostname, 'huggingface.co')
        text = json.dumps(profile)
        for phrase in ['trust_remote_code=True', 'pickle', 'safetensors', 'outbound network',
                       'not government approval', 'Without downloading or running']:
            self.assertIn(phrase, text)

    def test_audit_is_read_only_and_strict_reports_review_debt(self):
        path = ROOT / 'content/reviews.json'
        before = path.read_bytes()
        result = subprocess.run([sys.executable, str(ROOT/'scripts/review_content.py'), '--as-of','2027-01-01','--strict','--json'], capture_output=True, text=True, cwd=ROOT)
        self.assertEqual(result.returncode, 1, result.stderr)
        self.assertTrue(any(x['status'] == 'due' for x in json.loads(result.stdout)))
        self.assertEqual(path.read_bytes(), before)

    def test_fingerprints_ignore_json_key_order_but_detect_text_changes(self):
        self.assertEqual(fingerprint({'a':1,'b':2}), fingerprint({'b':2,'a':1}))
        self.assertNotEqual(fingerprint({'a':1}), fingerprint({'a':2}))


if __name__ == '__main__':
    unittest.main()
