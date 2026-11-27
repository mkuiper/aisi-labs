# Weekend review — 27–30 November 2026

Working queue for the requested learning-module polish. This is a maintainer
log, not a learner guide or deployment approval.

## Cadence and authority

The owner requested one bounded chunk about every five hours, with regular
commits and pushes to the existing remote. Proposed finish: Monday 30 November
at 09:00 Australia/Canberra. A scheduler has **not** been activated: this
session exposes no scheduler for local repository work. Timer choice is pending
the owner's response. This file alone does not start future rounds.

Each round takes the first unfinished item, reads the relevant source and
implementation, makes at most one focused improvement, verifies it and records
the result here. Skip a change when the evidence does not support it. Commit
and push completed, checked work. Preserve unrelated edits and learner data.
Five-hour spacing limits frequency; bounded scope limits token use.

## Queue

1. Inspect dark-theme contrast and narrow layouts for lesson product marks and
   incident replays. Fix a demonstrated readability problem.
2. Inspect replay playback, pause, restart, keyboard access and reduced motion.
   Improve one interaction that helps learners follow the evidence.
3. Review the agent-loop animation and guardrail exercise together. Make the
   goal, tool result and learner decision easier to follow, without suggesting
   that the animation proves a real tool is safe.
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
- No module or animation has changed in this setup round. Scheduling remains
  pending; the queue does not imply future work has run.
