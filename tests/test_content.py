from copy import deepcopy
from datetime import date
import json
import subprocess
import sys
import unittest
from urllib.parse import urlsplit

from catalogue import LABS, LESSONS, WEB_CHATS
from content_review import ROOT, fingerprint, learning_units, review_report


class ContentTests(unittest.TestCase):
    def test_review_inventory_covers_every_unit(self):
        records = json.loads((ROOT / 'content/reviews.json').read_text())
        # Fixed date tests structure, not whether a future editorial deadline passes.
        report = review_report(records, today=date(2026, 9, 28))
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
        expected = {'chatgpt.com','claude.ai','gemini.google.com','grok.com','copilot.microsoft.com','www.perplexity.ai','chat.mistral.ai','chat.qwen.ai','huggingface.co'}
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
            self.assertIn(chat['kind'], {'chat', 'library', 'reference'})
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
        for identifier in ['web-chat','open-models']:
            lesson = next(x for x in LESSONS if x['id'] == identifier)
            self.assertTrue(lesson['sources'])
            self.assertGreater(len(lesson['sections']), 3)
            for _, url in lesson['sources']:
                self.assertEqual(urlsplit(url).scheme, 'https')

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
