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
   bypass steps.
2. Robot avatars: give each replay speaker an original, simple robot avatar
   (inline SVG or CSS, one per role, e.g. the evaluation agent, Copilot,
   source/reporter), so the feeds read like a cast. Decorative, `alt=""`,
   static under `prefers-reduced-motion`. Do not copy the reference video.
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
