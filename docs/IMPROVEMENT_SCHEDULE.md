# Improvement schedule

Planning baseline: 28 September 2026. This is a proposed sequence, not an
automatically scheduled job or an approved departmental rollout. Time windows
begin when the programme owner agrees a kickoff and assigns the roles below.
The current authorised implementation is stage 1 only. Later stages require
people, clean devices, learning accounts and explicit operational decisions.

## Stage 1 — session guidance, current development iteration

Status: implemented locally with automated checks and desktop/mobile inspection.
Observed learner acceptance remains stage 2; no departmental release is implied.

Owner: app/content maintainer. The optional Getting started routes (originally
labelled First 20 minutes) and prominent Finish session checklist are implemented.
The beginner follow-up adds a no-code chatbot exercise, desktop route, AI basics,
glossary, learning groups and worked examples. Existing project activities and
stable routes are retained. Experienced learners can skip the guidance.

Acceptance: both routes are readable before acknowledgement; reading them and
ticking checklist items launches nothing and saves no checklist state. The
explicit key-forgetting action calls only the existing local endpoint and
reports failures honestly. It must not claim to sign out websites, revoke
provider keys, stop tools, reset the device or certify handover. Projects,
bookmarks and model preferences remain unchanged. Pass unit/HTTP, syntax and
browser checks and inspect desktop and narrow layouts before committing.

## Stage 2 — observed learner pilot, proposed week 1 after kickoff

Owners to assign: programme owner and facilitator. Recruit a small voluntary
group spanning terminal newcomers and experienced staff. Use the designated
learning network and suitable accounts on a clean, approved pilot device.
Agree any model-call budget before testing; no paid calls are authorised by
this schedule.

Observe participants choosing a suitable route, reviewing the offline chatbot
example or opening/preparing a project, checking a result and explaining what
finishing the session does not clear. Include people who do not want to code.
Record task completion, time, points of confusion and assistance needed without
collecting prompts, keys, account details or official work. Test keyboard-only
navigation, visible focus, zoom and a screen reader; an automated browser pass
does not establish accessibility.

Acceptance: each blocked step has a reproducible issue and owner. Establish
useful time estimates for each route from observed times, recording setup
separately. No 20-minute completion target is assumed. The owner decides whether
another pilot is needed before expansion.

## Stage 3 — content and real-tool acceptance, proposed weeks 2–3

Owners to assign: content reviewer and tool maintainer. Complete pending
source/exercise reviews without resetting dates merely to clear warnings.
Prioritise material used in the first session, credentials and handover.
Test each selected tool's pinned launch path, model access, authentication,
permissions, costs and sign-out with dedicated learning credentials.

Acceptance: record the tested tool/version/account method and known limits,
review learner-facing claims, and fix pilot problems. Confirm which services
can be included on the intended devices. A detected executable or a mocked
test is not evidence of real authentication or product approval.

## Stage 4 — repeatable image and handover, proposed weeks 3–4

Owners to assign: deployment/network owner and release maintainer. Prepare a
portable installation recipe and clean image manifest, pin effective launch
paths, exclude credentials and learner state, and test representative older
laptops. Implement and verify network separation outside the app. Agree
account isolation/reset, retention of public practice work, recovery and
rollback with support and incident contacts.

Acceptance: demonstrate the deployment checklist, including secondary network
interfaces, real tool behaviour, shared-device handover and recovery. Obtain
the deployment owner's sign-off before distributing any image. Do not clone
this development workstation.

## Stage 5 — release decision, after the preceding gates

Owner to assign: programme/release owner. Decide shared repository access,
backup, application licensing, contribution review, release identifiers and
distribution arrangements. Link any accepted image to its exact app commit,
manifest and test evidence. Publishing, adding a remote, accounts, image
distribution and release tags require separate authority.

Acceptance: unresolved risks are recorded with explicit ownership. Do not
describe a preview or a scheduled date as deployment approval.

## Recurring maintenance after ownership is agreed

- Before each cohort: check tool access, costs, public starter exercises, support contacts and the handover procedure.
- Weekly: review core tool/model changes and deprecations in a pilot, without automatically upgrading the teaching image.
- Monthly and before image releases: review learning sources, accessibility feedback and content audit findings.
- On relevant security advisories: the deployment owner triages affected software and connectors, tests a response and records it.
- After every pilot or release: revisit this schedule, evidence and outstanding issues.

These are proposed responsibilities. The learning-review skill runs when
invoked; it does not provide continuous monitoring or automatically enforce
the schedule.
