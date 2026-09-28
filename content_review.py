"""Offline editorial inventory. Dates and hashes flag work, not factual truth."""
from datetime import date, timedelta
import hashlib
import json
from pathlib import Path
import re

from catalogue import LABS, LESSONS, WEB_CHATS, RESOURCES, OMARCHY_HELP, SESSION_GUIDES, SETUP_GUIDANCE
from documentation import DOCUMENTS

ROOT = Path(__file__).resolve().parent


def fingerprint(value):
    body = value if isinstance(value, bytes) else json.dumps(value, sort_keys=True, ensure_ascii=False, separators=(",", ":")).encode()
    return hashlib.sha256(body).hexdigest()


def learning_units():
    units = {"help:omarchy": fingerprint(OMARCHY_HELP), "guide:tool-access": fingerprint(SETUP_GUIDANCE)}
    for kind, items in (("guide", SESSION_GUIDES), ("lesson", LESSONS), ("chat", WEB_CHATS), ("resource", RESOURCES), ("lab", LABS)):
        for item in items:
            key = f"{kind}:{item['id']}"
            if key in units:
                raise ValueError("Duplicate content identifier: " + key)
            units[key] = fingerprint(item)
    for identifier, _, _, _, filename in DOCUMENTS:
        units["doc:" + identifier] = fingerprint((ROOT / "docs" / filename).read_bytes())
    units["starters"] = fingerprint((ROOT / "templates.py").read_bytes())
    return units


def review_report(records=None, today=None, units=None):
    today = today or date.today()
    units = learning_units() if units is None else units
    if records is None:
        records = json.loads((ROOT / "content" / "reviews.json").read_text())
    if not isinstance(records, dict) or set(records) != set(units):
        raise ValueError("Review records must exactly cover setup/session guides, desktop help, lessons, web/media profiles, resources, labs, documents and starters.")
    result = []
    for identifier, digest in units.items():
        entry = records[identifier]
        if not isinstance(entry, dict) or type(entry.get("revision")) is not int or entry["revision"] < 1:
            raise ValueError("Invalid revision for " + identifier)
        days = entry.get("review_after_days")
        if type(days) is not int or not 1 <= days <= 366:
            raise ValueError("Invalid review interval for " + identifier)
        if not isinstance(entry.get("sha256"), str) or not re.fullmatch(r"[a-f0-9]{64}", entry["sha256"]):
            raise ValueError("Invalid content fingerprint for " + identifier)
        if not isinstance(entry.get("notes"), str) or not entry["notes"].strip():
            raise ValueError("Record the review scope for " + identifier)
        reviewed = entry.get("reviewed_at")
        if reviewed is not None and (not isinstance(reviewed, str) or not re.fullmatch(r"\d{4}-\d{2}-\d{2}", reviewed)):
            raise ValueError("Invalid review date for " + identifier)
        reviewed = date.fromisoformat(reviewed) if reviewed else None
        if reviewed and reviewed > today:
            raise ValueError("Review date is in the future for " + identifier)
        due = reviewed + timedelta(days=days) if reviewed else None
        status = "changed" if digest != entry["sha256"] else "unreviewed" if not reviewed else "due" if today >= due else "in-date"
        result.append({"id": identifier, "revision": entry["revision"], "reviewed_at": reviewed.isoformat() if reviewed else None, "due_at": due.isoformat() if due else None, "status": status, "sha256": digest, "notes": entry["notes"]})
    return result
