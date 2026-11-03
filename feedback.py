"""Explicit local feedback collection. No learner activity is attached."""
from datetime import datetime, timezone
import json
from pathlib import Path
import threading
import uuid

from storage import atomic_json

CATEGORIES = {"problem": "Something was confusing or did not work", "suggestion": "An improvement or idea", "worked-well": "Something that helped"}
MAX_MESSAGE = 2000
MAX_ENTRIES = 200


class FeedbackStore:
    _lock = threading.RLock()

    def __init__(self, root):
        self.path = Path(root) / "feedback"

    def directory(self):
        if self.path.is_symlink():
            raise ValueError("The feedback folder cannot be a link. Existing files were preserved.")
        self.path.mkdir(mode=0o700, exist_ok=True)
        return self.path

    @staticmethod
    def validate(payload):
        if not isinstance(payload, dict) or set(payload) != {"submission_id", "category", "message"}:
            raise ValueError("Feedback accepts only its receipt ID, type and comment.")
        identifier = payload["submission_id"]
        try:
            if str(uuid.UUID(identifier)) != identifier:
                raise ValueError()
        except (ValueError, TypeError, AttributeError):
            raise ValueError("Invalid feedback receipt. Start a new feedback form.")
        if not isinstance(payload["category"], str) or payload["category"] not in CATEGORIES:
            raise ValueError("Choose a feedback type.")
        message = payload["message"]
        if not isinstance(message, str) or not message.strip() or len(message) > MAX_MESSAGE:
            raise ValueError("Enter a comment of 1–2000 characters, at most 6000 bytes.")
        try:
            encoded = message.encode("utf-8")
        except UnicodeError:
            raise ValueError("The comment contains invalid text. Replace it with plain text and retry.")
        if len(encoded) > 6000:
            raise ValueError("Enter a comment of 1–2000 characters, at most 6000 bytes.")
        if any(ord(char) < 32 and char not in "\n\r\t" for char in message):
            raise ValueError("The comment contains unsupported control characters.")
        return {"submission_id": identifier, "category": payload["category"], "message": message.strip()}

    def read(self, path):
        if path.is_symlink() or not path.is_file() or path.stat().st_size > 20000:
            raise ValueError("Invalid feedback record.")
        value = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(value, dict) or set(value) != {"submission_id", "category", "message", "created"}:
            raise ValueError("Invalid feedback record.")
        record = self.validate({key: value[key] for key in ("submission_id", "category", "message")})
        created = datetime.fromisoformat(value["created"])
        if created.tzinfo is None or path.name != record["submission_id"] + ".json":
            raise ValueError("Invalid feedback record.")
        return {**record, "created": value["created"]}

    def submit(self, payload):
        record = self.validate(payload)
        with self._lock:
            directory = self.directory()
            path = directory / (record["submission_id"] + ".json")
            if path.exists() or path.is_symlink():
                try:
                    existing = self.read(path)
                except (ValueError, OSError, TypeError, KeyError, UnicodeError):
                    raise ValueError("This feedback receipt cannot be reused. The existing record was preserved.")
                if any(existing[key] != value for key, value in record.items()):
                    raise ValueError("This receipt was already used for different feedback. Start a new comment.")
            else:
                if sum(1 for _ in directory.glob("*.json")) >= MAX_ENTRIES:
                    raise ValueError("Local feedback collection is full. Ask the facilitator to review and archive it.")
                atomic_json(path, {**record, "created": datetime.now(timezone.utc).isoformat()})
        return {"receipt": record["submission_id"], "saved": True}

    def review(self):
        entries, warnings = [], []
        with self._lock:
            paths = sorted(self.directory().glob("*.json"))
            if len(paths) > MAX_ENTRIES:
                warnings.append("More than 200 records exist. This report includes only the first 200; all files were preserved.")
            for path in paths[:MAX_ENTRIES]:
                try:
                    entries.append(self.read(path))
                except (ValueError, OSError, TypeError, KeyError, UnicodeError):
                    warnings.append("A feedback record could not be read. Its file was preserved for facilitator inspection.")
        entries.sort(key=lambda entry: (entry["created"], entry["submission_id"]))
        lines = ["Subject: AISI AI Labs learner feedback", "", "Prepared locally. NOT SENT.", "Inspect comments for public-only content before emailing developers using the agreed address.", f"Included comments: {len(entries)}", ""]
        for index, entry in enumerate(entries, 1):
            lines.extend([f"Comment {index} — {CATEGORIES[entry['category']]}", f"Saved: {entry['created']}", f"Receipt: {entry['submission_id']}", entry["message"], ""])
        if warnings:
            lines.extend(["Collection warnings:", *warnings])
        return {"count": len(entries), "report": "\n".join(lines), "warnings": warnings}
