# Critical platform review

Reviewed 27 September 2026. Scope: source, local launch/configuration behaviour,
programme content and automated tests. Not a penetration test, security approval,
live account certification or bootable-image acceptance.

## Overall assessment

A sound small learning preview, with a useful launch-first structure and clear
public-only teaching intent. It is not ready to clone and distribute as an
approved departmental image. The most important remaining work is deployment
assurance and real-tool acceptance, not adding more decorative screens.

## Addressed in this review

- Source control: created a local main-branch repository and baseline commit; strengthened ignores. No remote or publication.
- Purpose and branding: AISI AI Labs display name in the app and existing desktop launcher. Landing page explains APS development, public-only inputs and separation from official workplace processing. Stable folder/data identifiers retained.
- Model drift: added persisted, validated, per-launch model overrides for four tools; empty means native default, not newest. No misleading hard-coded latest-model list.
- Configuration coverage: distinguishes three hub key adapters, four model controls, native setup for other AI tools and desktop preferences. Grok has a native setup guide and model override; no unsupported xAI key injection.
- Update visibility: local Mise inventory, detection of common updating wrappers, explicit public release comparisons for four packages and visible unknown/failure states. No installs or account queries.
- State writes: replaced predictable .tmp filenames with unique private atomic temporary files; added regression coverage for symlink targeting and failed replacement cleanup.
- HTTP resilience: bounded accepted-connection timeouts in addition to the existing body limit, origin/token checks, CSP and allowlists. This still is not a production network server.
- Handover: ARCHITECTURE.md, AGENTS.md, maintenance and contributing guidance, automated-check workflow, and expanded unit/HTTP/browser checks.

## Release-blocking concerns for departmental distribution

### High: network separation is external, not implemented here

The app cannot block government networks/accounts or prevent a user entering
OFFICIAL information into external tools. An acknowledgement is education, not
DLP or network enforcement. Deployment/network owners must implement and test
the controls in DEPLOYMENT.md, including alternate interfaces and bridges.

### High: this account and its tools are not isolated sandboxes

Child tools run as the Linux user. Existing native credentials, configs, MCP
servers, hooks, plugins and shell environment can affect behaviour. Same-user
processes can access secrets and learner state. Build clean accounts and a
reviewed image; do not clone this workstation. Audit extensions and connectors.

### High: real provider authentication is not covered by mocked tests

Unit tests prove app handling and argv/environment construction, not provider
acceptance, billing or account entitlements. Validate each pinned version with
dedicated disposable learning credentials. In particular, evaluate Grok's
leader-process lifetime, endpoint settings, native login precedence and key
rotation before supporting session xAI keys. Forgetting hub keys does not revoke
keys already inherited by a tool or clear its native stores.

### High: unpinned launch wrappers defeat a repeatable image

Local wrappers for several core tools call mise use when opened; launch can
download/select a different version. The inventory flags common patterns but
is not a general shell-script analyser. Pin/review effective launch paths and
test changes in a pilot. An npm release comparison is not a vulnerability scan
or a complete inventory of the desktop, OS, models, plugins and MCP servers.

### Medium: operational ownership is not yet assigned

There is no accepted image manifest, distribution channel, update SLA, named
support/incident contacts, shared repository access policy, licence decision or
sign-off record. Roles and proposed cadence are documented, not staffed. Agree
these before publishing or issuing laptops.

### Medium: verification is broader but still incomplete

Backend tests and browser checks cover the local app. They do not prove screen
reader accessibility, real desktop focus/window behaviour, old-hardware capacity,
network isolation, model quality or cost control. Test with novice and experienced
APS learners. Shared-account progress is not an LMS or an individual training record.

### Medium: maintainability and distribution need further work

The frontend is dependency-free but uses shared globals and some dense template
strings. Split it further if complexity grows; avoid a framework migration solely
for appearance. The current desktop entry has this developer's path; an image
recipe must generate its own. There is no signed updater or automated image build.

## GovAI and agency platforms

No evidence-based assessment of GovAI was undertaken. Do not claim it is outdated,
unsafe or less capable. This programme complements approved platforms by teaching
transferable skills with public practice data; official work remains on the
department's approved systems under its policies.

## Verification evidence and limits

Verified locally: 38 unit/HTTP tests passed; JavaScript syntax and git whitespace
checks passed; Chromium workflow checks passed for model persistence, local
inventory, six documents, ten lessons, five project starters and responsive
layouts. Desktop and mobile screenshots were inspected. Tests use fake keys and
temporary state, not live provider accounts. The optional CI workflow has not
been run on a remote host.

Read-only public npm check at 2026-09-27 07:13 UTC: active Mise Claude Code
2.1.282 versus published 2.1.283; Codex 0.156.1 versus 0.157.1; Gemini CLI
0.61.0 and Grok 1.0.41 matched their checked releases. This is a dated observation,
not a permanent latest-version claim. No packages were installed or upgraded.
Run the commands in CONTRIBUTING.md and record results with each release commit.
Public-release retrieval should also be checked on the intended learning network. No automated
check in this repository authorises departmental deployment or certifies a tool.
