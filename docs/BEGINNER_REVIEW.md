# Beginner restructure: review and handover

28 September 2026. Local development changes, not deployment approval.

## What to try

1. Open Getting started from the header or launchpad. Choose a chatbot, desktop
   or first-project route. Each card takes you to its instructions; no tool opens.
2. Open Try a chatbot and check its answer. The activity now comes first. Compare
   the authored invitation with the supplied facts and reveal the explanation.
   You can do this without signing in or creating a project.
3. Open Learn. AI basics comes first in the everyday-AI group. The other groups
   cover agents/tools and models/media/evidence, without locking any lesson.
4. Search for endpoint or open the glossary. Select a term, then follow its link
   to a fuller explanation. Existing lesson bookmarks still work.
5. Inspect the worked examples in Writing a task brief, Give AI the right context
   and Checking outputs and evidence. The explanations are optional reveals,
   not scored answers. Finish session retains the five manual handover checks.

## Design decisions

- The starting point explains who it helps, rather than promising completion
  within an untested twenty minutes. Account setup is separate from learning.
- Trying a chatbot is a complete no-code path, not a prerequisite coding lesson.
  Offline examples are explicitly authored, not presented as live AI output.
- Definitions, exercises and guides each have a canonical content source.
  New rendering uses escaped text and native keyboard-operable disclosures.
- Public-only, nothing OFFICIAL and never-government-network/account boundaries
  remain visible. API credentials belong only in permitted authentication
  settings. The app does not enforce network separation or grant tool approval.
- No new dependency, API endpoint, persistent learner data or external service
  connection was added. No model calls, provider login or tool updates occurred.

## Verification and honest limits

60 unit/HTTP tests and the expanded isolated Chromium suite pass. JavaScript
syntax and Git whitespace checks pass. Browser coverage includes three routes,
fifteen lessons and all answer feedback, glossary/search/focus, keyboard reveal,
escaped sample text, existing acknowledgement/external-navigation gates,
temporary finish ticks and key-forgetting failure/retry. Reading the new paths
and revealing explanations sends no provider request and changes no server state.
Desktop, tablet and narrow layouts down to 320 pixels were checked; desktop and
mobile screenshots were inspected. Screenshots use fake/temporary state and are
ignored under reports/, not tracked learner records.

Primary-source reviews completed for AI basics, context, prompting and checking;
sources and scope are in content/CHANGELOG.md. Existing review history was not
cleared for editorial-only changes. Audit after this pass: 52 units, 28 in-date,
14 changed and 10 unreviewed. This is tracking information, not a quality score.

## Next improvements, in priority order

1. Observe a small voluntary beginner pilot, including a non-coder. Check whether
   people find the appropriate route, understand the invitation errors and know
   what to do when accounts or support are unavailable. Establish timings from
   observation; do not restore a twenty-minute target without evidence.
2. Complete pending source/exercise reviews, starting with web chat, models/costs
   and responsible use. Keep changing product claims dated and attributed.
3. Have a human check screen-reader use, keyboard navigation across the complete
   app and zoom on the intended laptop image. Automated checks are not an
   accessibility audit or a substitute for observing learners.
4. Assign local support and incident contacts, confirm permitted learning accounts
   and budgets, then carry out pinned-tool and clean-device/network acceptance.
   The app, public-only rules and passing tests do not approve a laptop rollout.

These follow-ups require people or deployment decisions. Nothing in this handover
schedules unattended work, authorises paid calls, publishes the repository or
creates a distributable image. See IMPROVEMENT_SCHEDULE.md for the broader gates.
