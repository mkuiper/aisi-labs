# Contributing to AISI AI Labs

Start with ARCHITECTURE.md, AGENTS.md and docs/REVIEW.md. Preserve learner data
and all public-only/no-government-network boundaries.

## Local checks

```sh
python3 -m unittest discover -s tests -v
node --check web/app.js
node --check web/programme.js
node --check web/session.js
node scripts/smoke.mjs
git diff --check
```

Python 3.11+; Node 22+ and system Chromium for the browser test. The test runner
does not install dependencies. Browser tests use a fresh temporary profile and
state directory, never the learner's browser or accounts. Model calls and real
tool launches are deliberately excluded. Screenshots go to ignored reports/.
Override CHROMIUM_BIN if Chromium is not at /usr/bin/chromium.

For an isolated manual preview:

```sh
python3 server.py --port 8769 --data-dir /tmp/aisi-labs-review-state
```

Choose a fresh data directory for your test; do not reset real learner state.
Real-tool tests can change accounts, incur costs or update wrappers, so obtain
appropriate authority and use a clean pilot environment.

## Review and release

Use focused commits and tests for both happy and failure paths. Document changes
to state, credentials, routes, tool flags, network destinations or permissions.
Update CHANGELOG.md and learning references when behaviour changes. Inspect staged
diffs for credentials and learner material; never commit local state or reports.

The included GitHub Actions workflow is optional until a hosting decision is
made. It runs backend tests on two Python versions and frontend syntax checks.
Browser and real-image acceptance remain required separately, not implied by
that workflow. Do not publish this repository or add a remote without approval.

See docs/MAINTENANCE.md for a proposed ownership cadence, pilot promotion and
rollback. A passing app test suite is one gate, not image/security acceptance.
