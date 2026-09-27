#!/usr/bin/env python3
"""Print a read-only inventory. --online opts into public npm release checks."""
import argparse
import json
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from maintenance import inventory
from server import executable

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--online", action="store_true", help="Contact registry.npmjs.org; sends no keys or project data")
    args = parser.parse_args()
    print(json.dumps(inventory(executable, online=args.online), indent=2))
