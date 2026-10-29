#!/bin/sh
# Add "AISI AI Labs" to the Omarchy application launcher for this checkout.
set -eu

ROOT=$(cd "$(dirname "$0")" && pwd)
APPS="${XDG_DATA_HOME:-$HOME/.local/share}/applications"
mkdir -p "$APPS"

ROOT="$ROOT" APPS="$APPS" python3 - <<'PY'
import os
from pathlib import Path

root = Path(os.environ['ROOT'])
apps = Path(os.environ['APPS'])

def desktop_string(value):
    return value.replace('\\', '\\\\').replace('\n', '\\n').replace('\t', '\\t').replace('\r', '\\r')

script = str(root / 'launch.py')
script = ''.join('\\' + char if char in '\\"`$' else '%%' if char == '%' else char for char in script)
entry = f'''\
[Desktop Entry]
Version=1.0
Type=Application
Name=AISI AI Labs
Comment=APS professional development with AI tools and public practice projects
Exec=/usr/bin/python3 "{desktop_string(script)}"
Icon={desktop_string(str(root / 'web/icon.svg'))}
Terminal=false
StartupNotify=true
Categories=Education;
Keywords=AI;AISI;Learning;Labs;Agents;Terminal;
'''
(apps / 'aisi-labs-2.desktop').write_text(entry, encoding='utf-8')
PY

command -v update-desktop-database >/dev/null && update-desktop-database "$APPS" 2>/dev/null || true
echo "Installed AISI AI Labs launcher: $APPS/aisi-labs-2.desktop"
