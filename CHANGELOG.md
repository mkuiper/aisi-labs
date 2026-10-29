# Changes

## 29 October 2026 — clearer learner journeys

- Getting started now shows the selected route while retaining easy switching,
  direct tool access and offline practice. Mobile navigation opens on request.
- Added manual practice-prompt copy and a return link, and put a clearly labelled
  recently created project near the top. Project steps now open the project files
  through the existing gated launcher.
- Changed evidence-checking prompts so learners can investigate before revealing
  answers. Increased the size and contrast of essential supporting text.
- Design choices and verification limits are recorded in docs/UX_JOURNEY.md.
- Verification: 64 unit/HTTP tests, JavaScript syntax and the isolated Chromium
  smoke suite passed. The browser checks cover route selection, copy failure,
  project launch gating, the worked-answer reveal and mobile keyboard focus.

## 29 October 2026 — review fixes

- Fixed the desktop launcher for checkout paths containing spaces and other
  characters that need escaping in desktop entries.
- Kept delayed project checklist saves tied to their originating view and
  displayed numbered guide instructions as ordered lists.
- Added regression checks for launcher paths, checklist navigation and guide
  list semantics. The deployment and real-tool acceptance gates remain open.
- Verification: 64 unit/HTTP tests, JavaScript syntax checks and the isolated
  Chromium smoke test passed. The launcher was also exercised through Gio with
  a temporary path containing spaces and desktop-entry special characters.

## 29 September 2026 — explain beginner terminal commands

- Added one canonical seven-step walkthrough shared by Getting started and the
  terminal lesson: exact command, meaning and expected result. Explained working
  directories, filenames, Markdown, spaces/case, the prompt and parent folders.
- Distinguished shell commands, AI requests and keyboard shortcuts. Added
  input-only practice buttons and explicitly labelled immediate simulation buttons.
- Kept silent successful directory changes separate from teaching feedback;
  clarified the simulation boundary, clear behaviour and common typing errors.
- Updated learner/architecture notes and scoped review records. No live commands,
  accounts or AI calls are introduced by the exercise.
- Verification: 63 unit/HTTP tests, JavaScript syntax and isolated Chromium smoke
  passed, including the full typed sequence, input-only buttons, Enter submission,
  silent cd, wrong-folder/case/prompt errors, HTML escaping, no network activity,
  keyboard disclosures and expanded 320-pixel layouts. Screenshots inspected.

## 29 September 2026 — guided tool access in Configuration

- Added sign-in versus API-key choices, dedicated learning account/payer checks,
  offline alternatives and facilitator preparation before the key fields.
- Added expandable OpenAI, Anthropic and Google key-creation instructions with
  official console links and external-site confirmation. Grok and other tools
  retain native setup; no new key adapter or automatic provider test was added.
- Added manual access checks, common-error help, cost/permission cautions and
  clear distinctions between forgetting a key, revoking it and signing out.
- Version-controlled the guide with source links, a dated review, a 30-day
  review interval and documented console/live-account verification limits.
  Updated credential, architecture and maintenance notes.
- Verification: 62 unit/HTTP tests and JavaScript syntax checks passed. Isolated
  Chromium checks cover setup before acknowledgement, fixed console destinations,
  cancellation without network requests, keyboard disclosures, fake-key handling
  and narrow expanded layouts. No live accounts, model calls or purchases tested.

## 28 September 2026 — beginner-focused learning restructure

- Renamed First 20 minutes to Getting started; kept its route/bookmarks stable.
  Added separate chatbot, desktop and first-project paths with offline options.
- Added AI basics, a searchable twelve-term glossary and three suggested Learn
  groups. Preserved all original lesson IDs and progress semantics.
- Put a complete no-code chatbot activity before its background explanation.
  Added worked examples for prompting, source instructions and checking claims,
  with optional explanations and no saved answers or model requests.
- Clarified technical terms, reading-time estimates and manual handover copy.
  Updated architecture, learner/maintenance documentation and pilot schedule.
  Source-review scope and remaining debt are recorded in content/CHANGELOG.md.
- Verification: 60 unit/HTTP tests, JS syntax and isolated Chromium suite passed;
  desktop/tablet/mobile screenshots inspected. Includes route/term focus, native
  keyboard disclosures, all fifteen quizzes, public-navigation gates, HTML
  escaping and 320-pixel layout regression coverage. Not learner, screen-reader,
  provider-account, network or image acceptance. No tools installed or upgraded.

## 28 September 2026 — first-session route and finish checklist

- Added optional First 20 minutes guidance, offline preparation, launchpad/Learn
  entry points and persistent first/finish-session header links with search.
- Added a manual finish checklist with tab-memory-only ticks and an explicit
  Labs-key-forgetting action. Failure is visible; successful removal does not
  claim external logout, revoke keys, stop tools or erase learner work.
- Added a proposed improvement schedule, editorial records, learner guidance,
  architecture notes and syntax-check coverage for the new session UI module.
- Verification: 59 unit/HTTP tests and isolated Chromium checks passed.
  Browser coverage includes pre-acknowledgement access and project gating,
  keyboard checkbox use, read-only navigation/ticks, reload reset, failure/retry,
  all-provider fake-key forgetting and unchanged projects/bookmarks/models.
  Desktop, tablet and 320/390-pixel layouts checked; screenshots inspected.
  No provider accounts, paid tasks, real tool closure or device reset tested.

## 28 September 2026 — Learn editorial review and window controls

- Reworked all fourteen lesson questions into practical scenarios with plausible
  alternatives and individual explanations. Removed patronising and promotional
  copy from lesson headings, feedback and related app screens.
- Answers remain unscored and unsaved, with accessible selection state and
  retries. Existing lesson identifiers and progress bookmarks are unchanged.
- Put fullscreen and close-window shortcuts first in Omarchy help, with
  focus/save-work cautions and matching terminal-lesson guidance.
- Documented question-writing standards and the data/UI contract. Advanced
  editorial revisions without clearing incomplete full-source review records.
- Verification: 57 unit/HTTP tests, JavaScript syntax and isolated Chromium
  checks passed, including all 42 choices, retries, unchanged bookmarks,
  terminal navigation and desktop/tablet/mobile layouts. Screenshots inspected.
  No live model calls, paid tasks or real desktop shortcut actions were tested.

## 28 September 2026 — beginner Omarchy help

- Added persistent Omarchy help in the header, a sidebar invitation and search discovery. The offline guide explains essential keys, tiled windows/workspaces, safe copying/pasting and getting unstuck, with a route into terminal practice.
- Bundled an explicitly dated Omarchy 4 baseline rather than claiming runtime shortcut detection. No new desktop commands, installations, settings changes or launch permissions.
- Extended the editorial inventory and image-review guidance to the desktop cheat sheet.
- Verification: 55 unit/HTTP tests, JavaScript syntax, offline review coverage and isolated Chromium checks passed. Covered pre-acknowledgement access, search, recovery disclosure, terminal-practice navigation, local read-only requests and 320/390/820-pixel layouts. Desktop/mobile screenshots inspected; no actual desktop shortcut actions performed.

## 28 September 2026 — creative media and Keep current

- Expanded Web chat to Web & media without breaking its route. Added four sourced creative profiles with bundled logos and two illustrated lessons on media generation and benchmark literacy.
- Added a searchable Keep current directory of five benchmark/research resources, with method links, caveats, source-review dates and guarded destination confirmation. No live rankings or automatic feeds.
- Extended editorial inventory to resource records and documented the data/UI boundary. No new provider adapters, local installations or changes to learner state.
- Verification: 54 unit/HTTP tests, JavaScript syntax checks, offline editorial audit and isolated Chromium checks passed. New profiles, resource confirmations/search, both lesson quizzes, logos and tablet/mobile layouts are covered. Screenshots were inspected. HELM's full resource review remains pending after a rendering limitation; pre-existing curriculum review debt is retained.

## 28 September 2026 — desktop icons and Hugging Face safeguards

- Added local icons for all eight desktop tools; Terminal matches Ghostty, while Files uses a generic folder for the system-selected file manager.
- Preserved pinned collection licences, native artwork attribution and text fallbacks. No remote icon requests or new tool integrations.
- Expanded the Hugging Face learning profile with a source-backed checklist covering executable model files/custom code, scan limitations, hosted demo data flows, provenance, licences and restricted products. The exercise remains read-only, with no downloads or execution.
- Verification: 52 unit/HTTP tests, JavaScript syntax checks, offline review metadata audit and isolated Chromium workflows passed. Desktop icons and the mobile Hugging Face checklist were visually inspected; no real desktop tools or provider services were launched.

## 28 September 2026 — sourced web-tool profiles and open-model directory

- Added ten local learning profiles with suggested uses, public exercises, limitations, hosting/openness distinctions, attributed concerns and review dates.
- Added Qwen Chat and Hugging Face Models; DeepSeek is reference-only without a launch destination because device restrictions are not removed by network separation.
- Completed all ten directory logos using seven additional pinned Lobe Icons SVGs, with preserved MIT licence and provenance. No remote images at runtime.
- Added coverage for profile completeness, all logo mappings, navigation, source links, restricted-entry guards and responsive profile layouts. No live account access, paid calls or model downloads.
- Verification: 50 unit/HTTP tests, JavaScript syntax checks, offline metadata audit and isolated Chromium smoke checks passed. Desktop directory/profile screenshots were inspected. Legacy content review debt remains visible.

## 28 September 2026 — reused product logos

- Bundled eleven SVG assets from the earlier app's supplied coloured logos, covering nine AI tools and three web-chat entries. The original app is unchanged and not a runtime dependency.
- Shared marks render logos on tool cards, quick-launch buttons and search results, with separate CLI/chat mappings and accessible text fallbacks for missing or failed assets.
- Kept logo requests local and explicitly allowlisted; preserved source notes and attribution. No downloads or new model/provider integrations.
- Added passive-SVG, asset routing, product mapping and browser load/fallback checks.

## 28 September 2026 — web chat, open models and editorial maintenance

- Added a Web chat section for seven official public chatbot destinations, also discoverable from the landing page and search. Programme acknowledgement and destination confirmation precede navigation; no hub secrets or projects are sent.
- Added web-chat and open-model illustrated lessons plus an open-model field guide/worksheet. Local models do not relax the public-only/no-government-network rule. No downloads, installations or live inference.
- Added content review records, visible lesson revisions, an offline changed/due/unreviewed audit and a version-controlled editorial changelog. Older units are explicitly queued for detailed review, not falsely re-dated.
- Added a portable aisi-learning-review skill and content-maintenance instructions. Content remains in the local Git repository; no remote publication or scheduled job.
- Validation: 45 unit/HTTP tests, skill validation and isolated browser workflows passed. New web-chat and open-model screenshots were inspected. No live sign-in, model calls or hardware claims were tested.

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
