"""Explicit, in-memory API credentials for a small verified set of launch adapters.

No credentials are persisted, returned to the browser, or supplied as arguments.
Other tools continue to use their own login. A server restart forgets these keys.
"""
import os
import threading

PROVIDERS = [
    {"id": "openai", "name": "OpenAI", "tool": "codex", "tool_name": "Codex", "env": "OPENAI_API_KEY", "docs": "https://developers.openai.com/codex/auth/", "billing": "https://platform.openai.com/usage", "help": "Uses a separate API provider configuration for this launch. Existing ChatGPT sign-in is not replaced. The model configured in Codex must be available to your API project."},
    {"id": "anthropic", "name": "Anthropic", "tool": "claude", "tool_name": "Claude Code", "env": "ANTHROPIC_API_KEY", "docs": "https://code.claude.com/docs/en/authentication", "billing": "https://console.anthropic.com/", "help": "An API key can switch usage from a Claude subscription to API billing. Claude Code may ask you to confirm the key when it opens."},
    {"id": "google", "name": "Google AI Studio", "tool": "gemini", "tool_name": "Gemini CLI", "env": "GEMINI_API_KEY", "docs": "https://geminicli.com/docs/get-started/authentication/", "billing": "https://aistudio.google.com/", "help": "Choose Use Gemini API key in Gemini CLI if prompted. Existing Google sign-in and Vertex AI are separate authentication methods."},
]


class Configuration:
    def __init__(self):
        self._keys = {}
        self._lock = threading.RLock()

    def status(self):
        with self._lock:
            return {"storage": "session", "providers": [{**p, "configured": p["id"] in self._keys} for p in PROVIDERS]}

    def set_key(self, provider, key):
        if provider not in {p["id"] for p in PROVIDERS}:
            raise ValueError("Choose a supported API provider.")
        if not isinstance(key, str) or not 8 <= len(key) <= 4096 or any(c.isspace() or ord(c) < 33 or ord(c) > 126 for c in key):
            raise ValueError("Enter a valid key without spaces or line breaks. The value has not been saved.")
        with self._lock:
            self._keys[provider] = key
        return self.status()

    def forget(self, provider):
        if provider not in {p["id"] for p in PROVIDERS} | {"all"}:
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
        if not key:
            return None, []
        env = os.environ.copy()
        for name in ("OPENAI_API_KEY", "CODEX_API_KEY", "ANTHROPIC_API_KEY", "ANTHROPIC_AUTH_TOKEN", "GEMINI_API_KEY", "GOOGLE_API_KEY", "OPENAI_BASE_URL", "ANTHROPIC_BASE_URL", "GOOGLE_GEMINI_BASE_URL", "GOOGLE_VERTEX_BASE_URL", "CLAUDE_CODE_USE_BEDROCK", "CLAUDE_CODE_USE_VERTEX", "CLAUDE_CODE_USE_FOUNDRY", "GOOGLE_GENAI_USE_VERTEXAI"):
            env.pop(name, None)
        env[provider["env"]] = key
        args = []
        if tool == "codex":
            settings = [
                'model_provider="aisi_openai"',
                'model_providers.aisi_openai.name="OpenAI (AISI Labs)"',
                'model_providers.aisi_openai.base_url="https://api.openai.com/v1"',
                'model_providers.aisi_openai.env_key="OPENAI_API_KEY"',
                'model_providers.aisi_openai.requires_openai_auth=false',
                'model_providers.aisi_openai.wire_api="responses"',
            ]
            args = ["--no-daemon", *[item for setting in settings for item in ("-c", setting)]]
        elif tool == "claude":
            env["ANTHROPIC_BASE_URL"] = "https://api.anthropic.com"
        return env, args
