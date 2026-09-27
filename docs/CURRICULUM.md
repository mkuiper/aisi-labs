# Curriculum and maintenance

## Current coverage

- Chatbots, agents and harnesses: model versus interface, tool execution, feedback loops, workflows and human review; illustrated comparison and authored replay.
- Terminal foundations: terminal versus shell versus assistant, current directory, listing files, changing directories and reading text; an offline simulation.
- Context: relevant files, source evidence, context limits and untrusted source instructions.
- Prompting: goals, evidence, boundaries and visible acceptance checks.
- Tools, MCP and skills: actions, connection protocols and reusable task guidance, with distinct roles and limitations.
- Checking: factual evidence, source tracing, software behaviour and human judgement.
- Memory: current context, persistent notes, retrieval/RAG, inspection and deletion; a small two-session comparison exercise.
- Soul and identity: tool-specific SOUL.md conventions, persona, project instructions, skills and permissions; an explicit ROLE.md comparison exercise.
- Responsible exploration: public-only information, no government connectivity, permissions, prompt injection and incident response.
- Models, tokens and where work happens: local versus cloud processing, modalities, cost, model evaluation, older hardware and reviewed updates.
- Web chat: regular chatbot sites, dedicated learning accounts, safe public prompts, external-service boundaries and comparing configurations fairly.
- Open models: weights versus open-source definitions, licence/model-card reading, local runners versus hosted inference, quantisation and hardware tradeoffs; a no-download worksheet and optional facilitator-led comparison.

These are introductory explanations and small exercises. They are not a claim to cover every emerging agent feature. Memory and identity conventions vary across tools. SOUL.md is presented as an example from a particular ecosystem, not as a universal standard or a security control.

## Practical activities

The five supplied activities cover a first agent session, a consultation explorer, a data story, evidence checking and an open project. Each uses public practice material, an explicit brief and a human review checklist. The memory and identity lessons use the open project for their experiments. Browser previews never run under the hub's privileged web origin.

## Useful next additions

Candidate extensions include a hands-on MCP connection to a public/local practice dataset, creating a simple skill, a repeatable model comparison, image/audio examples, local-model installation and a permission/sandbox demonstration. These need reviewed tools, public assets, clear costs and measurable outcomes before becoming taught activities.

## Review process

Learning material and its editorial records are in Git. Supplemental lessons and
chatbot links are in content/; existing lessons remain in catalogue.py. Use
`python3 scripts/review_content.py` to see changed, unreviewed and due units, and
invoke `$aisi-learning-review` for a source-based review or authorised refresh.
See docs/CONTENT_MAINTENANCE.md for scope, records and invocation. The skill is
on demand, not scheduled. Baseline records deliberately do not claim a fresh
source review of older material. Content revisions and dates are shown in lessons.

Assign an editorial owner and a tool-release owner. Review major tool or authentication changes before a rollout; use a regular review cycle for the rest of the catalogue. Check official sources, broken links, model availability, costs, instruction-file conventions, and whether the exercise still works for a fresh user. Record what was actually tested and the date.

Pilot new features with a small group before updating the teaching image. Keep a versioned stable release and a rollback path. Do not call tools the latest indefinitely or automatically enable new integrations simply because they exist. Exposure to current tools should come from an active maintenance process.

## Sources and authorship

Product-dependent concepts link to official documentation in the lessons, including MCP, Agent Skills, OpenClaw memory/workspace conventions, provider authentication and Bash. The programme's public-only and network rules come from the programme brief. The graphics and fictional scenarios are authored learning material, not recordings of actual model activity.

## Feedback

Ask learners what they were trying to do, where they became stuck and how they checked the result. Use public examples when recording an issue. Never include a key or non-public information in screenshots or reports. Voluntary feedback and direct observation are more useful here than treating a completion tick as evidence of competence.
