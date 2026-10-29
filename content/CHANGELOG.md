# Learning material history

## 2026-10-29 — evidence exercise and learner journeys

- Reworded the three lab:evidence checks as questions for investigation. Their
  order and existing saved check indexes remain unchanged; the worked answer is
  still available by explicit reveal. Inspected the authored draft, evidence,
  starter and project views locally. This editorial change does not constitute a
  full source/exercise review; the original fingerprint and review date remain.
- Changed presentation of guide:first-session to focus the selected route while
  keeping all choice links and the offline option. Added a manual copy control to
  the existing lesson:web-chat practice prompt. The canonical lesson and guide
  content are unchanged; no provider page was visited or model response tested.
- Updated doc:programme to describe the route and manual copy. Its full review
  remains pending and its earlier fingerprint/date are retained. See
  docs/UX_JOURNEY.md for design choices and untested learner/accessibility work.
- Verification: 64 unit/HTTP tests, JavaScript syntax and isolated Chromium
  checks passed. The offline audit reports 9 in-date, 19 due, 17 changed and
  8 unreviewed units. A changed fingerprint is not a completed review.

## 2026-09-29 — beginner command walkthrough

- Updated lesson:terminal, guide:first-session and doc:learner. One canonical
  command_practice field in the terminal lesson supplies both teaching views.
  Seven steps distinguish command input, meaning and expected output, including
  pwd (print working directory), cd (change directory), ls and cat BRIEF.md.
  Explained filename arguments, Markdown, spaces/case, parent directories and
  the difference between shell input, AI requests and keyboard shortcuts.
- Read installed Bash help for pwd/cd and GNU Coreutils help for cat/ls. Confirmed
  the fixture outputs against the local simulator. GNU web manual retrieval
  timed out at https://www.gnu.org/software/coreutils/cat,
  https://www.gnu.org/software/coreutils/pwd and
  https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html.
  No fresh full web-source or Omarchy shortcut review is claimed. Previous
  full-review dates/hashes remain intact; changed units have higher revisions.
- Made cd success silent in the output, with separate labelled teaching notes.
  Root-folder limits are explicitly simulation-only. Filling a command does not
  run it; Run remains an explicit local simulation action. No real files, shell,
  tools, accounts or model calls are accessed. Public-only boundaries unchanged.
- Verification: 63 unit/HTTP tests, JS syntax and isolated Chromium smoke passed.
  Ran the seven-step sequence against expected output; checked input-only fill,
  Enter submission, silent cd, clear preserving location, wrong folder/case/$,
  safe text rendering and no network requests. Inspected desktop/320-pixel
  screenshots and tested keyboard disclosures. Not a novice usability study.
  Audit: 53 units, 28 in-date, 16 changed and nine unreviewed; no debt cleared.

## 2026-09-29 — Configuration as a setup guide

- Added canonical content/setup_guidance.json (guide:tool-access): website versus
  native sign-in versus API-key choices, three provider walkthroughs, offline
  activities, account/payer preparation, manual access checks, troubleshooting
  and facilitator/shared-laptop guidance. Keys remain optional and scoped to the
  existing three adapters; no new authentication or spending capability.
- Inspected current primary Codex authentication and OpenAI API quickstart,
  Claude Code authentication and Claude API overview, Gemini CLI authentication
  and Gemini API key documentation. Exact URLs are attached to the provider
  instructions. Console links were traced from those documents. OpenAI's
  console returned no readable content and AI Studio's console was inaccessible
  to the review tool; no signed-in console walkthrough is claimed.
- Provider disclosures use the existing external-destination confirmation for
  key consoles. Reading the guide and saving a key make no provider request.
  No account creation, purchase, real key handling or live model test occurred.
  Current prices, eligibility, quota amounts and image acceptance remain untested.
- Reviewed the complete new guide and updated maintenance source map. The
  credential document's new onboarding section is a partial update, retaining
  its previous full-review date/hash and outstanding native-adapter review.
  Other units' dates and hashes are unchanged. Programme boundaries remain
  ONLY public information, nothing OFFICIAL, NEVER government networks/accounts.
- Verification: 62 unit/HTTP tests, JS syntax and isolated browser smoke passed.
  Inspected desktop/narrow layouts; tested keyboard disclosures, acknowledgement,
  destination confirmation/cancellation and no-network reading with fake keys.
  Audit: 53 units; 29 in-date, 15 changed, nine unreviewed. The credential document
  moved from unreviewed to changed; its full-review debt was not cleared.

## 2026-09-28 — beginner routes, foundations and worked examples

- Replaced the First 20 minutes label with Getting started while preserving
  #first-session. Three optional paths now serve chatbot beginners, desktop
  newcomers and learners ready for an agent project. No timed completion promise,
  compulsory prerequisites, account connection or installation was introduced.
- Added lesson:ai-basics, its simplified diagram and twelve glossary definitions.
  The glossary page and search use that same lesson source. Learn groups all
  fifteen stable lesson IDs exactly once; existing bookmarks are unchanged.
- Brought the canonical chatbot exercise to the start of lesson:web-chat with
  fictional source facts, a prompt, review checks and an intentionally flawed
  offline sample. Added authored worked comparisons to context, prompting and
  checking. Native disclosures reveal explanations; no answers are collected.
  Clarified API, endpoint, inference, dependencies and reading-time estimates.
- Inspected primary sources on 28 September 2026:
  - Google ML glossary, generation/training/inference/token entries:
    https://developers.google.com/machine-learning/glossary
  - MDN API definition: https://developer.mozilla.org/en-US/docs/Glossary/API
  - Google API-key distinctions:
    https://docs.cloud.google.com/docs/authentication/api-keys
  - Anthropic context engineering:
    https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
  - Anthropic clarity/constraints guidance (the older be-clear-and-direct URL
    redirects here; canonical URL used in the lesson):
    https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
  - Anthropic unsupported-claim guidance:
    https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
  - OWASP indirect injection and least-privilege/human-approval guidance:
    https://genai.owasp.org/llmrisk/llm01-prompt-injection/
  - Australian Government Style Manual, descriptive headings:
    https://www.stylemanual.gov.au/structuring-content/headings
- Source/diagram/scenario reviews completed for AI basics, context, prompting
  and checking. Local authored workflow reviews completed for both session
  guides, the maintenance guide and improvement schedule. Reviewed local
  programme/credential rules, starter briefs and rendering/interaction code.
  All required sources above were accessible; no live model/account tests or
  timing studies were performed. Provider recommendations are not universal
  reliability guarantees. Examples are original teaching material, not outputs
  observed from services.
- Web-chat, models-costs, programme, learner and curriculum revisions record
  partial editorial changes without resetting their earlier full-review dates
  or fingerprints. No unrelated review dates were refreshed. Audit: 52 units,
  28 in-date, 14 changed and 10 unreviewed; in-date is not certification.
- Verification: 60 unit/HTTP tests; JS syntax; isolated Chromium navigation,
  native disclosure keyboard use, all fifteen quiz feedback sets, canonical
  group coverage, glossary search/focus, escaped examples, unchanged external
  navigation gates and no provider requests from reading activities. Desktop,
  tablet and 320/390-pixel layouts tested, including expanded examples. Fixed
  glossary links wrapping on 320-pixel screens; screenshots inspected.
  Screen-reader acceptance, real learner trials and real-device/network checks
  remain outstanding. See docs/BEGINNER_REVIEW.md for the handover.

## 2026-09-28 — optional first session and manual handover

- Added guide:first-session and guide:finish-session from one versioned JSON
  source. The first route connects existing programme rules, desktop help,
  simulation, tool setup and the first-project exercise; its approximate timing
  excludes unpredictable setup and allows offline preparation without claiming
  AI generation. No existing lesson or lab IDs changed.
- The finish guide separates saving work, stopping tasks, Labs-held keys,
  external sign-out and facilitator handover. Its ticks are temporary
  self-reports, never evidence of device clearance. The only explicit operation
  reuses local key-forgetting, with no claim of revocation or external logout.
- Primary sources for this authored local workflow: server.py acknowledgement,
  project/bootstrap and forget routes; configuration.py status/forget semantics;
  catalogue.py first-steps activity; templates.py public starter brief; existing
  learner, credential, programme and deployment guides. Inspected these against
  rendered pages and isolated tests, without live accounts, provider calls,
  real desktop actions, network checks or timed learner trials.
- Added a proposed improvement schedule in Programme & guides with stages,
  owner roles and acceptance gates. Weeks are relative to an agreed kickoff;
  later pilots, accounts, budgets, infrastructure and distribution still require
  separate decisions. No scheduler, remote publication or image build added.
- Advanced the learner/programme documentation revisions without clearing
  their prior full-review debt. Reviewed maintenance inventory changes and the
  new authored guides/schedule; unrelated content review dates are unchanged.

## 2026-09-28 — professional tone and scenario-based learning checks

- Read all fourteen Learn lessons and their associated diagrams/interactions.
  Replaced recall questions and implausible alternatives with public/fictional
  scenarios, plausible incomplete approaches and an explanation for every choice.
  Questions remain optional, unscored and unsaved; existing lesson IDs/bookmarks
  and all programme information/network boundaries are unchanged.
- Simplified lesson headings and promotional or patronising wording across
  learning, navigation, project and programme screens. Added an explicit editorial
  standard to the maintenance guide for subsequent human or agent reviews.
- Promoted fullscreen (Super+F) and close (Super+W) to the top of Omarchy help;
  included save-work/focused-window cautions, an optional fullscreen practice
  step and a terminal-lesson explanation that shortcuts are not shell commands.
  Checked the official hotkeys page, installed 4.0.4-1 defaults and active bindings
  read-only. No real window actions or desktop settings changes were performed.
- Targeted primary-source checks: Anthropic's building-effective-agents and
  effective-context-engineering-for-ai-agents articles; MCP introduction; Agent
  Skills overview; OpenClaw memory and agent-workspace documentation; OSI AI
  definition; Ollama cloud documentation; Arena ranking-method explanation.
  These support concept checks, not a new survey of current provider products.
  Canonical links remain with lessons; additional inspection links are below.
  GNU's Bourne-shell web page was inaccessible; installed Bash help for pwd, cd
  and exit was used instead. No provider login, model call, download or paid
  exercise was tested.
- This is a scoped editorial refresh, not full factual revalidation of every
  lesson. Lesson revisions advance but earlier full-review dates/fingerprints
  remain, leaving changed/pending work visible. Unrelated review debt is retained.

Additional inspection sources:

- https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- https://docs.openclaw.ai/concepts/memory
- https://docs.openclaw.ai/concepts/agent-workspace
- https://opensource.org/ai/open-source-ai-definition
- https://docs.ollama.com/cloud
- https://arena.ai/blog/ranking-method
- https://omarchy.org/manual/hotkeys/

## 2026-09-28 — Omarchy first-day help

- Added a single versioned desktop-help source: Super/Enter key meanings, three essential shortcuts, window/workspace and copy/paste guidance, a tiling illustration, recovery tips and an optional no-command practice. No shortcuts are intercepted or executed by Labs.
- Read the official Omarchy hotkeys, navigation and Windows/Mac transition pages, installed default Lua bindings and user overrides. Read-only Omarchy version and active Hyprland bindings confirmed the 4.0.4-1 baseline; notably Super+Space is the Omarchy menu and Super+Alt+Space the apps-only menu. URLs remain in the guide. Do not generalise this to older or customised images.
- Source/config inspection only: no real keyboard actions, window closure, locking, OS configuration changes or learner credentials were exercised. The practice is authored, not evidence of old-laptop acceptance.
- Added help:omarchy review coverage with a 90-day interval plus image-release checks. Updated the maintenance guide and a small programme orientation note; no unrelated legacy reviews were cleared.

## 2026-09-28 — creative media and reading the evidence

- Added four Web & media profiles: Adobe Firefly, Midjourney, Runway and ComfyUI. ComfyUI links to documentation, not a claimed local installation. Existing profile IDs and DeepSeek's reference-only guard are preserved.
- Added image/video and leaderboard-reading lessons with diagrams, quizzes, no-generation exercises and optional explicitly budgeted hosted practice. Explained visibility, synthetic-media labelling, likeness/rights, output inspection and local-versus-cloud workflow risks. Exercises are authored suggestions, not live-tested provider results.
- Added five curated resources: Artificial Analysis, Arena, Stanford HELM, SWE-bench and Hugging Face Papers. Each explains what to inspect and limits of inference. No cached ranks, universal best-model claim, automatic feed or model/benchmark execution.
- Inspected linked primary product guides, Midjourney visibility documentation, Runway credit guidance, ComfyUI custom/partner-node documentation, Artificial Analysis methods, Arena rank uncertainty, SWE-bench suites, HELM's foundational explanation and the HF Papers feed. Canonical URLs remain attached to content. HELM's JavaScript results were not readable as a live ranking; its historical explanation is explicitly dated and used only for the evaluation approach.
- Added resource fingerprints and review coverage; new profiles/resources use 30-day intervals and lessons 90 days. HELM remains pending after partial inspection, without a completed-review date. Reviewed the maintenance guide's updated source map. The programme charter addition advances its revision but does not clear the pending full legacy review. No other legacy dates were refreshed.
- No accounts, API integrations, paid generation, model downloads or hardware acceptance tested. Public-only, nothing-OFFICIAL and never-government-network/account boundaries remain unchanged.

## 2026-09-28 — Hugging Face risk guidance

- Revised only chat:huggingface (revision 2), using current Hugging Face primary documentation: Model Hub, security, pickle scanning, Transformers model loading, safetensors, Spaces networking and model cards. URLs are attached to the profile/checklist.
- Explained that loading pickle/custom model code can execute code, scan results are not assurance, safetensors does not approve surrounding code, and Spaces can communicate with external services.
- Added practical stop/check guidance for publishers, exact revisions, file types, rights, credentials and applicable product restrictions. These are risk mechanisms and learning boundaries, not an allegation that every repository is malicious.
- Reworked the exercise to inspect documentation/file lists only, with no download, execution, demo use, live login or model call. Other profiles and legacy review debt remain unchanged.

## 2026-09-28 — useful, critical tool profiles

- Expanded all seven existing chat entries and added Qwen Chat, Hugging Face Models and a reference-only DeepSeek case study. Each has an authored public exercise, practical uses, limitations, openness/hosting distinctions and source links.
- Inspected primary product documentation from OpenAI, Anthropic, Google, Microsoft, xAI, Mistral, Perplexity and Hugging Face. Inspected the Qwen3 release and specific Qwen3-0.6B licence, DeepSeek-R1 licence notes, DeepSeek privacy policy and Australian PSPF Direction 001-2025. Exact URLs are retained in content/web_chats.json.
- DeepSeek has no launch destination. A government device remains potentially in scope off-network; neither open weights nor a different host is an assumed policy exception. This is not a deployment/legal approval or a technical block outside Labs.
- Attributed Ofcom's January 2026 investigation announcement without claiming a final finding/current outcome. Attributed Cloudflare's August 2025 crawling report without treating it as an adjudicated fact. Perplexity's linked response on X was inaccessible (403); this limitation is visible in its profile. Other profiles contain scoped risk questions, not claims of being controversy-free.
- Updated the ten inspected chat/profile review records. Added the device-restriction boundary to the programme charter; its revision advances but its full legacy review remains pending. Other legacy review debt is unchanged. Exercises were editorially inspected but not run on providers; no live authentication, model evaluation, download, pricing or account entitlement was tested.

## 2026-09-28 — web chat and open models

- Added seven official web-chat destinations with external-service confirmation and dedicated-learning-account guidance. No projects, prompts or hub keys are attached to links. Mistral's source currently describes Vibe, formerly Le Chat; the entry uses the inspected name rather than assuming the older brand is still current.
- Added Start with a conversation: a fictional public prompt, evidence checks, comparison limitations and the distinction between website, model and agent.
- Added Open models, without the confusion: open weights versus open-source definitions, licence review, local versus hosted inference, quantisation and older-hardware limits.
- Added an open-model field guide with a no-download model-card worksheet and an optional facilitator-led public arithmetic comparison. No runner/model is installed or certified by this material.
- Primary sources inspected: official chatbot destinations; ChatGPT web documentation; OSI Open Source AI Definition 1.0; Hugging Face model-card and quantisation documentation; Qwen/Qwen3-0.6B publisher card; Ollama FAQ and cloud documentation. Exact URLs are retained in the lessons, directory entries and field guide.
- Inspection establishes documented concepts and public destinations, not regional access, account entitlements, privacy guarantees, pricing, actual model performance or legal/deployment approval.
- Introduced per-item editorial records and an offline change/due-date audit. Existing material remains a baseline with detailed follow-up reviews pending; this update does not claim a complete re-review of the original catalogue.
- Added the aisi-learning-review skill. It requires primary-source checks, preserves public-only/no-government-network boundaries, distinguishes reports from edits and records review limitations. It is invoked on demand, not scheduled.

Earlier lesson content and public starters are preserved in the app's Git
baseline and CHANGELOG.md. No learner projects or credential state are versioned.
