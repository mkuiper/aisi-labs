# Updates, models and release management

## Current does not mean untested

AISI AI Labs should expose learners to contemporary tools while providing a
repeatable teaching environment. Maintain a stable teaching image and a small
pilot channel. Do not auto-upgrade every laptop to every new release. Security
fixes need prompt risk-based triage, not an indefinite wait for a teaching release.

## Five independent things to maintain

- Operating system, firmware, browser and runtimes: deployment owner checks supported versions and security notices; test on the actual older hardware.
- AI CLIs and desktop tools: record source, licence, version, installation method, checksum where available, effective executable and bootstrap/update behaviour.
- Models: the provider operates them remotely. Check availability with a dedicated learning account. Record model ID, date, authentication method and a small public evaluation task. Model changes can alter costs and behaviour without a CLI update.
- MCP servers, plugins, skills and hooks: each is a separate supply-chain and permission review. An instruction file can influence actions; an MCP connector can expose data or execute tools. No government connectors or credentials.
- Learning material and app: review explanations, examples, links, accessibility, source-control changes and the automated test results.

## In-app checks and their limits

Configuration → Versions and maintenance offers a local inspection and an
explicit public release check. Local inspection reads Mise records without
executing AI launch wrappers. The online check queries registry.npmjs.org for
the official Codex, Claude Code, Gemini CLI and Grok npm packages. It sends no
API keys, installed-version list, prompts or learner project content. The public
registry sees the requesting network address and package names. No software is
installed. If network access fails, a check remains failed, not green.

The active Mise version is not proof of which binary a wrapper will launch.
Some wrappers select or download a release at launch time. A native distribution
may also lead or lag its npm package. Other tools show Manual version review.
OS security status, plugins and model access are not covered by this checker.

For a machine-readable report run these commands from the repository:

```sh
python3 scripts/check_updates.py
python3 scripts/check_updates.py --online
```

Run the online check only on the separate learning network. Check timestamps
are observations, not guarantees that the device remains current afterward.

## Choosing models

The hub exposes model overrides for Codex, Claude Code, Gemini CLI and Grok.
An empty field defers to native tool configuration. Use each tool's /model
picker and official documentation to see choices. Grok also has grok models.
The hub stores a non-secret model ID or alias in models.json and passes it as
a CLI argument for the next launch. It does not validate access or purchase it.

Use exact model versions for a repeatable exercise where the provider supports
them. Use provider aliases deliberately when following a moving model family;
record that an alias can change. A newer model is not automatically better for
every task, cheaper, safer, or available on a chat subscription's API plan.
Do not label one permanently hard-coded identifier “latest”.

Grok uses native authentication for now. Its model control works independently
of the three hub-managed key adapters. xAI key injection remains an acceptance
item because a long-lived leader or existing login can change credential use.

## Ownership and proposed cadence

- Before each cohort: facilitator checks launchers, login/model access, costs, public starter tasks, learner instructions and support contacts.
- Weekly: tool maintainer reviews core tool releases, deprecations and model announcements; records tested versus available versions.
- Monthly and before an image release: content owner reviews lessons and official links, accessibility feedback and new concepts worth teaching.
- Promptly on a security advisory: deployment owner triages affected OS/apps/connectors, disables risky components where needed and issues a tested fix.
- Every released image: release owner signs the manifest, testing evidence, network acceptance and recovery instructions. Name these people before a departmental rollout; roles in this document are not assigned owners.

## Promotion and rollback

1. Record the existing app Git commit, OS version, active/effective tool versions and learner-state backup procedure.
2. Inspect update source and release notes in a clean pilot image. Pin or replace dynamic bootstrap wrappers; do not copy this developer's home directory.
3. Apply approved updates only in the pilot. Run unit/HTTP and browser tests, then real tool authentication and small public model tasks with limited learning credentials.
4. Test permission prompts, MCP/plugin inventory, key forgetting/revocation, offline lessons, network separation and representative hardware. Observe a novice completing a lab.
5. Record the exact tested manifest and known limits, accept the image, then distribute through the deployment owner's chosen channel.
6. Retain a clean previous image and documented restore process. Preserve learner work separately; never embed it or live credentials into release media.

## Source control and collaboration

The source is published on GitHub. Keep source, tests, documentation and image
recipes in Git; exclude credentials, learner files, reports and machine state.
Decide shared access, licence, branch protection and release ownership. A
gitignore is not a secret scanner: review staged diffs and release artefacts.

Use reviewed pull requests once a shared repository exists. Require checks
before merging; tag accepted releases and link each image manifest to the exact
commit. ARCHITECTURE.md explains boundaries; AGENTS.md gives coding assistants
the same safeguards as human contributors.
