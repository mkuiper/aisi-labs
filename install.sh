#!/bin/sh
# Add "AISI AI Labs" to the Omarchy application launcher for this checkout.
set -eu

ROOT=$(cd "$(dirname "$0")" && pwd)
APPS="${XDG_DATA_HOME:-$HOME/.local/share}/applications"
mkdir -p "$APPS"

cat > "$APPS/aisi-labs-2.desktop" <<EOF
[Desktop Entry]
Version=1.0
Type=Application
Name=AISI AI Labs
Comment=APS professional development with AI tools and public practice projects
Exec=/usr/bin/python3 $ROOT/launch.py
Icon=$ROOT/web/icon.svg
Terminal=false
StartupNotify=true
Categories=Education;
Keywords=AI;AISI;Learning;Labs;Agents;Terminal;
EOF

command -v update-desktop-database >/dev/null && update-desktop-database "$APPS" 2>/dev/null || true
echo "Installed AISI AI Labs launcher: $APPS/aisi-labs-2.desktop"
