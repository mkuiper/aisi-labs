"""Identify the checkout files loaded by a running hub, never learner state."""
import hashlib
from pathlib import Path


RUNTIME_FILES = (
    "launch.py", "server.py", "revision.py", "catalogue.py", "configuration.py",
    "content_review.py", "documentation.py", "feedback.py", "logos.py",
    "maintenance.py", "policy.py", "storage.py", "templates.py",
)


def runtime_revision(root):
    root = Path(root)
    paths = [root / name for name in RUNTIME_FILES]
    paths.extend(sorted((root / "content").glob("*.json")))
    digest = hashlib.sha256()
    for path in paths:
        name = path.relative_to(root).as_posix().encode()
        body = path.read_bytes()
        digest.update(len(name).to_bytes(8, "big") + name)
        digest.update(len(body).to_bytes(8, "big") + body)
    return digest.hexdigest()
