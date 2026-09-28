# Reused product logos

## Desktop icons — 28 September 2026

All eight desktop entries now have locally bundled artwork. Product names remain
visible and fallback text remains available. Neither inclusion nor an icon means
endorsement, licensing approval or a verified installation.

- ghostty.svg, blender.svg, libreoffice.svg, obsstudio.svg: Simple Icons 16.33.0,
  https://unpkg.com/simple-icons@16.33.0/icons/<filename>.
  Repository https://github.com/simple-icons/simple-icons, package commit
  5828a6df55f0afded88fce0b94ce801903ddefe8. Shapes unchanged; explicit display
  fills added (#3551F3, #E87D0D, #18A303, #302E31 respectively).
  Collection licence preserved in SIMPLE-ICONS-LICENSE.txt (CC0-1.0);
  trademarks remain with their owners.
- obsidian.svg: unchanged Lobe Icons 1.95.1 obsidian-color.svg,
  https://unpkg.com/@lobehub/icons-static-svg@1.95.1/icons/obsidian-color.svg.
  MIT notice in LOBE-LICENSE.txt; same pinned repository commit as below.
- vscode.svg: unchanged installed Visual Studio Code artwork from
  /usr/share/code/resources/app/out/media/vscode-icon.svg,
  visual-studio-code-bin 1.138.0-1. Microsoft product identity, not a new Labs
  mark. Brand reference: https://code.visualstudio.com/brand. Do not assume the
  application's source-code licence licenses Microsoft trademarks.
- pinta.svg: installed Pinta 3.1.2-2 icon from
  /usr/share/icons/hicolor/scalable/apps/com.github.PintaProject.Pinta.svg.
  Preserved artwork; removed editor/RDF metadata and added a 48x48 viewBox.
  Original SVG credits Jakub Steiner/Tango and CC BY-SA 2.0; attribution,
  licence link and extracted metadata are preserved in PINTA-ATTRIBUTION.txt.
- folder.svg: original simple folder drawing for this app, not a third-party
  product logo. Files invokes the system default through xdg-open, so identifying
  it as a specific file-manager brand would be misleading.

Terminal really launches through Ghostty. These asset additions do not change
launch commands, desktop settings or the installed applications. Verify
applicable brand/distribution requirements before publishing a laptop image.

## Additional directory logos — 28 September 2026

Seven further product marks were imported unchanged (apart from a final newline)
from Lobe Icons package @lobehub/icons-static-svg **1.95.1**. These are
collection-provided brand marks, not generated artwork or a claim of official
endorsement. ChatGPT uses the OpenAI knot, not the distinct Codex CLI asset.
The Microsoft Copilot mark is distinct from GitHub Copilot.

Upstream repository: https://github.com/lobehub/lobe-icons
Package gitHead: 49a2130df7bfa5eb1b088261bff20a37e2967789
MIT copyright/permission notice: LOBE-LICENSE.txt.

Exact source URLs and upstream SHA-256 integrity values:

- openai.svg: https://unpkg.com/@lobehub/icons-static-svg@1.95.1/icons/openai.svg — sha256-pZXfa0I5IMZ6f49zwGPkv7ctQVlICXtsrAY6I2a7UYY=
- perplexity.svg: https://unpkg.com/@lobehub/icons-static-svg@1.95.1/icons/perplexity-color.svg — sha256-g1PzqyCCLxqTMiSw6jLMOfDDLVdA9K+MJUsPQY4KOnA=
- microsoftcopilot.svg: https://unpkg.com/@lobehub/icons-static-svg@1.95.1/icons/copilot-color.svg — sha256-BPFdBVb7rBCk4PgtFWBhDbizPNBHgKTyStO5HEq9J40=
- mistral.svg: https://unpkg.com/@lobehub/icons-static-svg@1.95.1/icons/mistral-color.svg — sha256-ci90sonZVIa0NmL+JPqIOzM3ASlvYYQGzQ7VAimRcLY=
- qwen.svg: https://unpkg.com/@lobehub/icons-static-svg@1.95.1/icons/qwen-color.svg — sha256-d/V2jGbQjOHT0U5zNzl1wbwEVL6IyBUj3dD/1+KXQCk=
- deepseek.svg: https://unpkg.com/@lobehub/icons-static-svg@1.95.1/icons/deepseek-color.svg — sha256-3rpfmKXBeW4g/KwxSbzX64oy8L3QTQSIGUALHyi9FDk=
- huggingface.svg: https://unpkg.com/@lobehub/icons-static-svg@1.95.1/icons/huggingface-color.svg — sha256-XTnWa7bJsCbTy13nvZl42tOQZXDfKsqPAAeKb4o9D14=

These identify ChatGPT, Perplexity, Microsoft Copilot, Mistral, Qwen,
DeepSeek and Hugging Face respectively. Trademark/distribution review remains
the image owner's responsibility. No asset is fetched at app runtime.

## Assets reused from the earlier application

Copied on 28 September 2026 from the user-supplied directory
`AISI-AI-Learning-Labs/app/logos/coloured/`. SVG artwork is unchanged.
The original application has not been modified. These are bundled snapshots,
not a claim that every mark is the latest brand artwork.

Upstream source notes are preserved in UPSTREAM-SOURCES.md. They identify
Simple Icons and Lobe Icons as the original collections. The earlier app's
coloured variants include native colour versions and display colouring of
monochrome marks. No remote assets are fetched at runtime.

| Asset | Used for |
| --- | --- |
| claudecode.svg | Claude Code terminal tool |
| codex.svg | Codex terminal tool |
| geminicli.svg | Gemini CLI terminal tool |
| opencode.svg | OpenCode |
| githubcopilot.svg | GitHub Copilot CLI, not Microsoft Copilot web chat |
| pi.svg | Pi, not Oh My Pi |
| cursor.svg | Cursor Agent |
| grok.svg | Grok terminal tool and Grok web chat |
| hermesagent.svg | Hermes |
| claude.svg | Claude web chat |
| googlegemini.svg | Gemini web chat |

Unmatched tools keep labelled text badges rather than using another product's
logo. Text badges also appear if an image cannot load. Product names remain
visible beside decorative images for accessibility.

Marks belong to their respective owners and identify learning links/tools;
their display does not imply endorsement. Keep these provenance notes with the
assets. Confirm applicable collection licences and brand-use requirements as
part of the existing distribution review before publishing an image.
