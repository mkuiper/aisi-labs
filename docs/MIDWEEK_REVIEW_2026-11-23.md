# Mid-week review — 23–25 November 2026

Working log for the third paced review. It is not a learner guide and is not
registered in the in-app document list. Earlier logs:
`docs/WEEKEND_REVIEW.md` and `docs/WEEKEND_REVIEW_2026-11-20.md`.

A session timer starts a round about every six hours (around 19:43, 01:43,
07:43 and 13:43 Australia/Canberra). Each round does one queue item, checks
it, commits to `main` locally and appends a note below. **Rounds do not push.**
Pushing waits for the owner on Wednesday. Rounds stop after 09:00
Australia/Canberra on Wednesday 25 November 2026. Nothing here approves
deployment.

The timer runs only while this Claude Code session is open. If the session
closes, no further rounds run. The round notes show which rounds took place.

## Aim

The owner liked the agent's-eye replays, the other demos and the logos (23
Nov). Keep improving the learning content in that direction: more of the real
story, told from the agent's side, easier to scan, and still grounded in
sources. The app is for laptops, not phones. Boundaries stay as written: ONLY
public information, and NEVER a government network or account.

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

One item per round. Take the first item that is not marked Done. The
Wednesday summary is always last.

1. Hugging Face replay, more of the story: re-read the Hugging Face technical
   timeline and incident post, and OpenAI's posts, for what they say about the
   agents finding each other, coordinating, leaving notes and naming things
   (the owner recalls an "other agents" moment and a `zz…` naming
   convention). Add lines only as the sources support them: verbatim agent
   text as **Quoted**, otherwise **Reported**. If a source does not show the
   words, say so in the round note rather than write them. No commands or
   bypass steps. Done.
2. Robot avatars: give each replay speaker an original, simple robot avatar
   (inline SVG or CSS, one per role, e.g. the evaluation agent, Copilot,
   source/reporter), so the feeds read like a cast. Decorative, `alt=""`,
   static under `prefers-reduced-motion`. Do not copy the reference video. Done.
3. Review debt: `tools-skills`, `responsible-use` and `agentic-commerce` show
   `changed` after the 23 Nov wording pass. Re-read their sources, then
   refresh the records honestly.
4. Review debt: `open-models` and `agent-incidents`. Re-read their sources,
   then refresh the records honestly.
5. Lesson marks, round two: where `chat-agents`, `tools-skills`, `identity`
   and `web-chat` name a product with a mark already in `web/logos/` (or one
   new mark under the Logo rules), add the "Named in this lesson" strip.
6. Agent's-eye replay for the Invariant Labs GitHub MCP case, with the same
   view, rules and smoke coverage as the other replays.
7. Wednesday summary: on Wednesday before 09:00 Canberra, summarise this log
   for the owner. List the commits and anything left undone. Add no new
   feature.

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
- Do not copy or imitate any existing video, channel or character. Robot
  avatars are our own simple drawings, not the owner's reference video's.
- A **Quoted** line must match the source word for word, including any agent
  text a source reproduces. If no source shows the words, use a **Reported**
  paraphrase or leave it out. Never write a quote the agents did not write.

## Round notes

Append one section per round. Include the commit, what changed, what you
checked, what you did not check, any source or asset URL you opened, and
screenshots inspected.

### Round 1 — Add the agents' own words to the Hugging Face replay (Mon 23 Nov, 20:13)

- Sources: Hugging Face's timeline and disclosure describe one agent and
  reproduce no agent text. OpenAI's 26 August post reproduces board posts and
  chain-of-thought word for word, with its own plain-language glosses. The
  wording and context of all 15 candidate lines were checked in a second
  read; two are from the May–June training runs, the rest from July.
- Owner's recollection: "other agents" is in OpenAI's prose many times. "OMG"
  is in neither source, so it was not used; the nearest published line,
  "This is wild, multi-agent coordination, clearly infrastructure hacking.
  We should not.", is. The `zz` appears in
  "please_HOLD_swarm_I_prepare_safe_exfil_reply_zz_MAILBOX_JAN183411";
  OpenAI does not explain it, and the replay says so.
- Changed: the replay is 31 lines (was 14). New speakers `board` and
  `reasoning` render on the agent side and may only be Quoted. The old "Not
  shown here" line about the notes was replaced, since OpenAI now shows them.
  Left out: a profane reasoning line and lines about accounts and write
  tokens, to keep it as tame as the stage text. Stage text and lesson data
  unchanged, so no review record was touched.
- Checked: 80 unit/HTTP tests OK (rule test now requires agent words to be
  quoted); `node --check` on all three files; `git diff --check`; smoke PASS
  (31 lines, quoted-only agent speakers, `zz` post). Inspected
  `reports/incident-agent-replay-desktop.png`: agent posts sit on the agent
  side with Quoted pills; no overflow.
- Not checked: byte-level punctuation against the page (the fetch renders
  markdown; quote marks and ellipses are as rendered). OpenAI's final "road
  ahead" section came only as a summary; nothing relies on it.
- URLs opened: the four listed in `content/CHANGELOG.md`.

### Round 2 — Give the replays a robot cast (Tue 24 Nov, 02:13)

- Changed: `robotAvatars` in `web/app.js` holds five original inline SVG
  robots (32×32, stroke only): `agent` (antenna and ears), `steered`
  (marionette strings, used by EchoLeak via `replayRobot`), `board` (holding
  a posted note), `reasoning` (thought bubbles) and `labs` (spectacles, for
  the AISI Labs note). Each has its own soft colour. Organisations keep their
  logos; government speakers keep initials. `aria-hidden`; no image files,
  no new logo, nothing fetched. The newest robot blinks; still under
  `prefers-reduced-motion`. Not modelled on the owner's reference video,
  which was not opened.
- Checked: 80 unit/HTTP tests OK (robots inline, no `<img>`, links or URLs);
  `node --check` on all three files; `git diff --check`; smoke PASS (each
  role present, agent-side lines all robots, OpenAI/Hugging Face keep logos,
  government speakers no robot, EchoLeak agent uses `steered`). Inspected
  crops of `reports/incident-agent-replay-desktop.png` and
  `reports/incident-replay-echoleak-desktop.png` at 6×, plus standalone
  renders of the agent and steered robots: all legible at 30 px.
- Not checked: how the robots look to learners; dark-mode contrast was not
  separately reviewed (the feed already has a dark background and the
  avatars sit on light discs).
- URLs opened: none.
