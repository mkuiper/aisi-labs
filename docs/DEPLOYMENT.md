# Department deployment guide

## Status and scope

This is a design and acceptance guide for a future departmental laptop image. The current repository is a working application, not a bootable image, network appliance or approved security configuration. No network settings on the development machine have been changed by these application updates.

## Intended architecture

Learning laptop → dedicated non-government learning network → internet AI providers.

Government networks and systems: NEVER CONNECT. There must be no route or bridge from the learning environment into them. A network using private address space is not necessarily isolated, and a network being called guest or local does not establish its suitability.

The deployment owner should specify the physical and logical separation, permitted internet access and how each device is prevented from joining government Wi-Fi, Ethernet or VPNs. Include all interfaces, USB network adapters, docks, tethering, IPv4 and IPv6. Prevent simultaneous connections that could bridge the environments. Exclude government credentials, trusted corporate network profiles, VPN clients/configurations, mounted shares, remote desktop access and internal-service connectors from the image.

This app cannot reliably infer network ownership from an SSID, IP address or connection status. Do not label the app as a certified isolated environment because its local service binds to loopback. Loopback limits access to the hub; it does not constrain applications launched from it.

## Preparing repurposed hardware

Use devices released through the department's authorised asset-reuse process. Arrange approved sanitisation before imaging so no old government data remains. Do not build the master image by cloning a staff member's existing home directory. Confirm hardware ownership, supported operating system, firmware updates and a recovery process.

Measure usability on representative older laptops: boot time, browser memory, opening a terminal tool, viewing diagrams, creating a project and using the network. Cloud inference reduces the need to run models locally, but supported browsers and tool runtimes still have hardware requirements. Record a tested hardware baseline rather than promising that every old laptop will work. Optional local models need separate memory and performance tests.

## Master image contents

- A supported, patched Omarchy installation, with a documented release/version and verified device drivers.
- AISI AI Labs source and dependencies: Python 3, Chromium, Ghostty and the desktop-launch integration; Node is used for the browser test suite.
- A curated, versioned tool manifest recording source, licence, version, launch command, authentication method and review date.
- The authored public learning material and starter datasets only.
- A desktop entry pointing to the installed launch.py and icon. Run install.sh for each learning account using the image's actual checkout. Verify the launcher under a fresh user account.
- Local support and incident contacts, a physical device label stating PUBLIC INFORMATION ONLY — NEVER CONNECT TO GOVERNMENT NETWORKS, and a brief learner induction.
- No API keys, login tokens, tool histories, projects, browser profiles, password stores, learner bookmarks, government network profiles or development-machine secrets.

Keep the service bound to 127.0.0.1. It is a per-laptop application, not a shared LAN server. Do not expose it through a reverse proxy or bind it to 0.0.0.0 for classroom use.

## Learner accounts and credential lifecycle

Prefer separate OS accounts or a managed fresh-account/reset workflow when devices are shared. The hub's acknowledgement, projects and bookmarks belong to the Linux account. A shared account gives learners access to each other's local state. Use dedicated learning provider accounts and limited credentials, allocated after installation rather than baked into the image.

Disable browser password saving for configuration fields where practical, and define a process for tool-native credential stores. Session-only hub keys can still exist in process memory, swap or a crash dump, and launched tools may retain them. Decide how disk protection, swap, crash dumps, device loss, account reset and provider revocation will be handled. The app does not supply an encrypted multi-user credential vault.

## Keeping exposure current

Maintain a stable teaching release and a small pilot group for new tools or versions. Review release notes, provenance, permissions, account requirements and compatibility before promoting a release. Apply security updates promptly through the chosen maintenance process. Keep rollback media and a manifest of what was tested.

Installed Omarchy user wrappers may download, select or update a tool when it launches. Inspect and pin that behaviour for a reproducible departmental image; do not assume the current workstation wrappers constitute a fixed release. Tool availability in the app means a launch command was found, not that the version, account or service has been validated.

## Release acceptance checklist

- Record image identifier, checksum, OS/tool versions, source locations, owner and review date.
- Verify no government information, credentials, profiles or learner state are in the master image.
- Demonstrate the intended network separation with the responsible network owner, including secondary interfaces and attempts to reconnect to prohibited networks; document tests and expected failures.
- Run backend and browser tests. Open the app from the desktop launcher under a fresh user account.
- Verify all rules, documents, offline simulations and starter files are available offline.
- Test actual terminal working directories, editor/file-manager integration and previews on target hardware.
- Test each supported authentication path with disposable learning credentials, known spending controls and a small public task. Confirm the selected model is accessible.
- Verify Forget keys and logout/reset procedures, including credentials stored by external tools.
- Test restart, rollback, update and recovery procedures.
- Observe a novice and an experienced learner complete an activity; record accessibility and usability issues.
- Publish local support/incident contacts and complete the deployment owner's release acceptance before distribution.

## What the app enforces and what it does not

The app requires an acknowledgement before its own project creation, launch and key-setting actions. It uses an allowlist of tool commands, validates local project paths, checks browser origins for mutations and avoids storing API keys on disk. It displays the public-information and network rules throughout the interface.

It does not classify input, monitor external AI sessions, block government networks, remove tool permissions, enforce spending, isolate one user from another or stop users opening tools outside the hub. Those are deployment and operational responsibilities. The acknowledgement must not be represented as a technical control for those risks.
