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
4. Review prompting, context and checking as a learner journey. Polish one
   worked example or question, with plausible alternatives and useful feedback.
5. Review AI basics and glossary wording for a mixed-experience audience.
   Keep concise definitions and optional technical detail.
6. Review the commerce walkthrough's instructional motion. Keep the fictional
   amounts, mandate limits and distinction between a demonstration and enforcement.
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
