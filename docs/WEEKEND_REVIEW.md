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
2. `ai-basics` and its glossary: accurate headlines, succinct deeper notes. Pending.
3. `web-chat` exercise and only a profile claim you have just re-read. Pending.
4. Agentic-commerce walkthrough: one clearer scene, same facts unless a primary source contradicts them. Pending.
5. Agent-loop diagram: show the cycle of goal, tool, result and check. Pending.
6. One starter project: a small public fictional task that uses a documented current tool capability. No live model call. Pending.
7. `models-costs` and `open-models`: accuracy and succinctness. Pending.
8. `tools-skills`, `memory`, `identity`, `responsible-use`: succinctness. Pending.
9. `image-video` and `reading-leaderboards`: accuracy; a diagram only if it teaches. Pending.
10. `agent-incidents`: re-read the primary disclosures and correct factual drift. No exploit procedure. Pending.
11. Monday summary: on Monday before 09:00 Canberra, summarise the log for review. No new feature. Pending.

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
