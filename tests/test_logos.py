from pathlib import Path
import re
import unittest
import xml.etree.ElementTree as ET

from catalogue import TOOLS, WEB_CHATS
from logos import CHAT_LOGOS, LOGO_FILES, TOOL_LOGOS, logo_catalogue

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

    def test_product_variants_are_not_mislabelled(self):
        self.assertNotEqual(TOOL_LOGOS['claude'], CHAT_LOGOS['claude-chat'])
        self.assertNotEqual(TOOL_LOGOS['gemini'], CHAT_LOGOS['gemini-chat'])
        self.assertNotEqual(TOOL_LOGOS['copilot'], CHAT_LOGOS['copilot-chat'])
        self.assertNotEqual(TOOL_LOGOS['codex'], CHAT_LOGOS['chatgpt'])
        self.assertNotIn('omp', TOOL_LOGOS)  # Not Pi.

    def test_svg_assets_are_passive_local_artwork(self):
        allowed = {'svg','title','path','g','defs','linearGradient','radialGradient','stop','rect','circle','ellipse','polygon','polyline','line','clipPath'}
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
