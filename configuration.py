"""Explicit, in-memory API credentials for a small verified set of launch adapters.

No credentials are persisted, returned to the browser, or supplied as arguments.
Other tools continue to use their own login. A server restart forgets these keys.
"""
import os
import json
from pathlib import Path
import re
import threading

from storage import atomic_json

MODEL_TOOLS = [
    {"id": "codex", "name": "Codex", "docs": "https://learn.chatgpt.com/docs/models", "help": "Use /model in Codex to see choices available to your account."},
    {"id": "claude", "name": "Claude Code", "docs": "https://code.claude.com/docs/en/model-config", "help": "Use /model in Claude Code. Provider aliases can change the underlying model over time."},
    {"id": "gemini", "name": "Gemini CLI", "docs": "https://geminicli.com/docs/cli/model/", "help": "Use /model in Gemini CLI. Available models depend on your authentication and account."},
    {"id": "grok", "name": "Grok", "docs": "https://docs.x.ai/build/cli/reference", "help": "Use /model in Grok, or grok models in its terminal. Authenticate inside Grok; Labs does not inject an xAI key."},
]

PROVIDERS = [
    {"id": "openai", "name": "OpenAI", "tool": "codex", "tool_name": "Codex", "env": "OPENAI_API_KEY", "docs": "https://developers.openai.com/codex/auth/", "billing": "https://platform.openai.com/usage", "help": "Uses a separate API provider configuration for this launch. Existing ChatGPT sign-in is not replaced. The model configured in Codex must be available to your API project."},
    {"id": "anthropic", "name": "Anthropic", "tool": "claude", "tool_name": "Claude Code", "env": "ANTHROPIC_API_KEY", "docs": "https://code.claude.com/docs/en/authentication", "billing": "https://console.anthropic.com/", "help": "An API key can switch usage from a Claude subscription to API billing. Claude Code may ask you to confirm the key when it opens."},
    {"id": "google", "name": "Google AI Studio", "tool": "gemini", "tool_name": "Gemini CLI", "env": "GEMINI_API_KEY", "docs": "https://geminicli.com/docs/get-started/authentication/", "billing": "https://aistudio.google.com/", "help": "Choose Use Gemini API key in Gemini CLI if prompted. Existing Google sign-in and Vertex AI are separate authentication methods."},
]


class Configuration:
    def __init__(self, model_path=None):
        self._keys = {}
        self._lock = threading.RLock()
        self._model_path = Path(model_path) if model_path else None
        self._models = {}
        self._warning = ""
        if self._model_path and self._model_path.exists():
            try:
                value = json.loads(self._model_path.read_text())
                if not isinstance(value, dict):
                    raise ValueError()
                for tool, model in value.items():
                    self.validate_model(tool, model)
                self._models = value
            except (ValueError, OSError, TypeError):
                self._warning = "Model preferences could not be read. The file is preserved; repair it before saving changes. Tool defaults will be used."

    def status(self):
        with self._lock:
            return {"storage": "session", "providers": [{**p, "configured": p["id"] in self._keys} for p in PROVIDERS], "models": [{**tool, "model": self._models.get(tool["id"], "")} for tool in MODEL_TOOLS], "warning": self._warning}

    @staticmethod
    def validate_model(tool, model):
        if not isinstance(tool, str) or tool not in {t["id"] for t in MODEL_TOOLS}:
            raise ValueError("Choose a supported model control.")
        if not isinstance(model, str) or (model and not re.fullmatch(r"[A-Za-z0-9][A-Za-z0-9._:/@+-]{0,159}", model)):
            raise ValueError("Use a model ID or alias, not flags, spaces, credentials or a prompt.")

    def set_model(self, tool, model):
        self.validate_model(tool, model)
        with self._lock:
            if self._warning:
                raise ValueError(self._warning)
            updated = {**self._models, tool: model}
            if self._model_path:
                atomic_json(self._model_path, updated)
            self._models = updated
        return self.status()

    def set_key(self, provider, key):
        if not isinstance(provider, str) or provider not in {p["id"] for p in PROVIDERS}:
            raise ValueError("Choose a supported API provider.")
        if not isinstance(key, str) or not 8 <= len(key) <= 4096 or any(c.isspace() or ord(c) < 33 or ord(c) > 126 for c in key):
            raise ValueError("Enter a valid key without spaces or line breaks. The value has not been saved.")
        with self._lock:
            self._keys[provider] = key
        return self.status()

    def forget(self, provider):
        if not isinstance(provider, str) or provider not in {p["id"] for p in PROVIDERS} | {"all"}:
            raise ValueError("Choose a supported API provider.")
        with self._lock:
            if provider == "all":
                self._keys.clear()
            else:
                self._keys.pop(provider, None)
        return self.status()

    def launch_settings(self, tool):
        """Return an environment and non-secret arguments for just this tool."""
        provider = next((p for p in PROVIDERS if p["tool"] == tool), None)
        with self._lock:
            key = self._keys.get(provider["id"]) if provider else None
            model = self._models.get(tool, "")
        args = ["--model", model] if model else []
        if not key:
            return None, args
        env = os.environ.copy()
        for name in ("XAI_API_KEY", "OPENAI_API_KEY", "CODEX_API_KEY", "ANTHROPIC_API_KEY", "ANTHROPIC_AUTH_TOKEN", "GEMINI_API_KEY", "GOOGLE_API_KEY", "OPENAI_BASE_URL", "ANTHROPIC_BASE_URL", "GOOGLE_GEMINI_BASE_URL", "GOOGLE_VERTEX_BASE_URL", "CLAUDE_CODE_USE_BEDROCK", "CLAUDE_CODE_USE_VERTEX", "CLAUDE_CODE_USE_FOUNDRY", "GOOGLE_GENAI_USE_VERTEXAI"):
            env.pop(name, None)
        env[provider["env"]] = key
        if tool == "codex":
            settings = [
                'model_provider="aisi_openai"',
                'model_providers.aisi_openai.name="OpenAI (AISI Labs)"',
                'model_providers.aisi_openai.base_url="https://api.openai.com/v1"',
                'model_providers.aisi_openai.env_key="OPENAI_API_KEY"',
                'model_providers.aisi_openai.requires_openai_auth=false',
                'model_providers.aisi_openai.wire_api="responses"',
            ]
            args += ["--no-daemon", *[item for setting in settings for item in ("-c", setting)]]
        elif tool == "claude":
            env["ANTHROPIC_BASE_URL"] = "https://api.anthropic.com"
        return env, args
