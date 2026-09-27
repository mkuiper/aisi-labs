# Maintaining the learning material

Learning content is version-controlled with the app, not stored in learner
projects. The existing Git history already includes the original ten lessons,
activities, diagrams and guides. New plain-data files make additions easy to
review without introducing a CMS or cloud service.

## Source map

- catalogue.py: the original lessons, local tool catalogue and five activity definitions.
- content/lessons.json: supplemental web-chat and open-model lessons, with sources and quizzes.
- content/web_chats.json: curated public chatbot destinations; links are not approval endorsements.
- templates.py: authored public starter files, including fictional datasets.
- docs/: learner/programme material and engineering handover.
- web/app.js and web/programme.js: illustrated explanations and interactive teaching components.
- content/reviews.json: per-item revision, inspection date, review interval, content fingerprint and scope notes.
- content/CHANGELOG.md: editorial change history; Git preserves precise changes.
- skills/aisi-learning-review/: portable, version-controlled source for the review skill.

## Review records

Each lesson, chatbot entry, lab, registered in-app document and the starter
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
Chat links start with a 30-day review interval and lessons with 90 days. Review
immediately when a material provider/protocol change is known; the interval is
not a reason to ignore changes. This script makes no network requests.

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

Read current primary sources; inspect licences rather than inferring them from
brand names; qualify model/account/cost claims; try the exercise where authorised.
Use public or authored fictional inputs only. Record what was not tested.
Preserve stable lesson IDs and update affected quizzes, diagrams and links.
Increment revisions for changed content, update fingerprints after genuine
review and describe sources/changes/limitations in content/CHANGELOG.md.

Run the audit, unit/HTTP tests, syntax checks and isolated browser smoke suite.
Verify new content is discoverable, sources are useful, links confirm external
navigation, and mobile layouts remain readable. Never automate login or paid
model calls as an incidental content test.

Inspect git diff before committing. Keep updates as focused commits; git log
and git show let maintainers compare teaching versions. A release owner can tag
an accepted teaching snapshot later. Do not publish, add a remote, or tag an
approved release just because a content review passed. No keys, logs, browser
profiles or learner work belong in this history.
