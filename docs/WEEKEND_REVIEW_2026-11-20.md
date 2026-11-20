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

One item per round. Take the first item that is not marked Done or Dropped.

1. Incident organisation marks: in the five incident cases, show the marks of
   the organisations involved next to their names. Hugging Face, OpenAI and
   Microsoft (Copilot) are already bundled; GitHub would be new, from Simple
   Icons. Medicare uses text only for the government side.
2. Lesson product marks: where `models-costs`, `open-models` and `image-video`
   name a bundled product (Hugging Face, Qwen, Mistral, DeepSeek, Firefly,
   Midjourney, Runway, ComfyUI), show the mark next to the name. Ollama would
   be new, from Simple Icons, if it fits.
3. Dropped by the owner on 20 November: the app is for laptops, so no
   phone-width journey pass.
4. Review debt: `tools-skills`, `memory`, `identity` and `responsible-use`.
   Re-read their sources and exercises, then refresh the records honestly.
5. Review debt: the `starters` bundle. Re-read every starter file, then
   refresh the record.
6. Review debt: `agentic-commerce` and `chat-agents`. Re-read their sources,
   then refresh the fingerprints.
7. Accessibility of interactive diagrams: keyboard order, visible focus,
   announcing stage changes, and reduced motion for the incident, commerce and
   agent-loop diagrams. Keep it to one coherent fix set.
8. Quiz feedback: every option's feedback says why it is right or wrong, in
   plain words. Change a correct index only if a source shows it is wrong.
9. Dropped by the owner on 20 November: no phone-width reading pass.
10. Monday summary: on Monday before 09:00 Canberra, summarise the log for the
    owner. List the commits and anything left undone. Add no new feature.

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
