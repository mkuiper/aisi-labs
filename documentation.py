"""Curated local programme documents, also readable within the application."""
from pathlib import Path

DOCUMENTS = [
    ("programme", "Programme charter", "Programme owners", "Purpose, audience, non-negotiable boundaries and ownership.", "PROGRAMME.md"),
    ("learner", "Learner guide", "APS staff", "Before you start, learning pathways and responsible experimentation.", "LEARNER_GUIDE.md"),
    ("open-models", "Open-model field guide", "Learners and facilitators", "Read a model card, understand local runners and compare public practice results.", "OPEN_MODELS.md"),
    ("deployment", "Department deployment guide", "Deployment teams", "A proposed laptop-image architecture and release acceptance checklist.", "DEPLOYMENT.md"),
    ("credentials", "Credentials and configuration", "Learners and facilitators", "How session API keys work, their limits and how to remove them.", "CREDENTIALS.md"),
    ("curriculum", "Curriculum and maintenance", "Content maintainers", "What is covered, where to find it and how to keep it current.", "CURRICULUM.md"),
    ("maintenance", "Updates, models and releases", "Facilitators and maintainers", "Model choices, version checks, stable teaching images and rollback.", "MAINTENANCE.md"),
    ("content-maintenance", "Maintaining the learning material", "Content maintainers", "Version history, editorial records and the on-demand review skill.", "CONTENT_MAINTENANCE.md"),
]

def load_documents():
    root = Path(__file__).resolve().parent / "docs"
    return [{"id": key, "title": title, "audience": audience, "description": description, "body": (root / filename).read_text()} for key, title, audience, description, filename in DOCUMENTS]
