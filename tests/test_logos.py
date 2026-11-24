from pathlib import Path
import re
import unittest
import xml.etree.ElementTree as ET

from catalogue import TOOLS, WEB_CHATS
from logos import CHAT_LOGOS, LOGO_FILES, ORG_LOGOS, PRODUCT_LOGOS, TOOL_LOGOS, logo_catalogue

ROOT = Path(__file__).resolve().parents[1]


class LogoTests(unittest.TestCase):
    def test_mappings_reference_known_products_and_bundled_assets(self):
        self.assertLessEqual(set(TOOL_LOGOS), {t['id'] for t in TOOLS})
        self.assertEqual(set(CHAT_LOGOS), {t['id'] for t in WEB_CHATS})
        self.assertEqual(LOGO_FILES, {p.name for p in (ROOT/'web/logos').glob('*.svg')})
        for mapping in logo_catalogue().values():
            for url in mapping.values():
                self.assertRegex(url, r'^/logos/[a-z]+\.svg$')
                self.assertTrue((ROOT/'web'/url.lstrip('/')).is_file())

    def test_incident_organisation_marks_are_known_and_not_government(self):
        app = (ROOT/'web/app.js').read_text()
        cases = app[app.index('const incidentCases = {'):app.index('const incidentTraces =')]
        used = set(re.findall(r"\['[^']+','[^']+','([a-z-]+)'\]", cases))
        self.assertTrue(used)
        self.assertEqual(used, set(ORG_LOGOS))
        for word in ('gov', 'medicare', 'services', 'asd', 'aisi', 'pmc', 'crest'):
            self.assertFalse(any(word in key or word in name for key, name in ORG_LOGOS.items()))
        self.assertIn("['Services Australia','Runs the portal','']", cases)

    def test_lesson_product_marks_match_names_in_the_lesson(self):
        import json
        from catalogue import LESSONS
        lessons = {lesson['id']: json.dumps(lesson, ensure_ascii=False) for lesson in LESSONS}
        app = (ROOT/'web/app.js').read_text()
        block = app[app.index('const lessonProducts = {'):app.index('const lessonProductStrip')]
        entries = re.findall(r"'([a-z-]+)':\[(.*?)\],\n", block)
        self.assertEqual({lesson for lesson, _ in entries}, {'models-costs', 'open-models', 'image-video', 'chat-agents', 'tools-skills', 'identity', 'web-chat'})
        catalogue = logo_catalogue()
        for lesson, body in entries:
            for name, role, kind, key in re.findall(r"\['([^']+)','([^']+)','([a-z]+)','([a-z-]*)'\]", body):
                with self.subTest(lesson=lesson, name=name):
                    self.assertIn(name.removeprefix('Adobe '), lessons[lesson])
                    if key:  # An empty key shows initials.
                        self.assertIn(key, catalogue[kind])
        self.assertEqual(set(PRODUCT_LOGOS), {'ollama', 'mcp'})

    def test_product_variants_are_not_mislabelled(self):
        self.assertNotEqual(TOOL_LOGOS['claude'], CHAT_LOGOS['claude-chat'])
        self.assertNotEqual(TOOL_LOGOS['gemini'], CHAT_LOGOS['gemini-chat'])
        self.assertNotEqual(TOOL_LOGOS['copilot'], CHAT_LOGOS['copilot-chat'])
        self.assertNotEqual(TOOL_LOGOS['codex'], CHAT_LOGOS['chatgpt'])
        self.assertNotIn('omp', TOOL_LOGOS)  # Not Pi.

    def test_every_desktop_entry_has_an_appropriate_icon(self):
        desktop = {t['id'] for t in TOOLS if t['category']=='Desktop tools'}
        self.assertEqual(len(desktop), 8)
        self.assertLessEqual(desktop, TOOL_LOGOS.keys())
        self.assertEqual(TOOL_LOGOS['files'], 'folder.svg')  # System default, not a fixed file manager.
        self.assertEqual(TOOL_LOGOS['terminal'], 'ghostty.svg')

    def test_svg_assets_are_passive_local_artwork(self):
        allowed = {'svg','title','path','g','defs','linearGradient','radialGradient','stop','rect','circle','ellipse','polygon','polyline','line','clipPath'}
        # Passive visual effects used by the native VS Code artwork; no feImage,
        # scripts, animation, foreignObject or externally loaded resources.
        allowed |= {'mask','filter','feFlood','feColorMatrix','feOffset','feGaussianBlur','feBlend'}
        for name in LOGO_FILES:
            with self.subTest(name=name):
                body = (ROOT/'web/logos'/name).read_text()
                self.assertNotIn('<!ENTITY', body)
                self.assertNotIn('<!DOCTYPE', body)
                root = ET.fromstring(body)
                self.assertEqual(root.tag, '{http://www.w3.org/2000/svg}svg')
                self.assertIn('viewBox', root.attrib)
                for element in root.iter():
                    self.assertIn(element.tag.split('}')[-1], allowed)
                    for key, value in element.attrib.items():
                        local = key.split('}')[-1].lower()
                        self.assertFalse(local.startswith('on'))
                        if local in {'href','src'}:
                            self.assertTrue(value.startswith('#'))
                        for reference in re.findall(r'url\((.*?)\)', value):
                            self.assertTrue(reference.startswith('#'))


if __name__ == '__main__':
    unittest.main()
