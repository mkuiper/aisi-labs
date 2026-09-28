# AISI AI Labs architecture

Status: local learning preview, reviewed 27 September 2026. This is not a
multi-user service, government work platform or completed departmental image.

## Purpose and trust boundary

APS professional development with ONLY public information. Nothing OFFICIAL
or non-public. NEVER connect the device to government networks, accounts or
internal systems. The app explains this boundary; it cannot enforce it.

```text
Omarchy desktop entry → launch.py → loopback Python server (server.py)
                                     ↕ same-origin HTTP + mutation token
                                local browser interface (web/)
                                     ↓ explicit launch, argv allowlist
                            Ghostty / AI CLI / desktop application
                                     ↓ tool-owned permissions and network
                              public learning services
```

The browser interface is privileged: it can request approved local launches.
Generated project HTML is opened as a file, never served from the hub origin.
Project folders are working directories, NOT security sandboxes. Tools run as
the learner's Linux user and can have wider filesystem/network access.

## Component map

| Component | Responsibility |
| --- | --- |
| `launch.py` | Start/reuse this checkout's loopback service, safe targeted restart, open Omarchy webapp |
| `server.py` | HTTP boundary, acknowledgement, project validation, tool launches, progress |
| `catalogue.py` | Curated tool allowlist, activities, lessons, public references |
| `content/` | Supplemental lessons, web/media profiles, benchmark/research directory, per-item editorial records and learning changelog |
| `content_review.py` | Offline fingerprints, review dates and coverage checks; no claim of factual verification |
| `templates.py` | Authored public starter files and briefs |
| `policy.py` | Programme rules and acknowledgement version |
| `configuration.py` | Ephemeral keys, persistent non-secret model overrides, CLI adapters |
| `storage.py` | Unique private temporary file + atomic replacement for JSON state |
| `maintenance.py` | Read-only Mise inventory; opt-in allowlisted public release checks |
| `documentation.py` | Explicit allowlist of documents presented in the app |
| `web/app.js` | Hash routing, labs, tools, learning diagrams, authored simulations |
| `web/programme.js` | Rules, settings, model preferences, inventory, document renderer |
| `web/style.css`, `web/icon.svg` | Local visual assets; no CDN or frontend build |
| `logos.py`, `web/logos/` | Explicit product-to-SVG mappings and bundled assets/provenance; text fallback for unmatched tools |
| `tests/`, `scripts/smoke.mjs` | Unit/HTTP tests and isolated Chromium integration checks |

`programme.js` loads before `app.js`; its functions use shared app globals only
after bootstrap. Preserve that ordering. Templates escape untrusted text with
`esc`; do not insert project names, provider responses or model IDs as raw HTML.
Keep dependencies minimal; the backend uses Python's standard library only.

The `web-chats` route retains its stable identifier but is labelled Web & media.
Creative profiles reuse its guarded external navigation; ComfyUI points to docs,
not a local installation. `keep-current` renders `RESOURCES` from bootstrap and
participates in search. These are curated local records, never embedded external
pages, scraped rankings or automatic feeds. Resource buttons share the existing
acknowledgement/destination confirmation; source citations open labelled online
links. `resource:<id>` records join the exact editorial coverage check. No new
API-key adapters, model calls or installation commands are introduced.

`#omarchy-help` is an offline orientation page available from a persistent
header link and the sidebar invitation, including before acknowledgement.
Its single content source is `content/omarchy_help.json` (`OMARCHY_HELP` in
bootstrap), tracked as `help:omarchy`. Search includes the guide. Keyboard
labels are inert text: no simulated keypresses, desktop dispatchers, config
reads or shell commands run when viewing it. The version note is an editorial
baseline, not detection of the current image. Recheck installed defaults,
active bindings and the official manual when preparing a new laptop image.

## Data and lifecycle

Default data root: `~/.local/share/aisi-labs-2/`. Display branding is independent
of this stable identifier. `--data-dir` gives tests a temporary isolated root.

- `projects/<id>/`: user files and `.aisi-project.json`; never overwrite a previous attempt.
- `playground/`: working directory for tool launches outside a project.
- `progress.json`: Linux-account-wide learning bookmarks, not scored assessments.
- `models.json`: non-secret model overrides for four supported launch adapters.
- `server.log`, `launch.log`, `launch.lock`: diagnostics and launcher coordination.
- Memory only: API keys, acknowledgement and random mutation token.

Closing the window does not stop the hub. Restart forgets keys/acknowledgement
but preserves projects, progress and model preferences. Concurrent state writes
use locks; JSON replaces use unique mode-0600 temporary files. Preserve corrupt
state and report it instead of silently resetting a learner's work. This is not
a database transaction spanning an entire project creation.

## HTTP boundary

Bind `127.0.0.1` only. GET requests validate Host and reject cross-site fetches;
mutations require exact Origin and a per-process token. Static files and API
routes are allowlisted. POST bodies are capped at 8192 bytes; connections have
a 15-second timeout. CSP prohibits external scripts, frames and remote assets.
Do not expose this standard-library development server to a LAN or reverse proxy.

Logo requests are exact allowlisted `/logos/<name>.svg` routes, not general
directory access. Images are decorative beside visible product names, loaded
from the hub only, and checked for active/external SVG content in tests. A
capturing error listener restores a text badge if loading fails; no inline
event handlers or third-party asset requests are introduced. CLI and chatbot
logo mappings are distinct, so GitHub Copilot is not used for Microsoft Copilot.
All eight desktop entries have local icons. Terminal uses Ghostty (the actual
launcher); Files uses an authored generic folder because xdg-open selects the
system default. SVG tests allow the passive masks/filters in native VS Code
artwork, never scripts, external images or embedded HTML.

POST routes: `/api/acknowledge`, `/api/projects`, `/api/checks`, `/api/progress`,
`/api/launch`, `/api/configuration/key`, `/api/configuration/forget`,
`/api/configuration/model`, `/api/maintenance`. Bootstrap returns catalogue,
state and key-presence booleans, NEVER key values. The acknowledgement gate
covers creating projects, launching tools, setting keys/models and online checks.
Reading guides, forgetting keys and local version inspection do not need it.

These controls reduce browser-origin attacks. They do not isolate hostile
processes, extensions or people sharing the same Linux account. There is no
user authentication, per-learner authorisation, input classification or DLP.

## Tool configuration and credentials

Launches are argument arrays with a fixed command allowlist; never `shell=True`.
Model overrides use validated single arguments (`--model`, ID), independent of
whether a hub key is set. Empty means no override, not a claim of the newest
model. Native settings/account entitlements still matter. No model catalogues
are fetched using learner credentials.

For three key adapters, construct a child environment, scrub known conflicting
provider variables and insert only the matching key. The secret is not in argv,
browser storage, API responses or hub-written files. Direct independent Ghostty
launch bypasses `uwsm-app` for these launches because that daemon does not forward
per-launch environment. Key-enabled child output is not logged by the hub.
Codex has a separate official-API provider and no-daemon flag. See CREDENTIALS.

This is not a vault: a same-user process, swap or crash dump may expose secrets;
external tools may save their own credentials. Forgetting only affects future
launches. Native authentication/environment on launches without hub keys is not
sanitised. Never equate “no key in Labs” with “no credentials in the tool”.

Grok currently has a model adapter but native authentication only. Do not add
XAI_API_KEY injection without testing existing browser auth, endpoint overrides,
leader-process environment reuse and key rotation/forgetting on pinned versions.

## Maintenance and release strategy

Web-chat entries are fixed HTTPS links in content/web_chats.json, not subprocess
launchers. The UI first requires the programme acknowledgement, then displays
the destination and an explicit external-navigation link with noopener/noreferrer.
It carries no prompt, key or project; provider browser cookies may still apply.
There is no iframe, prefetch, provider login or model call in this integration.

The same directory holds hosted-chat, model-library and reference-only entries.
Each has an offline #web-tool/<id> profile with authored exercises, limitations,
openness/hosting distinctions, attributed concerns and primary-source links.
DeepSeek is reference-only with a null destination: both cards and the dialog
guard refuse a launch. This is an educational UI decision, not an OS/network
block. Device restrictions may apply even on the separate learning network.
Profiles are fingerprinted as chat:<id> units; keep source-review limits explicit.
Optional risk_checks contain plain-text titles/bodies and cited source pairs,
rendered as an escaped checklist. Hugging Face uses this for repository-code,
file-format, scanner, demo-hosting and licence boundaries; no model is executed.

Bootstrap also provides per-item content review metadata. Existing stable lesson
IDs are preserved. New JSON lessons are appended by catalogue.py, while original
lessons remain there as their canonical source. The offline editorial audit
covers lesson text, chats, labs, registered documents and starter templates;
diagrams/interactions also require manual review. See docs/CONTENT_MAINTENANCE.md
and skills/aisi-learning-review/SKILL.md. Review dates are never automatically
refreshed; original content starts as an explicitly unreviewed inventory baseline.

Local inventory executes only `mise ls --json`, never AI bootstrap wrappers.
Versions describe active Mise records, not a guaranteed next launched binary.
The online check is explicit and limited to four official npm package metadata
endpoints. It sends no keys, project contents or local version list; no redirects
or environment proxies are followed. Responses are size/time bounded. Offline
failures and unknown versions stay visible. No software is installed by the hub.

See `docs/MAINTENANCE.md` for owners, cadence, tested manifests and rollback.
Testing, content review and image/network acceptance are separate release gates.

## Verification

Run `python3 -m unittest discover -s tests -v`, JavaScript syntax checks, and
`node scripts/smoke.mjs`. Tests use fake credentials, temporary state, mocked
processes and mocked external release metadata. Browser checks do not launch
real AI tools or call models. Real authentication, tool permissions, accessibility,
old hardware and network separation require the acceptance tests in DEPLOYMENT.
