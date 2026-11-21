# Weekend review — 20–23 November 2026

Working log for the second paced review. It is not a learner guide and is not
registered in the in-app document list. The first weekend's log is
`docs/WEEKEND_REVIEW.md`.

A session timer starts a round about every six hours (around 01:15, 07:15,
13:15 and 19:15 Australia/Canberra). Each round does one queue item, checks
it, commits to `main` locally and appends a note below. **Rounds do not push.**
Pushing waits for the owner on Monday. Rounds stop after 09:00
Australia/Canberra on Monday 23 November 2026. Nothing here approves
deployment.

The timer runs only while this Claude Code session is open. If the session
closes, no further rounds run. The round notes show which rounds took place.

## Aim

Review and polish the learning material with the learner's experience in mind.
Make it accurate, succinct and easy to follow on a laptop screen. The app is
built for laptop work, not phones. Where a
lesson names an organisation or product, show its real mark next to the name
so the material is easier to scan. Boundaries stay as written: ONLY public
information, and NEVER a government network or account.

## Logo rules

- Reuse a mark already in `web/logos/` first.
- A new mark must come from a collection the app already uses:
  - Simple Icons 16.33.0 (CC0), from `https://unpkg.com/simple-icons@16.33.0/icons/`
  - Lobe Icons 1.95.1 (MIT), from `https://unpkg.com/@lobehub/icons-static-svg@1.95.1/icons/`
- Record each new mark in `web/logos/SOURCES.md` with its URL and sha256, and
  disclose the fetch in the round note.
- Serve marks locally through the exact `/logos/<name>.svg` allowlist. The page
  never fetches a remote image.
- Marks are decorative (`alt=""`) next to a visible name, and fall back to text.
- No government crests or agency logos: not Services Australia, Medicare, ASD,
  PM&C or AISI. Use the name in text.
- A mark identifies an organisation. It must not suggest endorsement, and it
  is never used as a link button. `SOURCES.md` keeps the trademark note.
- Do not add photos, generated people, new fonts, icon packs or a build step.
  Respect `prefers-reduced-motion`. Make at most one graphic change per round.

## Every round

- Follow `AGENTS.md` and `docs/CONTENT_MAINTENANCE.md`. Preserve lesson IDs,
  quiz indexes (unless a source shows one is wrong) and learner state.
- Refresh a review date or fingerprint only after actually re-reading that
  unit's sources and exercise.
- Do not call any model, sign in, pay or replay an incident. Do not add exploit
  steps.
- Run the unit/HTTP tests, `node --check` on `web/app.js`, `web/programme.js`
  and `web/feedback.js`, and `git diff --check`. Run `node scripts/smoke.mjs`
  and inspect the desktop screenshots whenever the interface changes.
- If a check fails and cannot be fixed within the round, revert the round's
  changes, write down why, and leave the item not done.
- Update `CHANGELOG.md`, `content/CHANGELOG.md` and `ARCHITECTURE.md` when
  the change warrants it.

## Queue

One item per round. Take the first item that is not marked Done. The Monday
summary is always last.

Dropped by the owner on 20 November, because the app is for laptops: a
phone-width first-visit pass and a phone-width reading-load pass.

1. Incident organisation marks: in the five incident cases, show the marks of
   the organisations involved next to their names. Hugging Face, OpenAI and
   Microsoft (Copilot) are already bundled; GitHub would be new, from Simple
   Icons. Medicare uses text only for the government side. Done.
2. Lesson product marks: where `models-costs`, `open-models` and `image-video`
   name a bundled product (Hugging Face, Qwen, Mistral, DeepSeek, Firefly,
   Midjourney, Runway, ComfyUI), show the mark next to the name. Ollama would
   be new, from Simple Icons, if it fits. Done.
3. Agent's-eye replay (fun): add a "Watch it as the agent" view to the Hugging
   Face case. It plays the stages as a short message feed from the agent's
   side, building to the reported moment when agents left notes for each other.
   Follow the Dramatisation rules. Done.
4. Agent's-eye replay for the Medicare and EchoLeak cases, with the same view
   and the same rules. Done.
5. "You're the guardrail" game: in the agent-loop or commerce diagram, the
   learner sees five or six fictional agent requests and chooses Allow, Ask or
   Block for each. Show a running score and a one-line reason after each
   choice, then a short recap. Save nothing.
6. Review debt: `tools-skills`, `memory`, `identity` and `responsible-use`.
   Re-read their sources and exercises, then refresh the records honestly.
7. Review debt: the `starters` bundle. Re-read every starter file, then
   refresh the record.
8. Review debt: `agentic-commerce` and `chat-agents`. Re-read their sources,
   then refresh the fingerprints.
9. Accessibility of the interactive pieces, including items 3 to 5: keyboard
   order, visible focus, announcing stage changes, and reduced motion. Keep it
   to one coherent fix set.
10. Quiz feedback: every option's feedback says why it is right or wrong, in
    plain words. Change a correct index only if a source shows it is wrong.
11. Monday summary: on Monday before 09:00 Canberra, summarise the log for the
    owner. List the commits and anything left undone. Add no new feature.

## Dramatisation rules

The aim is the energy of a story told from the agent's side, without inventing
facts.

- Every line carries a label. **Dramatised** marks narration we wrote.
  **Quoted** or **Reported** marks a line from a source, linked to it.
- A dramatised line may only restate something the case's sources support.
  It must not invent motives, feelings presented as fact, dialogue between
  agents, numbers or times.
- Put a visible note on the view: "Dramatised retelling. The facts are in the
  stages and sources."
- Show no commands, payloads, credentials or bypass steps. Keep it as tame as
  the existing stage text.
- Pace the feed with typing dots and short delays, with Play, Pause and Skip.
  Under `prefers-reduced-motion`, show every message at once. No sound and no
  autoplay.
- Do not copy or imitate any existing video, channel or character.

## Round notes

Append one section per round. Include the commit, what changed, what you
checked, what you did not check, any source or asset URL you opened, and
screenshots inspected.

### Round 0 — Commit the incident work and set up the log (Fri 20 Nov, 18:45)

- Commit `3d0fd8c`: Add the Medicare case and evidence labels to the incident
  explainer. This is the 18 November work, committed at the owner's request.
- Checked: unit/HTTP tests OK, `node --check` on app.js and programme.js, and
  `git diff --check` clean. The smoke test passed on 18 November with the same
  interface code.
- This log and the six-hourly timer were set up. Nothing was pushed.

### Round 1 — Show organisation marks in the incident cases (Fri 20 Nov, 19:43)

- Changed: each of the five incident cases has an "Organisations in this case"
  strip under the case tabs. Every entry shows a visible name and a short role.
  OpenAI, Hugging Face, GitHub and Microsoft 365 Copilot use bundled marks
  (decorative, `alt=""`, text fallback if the image fails). Services Australia,
  Wiz Research, Invariant Labs, Aim Security and Modal are text only. No
  government crest or agency logo.
- New `org` mapping in `logos.py`, served through the existing exact
  `/logos/<name>.svg` allowlist. New asset `web/logos/github.svg`, provenance
  in `web/logos/SOURCES.md`.
- Roles restate what the case's existing sources say (for example, Modal's
  endpoint was used as a launchpad and Modal was not compromised). No lesson
  text, quiz, review record or fingerprint changed.
- Tests: a new unit test checks that every mark key used by the incident cases
  exists in the `org` mapping, and that the mapping has no government entries.
  The smoke test checks that the marks load from `/logos/`, have empty alt
  text, sit beside visible names, that Medicare shows Services Australia as
  text, and that the MCP case shows the GitHub mark.
- Checked: 76 unit/HTTP tests OK; `node --check` on `web/app.js`,
  `web/programme.js` and `web/feedback.js`; `git diff --check`; smoke PASS.
  Inspected `reports/incident-breakout-held-desktop.png`: the strip sits
  between the tabs and the map with no overlap.
- Not checked: brand-use guidelines beyond the source note. They are for the
  existing distribution review before any image is published.
- URLs opened: https://unpkg.com/simple-icons@16.33.0/icons/github.svg and
  https://unpkg.com/simple-icons@16.33.0/data/simple-icons.json (GitHub entry
  only).

### Round 2 — Show product marks in three lessons (Sat 21 Nov, 01:43)

- Changed: `models-costs`, `open-models` and `image-video` open with a "Named
  in this lesson" strip: Ollama; Hugging Face, Qwen, Ollama; Adobe Firefly,
  Midjourney, Runway, ComfyUI. Each entry has a visible name, a decorative
  mark and a role restated from that lesson's text (for example, Ollama binds
  to 127.0.0.1 by default; Midjourney creations can appear on Explore). The
  marks are not links. Mistral and DeepSeek were left out because these
  lessons do not name them.
- New `product` mapping in `logos.py` and asset `web/logos/ollama.svg`, with
  provenance in `web/logos/SOURCES.md`. The incident strip from round 1 and the
  new lesson strip share `nameStrip()` and one set of styles.
- Lesson text, quizzes, review records and fingerprints are unchanged.
- Tests: a unit test checks that every product in a strip is named in that
  lesson's text and maps to a bundled mark. The smoke test checks the exact
  marks per lesson, that they load locally, have empty alt text and visible
  names, and that a lesson without products shows no strip.
- Checked: 77 unit/HTTP tests OK; `node --check` on `web/app.js`,
  `web/programme.js` and `web/feedback.js`; `git diff --check`; smoke PASS
  (run again after one spacing fix). Inspected
  `reports/lesson-products-image-video-desktop.png` and
  `reports/open-models-desktop.png`. The first look showed the strip's label
  too close to the glossary link, so the top margin was increased.
- Not checked: brand-use guidelines, which belong to the distribution review.
  No source page was re-read, because the roles restate existing lesson text.
- URLs opened: https://unpkg.com/simple-icons@16.33.0/icons/ollama.svg and
  https://unpkg.com/simple-icons@16.33.0/data/simple-icons.json (Ollama entry
  only).

### Round 3 — Let learners watch the Hugging Face case as the agent (Sat 21 Nov, 07:43)

- Changed: the Hugging Face case has a "Step through the stages / Watch it as
  the agent" switch. The agent view is a 14-line message feed: seven
  Dramatised lines from the agent's side, three Quoted and three Reported lines
  from Hugging Face or OpenAI, and one "Not shown here" note. It builds to
  OpenAI's report that agents left notes for one another in the cache, then
  says the replay does not show what the notes said or claim that another
  agent read them. The Break the path check and sources stay below it.
- Dramatised lines restate the existing stage text and sources. They add no
  motive, feeling, conversation between agents, number or time. The motive line
  is followed by Hugging Face's own wording that it was an inference ("We
  believe…"). No command, payload, credential or bypass step.
- Controls: Play, Pause, Skip to the end, Restart, and a message count. Nothing
  plays until Play is pressed; no sound. Under reduced motion, Play shows every
  line at once and the entry animation is off. New lines are appended to a
  `role="log"` list, so only the new line is announced. The replay stops on
  view, case or route change.
- Bug found by the new smoke check and fixed before commit: Restart did not
  clear lines that were already shown.
- Tests: a unit test checks each replay line's label, that every non-note line
  links to an existing source, that quotes are in quotation marks and never in
  the agent's voice, and that lines contain no feeling or motive words and no
  command-like text. The smoke test covers no autoplay, Play, Pause holding,
  Skip (14 lines, all four labels, link attributes), Restart, reduced motion,
  switching views, and that the switch is absent from cases with no replay.
- Checked: 78 unit/HTTP tests OK; `node --check` on `web/app.js`,
  `web/programme.js` and `web/feedback.js`; `git diff --check`; smoke PASS.
  Inspected `reports/incident-agent-replay-desktop.png` after adding a short
  wait, because the first capture caught the entry animation half-faded.
- Sources re-read for the quoted lines: the Hugging Face disclosure and
  technical timeline both loaded, and each quote was matched character for
  character. The OpenAI 21 July page returned only a page shell with no
  article text, so the notes line stays Reported and attributed to OpenAI, as
  in the stage text reviewed on 15 November. The lesson text and its review
  record are unchanged.
- Not checked: a screen reader in use, which needs a person. The other cases
  get their replay in round 4.
- URLs opened:
  - https://huggingface.co/blog/agent-intrusion-technical-timeline
  - https://huggingface.co/blog/security-incident-july-2026
  - https://openai.com/index/hugging-face-model-evaluation-security-incident/ (shell only)

### Round 4 — Add agent's-eye replays to the Medicare and EchoLeak cases (Sat 21 Nov, 13:43)

- Changed: Medicare (14 lines) and EchoLeak (10 lines) now have the "Watch it
  as the agent" view. The agent is named per case: "OpenAI agent" and
  "Copilot, steered".
  - Medicare runs from the refused request on 18 June, through the Prime
    Minister's words, the files reached, OpenAI's August review and statement,
    the public-mailbox email and the 24 September announcement, to OpenAI's
    apology. A "Not shown here" line says the method has not been disclosed and
    the replay does not guess.
  - EchoLeak follows the email into retrieval and the user's access. A "Not
    shown here" line says the outbound channel is not described. It ends with
    NVD's description, both scores, Microsoft's fix and no reported
    exploitation.
- New speakers: Prime Minister Anthony Albanese, Australian Government and
  Services Australia (text initials only, no crest), plus Aim Security, NVD,
  Microsoft and The Hacker News (initials).
- Dramatised lines restate the existing stage text and add no method, motive,
  feeling, number or time. Quotes were matched against the pages that loaded
  today. Lines whose page returned 403 today keep the wording already reviewed
  in the stage text and are labelled Reported, not Quoted. That covers the
  apology (The New Daily), Aim's "LLM scope violation" and no-click claims, and
  "no evidence of malicious exploitation" (The Hacker News).
- Tests: the replay unit test now covers every case with a replay. It checks
  speakers, labels, sources, that agent lines are always Dramatised, and that
  government speakers have no logo. The smoke test opens both new replays,
  skips to the end, checks line counts, the non-disclosure lines, quote marks,
  no image on government speakers, and that a case without a replay
  (hf-advisories) shows no switch.
- Checked: 78 unit/HTTP tests OK; `node --check` on `web/app.js`,
  `web/programme.js` and `web/feedback.js`; `git diff --check`; smoke PASS.
  Inspected `reports/incident-replay-medicare-desktop.png` and
  `reports/incident-replay-echoleak-desktop.png`.
- Not checked: The Hacker News (both articles) and The New Daily returned 403,
  and MSRC was not opened. The lesson text and review record are unchanged.
- URLs opened:
  - https://www.abc.net.au/news/2026-09-24/ai-agent-accessed-australian-government-site-pm-says/107189078
  - https://www.sbs.com.au/news/article/open-ai-medicare-hack-what-we-know-and-dont-know/3qcdsqb7r
  - https://www.itnews.com.au/news/australian-medicare-data-portal-infiltrated-by-openai-agent-629149
  - https://ia.acs.org.au/article/2026/openai-agent-hacks-medicare-web-portal.html
  - https://thenightly.com.au/politics/australia/openai-medicare-attack-review-launched-into-escalation-of-cyber-breaches-after-five-day-delay-to-report-hack--c-22921450
  - https://thehackernews.com/2026/09/openai-agent-bypassed-australian.html (403)
  - https://www.thenewdaily.com.au/life/tech/2026/09/29/openai-apologise-medicare (403)
  - https://thehackernews.com/2025/06/zero-click-ai-vulnerability-exposes.html (403)
  - https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2025-32711
