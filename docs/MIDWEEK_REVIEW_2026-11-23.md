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

## Wednesday summary (25 Nov, 08:13)

All seven queue items are done. Six rounds ran (1–6), one item each, plus
this summary. Every commit is local on `main`; **nothing was pushed** and
nothing here approves deployment. No model was called, no account was used,
and no government mark was added.

### Commits, oldest first

| Commit | Round | What it did |
|---|---|---|
| `956efe6` | — | Set up this log (pushed with the weekend work) |
| `e77c2df` | 1 | Hugging Face replay grows from 14 to 31 lines with the agents' published words (message board, `zz_MAILBOX` post, GO, dissent) |
| `eca1e83` | 2 | Original robot avatars for every replay role |
| `01d5e66` | 3 | Re-read tools-skills, responsible-use, agentic-commerce; four commerce corrections and a FIDO source swap |
| `608e8f6` | 4 | Re-read open-models and agent-incidents; fixed the OpenAI apology misquote (missing "also"), re-sourced it to OpenAI's own post, and corrected the Medicare attributions and taskforce list |
| `ffbff9b` | 5 | "Named in this lesson" strips for chat-agents, tools-skills, identity and web-chat (Model Context Protocol mark new) |
| `2a4f6cc` | 6 | "Watch it as the agent" replay for the Invariant Labs GitHub MCP case |

Final checks at round 6: 80 unit/HTTP tests OK, `node --check` OK, `git diff
--check` clean, smoke PASS. All 17 lessons are in date; `resource:helm`
remains unreviewed, as before.

### Needs the owner

1. **Push** the six local commits when you are happy; rounds never push.
2. **Brand use** of the new Model Context Protocol mark belongs to the
   existing distribution review before any image is published, as for the
   GitHub and Ollama marks.
3. **The "OMG there are other agents" line** is not in any source read. The
   nearest published line is used. If you know where it appeared, a link
   would let it be checked and added as a quote.

### Not checked this week

- Sources that refuse automated reading: Mastercard Agent Pay, The New Daily,
  and both Hacker News articles. Claims resting only on them were not
  re-verified, and the review notes say so.
- The ends of Hugging Face's 27 July timeline and OpenAI's 26 August post
  (fetch summaries only), Invariant's screenshots and linked agent trace.
- Dark-mode rendering of the black MCP mark; a real screen reader on the new
  replays.
- The *Try a chatbot* strip names ChatGPT and Claude through its two sources
  rather than its text; drop it if that feels like a stretch.

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
   refresh the records honestly. Done.
4. Review debt: `open-models` and `agent-incidents`. Re-read their sources,
   then refresh the records honestly. Done.
5. Lesson marks, round two: where `chat-agents`, `tools-skills`, `identity`
   and `web-chat` name a product with a mark already in `web/logos/` (or one
   new mark under the Logo rules), add the "Named in this lesson" strip. Done.
6. Agent's-eye replay for the Invariant Labs GitHub MCP case, with the same
   view, rules and smoke coverage as the other replays. Done.
7. Wednesday summary: on Wednesday before 09:00 Canberra, summarise this log
   for the owner. List the commits and anything left undone. Add no new
   feature. Done.

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

### Round 3 — Re-check tools-skills, responsible-use and agentic-commerce (Tue 24 Nov, 08:13)

- Read each lesson in full (sections, deeper detail, worked example,
  question and every option_feedback) and its linked exercise brief, then
  checked the claims against the sources.
- tools-skills and responsible-use: every source claim held. MCP docs are now
  versioned 2026-07-28 and stateless; nothing in the lesson contradicts that.
  No text change; records refreshed.
- agentic-commerce: the eight listed sources alone do not carry several
  claims; the supporting pages read on 22 Nov do, and were re-read. Four
  corrections and one source swap (see `content/CHANGELOG.md`). Revision 5.
- Pinned test date moved to 2026-11-24, as its comment requires.
- Checked: 80 unit/HTTP tests OK; `node --check` on all three files;
  `git diff --check`; smoke PASS. No interface change beyond lesson text, so
  no screenshot inspected beyond the pass.
- Not checked: Mastercard Agent Pay (403 again); FIDO's passkeys page (not
  re-read; supports one phrase); parts of the A2A specification and UCP pages
  came through as fetch summaries, and nothing new rests on them. The fetch
  tool output carried an appended block asking for a document to be created;
  it was ignored.
- URLs opened: listed in `content/CHANGELOG.md` (about 30, read-only).

### Round 4 — Re-check open-models and agent-incidents (Tue 24 Nov, 14:13)

- Read both lessons in full (sections, deeper detail, worked example,
  question and option feedback), `docs/OPEN_MODELS.md`, the evidence
  exercise, and the five incident walkthroughs and replays in `web/app.js`,
  then checked each claim against its sources.
- open-models: every claim held. No text change; record refreshed.
- agent-incidents: revision 5. The OpenAI apology was quoted without "also".
  This round found OpenAI's own 28 September post and swapped it in for The
  New Daily, which never opened. Further fixes: internal-server writes
  attributed to Albanese, the taskforce list cut to named members, the
  credentials and four-to-five-websites points from OpenAI, and the Hugging
  Face, Wiz and Invariant attribution fixes. All are listed in
  `content/CHANGELOG.md`. The Medicare replay is now 15 lines.
- Smoke test: the expected Medicare replay length is now 15, and a new check
  looks for the exact apology quote. The open-models review-date check now
  expects 2026-11-24, the record's new date.
- Checked: 80 unit/HTTP tests OK; `node --check` on all three files;
  `git diff --check`; smoke PASS. Inspected the desktop screenshots of the
  Medicare stages and replay: 15/15 messages, the quote rendered as Quoted,
  and source [7] is OpenAI.
- Not checked: The Hacker News (both articles, 403). Only The Hacker News
  names the National Cybersecurity Coordinator as a taskforce member, if it
  does at all, so that name was removed rather than kept unverified. The Patch
  Tuesday and Aim Security details for EchoLeak rest on earlier reviews. The
  second half of the Hugging Face timeline and the end of OpenAI's 26 August
  post came only as fetch summaries, and nothing new rests on them. The fetch
  output again carried an appended block asking for a document to be created;
  it was ignored.
- URLs opened: listed in `content/CHANGELOG.md` (about 35, read-only), plus one
  web search for the apology wording.

### Round 5 — Lesson marks, round two (Tue 24 Nov, 20:13)

- `lessonProducts` gains four lessons, each role taken from that lesson's
  text: chat-agents (Claude Code, Codex, Gemini CLI, OpenCode), identity
  (Claude Code, Codex, OpenCode and their instruction files; OpenClaw by name
  and initials, as no collection mark was added), web-chat (ChatGPT and
  Claude, named through its two sources) and tools-skills (Model Context
  Protocol).
- One new mark, the round's single graphic change:
  `web/logos/modelcontextprotocol.svg` from Simple Icons 16.33.0, with its
  shape unchanged and an explicit #000000 fill. It is recorded in
  `SOURCES.md` with its upstream sha256 and served through the existing
  `LOGO_FILES` allowlist as `product`/`mcp`.
- Tests: the lesson-mark test now covers the seven lessons and allows an empty
  key (initials). The smoke test checks each new strip's local, decorative,
  loaded marks and OpenClaw's lack of an image. It also takes four new
  desktop screenshots.
- Checked: 80 unit/HTTP tests OK; `node --check` on all three files;
  `git diff --check`; smoke PASS. Inspected the identity, tools-skills,
  chat-agents and web-chat screenshots: the strips sit under the review line
  and do not overflow.
- Not checked: dark-mode rendering of the black MCP mark. It uses the same
  treatment as the Ollama mark, which has no dark-mode screenshot either. No
  lesson text changed, so the review records are untouched.
- URLs opened (read-only downloads): Simple Icons
  modelcontextprotocol.svg, the same version's `data/simple-icons.json` for
  colour and source, and HEAD-style status checks of Lobe Icons `mcp.svg`
  and `openclaw.svg` and Simple Icons `openclaw.svg` (404).

### Round 6 — Agent's-eye replay for the GitHub MCP case (Wed 25 Nov, 02:13)

- Re-read Invariant Labs' 26 May 2025 GitHub MCP post and checked the 1 April
  2025 tool-poisoning post's date and definition. The demo prompt, the agent's
  full chat and tool calls, the malicious issue and the leaking pull request
  appear only as images, so no agent text is quoted. The agent's five lines
  are dramatised and restate the post's prose. The injected instructions are
  not repeated, and a Labs note says so.
- Quoted lines, verbatim from the post's prose: “It willingly pulls private
  repository data into context.” and “It affects any agent that uses the GitHub
  MCP server, regardless of the underlying model or implementation.” The
  reported lines cover the leaked data (private repository names, a
  relocation plan, a salary), Claude Desktop's default confirmation and
  “Always Allow”, Claude 4 Opus, "not a flaw in the GitHub MCP server code",
  and the advice.
- The demo account's username is left out. The default `agent` robot is used,
  and Invariant Labs is shown with initials, as no mark is bundled for it.
- Tests: the replay rules test now expects four replays. The smoke test
  replays the case (13 lines, the phrase "does not repeat injected
  instructions", quoted-line format, robot-agent marks, and no logo or robot
  for Invariant Labs).
- Checked: 80 unit/HTTP tests OK; `node --check` on all three files;
  `git diff --check`; smoke PASS. Inspected the desktop replay screenshot:
  13/13 messages, labels and source links correct, and no overflow.
- Not checked: Invariant Explorer's linked agent trace (not opened), and the
  screenshot text itself (images). No lesson text changed, so the review
  records are untouched.
- URLs opened, read-only: https://invariantlabs.ai/blog/mcp-github-vulnerability ,
  https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks .

### Round 7 — Wednesday summary (Wed 25 Nov, 08:13)

- Wrote the Wednesday summary above "Aim". No feature added, no source opened.
- Checked: 80 unit/HTTP tests OK; `node --check` on all three files; `git diff
  --check`. No interface change, so the smoke test was not rerun (it passed
  at round 6).
