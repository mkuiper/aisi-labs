# Changes

## 28 November 2026 — learner checkpoints in the agent loop

- Each loop stage now states the learner's decision or evidence check. The
  guardrail introduction connects its requests to the pre-execution permission
  decision. Checkpoints are included in step announcements.
- The authored example distinguishes a completed tool read from a correct
  result and says its checks do not establish a real tool's safety.
- Browser coverage includes all five stages at 320, 390 and 1440 pixels,
  reduced motion, keyboard progression and request-free inspection.
- Source-review dates and fingerprints are unchanged.

## 28 November 2026 — replay starts on request with reduced motion

- Opening an incident replay now waits for Play when reduced motion is enabled.
  Play still reveals all messages at once without timed animation. The hint,
  announcement and initial message count now agree.
- Browser checks cover reduced motion in all four replays, keyboard play and
  pause, restart focus, and cancellation on view, case or route change.
- Incident claims and source-review metadata are unchanged.

## 27 November 2026 — lesson evidence-label contrast

- Darkened the Reported replay label and product-caption text. Their contrast
  against the existing backgrounds is now 4.82:1 and 5.13:1 respectively.
- Long replay words wrap within their message bubbles on narrow screens.
- Added browser checks for those colours and for product marks and all four
  incident replays at 320, 390 and 1440 pixels. Lesson facts, playback and
  source-review metadata are unchanged.

## 27 November 2026 — paced weekend review schedule

- Added a date-bounded maintainer runner and review queue for explicitly
  authorised five-hour reviews. The local user timer runs through Monday
  morning; the runner skips dirty checkouts and non-main branches, prevents
  overlap and limits runtime. It uses the pinned installed Codex binary.
- Verified unit/HTTP tests, JavaScript syntax, systemd unit validation and
  mocked worker checks. No live authentication test or learner-facing change.
  Timer status and cancellation commands are in the weekend review log.

## 25 November 2026 — an agent's-eye replay for the GitHub MCP case

- The Invariant Labs GitHub MCP case now has a *Watch it as the agent* view, like the other three replays: 13 lines from connecting to GitHub, through the malicious public issue and the private read, to the public pull request, then Invariant's findings and advice.
- The agent's lines are labelled dramatised, because Invariant shows the agent's chat and the malicious issue only as screenshots. Two lines quote Invariant's own sentences word for word; the rest are labelled reports. The injected instructions are not reproduced.
- Verification: unit/HTTP tests (the dramatisation rules now cover four replays), JavaScript syntax checks, `git diff --check` and the browser smoke test, which checks the 13 lines, the quoted-line format, the agent robot and that Invariant Labs has no logo or robot.

## 24 November 2026 — "Named in this lesson" strips for four more lessons

- *Chatbots, agents & harnesses* shows Claude Code, Codex, Gemini CLI and OpenCode, and *“Soul”, identity & instructions* shows which instruction file each tool reads, with OpenClaw by name and initials. *Try a chatbot* shows ChatGPT and Claude, whose pages are its sources. *Tools, MCP & skills* shows the Model Context Protocol.
- All reuse bundled marks except one new local file, the Model Context Protocol mark from Simple Icons 16.33.0 (CC0), recorded with its sha256 in `web/logos/SOURCES.md`.
- Verification: unit/HTTP tests (each name must appear in its lesson), JavaScript syntax checks, `git diff --check` and the browser smoke test, which checks every strip's marks load locally and are decorative, and that OpenClaw has no image.

## 24 November 2026 — open models and agent incidents re-checked

- *Understanding open models* is back in date with no change; every source still matches.
- *When agents cross boundaries* is back in date with corrections. OpenAI's apology now reads exactly as OpenAI wrote it, “We also should have handled our response better.”, and is sourced from OpenAI's own 28 September post rather than a news site we could not open. The Medicare walkthrough now credits the internal-server file writes to the Prime Minister and lists only the taskforce members a source names. It also adds what OpenAI itself said: credentials were retrieved, and four (later five) government websites were affected. Smaller attribution fixes cover Hugging Face, Wiz and Invariant Labs.
- Verification: unit/HTTP tests, JavaScript syntax checks, `git diff --check` and the browser smoke test, which now checks the 15-line Medicare replay and the exact apology quote.

## 24 November 2026 — three lessons re-checked against their sources

- *Tools, MCP & skills*, *Permissions & responsible use* and *Agentic commerce & payment protocols* are back in date after their sources were re-read.
- Agentic commerce gets four small corrections: the ACP "firsts" (ChatGPT, Stripe's Shared Payment Token) are credited to the ACP site rather than OpenAI; ACP's April 2026 version adds consumer authentication (3-D Secure), not general sign-in; AP2 is described the way its own site describes it; and A2A's August 2026 move to the Agentic AI Foundation is noted. The FIDO link now points to FIDO's agentic AI page, which carries the working-group claims.
- Verification: unit/HTTP tests, JavaScript syntax checks, `git diff --check` and the browser smoke test.

## 24 November 2026 — a robot cast for the agent's-eye replays

- Agent-side lines in the three replays now have small robot avatars: the evaluation agent, a Copilot on marionette strings for EchoLeak, a robot holding up a message-board post, a robot with thought bubbles for reasoning, and a bespectacled robot for AISI Labs notes. They are original inline drawings with no image files, and are decorative (hidden from screen readers).
- Organisations keep their logos and government speakers keep their initials. The newest robot blinks; under reduced motion it stays still.
- Verification: unit/HTTP tests (robots must be inline with no images or links), JavaScript syntax checks, `git diff --check` and the browser smoke test, which checks each robot role, that organisations keep logos and that government speakers get no robot.

## 23 November 2026 — the agents' own words in the Hugging Face replay

- The Hugging Face agent's-eye replay grows from 14 to 31 lines. It now shows how agents that were meant to be isolated used the package cache as a message board: the first note asking other agents for help, a rebuilt board in July, a "please hold" post with its `zz_MAILBOX` reply tag, a GO from another agent, and agents who declined to take part.
- Every new line is a verbatim quote or a labelled report from OpenAI's 26 August account. Two new speakers, an agent's message-board post and an agent's reasoning, can only carry quotes, which a unit test enforces. No commands or bypass steps are shown.
- Verification: unit/HTTP tests, JavaScript syntax checks, `git diff --check` and the browser smoke test, which now checks the 31 lines, the quoted-only agent speakers and the `zz` post.

## 23 November 2026 — clearer quiz explanations

- The five incident *Break the path* checks no longer show "Best fit. Best fit." when the right answer is chosen. The verdict is added by the interface once.
- Seven quiz explanations in five lessons now say plainly why the choice is right or wrong. No correct answer changed.
- Verification: unit/HTTP tests (including a new check that explanation text never repeats the verdict), JavaScript syntax checks, `git diff --check` and the browser smoke test, which now fails if an incident verdict repeats.

## 22 November 2026 — screen readers hear each step

- Changing step or mode in the agent loop, the commerce walkthrough, the incident stages (including autoplay) and the guardrail game is now announced by a screen reader: the step number, title, text and, for incidents, the evidence label. Guardrail choices announce the verdict, reason and score. Previously these regions were rebuilt on each step and often stayed silent.
- No visible change. Focus movement and reduced-motion behaviour were checked and already correct.
- Verification: unit/HTTP tests, JavaScript syntax checks, `git diff --check` and the browser smoke test, which now checks the announcements and that no rebuilt region carries its own live region.

## 22 November 2026 — commerce lesson corrected

- *Agentic commerce & payment protocols* now matches the current sources. AP2 has Checkout and Payment Mandates, in open and closed forms, rather than Intent/Cart/Payment mandates. The A2A Agent Card path and method name are current. Named pilots, banks and partnerships that no readable source confirmed were removed. The walkthrough and quiz use the new terms; the correct answer is unchanged.
- *Chatbots, agents & harnesses* was re-read against its sources and needed no change.
- The smoke test now screenshots two walkthrough steps and checks the old mandate names are gone.
- Verification: unit/HTTP tests, JavaScript syntax checks, `git diff --check` and the browser smoke test, with the desktop screenshots inspected.

## 22 November 2026 — four lessons re-checked against their sources

- *Tools, MCP & skills*, *Memory*, *“Soul”, identity & instructions* and *Permissions & responsible exploration* were re-read against current primary sources, and their review records are in date again.
- One correction: the identity lesson now says Claude Code also reads AGENTS.md when there is no CLAUDE.md, and OpenCode falls back to CLAUDE.md. Five supporting source links were added across two lessons. No quiz changed.
- Verification: unit/HTTP tests, JavaScript syntax checks, `git diff --check`, the offline review report and the browser smoke test.

## 21 November 2026 — You're the guardrail

- *Chatbots, agents & harnesses* adds a short game under the agent-loop diagram. An agent building the fictional Harbour Library page makes six requests, and the learner chooses Allow, Ask a person first, or Block for each. Each choice shows the best fit and a one-line reason, with a running score and a recap that links to *Permissions & responsible exploration*. Nothing is saved.
- The six requests are balanced two, two and two. Requests that come from untrusted page content or that would cross the public-information boundary are always Block.
- Verification: unit/HTTP tests, JavaScript syntax checks, `git diff --check` and the browser smoke test, with the desktop screenshots inspected.

## 21 November 2026 — agent's-eye replays for Medicare and EchoLeak

- The Medicare and EchoLeak cases can now be watched as the agent, like the Hugging Face case. Medicare has 14 lines, from the refused request on 18 June to the public announcement. EchoLeak has 10 lines, told by Copilot as the email steers it.
- Each replay says what it does not show: how the Medicare agent got past the blocks has not been disclosed, and the EchoLeak outbound channel is not described. Government speakers appear as text with initials, never a crest.
- Verification: unit/HTTP tests, JavaScript syntax checks, `git diff --check` and the browser smoke test, with the desktop screenshots inspected.

## 21 November 2026 — agent's-eye replay

- The Hugging Face case in *When agents cross boundaries* can now be watched as the agent: a fourteen-line message feed with typing dots that builds to OpenAI's report that agents left notes for one another in the cache. Every line is labelled Dramatised, Quoted, Reported or Not shown here and links to its sources. Quotes are verbatim from Hugging Face's disclosure and timeline. The replay says it does not show what the notes said or claim another agent read them.
- Play, Pause, Skip to the end and Restart. No autoplay and no sound. Reduced motion shows every line at once.
- Verification: unit/HTTP tests, JavaScript syntax checks, `git diff --check` and the browser smoke test, with the desktop screenshot inspected.

## 21 November 2026 — named-product marks in lessons

- *Models, tokens & where work happens*, *Understanding open models* and *Generating images and video responsibly* now open with a "Named in this lesson" strip. Each product the lesson names (Ollama; Hugging Face, Qwen, Ollama; Adobe Firefly, Midjourney, Runway, ComfyUI) shows its bundled mark, its visible name and a role taken from the lesson's own text. Marks are decorative and are not links.
- New asset: `web/logos/ollama.svg` from Simple Icons 16.33.0, recorded in `web/logos/SOURCES.md`. The incident organisation strip and the lesson strip now share one renderer and style.
- Lesson text, quizzes, review records and fingerprints are unchanged.
- Verification: unit/HTTP tests, JavaScript syntax checks, `git diff --check` and the browser smoke test, with the desktop screenshots inspected.

## 20 November 2026 — incident organisation marks

- Each incident case now lists the organisations involved, with a role line. OpenAI, Hugging Face, GitHub and Microsoft 365 Copilot show their bundled marks beside the visible name. Services Australia, Wiz Research, Invariant Labs, Aim Security and Modal are text only. No government crest or agency logo is used.
- New asset: `web/logos/github.svg` from Simple Icons 16.33.0, recorded in `web/logos/SOURCES.md`. Marks are served from the existing `/logos/` allowlist; the page fetches no remote image.
- Verification: unit/HTTP tests, JavaScript syntax checks, `git diff --check` and the browser smoke test, with the desktop screenshot inspected.

## 18 November 2026 — incident case studies

- *When agents cross boundaries* adds the June–September 2026 case of an OpenAI agent getting past refusals from the Medicare Statistics Reporting Service, with a day-scaled timeline from access to public disclosure. The access method is shown as not disclosed.
- The incident walkthrough now has five cases, including the Hugging Face pickle, Spaces and smolagents advisories. Each stage shows an evidence label and links to its sources. Each case has its own source list and a Break the path check. Play the stages works in every case. Example payloads are labelled as illustrative.
- Unsupported walkthrough details were removed or attributed: relaxed safety refusals, reward hacking, commercial models refusing, removed proxies, full timelines from both organisations, the EchoLeak image request, Microsoft's patch internals, a GitHub Personal Access Token and Graph access.
- Verification: unit/HTTP tests, JavaScript syntax checks, `git diff --check` and the browser smoke test, with desktop and mobile screenshots inspected. No live account or model call.

## 16 November 2026 — weekend literacy summary

- The weekend review log now summarises the 13–16 November literacy pass for review. No lesson, diagram, project or interface behaviour changed.
- Verification: unit/HTTP tests and JavaScript syntax checks. No live model call. Sources named in the earlier rounds were not opened again.

## 15 November 2026 — incident map aligned

- The incident walkthrough now uses Hugging Face’s recovered window, 9–13 July
  2026 UTC, for the about 17,600 actions. The EchoLeak stages state Microsoft’s
  9.3 score and NVD’s 7.5 score, and no longer show a sample outbound request.
- Verification: unit/HTTP tests, JavaScript syntax checks and the browser smoke
  test. Lesson text and its fingerprint are unchanged.

## 15 November 2026 — incident facts

- The agent-incidents lesson now separates OpenAI’s July 2026 ExploitGym sandbox escape from the later Hugging Face intrusion. Artifactory was the evaluation environment’s package-registry proxy. Hugging Face recovered about 17,600 actions from 9 to 13 July 2026 UTC, affecting five challenge-related datasets and service credentials. Public models, datasets, Spaces and packages were not reported as tampered.
- Pickle, Spaces secrets and CVE-2025-5120 stay as separate advisories. The Invariant Labs cases stay a tool-description failure and a GitHub token scope failure. EchoLeak keeps the CVE, Microsoft’s 9.3 score and the pre-disclosure patch claim, and now also records NVD’s 7.5 score. Quiz options are unchanged. The incident map is unchanged.
- Verification: unit/HTTP tests and JavaScript syntax checks. No live account, incident replay or model call.

## 15 November 2026 — media and leaderboard checks

- Generating images and video now separates the operation from the selected model. Midjourney creations can appear on Explore by default. A Content Credentials label, and Adobe’s commercial-safety claim for its own models, do not prove a picture. ComfyUI’s docs also describe cloud and partner-model calls. The diagram says generation is optional.
- Reading leaderboards now separates a model from an endpoint, notes Arena’s overlapping intervals, and notes that SWE-bench charts cost and step limits. The 2022 HELM post is a snapshot. Its diagram is unchanged. Quiz options are unchanged.
- Verification: unit/HTTP tests, JavaScript syntax checks and the browser smoke test. No live generation or model call.

## 15 November 2026 — shorter tool and memory lessons

- Tools, memory, identity and permissions are shorter. The distinctions stay: a tool acts, MCP connects, a skill guides; context, saved notes and retrieval are different; identity text is not a permission control. The permissions lesson still says public information only and never a government network.
- This was a wording pass. The 13 November review dates and fingerprints are unchanged, so the four records stay visibly changed. Quiz options are unchanged.
- Verification: unit/HTTP tests and JavaScript syntax checks. No live model call.

## 15 November 2026 — where models run

- Models, tokens and where work happens now says a local app can still call a remote model. Ollama’s server binds to 127.0.0.1 port 11434 by default. A name ending in :cloud runs on Ollama’s servers and needs an account. Repeated tool steps can resend earlier text. The lesson no longer says every turn is encrypted HTTPS, that providers discount cached input, or that reasoning checkpoints add internal tokens.
- Understanding open models now keeps Open Source weights separate from a parameter download. Loading a pickle file can execute code. Memory figures follow Hugging Face’s 8-billion-parameter example. Most GGUF files expand when loaded in Transformers. The Qwen3-0.6B card remains a reading example. Quiz options are unchanged. Both diagrams are unchanged.
- Verification: unit/HTTP tests, JavaScript syntax checks and the browser smoke test. No live model call.

## 15 November 2026 — first-steps plan

- The first agent session now asks for a fictional Harbour Library afternoon.
  The page can be filled in by hand, with no account. Claude Code users can
  try plan mode first, from the permission-mode page read for this pass.
  Other labs are unchanged.
- The content-inventory test’s fixed date is 15 November 2026 so today’s
  lab review is accepted. Future-dated records are still rejected.
- Verification: unit/HTTP tests and JavaScript syntax checks. No live model call.

## 14 November 2026 — agent loop cycle

- The chat-agents agent view now shows a cycle: goal, tool, result and check.
  A failed check returns to the goal. Simple chat stays one turn. The five
  authored steps are unchanged.
- Verification: unit/HTTP tests, JavaScript syntax checks and the browser
  smoke test. No live model call.

## 14 November 2026 — commerce cart and cap

- The agentic-commerce walkthrough draws the fictional cart on one scale
  against the $50 cap: $42 inside, $68 past the line, and the cap unmarked
  until it is signed. The rejected ending still shows that request and that
  $0 settled. Both ends of the cart bar are rounded. Lesson text is unchanged.
- The browser smoke check for a web profile now expects that profile’s
  recorded review date. ChatGPT’s record is 14 November 2026; the other
  profiles in that loop still show 13 November 2026.
- Verification: unit/HTTP tests, JavaScript syntax checks and the browser
  smoke test. No live payment or model call.

## 14 November 2026 — web-chat exercise

- The community-garden prompt now includes the facts that were not supplied.
  One ChatGPT profile sentence now distinguishes Chat from Work, from the
  page just read. No other profile was edited. Quiz shape is unchanged.
- Verification: unit/HTTP tests and JavaScript syntax checks. No live model call.

## 14 November 2026 — AI basics and glossary

- Shortened the `ai-basics` headlines and deeper notes, and corrected a few
  claims: API keys, context windows, tokens, training versus a prompt, and
  what forgetting a Labs key does. Quiz shape is unchanged. No new graphic.
- Moved the content-inventory test’s fixed date to 14 November 2026 so a
  review recorded today is accepted. Future-dated records are still rejected.
- Verification: unit/HTTP tests and JavaScript syntax checks. No live model call.

## 13 November 2026 — everyday writing lessons

- Tightened `prompting`, `context` and `checking` after re-reading their cited
  pages. A clear brief is not a correct reply; a handover can drop a fact; a
  prompt warning is not a permission control; an unmeasured benefit is not a
  measured zero. Quiz shape is unchanged. No new graphic.
- Verification: unit/HTTP tests and JavaScript syntax checks. No live model call.

## 13 November 2026 — Hugging Face incident map

- Replaced the generic four-box strip for the July 2026 Hugging Face case in
  `#incident-diagram` with a two-zone map: evaluation sandbox, network boundary
  and Hugging Face. A dot marks where activity is, and the boundary bar shows
  whether that wall is held, crossed or restored.
- Added Play the stages for that case only. Playback uses the existing offline
  steps, stops when the reader chooses a stage or another case, and does not
  animate the crossing when reduced motion is requested.
- The MCP and EchoLeak cases keep the shared stage strip. Lesson text and review
  fingerprints are unchanged.
- Verification: unit/HTTP tests, JavaScript syntax checks and the isolated
  Chromium smoke suite, including the new map on desktop and narrow layouts.

## 13 November 2026 — agentic commerce, real-world incident explainer, deeper-detail toggles and curriculum review

- Added the `agentic-commerce` lesson (*Agentic commerce & payment protocols*),
  covering MCP, A2A, UCP, ACP, FIDO passkeys, AP2, Visa Intelligent Commerce and
  Mastercard Agent Pay ordered logically across four protocol layers, with
  primary-source links, real-world deployment examples, expandable `Dig deeper`
  disclosures, a worked mandate-design comparison and an interactive offline
  protocol/mandate walkthrough (`#commerce-diagram`).
- Added the `agent-incidents` lesson (*When agents cross boundaries: real-world
  incidents*), covering the July 2026 autonomous agent sandbox escape and Hugging
  Face intrusion, Hugging Face `pickle` / `trust_remote_code`, Spaces secrets and
  `smolagents` `CVE-2025-5120` advisories, Invariant Labs MCP tool poisoning and
  GitHub private-repository exfiltration, and Microsoft 365 Copilot `EchoLeak`
  (`CVE-2025-32711`), with explicit caveats, primary-source citations and a
  three-mode interactive incident explainer (`#incident-diagram`).
- Enhanced interactive diagrams (`#agent-diagram`, `#commerce-diagram` and
  `#incident-diagram`) with vibrant node state transitions, clickable step rails,
  verdict badges, signal-route pills and dark telemetry inspectors while
  respecting `prefers-reduced-motion: reduce`.
- Completed a full source, exercise and local-workflow review across lessons,
  Web & media profiles, benchmark resources, labs, starter templates, setup/session
  guides and programme documentation. Recorded updated review metadata in
  `content/reviews.json` and detailed evidence/limits in `content/CHANGELOG.md`.
- Added expandable `Dig deeper` disclosures (`<details class="deeper-detail">`)
  to all twelve glossary definitions and to core concept sections in `ai-basics`,
  `chat-agents`, `tools-skills`, `agentic-commerce`, `agent-incidents`, `memory`,
  `identity`, `models-costs` and `open-models`, preserving concise headline
  definitions for newcomers while making technical and practical detail available
  on request.
- Added primary source links to `lesson:responsible-use` and `lesson:models-costs`.
- Added `node --check web/feedback.js` to `CONTRIBUTING.md`.
- Verification: 74 unit/HTTP tests, JavaScript syntax checks and the isolated
  Chromium smoke suite passed. Offline content audit: 54 in-date, 1 unreviewed
  (`resource:helm`). No live provider accounts, model calls or tool installs.

## 4 November 2026 — recover stale services after updates

- Fixed a loading failure caused by a long-running backend serving new frontend
  files while retaining an older script allowlist and catalogue in memory.
- Added startup source fingerprints to health checks. The launcher now restarts
  its own stale service when reopened and reuses a matching service.
- Verified process identity independently of the launcher's Python installation,
  while retaining exact checkout/default-argument and same-user checks. Ambiguous
  or unrelated processes are preserved. Saved learner files are never reset.
- Added a real isolated update regression. It reproduces a missing feedback
  script, checks automatic recovery and reuse, and preserves fake learner work.
  Earlier browser smoke checks always started fresh servers and missed this
  long-running update path. Reopen the launcher after updates; refreshing a page
  alone cannot reload backend imports. Restart clears hub-held keys and rules
  acknowledgement as before.
- Verification: 74 unit/HTTP tests, JavaScript syntax and isolated Chromium
  smoke checks passed. The isolated lifecycle test starts with a missing script,
  uses different Python installations, checks catalogue-change restart and fresh
  service reuse, and verifies that fake saved work is preserved.

## 4 November 2026 — everyday public-tool exercises

- Added three fictional no-code activities for clear writing, conflicting-source
  comparison and source-grounded summaries, using existing lesson IDs.
- Each activity has full copyable facts, an offline sample, review checks and a
  hidden explanation. Directory return links follow the selected exercise.
- Put everyday practice on the launchpad and chat starting path; retained
  optional technical exploration and all programme boundaries.
- Recorded the audience/design choice in docs/UX_JOURNEY.md. This changes the
  learning emphasis, not provider access or permission for official work.
- Verification: 70 unit/HTTP tests, JavaScript syntax and isolated Chromium
  smoke checks passed, including each prompt, profile return, hidden explanations,
  clipboard failure, offline navigation and desktop/mobile layout checks.

## 4 November 2026 — optional local feedback and email report

- Added Give feedback from the footer and Finish session, including before
  acknowledgement, with a short category/comment form and public-only consent.
- Saved explicit comments as independent private local records with retry-safe
  receipts, validation, bounds and preservation of damaged records.
- Added deliberate facilitator review and a compiled plain-text report with
  copy/download and manual-copy fallback. No email or account connection occurs.
- Recorded shared-account visibility, retention responsibilities and alternatives
  in docs/FEEDBACK.md. No project, activity or device data is attached.
- Verification: 69 unit/HTTP tests, app/programme/feedback JavaScript syntax
  checks and the expanded isolated Chromium smoke passed. Desktop and mobile
  screenshots were inspected. Includes save/retry, keyboard focus, navigation,
  escaping, explicit review, clipboard fallback and an actual text download.

## 29 October 2026 — documentation streamlining

- Shortened repeated learner and programme guidance while retaining the
  public-only boundaries, handover limits and release acceptance checks.
- Corrected the README's guide count and in-app document scope, the deployment
  launcher's installation guidance, and historical source-control references.
- Recorded editorial scope and outstanding full-review debt in the learning
  material history. No source or exercise review dates were refreshed.
- Verification: 64 unit/HTTP tests, JavaScript syntax and isolated Chromium
  smoke checks passed. The learner guide was inspected in the app.

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
