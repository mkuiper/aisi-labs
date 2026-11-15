# Weekend review — 13–16 November 2026

Working log for the paced literacy pass. This file is not a learner guide and
is not registered in the in-app document list.

Each round does one queue item, checks it, pushes `main`, and appends a note
below. Rounds stop after 09:00 Australia/Canberra on Monday 16 November 2026.
Nothing here approves deployment.

## Aim

Keep the lessons accurate and succinct, and make a path easier to see where a
picture teaches it. Projects stay public, fictional and hands-on. Boundaries
stay as written: ONLY public information, and NEVER a government network or
account.

## Graphics

Use instructional SVG or CSS in the existing palette. A picture should show a
path, a cycle or a distinction. Do not add photographic images, generated
people, new fonts, icon packs or a build step. Respect
`prefers-reduced-motion`. One graphic change per round at most.

## Queue

One item per round. Take the first item that is not done.

1. Everyday writing lessons (`prompting`, `context`, `checking`): accurate and succinct. Done.
2. `ai-basics` and its glossary: accurate headlines, succinct deeper notes. Done.
3. `web-chat` exercise and only a profile claim you have just re-read. Done.
4. Agentic-commerce walkthrough: one clearer scene, same facts unless a primary source contradicts them. Done.
5. Agent-loop diagram: show the cycle of goal, tool, result and check. Done.
6. One starter project: a small public fictional task that uses a documented current tool capability. No live model call. Done.
7. `models-costs` and `open-models`: accuracy and succinctness. Done.
8. `tools-skills`, `memory`, `identity`, `responsible-use`: succinctness. Done.
9. `image-video` and `reading-leaderboards`: accuracy; a diagram only if it teaches. Done.
10. `agent-incidents`: re-read the primary disclosures and correct factual drift. No exploit procedure. Done.
11. Monday summary: on Monday before 09:00 Canberra, summarise the log for review. No new feature. Done.

## Monday summary — 16 November 2026

Written on Monday 16 November 2026, before 09:00 Australia/Canberra. This section summarises rounds 1–10 for review. It adds no lesson, quiz, diagram, project or interface behaviour. It does not approve deployment, network isolation, accreditation, spend control or live authentication.

Quiz options, correct indexes and option_feedback were left as they were. Lesson IDs were not changed. No exploit steps, payloads or reproduction detail were added. No account was used and no model was called. This summary did not open the source pages again. The round notes list every URL that was opened.

### Teaching text

- `prompting`, `context` and `checking` are revision 5, reviewed 13 November 2026. A clear brief is not a correct reply. A handover can drop a fact. A prompt warning is not a permission control. An unmeasured benefit is not a measured zero.
- `ai-basics`, including its twelve glossary entries, is revision 3, reviewed 14 November 2026. Headlines are shorter. The pass corrected claims about API keys, context windows, tokens, training versus a prompt, and what forgetting a Labs key does.
- `web-chat` is revision 4, reviewed 14 November 2026. The community-garden prompt now includes the facts that were not supplied. `chat:chatgpt` is revision 3, reviewed the same day: Chat is for a question or conversation, and Work is for research and files. No other profile was edited. `https://claude.ai/` returned a bot check, so no Claude claim was edited.
- `models-costs` is revision 6 and `open-models` is revision 4, both reviewed 15 November 2026. A local app can still call a remote model. Ollama binds to 127.0.0.1 port 11434 by default. A name ending in `:cloud` runs on Ollama’s servers and needs an account. Open Source weights include the data information and code, not only the parameter file. Loading a pickle file can execute code. Memory figures follow Hugging Face’s 8-billion-parameter example. Most GGUF files expand when loaded in Transformers. The Qwen3-0.6B card text that was read did not show a licence label. Both diagrams were left as they were. The Open-model field guide was not re-read.
- `tools-skills`, `memory`, `identity` and `responsible-use` are each revision 4. This was wording only. Their 13 November 2026 dates and fingerprints were not refreshed, because the sources and exercises were not re-read, so those four records stay visibly changed. A tool, an MCP connection and a skill stay separate. Context, a saved note and retrieval stay separate. Identity text is not a permission control. The permissions lesson still says public information only and never a government network.
- `image-video` and `reading-leaderboards` are revision 3, reviewed 15 November 2026. One website can hold several models. Midjourney creations can appear on Explore by default. A Content Credentials label is not proof. ComfyUI’s docs also describe cloud and partner calls. A model is not an endpoint. Arena intervals can overlap. SWE-bench charts cost and step limits. The 2022 HELM post is a snapshot. The leaderboard diagram text was not changed. The media diagram still has three steps and says generation is optional.
- `agent-incidents` is revision 2, reviewed 15 November 2026. Artifactory is the package-registry proxy in OpenAI’s ExploitGym evaluation environment, not a Hugging Face service. Hugging Face’s recovered window is 9–13 July 2026 UTC, about 17,600 actions, five challenge-related datasets and service credentials. Pickle, Spaces secrets and CVE-2025-5120 stay separate advisories, without a bypass method. EchoLeak keeps CVE-2025-32711, Microsoft’s 9.3 score and the pre-disclosure patch claim, and also records NVD’s 7.5 score. The image-link method and the command flag in the worked example were removed. The review note still says the incident map was not edited. A later commit the same day changed the map only: it uses that window, states both scores, and no longer shows a sample outbound request. The lesson text and fingerprint were not changed by that map edit.

### Diagrams and the one lab

- Agentic commerce draws the fictional cart on one scale against the $50 cap. $42 sits inside the line, $68 continues past it, and the cap stays dashed until the approved path signs it. The rejected last step still says settled $0. Both ends of the cart bar are rounded. `lesson:agentic-commerce` remains revision 2, reviewed 13 November 2026. Its fingerprint was not refreshed. No source URL was opened for that round.
- The agent view is a cycle of goal, tool, result and check. A failed check returns to the goal. Simple chat stays one turn. `lesson:chat-agents` remains revision 3, reviewed 13 November 2026. Its fingerprint was not refreshed. No source URL was opened for that round.
- `lab:first-steps` is revision 2, reviewed 15 November 2026. The brief is a fictional Harbour Library afternoon on Saturday, 2 pm to 4 pm, with three named activities and no address. It can be completed by editing index.html, with no account. The optional path uses Claude Code plan mode and says not to enable bypass permissions or auto mode. The `starters` bundle record is still dated 13 November 2026. Its fingerprint was left unchanged because the other starter files were not re-read, so that bundle stays visibly changed.

### Checks the log records

Each content round ran the unit/HTTP tests and `node --check` on `web/app.js`, `web/programme.js` and `web/feedback.js`. The browser smoke test ran when the interface changed: the commerce diagram, the agent-loop diagram, the open-models review date, the image-video diagram, and the incident-map follow-up. Rounds that did not change the interface did not run smoke.

The content-inventory test uses 15 November 2026 as its fixed date, on or after the newest recorded review. A review date of 2099 is still rejected. That test does not prove the lessons are accurate.

### Not established

No round signed in, paid, generated media, replayed an incident or called a model. These fetches did not return a usable body: the 21 July OpenAI page (403), the MSRC EchoLeak page (title only), Aim’s EchoLeak post (403), `https://claude.ai/` (a bot check), and the NVD HTML page (the site home title; the CVE JSON API was read instead). `https://huggingface.co/blog/wiz-partnership` returned 404. Provider price pages were not opened. Round 8 opened no source page. The pass does not show that a given install is in plan mode, that a local Ollama process is listening, or that a leaderboard rank is current.

### Commits on main

- `3659cc8` Tighten the everyday writing lessons.
- `64c07d5` Tighten AI basics and the glossary.
- `994c457` Complete the web-chat prompt.
- `9199a6e` Show the cart against the cap.
- `f996806` Round the ends of the commerce cart bar.
- `2772dbc` Show the agent loop as a cycle.
- `4df5c5a` Fill in the library afternoon.
- `d5744ad` Correct where models run and what open means.
- `d393863` Shorten tools, memory, identity and permissions.
- `851b6d4` Separate the model from the picture and the score.
- `9ccc556` Separate the evaluation escape from the Hugging Face intrusion.
- `10793ab` Align the incident map with the reviewed dates.

## Round notes

Append one section per round. Include the commit, what changed, what you
checked, what you did not check, and any source you opened.

### Round 1 — Tighten the everyday writing lessons

- Commit subject: Tighten the everyday writing lessons.
- Changed: wording in `prompting`, `context` and `checking` (catalogue.py),
  their review records (revision 5, same-day fingerprints) and the changelogs.
  Quiz options, correct indexes and option_feedback were left as they were.
- Checked: re-read each lesson and its exercise; `python3 -m unittest discover -s tests -q`;
  `node --check` on `web/app.js`, `web/programme.js` and `web/feedback.js`.
  No interface change, so the browser smoke test was not required.
- Not verified: live chatbot replies, other providers’ prompting pages, and
  whether any product’s summary step keeps a particular fact. No account and
  no model call.
- Sources opened:
  - https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
  - https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
  - https://genai.owasp.org/llmrisk/llm01-prompt-injection/
  - https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations

### Round 2 — Tighten AI basics and the glossary

- Commit subject: Tighten AI basics and the glossary.
- Changed: headlines and deeper notes in `lesson:ai-basics` (`content/lessons.json`),
  its review record (revision 3, reviewed 2026-11-14) and the changelogs.
  Quiz options, the correct index and option_feedback were left as they were.
  The inventory test’s fixed date moved from 13 to 14 November 2026 so today’s
  review is not treated as future. The 2099 rejection check is unchanged.
- Checked: re-read the lesson, the twelve glossary entries and the registration
  question; `python3 -m unittest discover -s tests -q`; `node --check` on
  `web/app.js`, `web/programme.js` and `web/feedback.js`. No interface change,
  so the browser smoke test was not required.
- Not verified: provider price pages, key rules other than the Google Cloud
  page, or a live summary that drops a fact. No account and no model call.
- Sources opened:
  - https://developers.google.com/machine-learning/glossary
  - https://developer.mozilla.org/en-US/docs/Glossary/API
  - https://docs.cloud.google.com/docs/authentication/api-keys
  - https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
  - https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations

### Round 3 — Complete the web-chat prompt

- Commit subject: Complete the web-chat prompt.
- Changed: the `web-chat` exercise prompt and steps, and one `chat:chatgpt`
  sentence (`useful_for`) that distinguishes Chat from Work. Review records
  for those two units only. Quiz and every other profile were left as they were.
- Checked: the exercise still has fictional facts, an offline sample and three
  checks; `python3 -m unittest discover -s tests -q`; `node --check` on
  `web/app.js`, `web/programme.js` and `web/feedback.js`. No interface change,
  so the browser smoke test was not required.
- Not verified: which modes a learning account shows, or a live reply. No
  account and no model call. `https://claude.ai/` returned a bot check, so no
  Claude claim was edited.
- Sources opened:
  - https://learn.chatgpt.com/docs/web
  - https://learn.chatgpt.com/docs/web.md
  - https://claude.ai/

### Round 4 — Show the cart against the cap

- Commit subject: Show the cart against the cap.
- Changed: `#commerce-diagram` now draws the fictional cart on one scale against
  the $50 cap. $42 sits inside the line, $68 continues past it, and the cap
  mark stays dashed until the approved path signs it. The rejected last step
  still says settled $0. The four layers, five steps and payload text are
  unchanged. Lesson text and the `lesson:agentic-commerce` fingerprint were
  not refreshed.
- The web-profile smoke check now requires each profile’s stored review date,
  so ChatGPT’s 14 November 2026 record is accepted. It still fails if that
  date is missing from the page.
- Checked: `python3 -m unittest discover -s tests -q` (74 tests); `node --check`
  on `web/app.js`, `web/programme.js` and `web/feedback.js`; `node scripts/smoke.mjs`.
- Not verified: live payment networks, protocol pages, or a signed-in checkout.
  No account, payment or model call. No source URL was opened, so the authored
  amounts and protocol names were left as they were.
- Follow-up the same day: the over-cap bar had square ends. A mask now rounds
  both ends of the cart, and the smoke check expects “Settled $0” on the
  rejected last step.

### Round 5 — Show the agent loop as a cycle

- Commit subject: Show the agent loop as a cycle.
- Changed: the agent view in `#agent-diagram` is now a cycle of goal, tool,
  result and check. A failed check returns to the goal. Simple chat stays one
  turn. The five authored steps and the lesson text are unchanged. The
  `chat-agents` review fingerprint was not refreshed.
- Checked: `python3 -m unittest discover -s tests -q` (74 tests); `node --check`
  on `web/app.js`, `web/programme.js` and `web/feedback.js`; `node scripts/smoke.mjs`.
  Smoke also checks that the cycle shows Check and the return arrow.
- Not verified: a live agent run, or the cited harness pages. No account and
  no model call. No source URL was opened, so the lesson claims were left as
  they were.

### Round 6 — Fill in the library afternoon

- Commit subject: Fill in the library afternoon.
- Changed: `lab:first-steps` only. The brief is a fictional Harbour Library
  afternoon on Saturday, 2 pm to 4 pm, with three named activities and no
  address. The page can be completed by editing index.html, with no account.
  The optional path uses Claude Code plan mode and says not to enable bypass
  permissions or auto mode for the exercise. Review record revision 2, reviewed
  2026-11-15. The starter bundle’s other files were not re-read, so its old
  date and fingerprint remain. The inventory test date is 15 November 2026.
  The 2099 rejection check is unchanged.
- Checked: `python3 -m unittest discover -s tests -q` (74 tests); `node --check`
  on `web/app.js`, `web/programme.js` and `web/feedback.js`. No interface
  change, so the browser smoke test was not required.
- Not verified: a Claude Code session, which mode a given install starts in,
  or another assistant’s plan command. No account and no model call.
- Sources opened:
  - https://code.claude.com/docs/en/permission-modes.md

### Round 7 — Correct where models run and what open means

- Commit subject: Correct where models run and what open means.
- Changed: wording in `models-costs` (catalogue.py) and `open-models`
  (content/lessons.json), their review records, and the open-models smoke
  date check. `models-costs` is revision 6, reviewed 2026-11-15. A local app
  can still call a remote model. Ollama binds to 127.0.0.1 port 11434 by
  default. A `:cloud` name runs on Ollama’s servers and needs an account.
  Repeated tool steps can resend earlier text. Removed encrypted-HTTPS for
  every turn, a cached-input discount, and internal reasoning tokens.
  `open-models` is revision 4, reviewed 2026-11-15. Open Source weights
  include data information and code, not only the parameter file. Pickle can
  execute code when loaded. Memory figures use Hugging Face’s 8-billion
  parameter example. Most GGUF files expand when loaded in Transformers.
  Quiz options and option_feedback are unchanged. The cloud diagram and the
  release-versus-location diagram were left as they were.
- Checked: `python3 -m unittest discover -s tests -q` (74 tests); `node --check`
  on `web/app.js`, `web/programme.js` and `web/feedback.js`; `node scripts/smoke.mjs`.
  Smoke expects the open-models review date 2026-11-15.
- Not verified: a live Ollama process, which endpoint a given install uses,
  a provider price page, or the Qwen3-0.6B licence label. The card text read
  here did not show one. The Open-model field guide was not re-read. No
  account, download or model call.
- Sources opened:
  - https://developers.google.com/machine-learning/glossary
  - https://docs.ollama.com/faq
  - https://docs.ollama.com/cloud
  - https://docs.ollama.com/cloud/models.md
  - https://opensource.org/ai/open-source-ai-definition
  - https://huggingface.co/docs/hub/model-cards
  - https://huggingface.co/docs/transformers/quantization/overview
  - https://huggingface.co/docs/hub/security-pickle
  - https://huggingface.co/docs/safetensors/en/index
  - https://huggingface.co/Qwen/Qwen3-0.6B

### Round 8 — Shorten tools, memory, identity and permissions

- Commit subject: Shorten tools, memory, identity and permissions.
- Changed: wording in `tools-skills`, `memory`, `identity` and
  `responsible-use` (catalogue.py) and their review records. Each revision
  is 4. The 13 November review dates and fingerprints are unchanged, because
  the sources and exercises were not re-read. The records stay visibly
  changed. A tool, an MCP connection and a skill stay separate. Context, a
  saved note and retrieval stay separate. Identity text is not a permission
  control. The permissions lesson still says public information only and
  never a government network. Quiz options and option_feedback are unchanged.
  No diagram.
- Checked: `python3 -m unittest discover -s tests -q` (74 tests); `node --check`
  on `web/app.js`, `web/programme.js` and `web/feedback.js`. No interface
  change, so the browser smoke test was not required.
- Not verified: current MCP, Agent Skills, OpenClaw or OWASP pages. No
  account and no model call.
- Sources opened: none.

### Round 9 — Separate the model from the picture and the score

- Commit subject: Separate the model from the picture and the score.
- Changed: `image-video` and `reading-leaderboards`, their review records
  (revision 3, reviewed 2026-11-15), and the image-video diagram. One website
  can hold several models. Midjourney creations can appear on Explore by
  default. A Content Credentials label is not proof. ComfyUI docs also
  describe cloud and partner calls. The media diagram still has three steps
  and now says generation is optional. Leaderboards: a model is not an
  endpoint, Arena intervals can overlap, and SWE-bench charts cost and step
  limits. The 2022 HELM post is a snapshot. Its diagram text is unchanged.
  Quiz options and option_feedback are unchanged.
- Checked: `python3 -m unittest discover -s tests -q` (74 tests); `node --check`
  on `web/app.js`, `web/programme.js` and `web/feedback.js`; `node scripts/smoke.mjs`.
  Smoke still expects three diagram nodes and now expects the media caption
  to say a label does not prove the picture.
- Not verified: a Firefly, Runway, Midjourney or ComfyUI session, a current
  credit price, or a live leaderboard ranking. Pinta, Blender and OBS were
  not re-checked. No account, generation, benchmark run or model call.
- Sources opened:
  - https://www.adobe.com/products/firefly.html
  - https://help.runwayml.com/hc/en-us/articles/37425232841875-Getting-Started-with-Generative-Video
  - https://docs.midjourney.com/hc/en-us/articles/28014645615373-Keeping-Your-Creations-Private
  - https://docs.comfy.org/
  - https://artificialanalysis.ai/methodology
  - https://arena.ai/blog/ranking-method
  - https://www.swebench.com/
  - https://crfm.stanford.edu/2022/11/17/helm.html

### Round 10 — Separate the evaluation escape from the Hugging Face intrusion

- Commit subject: Separate the evaluation escape from the Hugging Face intrusion.
- Changed: `agent-incidents` only, revision 2, reviewed 2026-11-15. Artifactory is the OpenAI evaluation proxy, not a Hugging Face service. Hugging Face’s recovered window is 9–13 July 2026 UTC, about 17,600 actions, five challenge-related datasets and service credentials. Pickle, Spaces secrets and CVE-2025-5120 are separate advisories, without a bypass method. Invariant Labs stays names, impacts and the one-repository defence. EchoLeak keeps the CVE, Microsoft’s 9.3 score and the pre-disclosure patch claim, and now records NVD’s 7.5 score. The image-link method and the command flag in the worked example were removed. Quiz options and the correct index are unchanged. The incident map was not edited.
- Checked: `python3 -m unittest discover -s tests -q`; `node --check` on `web/app.js`, `web/programme.js` and `web/feedback.js`. No interface change, so the browser smoke test was not required.
- Not verified: a live Hugging Face, OpenAI, GitHub, Microsoft or Modal account. No incident replay and no model call. The 21 July OpenAI page returned 403 to a direct fetch. MSRC returned a title only. Aim’s EchoLeak post returned 403. The NVD HTML page returned the site home title; the CVE JSON API was read instead. The old Wiz URL returned 404. OWASP LLM01 was not re-opened. Follow-up the same day: the map now says 9–13 July 2026 UTC, states both EchoLeak scores, and no longer shows a sample outbound request.
- Sources opened:
  - https://huggingface.co/blog/security-incident-july-2026
  - https://huggingface.co/blog/agent-intrusion-technical-timeline
  - https://openai.com/index/hugging-face-incident-and-the-road-ahead/
  - https://huggingface.co/blog/hugging-face-wiz-security-blog
  - https://huggingface.co/blog/space-secrets-disclosure
  - https://huggingface.co/docs/hub/en/security-pickle
  - https://huggingface.co/docs/smolagents/tutorials/secure_code_execution
  - https://github.com/advisories/GHSA-6v92-r5mx-h5fx
  - https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks
  - https://invariantlabs.ai/blog/mcp-github-vulnerability
  - https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2025-32711

### Round 11 — Summarise the weekend log

- Commit subject: Summarise the weekend literacy log.
- Changed: the Monday summary above. No lesson, quiz, diagram, project or interface change. Queue item 11 is done.
- Checked: the summary against `content/reviews.json` and `git log` on this checkout. Canberra time at the start was Monday 16 November 2026, 01:43 AEDT. `python3 -m unittest discover -s tests -q` (74 tests); `node --check` on `web/app.js`, `web/programme.js` and `web/feedback.js`. No interface change, so the browser smoke test was not run.
- Not verified: the primary sources listed in rounds 1–10 were not re-opened. The diagrams were not re-tested in a browser. No account and no model call.
- Sources opened: none.
