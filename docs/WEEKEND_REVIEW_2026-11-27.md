# Weekend review — 27–30 November 2026

Working queue for the requested learning-module polish. This is a maintainer
log, not a learner guide or deployment approval.

## Cadence and authority

The owner requested one bounded chunk about every five hours, with regular
commits and pushes to the existing remote. Proposed finish: Monday 30 November
at 09:00 Australia/Canberra. The owner then explicitly requested scheduling.
A local systemd user timer is configured for 13 five-hour rounds starting
Friday 27 November at 19:30, followed by a summary on Monday at 08:30.
The last ordinary slot is Monday at 07:30. No new run starts after 09:00.
The runner also limits each invocation to 90 minutes or the remaining window.

The machine must be awake and the user manager running. Missed rounds do not
accumulate. Closing this chat does not stop the timer. No login linger, sleep
settings, network controls or system-wide services were changed. The worker
uses existing Codex account/configuration and the same local filesystem access
as this editing session, without reading or copying credentials. Its prompt
prohibits installs, other model calls, account connections and learner data.

Local units: `~/.config/systemd/user/aisi-weekend-review-20261127.{timer,service}`.
The runner is `scripts/weekend_review.py`; its Codex binary is pinned in the
service environment, so it never invokes an updating wrapper. Unit paths are
local installation details, not portable checkout requirements.

Inspect or stop the schedule:

```sh
systemctl --user list-timers aisi-weekend-review-20261127.timer
journalctl --user -u aisi-weekend-review-20261127.service
systemctl --user disable --now aisi-weekend-review-20261127.timer
```

Stopping the timer prevents future starts. To stop a running round as well:

```sh
systemctl --user stop aisi-weekend-review-20261127.service
```

The runner skips dirty checkouts and branches other than main. A runtime lock
prevents overlapping invocations. A timeout preserves unfinished edits for
inspection; later rounds skip them. Scheduled starts are verified separately
from successful future model access. No live authentication test was performed.

Each round takes the first unfinished item, reads the relevant source and
implementation, makes at most one focused improvement, verifies it and records
the result here. Skip a change when the evidence does not support it. Commit
and push completed, checked work. Preserve unrelated edits and learner data.
Five-hour spacing limits frequency; bounded scope limits token use.

## Queue

1. [x] Inspect dark-theme contrast and narrow layouts for lesson product marks and
   incident replays. Fix a demonstrated readability problem. Completed in round 1 below.
2. [x] Inspect replay playback, pause, restart, keyboard access and reduced motion.
   Improve one interaction that helps learners follow the evidence. Completed in round 2 below.
3. [x] Review the agent-loop animation and guardrail exercise together. Make the
   goal, tool result and learner decision easier to follow, without suggesting
   that the animation proves a real tool is safe. Completed in round 3 below.
4. [x] Review prompting, context and checking as a learner journey. Polish one
   worked example or question, with plausible alternatives and useful feedback.
   Completed in round 4 below.
5. [x] Review AI basics and glossary wording for a mixed-experience audience.
   Keep concise definitions and optional technical detail. Completed in round 5 below.
6. [x] Review the commerce walkthrough's instructional motion. Keep the fictional
   amounts, mandate limits and distinction between a demonstration and enforcement.
   Completed in round 6 below.
7. Inspect HELM's unreviewed resource against its primary methodology. Leave
   it unreviewed if the source cannot be read adequately.
8. Review one remaining lesson or exercise selected from evidence found above.
9. Write a Monday handover: completed commits, checks, source limitations,
   remaining work and any decisions needed from the owner.

## Acceptance for each round

Use the tracked `skills/aisi-learning-review/SKILL.md` and
`docs/CONTENT_MAINTENANCE.md`. Read actual primary pages before changing factual
claims and disclose external destinations before read-only checks. Record
inaccessible sources. Refresh review dates and fingerprints only after a full
source and exercise inspection; editorial-only changes retain visible debt.

Keep stable lesson IDs and public-information-only, NO OFFICIAL and NEVER
government-network/account boundaries. No installs, live learner credentials,
paid calls, account connections or deployment. Use existing SVG/CSS for diagrams;
do not generate or distribute an image. Motion should explain a concept, start
on request where appropriate, offer usable controls and respect reduced motion.
Label authored simulations and distinguish quotation from dramatisation.

Run unit/HTTP tests and JavaScript syntax checks. Run the isolated browser smoke
test for lesson or UI changes, and inspect the affected desktop and narrow views.
Record accessibility checks accurately; automated checks do not establish real
screen-reader usability. Inspect staged diffs before committing. Push without
force to the existing remote; preserve a local commit if the push fails.

## Setup round — 27 November

- Read architecture, programme, review and content-maintenance guidance and the
  tracked review skill. Inspected the previous review log and Git status.
- Offline inventory: 54 in-date items and one unreviewed item, `resource:helm`.
  No content dates or fingerprints refreshed. No primary pages opened yet.
- Found seven existing local commits after `origin/main`, ending at `50be872`.
  Inspected their aggregate diff and file list before pushing.
- Baseline verification: 80 unit/HTTP tests pass; syntax checks pass for
  app.js, programme.js, session.js and feedback.js; isolated Chromium smoke
  passes; Git whitespace check passes. Tests do not establish factual accuracy,
  live authentication, screen-reader usability or deployment acceptance.
- No module or animation has changed in this setup round. The queue does not
  imply future work has run.
- Scheduling checks: systemd unit validation passes; mocked workers confirm
  dirty/non-main skips and one bounded invocation from a clean checkout.
  An actual pre-window invocation exits without calling Codex. All 80 tests
  and required syntax checks pass. No provider login or paid call was tested.
- Read-only scheduling documentation destinations: OpenAI's
  `https://developers.openai.com/codex/noninteractive` and
  `https://developers.openai.com/codex/app/automations`, which redirect to
  their ChatGPT Learn pages. CLI help was inspected from the pinned binary.

## Round 1 — 27 November 2026, lesson-label readability

- Completed queue item 1 only. The app uses a fixed light palette with a dark
  replay panel. Inspected product backplates, captions, evidence labels and
  narrow replay layouts. No factual lesson or playback changes.
- Found Reported badge text at 4.27:1 contrast against `#e6ebf3`, and product
  captions at 4.38:1 against `#fffdf6`. Darkened the text to `#526785` and
  `#64705e`, giving 4.82:1 and 5.13:1 respectively.
- The added 320-pixel feed check initially failed because replay content
  overflowed horizontally. Allowed long words to wrap within flex message
  bubbles using `min-width:0` and `overflow-wrap:anywhere`.
- Sources and evidence were local `web/style.css`, the `nameStrip()` and replay
  rendering in `web/app.js`, and isolated Chromium renders. No primary-source
  destinations were contacted. No new factual or source-review claim is made.
- Browser coverage now checks computed caption/badge contrast, page overflow
  and feed overflow for all four replay cases at 320, 390 and 1440 pixels.
  Captures are ignored `reports/weekend-*.png`. Visually inspected product
  strips at 320 and 1440, July replay at 320, GitHub MCP replay at 390 and
  Medicare replay at 1440. Marks, labels and controls remain visible.
- Verification: 80 unit/HTTP tests pass. Syntax checks pass for app.js,
  programme.js, session.js, feedback.js and smoke.mjs. Isolated browser smoke
  passes, including the new cases. Git whitespace check passes. A repeat unit
  run emitted a Python ResourceWarning about cleanup of a fixture HTTP 404;
  all tests still passed. No tests were weakened.
- Offline audit remains 54 in-date and one unreviewed item, `resource:helm`.
  Review dates, revisions and fingerprints are unchanged. Source accuracy,
  live authentication, screen-reader usability, hardware acceptance and network
  separation were not established. Learner data and credentials were not read.
- Updated architecture and both changelogs for the presentation/check coverage.
  No programme rule or learner workflow changed. Next round starts at queue
  item 2. Queue items 2–9 remain unfinished.
- This round's focused commit is identified by the subject
  `Improve lesson label contrast and narrow replay wrapping` in Git history.
  The final handover reports the push outcome.

## Round 2 — 28 November 2026, replay starts on request

- Completed queue item 2 only. Inspected replay scheduling, pause/resume,
  restart, keyboard focus, view/case/route cancellation and reduced-motion CSS
  in `web/app.js`, `web/style.css` and `scripts/smoke.mjs`.
- Demonstrated that entering the replay with reduced motion revealed all 31
  Hugging Face messages while the announcement said to press Play. A browser
  assertion failed with 31 messages against an expected zero before the fix.
- One focused improvement: every replay now waits for Play on entry, including
  under reduced motion. Reduced-motion Play still reveals all lines at once,
  without a timer. Labels, sources and incident claims are unchanged.
- Browser checks cover zero messages before Play in all four reduced-motion
  cases, full counts after Play, no playback timer, disabled message/eye
  animations and smooth scrolling, Enter to play, Space to pause, Tab to
  Skip, focus after Restart, and timer cancellation on view/case/route changes.
- Sources are local code and isolated Chromium renders only. No external
  destinations were fetched. This interaction review does not establish the
  accuracy of incident claims or constitute a source/exercise re-review.
- Verification: all 80 unit/HTTP tests pass on this Omarchy host. The run emitted
  the previously recorded Python ResourceWarning about cleanup of a fixture
  HTTP 404. Syntax checks pass for app.js, programme.js, session.js, feedback.js
  and smoke.mjs. Full isolated Chromium smoke and Git whitespace checks pass.
  No tests were weakened.
- Browser checks include replay layouts at 320, 390 and 1440 pixels. Visually
  inspected the reduced-motion Hugging Face desktop view, Hugging Face at 320
  and Medicare at 390. Labels wrap and controls remain visible and contained.
  Captures are ignored `reports/weekend-*.png`. Automated keyboard and CSS
  checks do not establish screen-reader usability, source accuracy, live
  authentication, hardware acceptance, network separation or deployment approval.
- Offline audit remains 54 in-date items and one unreviewed item,
  `resource:helm`. No review dates, lesson revisions or fingerprints changed.
  `web/app.js` interactions are outside the lesson fingerprint, as documented
  in the architecture. Updated architecture and both changelogs; programme
  rules and learning objectives are unchanged.
- No learner data, profiles or credentials were inspected. Tests use fake
  fixtures and fresh temporary state/profile roots. No installs, model calls,
  account connections, image generation, deployment or schedule changes.
- Next round starts at queue item 3. Items 3–9 remain unfinished. This round's
  commit is identified by `Wait for Play before showing reduced-motion replays`.
  The final handover reports the push outcome; no success is assumed here.

## Round 3 — 28 November 2026, learner checkpoints in the agent loop

- Completed queue item 3 only. Clean main checkout at entry. Inspected the
  five loop stages, goal/tool/result/check diagram, all six guardrail requests,
  choice feedback and recap, focus/announcement handlers and reduced-motion
  styles in web/app.js, web/style.css and scripts/smoke.mjs.
- Found that the loop described agent activity without consistently stating
  the learner's decision, while the guardrail introduction did not locate its
  choices within that loop. One focused improvement: a Your checkpoint paragraph
  at each stage connects the goal, pre-execution permission, returned evidence,
  mismatch and final review. The game explicitly practises the permission
  checkpoint in a different fictional task, before anything runs.
- The final checkpoint says a passing count check does not establish a real
  tool's safety. Existing authored-example/no-AI-call labels, public-only,
  NO OFFICIAL and NEVER government-network/account boundaries remain. No tool
  execution, backend API, state path or project change was introduced.
- Sources are the local implementation and isolated Chromium renders only.
  No external primary-source destinations were fetched, no current product
  claims were changed and no new source/exercise review date is claimed.
- Incremented lesson:chat-agents to revision 4 for its instructional change
  outside the lesson fingerprint, and doc:programme to revision 12 for the
  corresponding teaching description. All previous dates and fingerprints
  remain. Audit: 53 in-date, one changed (doc:programme), one unreviewed
  (resource:helm). The programme's visible editorial debt is intentional.
- Updated architecture, programme guide and both changelogs. Next round starts
  at item 4; items 4–9 remain unfinished. The focused commit subject is
  `Connect agent loop stages to learner checkpoints`.
- Verification on this Omarchy host: all 80 unit/HTTP tests pass; syntax checks
  pass for app.js, programme.js, session.js, feedback.js and smoke.mjs. Full
  isolated Chromium smoke and Git whitespace checks pass. The final unit run
  emitted the previously recorded fixture HTTP 404 cleanup ResourceWarning.
- Initial smoke attempts exposed two mistakes in the new test code: a
  case-sensitive text assertion and a synthetic Enter event missing the text
  field used by the suite's existing keyboard tests. Corrected both and reran
  the full suite successfully. No application failure was hidden or test weakened.
- Browser coverage checks all five loop stages at 320, 390 and 1440 pixels in
  normal and reduced motion, disabled node/arrow animations under reduced
  motion, keyboard Next, focus retention, Back/Replay and checkpoint text in
  announcements. Loop/game inspection sends no requests. Existing coverage
  still checks all six choices, incorrect feedback, recap and restart.
- Visually inspected the permission checkpoint and guardrail choices at 320
  and 1440 pixels, plus the final review checkpoint at 390. Text wraps, focus
  remains visible and controls stay contained. Captures remain ignored under
  reports/weekend-*.png. Automated checks do not establish screen-reader
  usability, factual currency, real-tool safety, authentication, hardware
  acceptance, network separation or deployment approval.
- No learner data, profiles or credentials were inspected. Fixtures and browser
  roots are isolated and temporary. No external source fetches, installs,
  upgrades, model calls, account connections, image generation, deployment or
  schedule edits.
- Staged changes are inspected before the focused commit. The final response
  reports the push outcome to existing origin main; no success is assumed here.

## Round 4 — 28 November 2026, evidence for source priority

- Completed queue item 4 only. Started from clean main at dc2f3b1. Read the
  required repository guidance and tracked review skill. Inspected the prompting,
  context and checking lessons in catalogue.py, their authored facts/prompts,
  flawed samples, worked examples, questions, option feedback and next links,
  plus their diagrams and escaped rendering in web/app.js.
- One focused instructional improvement: the context question previously called
  one notice current without showing why it governed. It now gives fictional
  competing times and the organiser's explicit statement replacing the earlier
  plan. Alternatives propose merging times into an invented arrival window or
  preferring detail. Feedback explains each mistake, supports the 10 am answer
  and requires checking the actual notice and summary. Recency alone is not
  presented as authority. Prompting and checking content remain unchanged.
- Evidence and sources are local catalogue.py, web/app.js and isolated browser
  checks. No external primary-source pages were fetched, no current provider
  claims changed and no source access failures occurred. This is an editorial
  inspection, not a complete primary-source re-review or a live learner trial.
- Incremented lesson:context to revision 6 and doc:programme to revision 13.
  Earlier review dates and fingerprints remain. Offline audit: 52 in-date,
  two changed (lesson:context and doc:programme), one unreviewed (resource:helm).
  Updated architecture, programme guide and both changelogs.
- All 80 unit/HTTP tests pass on this Omarchy host. The known fixture HTTP 404
  cleanup ResourceWarning recurred. JavaScript syntax checks pass for app.js,
  programme.js, session.js, feedback.js and smoke.mjs. No tests were weakened.
- Full isolated Chromium smoke passes, including all question choices and
  retries, existing native disclosure keyboard checks and external-navigation
  gates. Added all three context answers at 320, 390 and 1440 pixels, overflow
  checks and an assertion that the question/retries send no requests.
  Visually inspected wrong-arrival feedback at 320, correct feedback at 390,
  wrong-detail feedback at 1440 and the expanded context exercise on desktop.
  Text wraps, controls stay contained and feedback is readable. Captures are
  ignored reports/weekend-context-question-*.png and everyday-context-desktop.png.
  Git whitespace check passes. Automated checks do not establish screen-reader
  usability, source currency, authentication, real-tool safety, network separation,
  hardware acceptance or deployment approval.
- No learner data, profiles or credentials were inspected. Browser and HTTP
  checks use fresh temporary roots and fake fixtures. No installs, upgrades,
  model calls, account connections, image generation, deployment, network-control
  changes, runner edits or schedule edits. Public-only, NO OFFICIAL and NEVER
  government-network/account boundaries remain.
- Next round starts at item 5. Items 5–9 remain unfinished. The focused commit
  subject is `Supply source-priority evidence in the context question`.
- Staged changes are inspected before committing. The final response reports
  the push outcome to existing origin main; no push success is assumed here.

## Round 5 — 28 November 2026, explain training parameters

- Completed queue item 5 only, starting from clean main at 983cda3. Read the
  required guidance and tracked review skill. Inspected all six AI basics
  sections, twelve glossary headlines and deeper notes, the simplified
  context/model/check diagram, registration question, all three answers and
  their feedback, search, term navigation and native disclosure rendering.
- One focused improvement: training introduced parameters without explaining
  the term. The lesson and glossary now explain them as learned numbers.
  The concise definitions still distinguish training from supplying chat
  context; pre-training and fine-tuning remain optional deeper notes.
- Disclosed https://developers.google.com/machine-learning/glossary before
  fetching it. Read its parameter and training entries, which describe
  training as adjusting parameters using examples. Canonical anchors:
  https://developers.google.com/machine-learning/glossary#parameter and
  https://developers.google.com/machine-learning/glossary#training.
  No source access failure. Other primary sources, provider terms and prices
  were not re-reviewed. This partial wording pass is not a full factual review.
- Incremented lesson:ai-basics to revision 4 and doc:programme to revision 14.
  Review dates and fingerprints remain unchanged. Offline audit: 51 in-date,
  three changed (lesson:ai-basics, lesson:context, doc:programme) and one
  unreviewed (resource:helm). Updated architecture, programme and both changelogs.
- All 80 unit/HTTP tests pass on this Omarchy host with Python 3.14.8.
  The known fixture HTTP 404 cleanup ResourceWarning recurred. Syntax checks
  pass for app.js, programme.js, session.js, feedback.js and smoke.mjs with
  Node 26.13.1. No tests were weakened.
- Added isolated browser checks for training disclosures with Space and Enter,
  glossary route focus, all three question answers/retries, zero requests from
  these interactions and page overflow at 320, 390 and 1440 pixels.
  Visually inspected lesson training and glossary training at all three widths,
  with notes expanded and keyboard focus visible. Text and controls remain
  readable and contained. Captures are ignored reports/weekend-basics-training-*
  and reports/weekend-glossary-training-*. Automated checks do not establish
  screen-reader usability or learner comprehension.
- No learner data, credentials or existing browser profiles were read. Tests
  use fake fixtures and fresh temporary state/profile roots. Public-only,
  NO OFFICIAL and NEVER government-network/account boundaries remain. No
  installs, upgrades, model calls, account connections, image generation,
  deployment, network controls, runner or schedule changes.
- Next round starts at item 6; items 6–9 remain unfinished. For item 8, a
  possible source-review target is the existing AI basics statement that many
  image models generate in one pass. It was outside the two glossary entries
  checked here and remains unchanged; verify against architecture-specific
  primary sources before deciding whether to revise it.
- This round's focused commit subject is `Explain training parameters in AI basics`.
  Full isolated Chromium smoke and Git whitespace checks pass. No unrelated
  edits appeared. The staged diff is inspected before committing.
  The final response reports the push outcome; no success is assumed here.

## Round 6 — 28 November 2026, commerce activity pulses end

- Completed queue item 6 only, starting from clean main at a8050c4. Read the
  required guidance and tracked review skill. Inspected both five-step commerce
  traces, the cart scale, step announcements, focus handlers and motion styles.
- Found that every reached connection kept pulsing, including after approved
  settlement or rejection. One focused improvement: only connections into an
  active layer pulse, and commerce node and arrow pulses run once per selected
  step. The longest cycle is 2.4 seconds. Completed and rejected connections
  stay static. Back, Next, Replay and direct step selection pace the walkthrough.
- The caption explains the visual meaning: arrows connect layers, show no live
  traffic and do not enforce spending limits. Reduced motion disables pulses.
  The fictional $42 and $68 carts, signed $50 cap, $0 rejected settlement,
  payloads and protocol/product claims remain unchanged.
- Sources are local web/app.js, web/style.css, scripts/smoke.mjs and isolated
  Chromium renders. No external destinations fetched and no source access
  failures. This interaction pass is not a full source or exercise re-review.
- Incremented lesson:agentic-commerce to revision 6 and doc:programme to 15.
  Earlier review dates and fingerprints remain. The commerce interaction lives
  outside the lesson fingerprint. Offline audit remains 51 in-date, three
  changed items and one unreviewed item, resource:helm. Updated architecture,
  programme and both changelogs.
- All 80 unit/HTTP tests pass on this Omarchy host with Python 3.14.8. The known
  fixture HTTP 404 cleanup ResourceWarning recurred. Syntax checks pass for
  app.js, programme.js, session.js, feedback.js and smoke.mjs with Node 26.13.1.
- Added isolated browser checks for both scenarios and all five steps at 320,
  390 and 1440 pixels in normal and reduced motion. Checks cover finite pulses,
  static final arrows, keyboard Next, Back, Replay, focus retention, settlement
  labels, overflow and zero requests during interaction. A timed check confirms
  that activity ends without automatically advancing the step.
- Visually inspected desktop consent and rejected-payment layouts at 320 and
  390 pixels. Captions wrap, labels remain readable and the $0 ending is visible.
  Captures are ignored reports/weekend-commerce-*.png. Automated checks do not
  establish screen-reader usability, comprehension, protocol currency, live
  authentication, spend enforcement, hardware acceptance or network separation.
- No unrelated edits appeared. No learner data, credentials or existing browser
  profiles were read. Tests use fake fixtures and fresh temporary roots. The
  public-only, NO OFFICIAL and NEVER government-network/account boundaries
  remain. No installs, upgrades, model calls, account connections, image
  generation, deployment, network-control, runner or schedule changes.
- Next round starts at item 7, HELM methodology. Items 7–9 remain unfinished.
  Full isolated Chromium smoke and Git whitespace checks pass. No tests were
  weakened. The staged diff is inspected before committing.
  The focused commit subject is `End commerce activity pulses between steps`.
  The final response reports the push outcome; no success is assumed here.
