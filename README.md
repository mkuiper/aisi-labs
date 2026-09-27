# AISI Labs 2

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

These are also readable in the app's Programme & guides tab. The application
does not enforce network separation. A departmental image still needs to be
built, tested and accepted by its deployment owner; this repo is not that image.

## Open the app

Search **AISI Labs 2** in the Omarchy application launcher, or run:

```sh
python3 /home/mike/AISI-labs-2/launch.py
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
- Ten short illustrated guides, including an interactive agent-loop replay and
  a simulated terminal that never executes commands.
- Real project folders, starter files, copyable prompts, self-review checklists
  and local page previews. Projects can be reopened with different tools.
- Search, keyboard navigation, responsive layouts and local learning bookmarks.
- First-use acknowledgement and persistent public-only/no-government-network guidance.
- A Configuration tab with session-only keys for Codex, Claude Code and Gemini CLI.

Use **ONLY public information**. Do not enter OFFICIAL or other non-public
information. Inclusion of a tool is not agency approval for official work.

## Files and state

Source lives in this folder. Nothing is copied from or deployed over the original app.
The desktop entry is `~/.local/share/applications/aisi-labs-2.desktop`.
Learner state is under `~/.local/share/aisi-labs-2/`:

- `projects/<activity-date-id>/`: each attempt's files and `.aisi-project.json` metadata.
- `playground/`: the default working folder for standalone tool launches.
- `progress.json`: self-reported learning bookmarks for this Linux account.
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
```

The browser smoke test needs the system Chromium and Node 22+ (for native
WebSocket support). It starts isolated temporary servers and browser profiles,
creates test projects, exercises the interface and saves screenshots to
`reports/`. It makes no model calls and opens no real AI applications.

Edit `catalogue.py` for tools, activities and lessons; `templates.py` for
starter files; `web/` for the interface. Python changes need a server restart.
Programme rules live in `policy.py`, credentials in `configuration.py`, and
the local documentation registry in `documentation.py`.
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

The backend binds only to loopback, checks the Host header, and requires both
a per-process token and a same-origin request for write/launch actions. Tools
are a fixed allowlist launched with argument arrays, never shell-interpolated
user input. It cannot run arbitrary commands from browser requests. Project
IDs and preview paths are checked; project roots cannot be symlinks. Generated
HTML is opened as a separate local file, never served under the privileged
launcher's web origin. The terminal lesson is a simulation, not a shell API.

Project folders are **not security sandboxes**. An external tool runs with its
own permissions and the user's account. The hub does not submit prompts or
disable confirmation controls. File previews run in the user's browser; inspect
the generated content before opening it. This first version does not import
old learner progress, manage accounts, install tools, run model evaluations or
offer a complete inventory of every Omarchy desktop application. Session API
keys are scoped to three tested launch adapters; they are never persisted by
the hub. Closing the window does not clear them while the server is running.
See the credential guide for subprocess, shared-account and OS-storage limits.

## Learning references

Reviewed 27 September 2026. Links are also included with the relevant lessons.

- [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
- [Effective harnesses for long-running agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
- [GNU Bash manual](https://www.gnu.org/software/bash/manual/bash.html)
- [Model Context Protocol](https://modelcontextprotocol.io/docs/getting-started/intro)
- [Agent Skills](https://agentskills.io/what-are-skills)

The diagrams, project scenarios and fictional datasets were authored for this
app. The tool cards use text marks rather than third-party logo assets. This is
a working preview; the next learning-design step is to observe both beginners
and experienced users trying one complete project.
