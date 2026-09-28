"""Explicit local asset mapping, separate from editorial learning content."""

TOOL_LOGOS = {
    "claude": "claudecode.svg",
    "codex": "codex.svg",
    "gemini": "geminicli.svg",
    "opencode": "opencode.svg",
    "copilot": "githubcopilot.svg",
    "pi": "pi.svg",
    "cursor": "cursor.svg",
    "grok": "grok.svg",
    "hermes": "hermesagent.svg",
    "terminal": "ghostty.svg",
    "editor": "vscode.svg",
    "files": "folder.svg",
    "blender": "blender.svg",
    "libreoffice": "libreoffice.svg",
    "pinta": "pinta.svg",
    "obsidian": "obsidian.svg",
    "obs": "obsstudio.svg",
}
CHAT_LOGOS = {
    "firefly": "firefly.svg",
    "midjourney": "midjourney.svg",
    "runway": "runway.svg",
    "comfyui": "comfyui.svg",
    "chatgpt": "openai.svg",
    "perplexity": "perplexity.svg",
    "copilot-chat": "microsoftcopilot.svg",
    "mistral-chat": "mistral.svg",
    "qwen-chat": "qwen.svg",
    "huggingface": "huggingface.svg",
    "deepseek": "deepseek.svg",
    "claude-chat": "claude.svg",
    "gemini-chat": "googlegemini.svg",
    "grok-chat": "grok.svg",
}
LOGO_FILES = frozenset(TOOL_LOGOS.values()) | frozenset(CHAT_LOGOS.values())


def logo_catalogue():
    return {kind: {key: "/logos/" + file for key, file in mapping.items()}
            for kind, mapping in (("tool", TOOL_LOGOS), ("chat", CHAT_LOGOS))}
