# AISI AI Labs

An Australian AI Safety Institute launchpad for APS professional development
and personal upskilling with contemporary AI tools. Built fresh alongside the
original `AISI-AI-Learning-Labs` application.

**Input ONLY public information. Never use OFFICIAL or other non-public material.
NEVER connect these learning laptops to government networks or systems.**
Use a separate non-government learning network and dedicated learning accounts.
The supplied fictional examples are public practice material.

## Programme and deployment documentation

- [Programme charter](docs/PROGRAMME.md)
- [Learner guide](docs/LEARNER_GUIDE.md)
- [Department deployment and image plan](docs/DEPLOYMENT.md)
- [Credentials and configuration](docs/CREDENTIALS.md)
- [Curriculum and maintenance](docs/CURRICULUM.md)
- [Open-model field guide](docs/OPEN_MODELS.md)
- [Content versioning and review skill](docs/CONTENT_MAINTENANCE.md)
- [Updates, models and releases](docs/MAINTENANCE.md)
- [Critical review and outstanding release gates](docs/REVIEW.md)
- [Architecture](ARCHITECTURE.md), [contributing](CONTRIBUTING.md), [agent guidance](AGENTS.md)

The app's Programme & guides tab includes the programme, learner, deployment,
credentials, curriculum, open-model, content-maintenance and update guides. It
also includes the improvement schedule. The architecture, critical review,
contributing and agent guidance are available in this repository. The application
does not enforce network separation. A departmental image still needs to be
built, tested and accepted by its deployment owner; this repo is not that image.

## Install on an Omarchy computer

```sh
git clone https://github.com/mkuiper/aisi-labs.git ~/AISI-labs-2
~/AISI-labs-2/install.sh
```

`install.sh` adds the **AISI AI Labs** launcher entry pointing at wherever the
repository was cloned. Update later with `git -C ~/AISI-labs-2 pull`, then
`python3 ~/AISI-labs-2/launch.py --restart --no-open`.

## Open the app

Search **AISI AI Labs** in the Omarchy application launcher, or run:

```sh
python3 ~/AISI-labs-2/launch.py
```

The launcher starts a Python service on `127.0.0.1:8768` if necessary, then
opens an Omarchy browser app window. Python 3, Omarchy, Chromium and Ghostty
are available on the target machine. No package installation is required.
Closing the window leaves the small local service running until logout/reboot
or until its process is stopped. The launcher reuses it on the next visit.

## What is included

- A launchpad with 21 curated AI and desktop tools, checked for command availability.
- Five project starters: first agent session, consultation explorer, data story,
  evidence checking and an open-ended project.
- Short illustrated guides, including open models, web chat, an interactive agent-loop replay and
  a simulated terminal that never executes commands.
- Real project folders, starter files, copyable prompts, self-review checklists
  and local page previews. Projects can be reopened with different tools.
- Search, keyboard navigation, responsive layouts and local learning bookmarks.
- First-use acknowledgement and persistent public-only/no-government-network guidance.
- A Configuration tab with session-only keys for Codex, Claude Code and Gemini CLI.
- Model overrides for those three tools plus Grok, with native setup guidance for the other tools.
- Read-only local version inventory and an opt-in public release check for four core AI tools.
- Seven regular web-chat links, with explicit external-service reminders and no automatic data sharing.
- Version-controlled editorial records, an offline content audit and the `aisi-learning-review` skill for future updates.

Use **ONLY public information**. Do not enter OFFICIAL or other non-public
information. Inclusion of a tool is not agency approval for official work.

## Files and state

Source lives in this folder. Nothing is copied from or deployed over the original app.
The desktop entry is `~/.local/share/applications/aisi-labs-2.desktop`.
Learner state is under `~/.local/share/aisi-labs-2/`:

- `projects/<activity-date-id>/`: each attempt's files and `.aisi-project.json` metadata.
- `playground/`: the default working folder for standalone tool launches.
- `progress.json`: self-reported learning bookmarks for this Linux account.
- `models.json`: non-secret model preferences; empty means use native tool configuration.
- `server.log`, `launch.log`: local startup and application-launch diagnostics.

Each attempt has a new ID. No existing project is overwritten. Missing or
corrupt project metadata produces a warning and preserves the files. Corrupt
progress is preserved rather than silently replaced. Checks are self-reported;
the hub does not run or certify learner-generated code.

## Development

```sh
python3 server.py --port 8768
python3 -m unittest discover -s tests -v
node scripts/smoke.mjs
python3 scripts/check_updates.py
```

The browser smoke test needs the system Chromium and Node 22+ (for native
WebSocket support). It starts isolated temporary servers and browser profiles,
creates test projects, exercises the interface and saves screenshots to
`reports/`. It makes no model calls and opens no real AI applications.

Edit `catalogue.py` for tools, activities and lessons; `templates.py` for
starter files; `web/` for the interface. Python changes need a server restart.
Programme rules live in `policy.py`, credentials in `configuration.py`, and
the local documentation registry in `documentation.py`. Maintenance checks are in
`maintenance.py`; private atomic JSON writes are in `storage.py`.
Refresh the app after frontend changes. To restart only this app, identify its
service safely and reload the new backend with:

```sh
python3 launch.py --restart --no-open
```

Then refresh the existing app window. Restarting clears session keys and the
current acknowledgement; it preserves project files and learning bookmarks.

## Design and boundaries

The interface is a local web application backed by Python's standard library.
No frontend build, external assets, telemetry or cloud backend are required.
Learning content and authored simulations work offline. AI tools usually need
their own network access, credentials and possibly a paid subscription. A found
command is not proof of authentication or service health. Some installed user
wrappers may bootstrap their tool when opened.

The hub binds to loopback, checks the Host and Origin headers, and requires a
per-process token for mutations. It launches allowlisted tools with argument
arrays and opens project previews outside the privileged hub origin. The
terminal lesson is a simulation, not a shell API. See [Architecture](ARCHITECTURE.md)
for the HTTP boundary, path validation and other implementation details.

Project folders are **not security sandboxes**. An external tool runs with its
own permissions and the user's account. The hub does not submit prompts or
disable confirmation controls. File previews run in the user's browser; inspect
the generated content before opening it. This first version does not import
old learner progress, manage accounts, install tools, run model evaluations or
offer a complete inventory of every Omarchy desktop application. Session API
keys are scoped to three launch adapters covered by mocked tests; they are never persisted by
the hub. Closing the window does not clear them while the server is running.
See the credential guide for subprocess, shared-account and OS-storage limits.

The optional public release check contacts npm metadata endpoints only when
requested. It is not an OS updater or model-availability test and installs nothing.
Source is published at https://github.com/mkuiper/aisi-labs.
Do not distribute a laptop image before the open gates in the critical review
and deployment guide are resolved.

## Learning references

Reviewed 27 September 2026. Links are also included with the relevant lessons.

- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
- [GNU Bash manual](https://www.gnu.org/software/bash/manual/bash.html)
- [Model Context Protocol](https://modelcontextprotocol.io/docs/getting-started/intro)
- [Agent Skills](https://agentskills.io/what-are-skills)

The diagrams, project scenarios and fictional datasets were authored for this
app. Matching tool and chatbot cards use bundled SVG logos from the original
app, with text badges for missing or failed assets. Provenance and attribution
are retained in [web/logos/SOURCES.md](web/logos/SOURCES.md). No remote logo requests
are made, and the earlier app is unchanged. This is
a working preview; the next learning-design step is to observe both beginners
and experienced users trying one complete project.
