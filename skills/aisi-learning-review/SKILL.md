---
name: aisi-learning-review
description: Review or refresh AISI AI Labs lessons, public chatbot links, learning activities and programme guides against current primary sources. Use for curriculum relevance and editorial maintenance, not tool installation, OS updates or deployment approval.
---

# AISI learning review

Keep learning material accurate, understandable and traceable without treating
new products as automatically better or approved for government work.

## Locate and scope

Find the AISI AI Labs checkout from the user's path/current repository, or check
`~/AISI-labs-2` if neither is given. Verify its AGENTS.md and architecture before
editing. Read AGENTS.md, ARCHITECTURE.md, docs/PROGRAMME.md and
docs/CONTENT_MAINTENANCE.md. The installed skill may be outside the repository;
its version-controlled source is `skills/aisi-learning-review/` in that checkout.

Honour the requested scope: a review-only request produces findings and proposed
changes; a refresh request can edit the relevant content. Do not upgrade tools,
install models, sign into providers, spend money, publish or change network
controls as a side effect. Preserve unrelated changes and learner files.

## Find what needs attention

Run `python3 scripts/review_content.py --json` from the checkout. It is offline
and read-only. Prioritise changed, unreviewed or due units, plus the user's named
topics. In-date is an editorial timestamp, not proof of correctness. The report
covers lesson text, chatbot entries, labs, registered documents and starter code;
also inspect associated diagrams and interactions when reviewing a lesson.

Canonical sources: existing lessons/labs in catalogue.py; supplemental lessons
in content/lessons.json; chatbot links in content/web_chats.json; public starters
in templates.py; guides in docs/; review records in content/reviews.json. Do not
create a second copy of a lesson as an alternative source of truth.

## Verify and teach

Read the actual primary source page, not just a search snippet. Use provider
documentation for product claims; protocol specifications for MCP; publisher
model cards and exact licences for open-model claims. Record canonical URLs,
inspection dates and access limitations. A working URL does not validate the
lesson. If a source cannot be accessed, retain uncertainty and leave the unit
unreviewed/due; do not fabricate a fresh review date.

Distinguish model, interface, harness, tool, skill, memory and instruction files.
Distinguish open weights, open-source definitions, inference location and licence
conditions. Do not infer privacy from local branding or call a hosted open model
offline. Treat exact models as dated examples unless availability was verified;
avoid permanent latest/best/free claims. Account access, costs and data practices
can vary independently of installed tool versions.

For mixed-experience APS learners, prefer plain English, a small diagram where
useful, an authored public exercise and an observable check. Label simulations.
Keep ONLY public information / nothing OFFICIAL / NEVER government-network or
government-account connections, including for fully offline inference. The
programme complements approved workplace systems; do not rank GovAI without
evidence. Keep authentication secrets separate from teaching content.

## Record changes without laundering review history

On an authorised refresh, update only units actually inspected. Preserve stable
lesson IDs so bookmarks survive. Increment a unit's revision when its learner
content changes; keep the revision when merely verifying unchanged content.
After genuine review, record its current SHA-256 from the audit, actual date,
appropriate interval and concise evidence/testing/limitations notes. Hashes
detect changes; they do not certify factual accuracy. Do not bulk-reset review
dates to clear warnings. Partial/failed reviews stay pending and are explained.

Record the scope, primary sources, substantive changes and untested claims in
content/CHANGELOG.md. Keep authored public content, review records and this skill
in Git, never account data, provider keys or learner project files. Review staged
diffs before any requested commit; no push, remote creation or release tag without
the user's authority. If changing this skill, update the tracked copy first and
sync the discoverable copy only with the necessary filesystem permission.

## Verify and hand off

Run the offline audit, unit/HTTP tests and JavaScript syntax checks. For UI or
lesson/diagram changes, run scripts/smoke.mjs with isolated state. Inspect the new
lesson, links, quiz feedback and narrow layouts. Test external-link confirmation
without signing into services or making model calls. Follow CONTRIBUTING.md.

Report units reviewed, changes, tests, inaccessible sources and remaining review
debt. A skill runs when invoked; it is not a scheduled monitor. Never promise
automatic future freshness or imply live authentication/hardware/network testing
from mocked tests. Stop for user direction if completing the requested review
requires new authority rather than expanding the workflow.
