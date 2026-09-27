# Working on AISI AI Labs

Read `ARCHITECTURE.md`, `docs/PROGRAMME.md` and `docs/REVIEW.md` before changes.
This directory is the new app; do not edit `../AISI-AI-Learning-Labs` as part of it.

- Preserve the public-information-only, NO OFFICIAL and NEVER government-network boundaries. This is professional development, not an approved workplace processing system.
- Do not claim network isolation, security accreditation, spend enforcement or successful live authentication from app tests.
- Never read learner credentials, copy real API keys into tests, or track user projects/state/logs/browser profiles. Use conspicuously fake fixtures and temporary data roots.
- Keep state paths and app identifiers stable unless a tested migration is explicitly required. Never reset or overwrite learner work to fix a test.
- Retain loopback binding, origin/token checks, command allowlists, argv launches, native permission prompts, HTML escaping and off-origin project previews.
- No automatic tool installs, OS upgrades, model calls or third-party account connections. Read-only external checks must be explicit and disclose destinations.
- A command being found does not prove installation, health or authentication. Never run bootstrap wrappers just to check versions.
- Before modifying an adapter, read current official tool documentation and inspect pinned CLI capabilities without changing user configuration. Cover arguments, key scoping, native login, model choice and background processes.
- Keep frontend/backend changes coordinated and update ARCHITECTURE, programme docs and CHANGELOG for material changes.
- Use `apply_patch` for edits. Keep changes focused; preserve unrelated user work.
- Run unit/HTTP tests, `node --check web/app.js`, `node --check web/programme.js`, and the browser smoke test for UI changes. Do not weaken failing tests to make a release pass.
- Ask before publishing, adding a remote, making accounts, spending money, changing network controls or creating/distributing an image. Local development is not approval for deployment.

Python 3.11+ is the development baseline; test on the actual Omarchy image.
Node 22+ and Chromium are used only for browser verification. No pip/npm
dependencies or build steps are required for the hub. Tests and scripts should
remain runnable from any checkout location; avoid developer-home absolute paths.
