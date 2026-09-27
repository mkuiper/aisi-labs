#!/usr/bin/env python3
"""Report content changes and review dates offline; does not verify factual accuracy."""
import argparse
from datetime import date
import json
from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from content_review import review_report


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--as-of", type=date.fromisoformat, default=date.today())
    parser.add_argument("--json", action="store_true")
    parser.add_argument("--strict", action="store_true", help="Exit 1 for changed, unreviewed or due units; default reports without failing on review debt")
    args = parser.parse_args()
    try:
        rows = review_report(today=args.as_of)
    except (OSError, ValueError, TypeError, KeyError) as error:
        print("Content review metadata error: " + str(error), file=sys.stderr)
        return 2
    if args.json:
        print(json.dumps(rows, indent=2))
    else:
        for row in rows:
            print(f"{row['status']:10} {row['id']:30} rev {row['revision']} reviewed {row['reviewed_at'] or 'not recorded'}")
        print("Offline report only. In-date does not prove accuracy or live link availability.")
    return int(args.strict and any(row["status"] != "in-date" for row in rows))


if __name__ == "__main__":
    sys.exit(main())
