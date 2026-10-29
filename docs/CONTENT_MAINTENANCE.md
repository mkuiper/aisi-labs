# Maintaining the learning material

Learning content is version-controlled with the app, not stored in learner
projects. The existing Git history already includes the original ten lessons,
activities, diagrams and guides. New plain-data files make additions easy to
review without introducing a CMS or cloud service.

## Source map

- catalogue.py: the original lessons, local tool catalogue and five activity definitions.
- content/lessons.json: foundations, chat, open-model, image/video and benchmark lessons, with sources and quizzes. AI basics owns the glossary definitions used by the glossary route and search; do not duplicate them in another source.
- content/web_chats.json: curated web/media profiles and destinations; links are not approval endorsements.
- content/resources.json: benchmark and research-discovery resources, reading guidance and primary method links.
- content/omarchy_help.json: offline desktop cheat sheet, shortcut/version baseline and beginner practice; reviewed as help:omarchy.
- content/session_guides.json: three Getting started paths and manual finish checklist; reviewed as guide:first-session and guide:finish-session. Keep internal links, account/setup caveats and credential/handover limits aligned with the app. Do not restore a timed completion promise without learner evidence.
- content/setup_guidance.json: Configuration onboarding, provider sign-in/key steps, fixed console destinations and troubleshooting; reviewed as guide:tool-access every 30 days. Check primary documentation and distinguish documented destinations from a live signed-in walkthrough. Do not test real credentials or enable billing during an editorial review.
- templates.py: authored public starter files, including fictional datasets.
- docs/: learner/programme material and engineering handover.
- web/app.js and web/programme.js: illustrated explanations and interactive teaching components.
- content/reviews.json: per-item revision, inspection date, review interval, content fingerprint and scope notes.
- content/CHANGELOG.md: editorial change history; Git preserves precise changes.
- skills/aisi-learning-review/: portable, version-controlled source for the review skill.

## Review records

Session guides, desktop help, each lesson, web/media profile, resource, lab, registered in-app document and the starter
template bundle has a stable review identifier. A SHA-256 fingerprint detects
changes since its record was written. It is not a security signature or a test
of factual accuracy. Revision numbers count content changes, not model releases.

New material has a dated source review with explicit testing limits. Older
material was imported into this inventory as a baseline, with no new detailed
review claimed. Those records intentionally have no reviewed_at date. A previous
general project review is not automatically a fresh source/exercise review of
every lesson. Do not bulk-set dates merely to remove outstanding work.

Run the read-only, offline report from the repository:

```sh
python3 scripts/review_content.py
python3 scripts/review_content.py --json
python3 scripts/review_content.py --as-of 2027-01-01 --strict
```

Statuses: changed means the content differs from the recorded fingerprint;
unreviewed means no detailed date is recorded; due means the interval expired;
in-date means only that the record is within its interval and unchanged.
An unchanged, in-date lesson can still be wrong. The JSON report includes the
current fingerprint for a maintainer to record after an actual review.

Exit codes: normally 0 for a valid report, even with review debt; 1 with --strict
when work is outstanding; 2 for invalid metadata or missing coverage. Tests check
structure and coverage without failing solely because calendar time has passed.
Web/media and resource links start with a 30-day review interval and lessons with 90 days. Review
immediately when a material provider/protocol change is known; the interval is
not a reason to ignore changes. This script makes no network requests.

Desktop help uses a 90-day review interval and must also be checked before each
image release. Compare the installed Omarchy version, default bindings, local
overrides and active bindings with the official manual. Do not assume older
menu shortcuts still match. Inspect shortcuts read-only; do not trigger close,
lock, reset or update actions as incidental tests. Record source/config inspection
separately from actual keyboard/hardware acceptance, which a facilitator must do.

## Use the skill

Invoke $aisi-learning-review from a coding-agent session, naming this checkout
and whether you want a report or actual updates. For example:

```text
Use $aisi-learning-review to refresh the open-model lessons and web chatbot
links in AISI-labs-2. Check primary sources, preserve programme boundaries,
update only the records actually reviewed, and report the remaining work.
```

The skill is designed for a discoverable copy under the coding agent's personal
skills directory; the canonical source stays in this repository. A fresh agent
session may be needed to discover an installed skill. Another coding assistant
can read its SKILL.md directly without depending on a particular skill loader.
The skill does not run on a schedule, install tools or guarantee future currency.
Any scheduled review job needs a separately agreed owner, scope and permissions.

## Editorial acceptance

Write for capable adults who may be new to the tools. Use plain, direct headings
and explain unfamiliar terms without jokes, motivational slogans or exaggerated
praise. Introductory material need not have trivial questions.

For each lesson's scenario question:

- State the goal and enough context to make one choice the best fit.
- Test applying a concept, diagnosing a problem or weighing evidence, not merely
  remembering a label.
- Make alternative answers plausible mistakes or incomplete approaches. Avoid
  absurd distractors, trick wording and an obviously longer or more detailed
  correct answer.
- Supply an option_feedback entry for every option, explaining why it fits or
  what it misses. Keep the entries aligned with options and correct when editing.
- Let learners compare explanations and retry. Answers are not scored or saved;
  the separate Explored bookmark is not an assessment result.
- Review question quality manually. Structural tests cannot establish that a
  question is fair, useful or unambiguous.

Keep beginner paths usable without coding. Each should state what setup is
needed, offer an offline alternative where possible, and end with something
the learner can inspect or explain. Do not equate trying a terminal with starting
to learn AI. Explain unfamiliar terms before using them in questions; link to
the glossary and original concept guides instead of maintaining duplicate lessons.
Worked examples must label fictional facts and authored outputs, identify the
actual mismatch, and explain why a revision is better. A reveal is for comparison,
not a score. Inspect native details/summary keyboard use and expanded narrow
layouts. Grouped Learn navigation must include every lesson exactly once.

For an editorial-only pass, increment the revision and describe the scope in
content/CHANGELOG.md. Keep the earlier review date and fingerprint when source
or exercise review is incomplete, so changed status stays visible. For a full
review, read current primary sources, inspect licences, qualify model, account
and cost claims, and try authorised exercises with public or fictional inputs.
Record sources, changes and limitations in content/CHANGELOG.md. Preserve
lesson IDs, update affected quizzes, diagrams and links, and update
fingerprints only after genuine review.

Run the audit, unit/HTTP tests, syntax checks and isolated browser smoke suite.
Verify new content is discoverable, sources are useful, links confirm external
navigation, and mobile layouts remain readable. Never automate login or paid
model calls as an incidental content test.

Inspect git diff before committing. Keep updates as focused commits; git log
and git show let maintainers compare teaching versions. A release owner can tag
an accepted teaching snapshot later. Do not publish, add a remote, or tag an
approved release just because a content review passed. No keys, logs, browser
profiles or learner work belong in this history.
