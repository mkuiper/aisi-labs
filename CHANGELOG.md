# Changes

## 27 September 2026 — AISI AI Labs review and engineering baseline

- Rebranded the app and existing Omarchy launcher; clarified the landing page's purpose and boundaries. Folder and learner-data identifiers are unchanged.
- Created a local Git baseline. No remote repository or publication.
- Added persistent, validated model preferences for Codex, Claude Code, Gemini CLI and Grok. Empty means native default; model selection works with or without hub-managed keys.
- Added native setup guidance for the remaining tools. Grok key injection is explicitly deferred pending background-process/authentication acceptance; no unsupported credential-routing claim.
- Added local version inventory and opt-in public npm release checks for four core tools, including dynamic-wrapper warnings. Checks do not install software, call models or transmit credentials.
- Replaced predictable temporary JSON filenames with unique mode-0600 atomic writes; added an HTTP connection timeout.
- Added ARCHITECTURE.md, AGENTS.md, CONTRIBUTING.md, critical review, maintenance guide and optional backend/syntax CI workflow.
- Expanded verification to 38 unit/HTTP tests and browser coverage of models, persistence, inventory, six documents and responsive layouts. Live model authentication and deployment acceptance remain separate.

Read-only release verification found newer Claude Code and Codex npm versions
on 27 September; no tool/OS upgrades were performed. See the dated review.

## 27 September 2026 — APS professional-development programme

- Identified the Australian AI Safety Institute and the professional-development purpose throughout the app.
- Made the programme boundary explicit: ONLY public information; never OFFICIAL or other non-public material; NEVER connect to government networks or systems.
- Added a first-use acknowledgement and enforcement for the hub's project, launch and key-setting actions. This is not network enforcement or input classification.
- Added memory/retrieval, soul/identity, responsible use/permissions and models/tokens/local-versus-cloud guides, bringing the introductory catalogue to ten.
- Added a Configuration tab for session-only OpenAI, Anthropic and Google API keys, scoped to Codex, Claude Code and Gemini CLI respectively. No provider calls occur when setting keys.
- Added five programme documents covering charter, learners, deployment/image design, credentials and curriculum maintenance; all are readable inside the app.
- Added a targeted service-restart option that preserves files and clears in-memory session state.

Validation uses fake keys and mocked launches, never real provider credentials.
The departmental laptop image and technical network controls remain deployment
work; they are not supplied by these app changes.
