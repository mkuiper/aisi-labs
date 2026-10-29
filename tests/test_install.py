import os
from pathlib import Path
import shlex
import shutil
import subprocess
import tempfile
import unittest


class InstallerTests(unittest.TestCase):
    def test_launcher_opens_checkout_with_spaces(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary) / 'checkout with spaces'
            root.mkdir()
            shutil.copy(Path(__file__).resolve().parents[1] / 'install.sh', root)
            (root / 'launch.py').write_text(
                "from pathlib import Path\nPath(__file__).with_name('opened').touch()\n",
                encoding='utf-8',
            )
            env = dict(os.environ, XDG_DATA_HOME=str(Path(temporary) / 'data'))
            subprocess.run(['sh', str(root / 'install.sh')], env=env, check=True, capture_output=True)
            entry = (Path(env['XDG_DATA_HOME']) / 'applications/aisi-labs-2.desktop').read_text()
            command = next(line[5:] for line in entry.splitlines() if line.startswith('Exec='))
            subprocess.run(shlex.split(command), check=True)
            self.assertTrue((root / 'opened').exists())


if __name__ == '__main__':
    unittest.main()
