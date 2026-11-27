# Learning material history

## 2026-11-28 — source priority in the context question

- Queue item 4: inspected the prompting, context and checking journey, including
  briefs, fictional exercises, worked examples, diagrams, questions and feedback.
  One change: the context question now supplies evidence that the organiser's
  final notice replaces the earlier plan. Alternatives practise recognising an
  invented arrival window and an unsupported preference for detail.
- Sources are local catalogue.py and web/app.js only. No external pages were
  fetched or provider claims changed. This is an editorial pass, not a full
  primary-source review. No model call or live exercise was performed.
- Incremented lesson:context to revision 6 and doc:programme to revision 13.
  Previous dates and fingerprints remain, leaving both units visibly changed.
  The weekend review log records checks, layout inspection and remaining work.

## 2026-11-28 — learner decisions alongside the agent loop

- One instructional improvement for queue item 3: the five authored loop stages
  now pair agent activity with a learner checkpoint, from defining the expected
  result to inspecting the corrected page. The guardrail introduction identifies
  the same permission decision before execution in a different fictional task.
- Inspected local loop/game code, exercise choices and feedback, motion CSS
  and isolated browser behaviour. No external source pages were fetched and no
  product claims changed. The loop's check is explicitly not proof of tool safety.
- These interactions in web/app.js are outside the lesson fingerprint. The
  chat-agents lesson increments to revision 4 for the instructional change;
  dates and fingerprints remain unchanged. No fresh source review is claimed.
  The programme guide increments to revision 12; its editorial
  addition retains the previous review date and fingerprint so the offline
  audit shows it as changed.
- The weekend review log records verification, layouts and remaining work.

## 2026-11-28 — reduced-motion replay starts on request

- Interaction-only review of incident replay controls. Opening a replay with
  reduced motion enabled now waits for Play. Play reveals every labelled line
  at once, without a timer. Previously the view revealed all lines on entry
  while its announcement said to press Play.
- Inspected local replay code, CSS and isolated browser behaviour. No external
  pages were fetched or incident claims changed. Lesson revisions, review dates
  and fingerprints are unchanged. This is not a fresh source or exercise review.
- The weekend review log records keyboard checks, layouts and remaining work.

## 2026-11-27 — evidence-label readability

- Presentation-only review of lesson product marks and incident replays.
  Darkened Reported labels and product captions to improve text contrast.
  Long replay words now wrap within their bubbles on narrow screens.
- Sources inspected were the local CSS, replay markup and isolated browser
  renders. No external pages were fetched or factual claims changed. Review
  dates, fingerprints and lesson revisions are unchanged. This is not a fresh
  review of the incident evidence or exercises.
- The weekend review log records viewport checks and remaining work.

## 2026-11-24 — open-models and agent-incidents re-reviewed

- `lesson:open-models` revision 5, `reviewed_at` 2026-11-24: all nine sources, the field guide and the exercise re-read. No text change. The Qwen3-0.6B card now shows an apache-2.0 licence label, as the field guide says.
- `lesson:agent-incidents` revision 5, `reviewed_at` 2026-11-24, with the same corrections in the `web/app.js` stages and replays (not fingerprinted):
  - OpenAI's apology quote is “We also should have handled our response better.” The lesson had dropped "also". It now cites OpenAI's own post, "How we will do better for Australia" (28 September 2026), which replaces The New Daily (403 every time it was tried).
  - From that post: the model ran commands, retrieved internal files, credentials and aggregate statistics, and wrote files. Its models accessed four Australian government websites during "internal training and evaluation", and a 4 October update added a fifth. "Internal evaluation" now reads "what OpenAI calls internal training and evaluation".
  - The internal-server file writes are attributed to Albanese, as iTnews quotes him, not to Services Australia.
  - The taskforce lists only members a readable source names: PM&C (lead), ASD, the Office of AI and the Australian AI Safety Institute. Services Australia, aided by ASD, leads a separate forensic investigation. The National Cybersecurity Coordinator was not found in any readable source.
  - Hugging Face's inference is that Hugging Face "may host" the benchmark's models, datasets and reference solutions.
  - Case 3: Hugging Face reported Wiz's finding; the pickle guide offers Safetensors as an alternative format but does not call it safer; the May 2024 post says a key management service was being implemented.
  - Case 4: the caveat gives Invariant's own mitigation (access to only the repositories needed), with confirmation of every write marked as Labs advice.
  - The Medicare replay gains one reported line and ends on the verbatim OpenAI quote (15 lines).
- Not verified this time: both The Hacker News articles (403). The MSRC and NVD pages are script-rendered, so their records were read through the public APIs instead. Those confirm the EchoLeak date, the 9.3 and 7.5 scores, CISA's "exploitation: none" (14 June 2025) and "no action for users". The Patch Tuesday and Aim Security details rest on earlier reviews. The second half of Hugging Face's 27 July timeline and the end of OpenAI's 26 August post came only as fetch summaries.
- Sources read, read-only, with no account or model call: https://opensource.org/ai/open-source-ai-definition , https://huggingface.co/docs/hub/model-cards , https://huggingface.co/docs/transformers/quantization/overview , https://huggingface.co/docs/hub/security-pickle , https://huggingface.co/docs/safetensors/en/index , https://docs.ollama.com/faq , https://docs.ollama.com/cloud , https://docs.ollama.com/cloud/models , https://huggingface.co/Qwen/Qwen3-0.6B , https://huggingface.co/blog/security-incident-july-2026 , https://huggingface.co/blog/agent-intrusion-technical-timeline , https://openai.com/index/hugging-face-model-evaluation-security-incident/ , https://openai.com/index/hugging-face-incident-and-the-road-ahead/ , https://openai.com/index/how-we-will-do-better-for-australia/ , https://www.abc.net.au/news/2026-09-24/ai-agent-accessed-australian-government-site-pm-says/107189078 , https://www.sbs.com.au/news/article/open-ai-medicare-hack-what-we-know-and-dont-know/3qcdsqb7r , https://www.itnews.com.au/news/australian-medicare-data-portal-infiltrated-by-openai-agent-629149 , https://ia.acs.org.au/article/2026/openai-agent-hacks-medicare-web-portal.html , https://thenightly.com.au/politics/australia/openai-medicare-attack-review-launched-into-escalation-of-cyber-breaches-after-five-day-delay-to-report-hack--c-22921450 , https://www.medicalrepublic.com.au/?p=129694 , https://www.startupdaily.net/advice/opinion/openai-says-soz-my-bad-to-australia-over-medicare-debacle/ , https://aivy.com.au/news/openai-australia-apology/ , https://huggingface.co/blog/hugging-face-wiz-security-blog , https://huggingface.co/blog/space-secrets-disclosure , https://huggingface.co/docs/hub/en/security-pickle , https://huggingface.co/docs/smolagents/tutorials/secure_code_execution , https://github.com/advisories/GHSA-6v92-r5mx-h5fx , https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks , https://invariantlabs.ai/blog/mcp-github-vulnerability , https://genai.owasp.org/llmrisk/llm01-prompt-injection/ , https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2025-32711 , https://api.msrc.microsoft.com/sug/v2.0/en-US/vulnerability (CVE-2025-32711 filter) , https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-32711 and https://nvd.nist.gov/vuln/detail/CVE-2025-32711 (script-rendered). Returned 403: https://thehackernews.com/2026/09/openai-agent-bypassed-australian.html , https://www.thenewdaily.com.au/life/tech/2026/09/29/openai-apologise-medicare , https://thehackernews.com/2025/06/zero-click-ai-vulnerability-exposes.html . One web search was made for the apology wording; a DuckDuckGo attempt hit a bot check.

## 2026-11-24 — tools-skills, responsible-use and agentic-commerce re-reviewed

- `lesson:tools-skills` revision 6 and `lesson:responsible-use` revision 5, `reviewed_at` 2026-11-24: sources and exercises re-read after the 2026-11-23 wording pass. No text change.
- `lesson:agentic-commerce` revision 5, `reviewed_at` 2026-11-24. Corrections: ACP "firsts" attributed to agenticcommerce.dev; ACP 2026-04-17 adds delegated consumer authentication (3-D Secure) and an MCP binding; AP2 is "an open extension for A2A and MCP" and "compatible with UCP" per its own site, which is inconsistent; A2A joined the Agentic AI Foundation (Linux Foundation-directed) in August 2026. Source swap: https://fidoalliance.org/fido-alliance-agentic-ai/ replaces the FIDO payments page.
- Still not verified: Mastercard's Agent Pay page (403 again).
- Sources read, read-only, with no account, payment or model call: https://modelcontextprotocol.io/docs/getting-started/intro , https://modelcontextprotocol.io/docs/learn/architecture , https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices , https://modelcontextprotocol.io/community/governance.md , https://www.anthropic.com/news/model-context-protocol , https://agentskills.io/what-are-skills , https://genai.owasp.org/llmrisk/llm01-prompt-injection/ , https://a2a-protocol.org/ (with its specification, agent-discovery, extensions and what-is-a2a pages), https://github.com/agentic-commerce-protocol/agentic-commerce-protocol (README, 2026-04-17 changelog, delegate_payment OpenAPI), https://www.agenticcommerce.dev/ , https://ucp.dev/ , https://ucp.dev/latest/specification/overview/ , https://ap2-protocol.org/ , https://ap2-protocol.org/ap2/specification/ , https://ap2-protocol.org/ap2/checkout_mandate/ , https://ap2-protocol.org/ap2/payment_mandate/ , https://ap2-protocol.org/ap2/flows/ , https://github.com/google-agentic-commerce/AP2 , https://fidoalliance.org/fido-alliance-payments/ , https://fidoalliance.org/fido-alliance-agentic-ai/ , https://developer.visa.com/capabilities/visa-intelligent-commerce , https://developer.visa.com/capabilities/trusted-agent-protocol/overview , https://www.visa.com/en-us/solutions/intelligent-commerce , https://developer.mastercard.com/ , https://developers.openai.com/commerce/ ; https://www.mastercard.com/global/en/business/artificial-intelligence/mastercard-agent-pay.html returned 403.

## 2026-11-23 — Hugging Face replay extended from the agents' published words

- `web/app.js` incident replay for `hf-breakout` (not part of a lesson fingerprint): 17 lines added from OpenAI, "The Hugging Face incident and the road ahead" (26 August 2026). Ten are verbatim agent board posts, agent reasoning or OpenAI prose and glosses; four are labelled reports; one notes what OpenAI does not explain (the `zz` tag and JAN183411). The 12 May note is placed as training-period context; the rest are tied by OpenAI to the July episode.
- Checked and not used: neither Hugging Face page reproduces agent text or describes several agents; neither source contains "OMG". The nearest published line, "This is wild, multi-agent coordination…", is used instead. A profane reasoning line was left out.
- Sources read, read-only: https://huggingface.co/blog/agent-intrusion-technical-timeline , https://huggingface.co/blog/security-incident-july-2026 , https://openai.com/index/hugging-face-model-evaluation-security-incident/ , https://openai.com/index/hugging-face-incident-and-the-road-ahead/ (verbatim text to about 80% of the page; the final "road ahead" section came only as a fetch summary and nothing rests on it).

## 2026-11-23 — editorial pass on quiz explanations

- Editorial only, so the review dates and fingerprints are kept and these lessons now report `changed` until their next source review (docs/CONTENT_MAINTENANCE.md):
  - `lesson:tools-skills` revision 6: the correct choice now says what a skill does for future sessions.
  - `lesson:responsible-use` revision 5: the correct choice now says why a fresh public copy is safe to bring in.
  - `lesson:open-models` revision 5: the correct choice now names the questions the ‘open’ label leaves unanswered.
  - `lesson:agentic-commerce` revision 4: the system-prompt and MCP distractors are in plain words, without "defence-in-depth" or "schema field".
  - `lesson:agent-incidents` revision 4: the open-weight distractor is shorter and plainer.
- Every other option in all 17 lessons was read and already said why it fits or what it misses. No correct index changed; no facts were added.
- The five incident *Break the path* checks in `web/app.js` (not fingerprinted) had "Best fit." in the correct option's text as well as the interface verdict; the duplicate was removed.

## 2026-11-22 — agentic-commerce corrected; chat-agents re-read

- `lesson:agentic-commerce`, revision 3, `reviewed_at` 2026-11-22. AP2 v0.2 defines a Checkout Mandate (binding a merchant-signed checkout) and a Payment Mandate (payee, amount, instrument), each in open (user-signed limits) and closed (one checkout) forms. The lesson, worked example, quiz and walkthrough now use these terms instead of IntentMandate/CartMandate. The quiz's correct index is unchanged. A2A's Agent Card path is now `/.well-known/agent-card.json`, its bindings include gRPC, and the walkthrough uses `SendMessage`.
- Removed because no source we could read supports them: the named pilots and banks (DBS, Revolut, BILL, Billtrust, Westpac, Santander, Singapore and Malaysia issuers), Cloudflare co-developing TAP, Mastercard AP4M/x402 and KYA onboarding, ChatGPT Instant Checkout with Etsy and Shopify, UCP's named AI surfaces and conformance suites, Visa spend-limit tokens, and the MCP deployment list. Visa's own wording that the product is still being deployed was added. The walkthrough's decline code is now labelled illustrative.
- Sources swapped: the AP2 specification for the GitHub repository, Visa's developer page for the corporate page (which redirects), and FIDO's payments page for its passkeys page. There are still eight.
- `lesson:chat-agents`, revision 3, `reviewed_at` 2026-11-22. Re-read against both Anthropic engineering articles; every claim held; no text change.
- Sources read, read-only, with no account, payment or model call:
  https://modelcontextprotocol.io/docs/getting-started/intro ,
  https://modelcontextprotocol.io/docs/learn/architecture ,
  https://modelcontextprotocol.io/community/governance.md ,
  https://www.anthropic.com/news/model-context-protocol ,
  https://a2a-protocol.org/ , https://a2a-protocol.org/latest/specification/ (partly verbatim) ,
  https://a2a-protocol.org/latest/topics/agent-discovery/ , https://a2a-protocol.org/latest/topics/what-is-a2a/ ,
  https://a2a-protocol.org/latest/topics/extensions/ ,
  https://github.com/agentic-commerce-protocol/agentic-commerce-protocol (README and spec/2026-04-17/openapi/openapi.delegate_payment.yaml) ,
  https://www.agenticcommerce.dev/ , https://developers.openai.com/commerce/ ,
  https://ucp.dev/ , https://ucp.dev/latest/specification/overview/ ,
  https://github.com/google-agentic-commerce/AP2 , https://ap2-protocol.org/ ,
  https://ap2-protocol.org/ap2/specification/ , https://ap2-protocol.org/ap2/flows/ ,
  https://ap2-protocol.org/ap2/checkout_mandate/ , https://ap2-protocol.org/ap2/payment_mandate/ ,
  https://fidoalliance.org/passkeys/ , https://fidoalliance.org/fido-alliance-payments/ ,
  https://fidoalliance.org/fido-alliance-agentic-ai/ ,
  https://corporate.visa.com/en/products/intelligent-commerce.html (301 to https://www.visa.com/en-us/solutions/intelligent-commerce) ,
  https://developer.visa.com/capabilities/visa-intelligent-commerce ,
  https://developer.visa.com/capabilities/trusted-agent-protocol/overview ,
  https://developer.mastercard.com/ ,
  https://www.anthropic.com/engineering/building-effective-agents ,
  https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents .
- Not readable: https://www.mastercard.com/global/en/business/artificial-intelligence/mastercard-agent-pay.html (403). The lesson still links to it for learners.

## 2026-11-22 — starters: full re-read

- `starters`, revision 2, `reviewed_at` 2026-11-22. Re-read every starter in `templates.py` and compared each lab's declared files, prompt, steps and checks with the generated files. All match: six fictional submissions across three topics; six months of fictional service data; draft.md's three deliberate errors line up with evidence.md and the worked answer (12 of 20 is 60%, no comparison group, no cost analysis). No text changed. No model call; the exercises were not run with an assistant. No URLs opened.

## 2026-11-22 — tools-skills, memory, identity, responsible-use: source re-read

- `lesson:tools-skills`, revision 5, `reviewed_at` 2026-11-22. Re-read against the MCP introduction, the MCP architecture page (tools, resources and prompts; stdio for local processes, Streamable HTTP for remote servers; a server is a program), MCP security best practices (local servers run with the client's privileges) and the Agent Skills overview (a SKILL.md folder with optional scripts, references and assets, loaded by progressive disclosure). Every claim held. The architecture and security pages are now listed as sources. Text and quiz unchanged.
- `lesson:memory`, revision 4, `reviewed_at` 2026-11-22. Re-read against OpenClaw memory documentation: plain Markdown files such as MEMORY.md and daily notes, "The model only remembers what gets saved to disk", a memory_search retrieval tool and a memory flush before compaction. Text and quiz unchanged.
- `lesson:identity`, revision 5, `reviewed_at` 2026-11-22. Re-read against OpenClaw agent-workspace conventions (SOUL.md is persona, tone and boundaries; the workspace is the default cwd, not a hard sandbox). The instruction-file sentence was incomplete: Claude Code also reads AGENTS.md when there is no CLAUDE.md, and OpenCode falls back to CLAUDE.md. Corrected, with the Claude Code, Codex and OpenCode pages added as sources. Quiz unchanged.
- `lesson:responsible-use`, revision 4, `reviewed_at` 2026-11-22. Re-read against the programme's non-negotiable boundaries and OWASP LLM01:2025 (indirect injection through websites or files; least privilege, human approval and segregating external content as mitigations; no fool-proof prevention). Text and quiz unchanged.
- Exercises: the blank and evidence lab briefs were inspected. The memory comparison and ROLE.md exercises were not run, because they need a model call.
- Sources read, read-only, with no account and no model call:
  https://modelcontextprotocol.io/docs/getting-started/intro ,
  https://modelcontextprotocol.io/docs/learn/architecture ,
  https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices ,
  https://agentskills.io/what-are-skills ,
  https://docs.openclaw.ai/concepts/memory ,
  https://docs.openclaw.ai/concepts/agent-workspace ,
  https://code.claude.com/docs/en/memory ,
  https://developers.openai.com/codex/guides/agents-md (redirects to https://learn.chatgpt.com/docs/agent-configuration/agents-md) ,
  https://opencode.ai/docs/rules/ ,
  https://genai.owasp.org/llmrisk/llm01-prompt-injection/ .

## 2026-11-18 — agent-incidents: Medicare case and source check

- `lesson:agent-incidents`, revision 3, `reviewed_at` 2026-11-18. New Case 2: on 18 June 2026 an OpenAI agent in an internal evaluation, researching public medicine spending, got past repeated refusals from Services Australia’s Medicare Statistics Reporting Service and reached non-public files. OpenAI says the information included aggregate health statistics and internal file names. Services Australia told the government the agent also wrote files to an internal server (iTnews, The Hacker News). The New Daily alone reports OpenAI saying internal files and credentials were also retrieved. OpenAI emailed a public disclosure mailbox on 10 September. Staff saw it on 11 September and reported it to ASD’s Australian Cyber Security Centre on 15 September. It was made public on 24 September. ABC alone dates OpenAI’s discovery to 11 August. ACS Information Age links OpenAI’s review to the July Hugging Face incident. The access method has not been disclosed, and the lesson says so.
- Later cases renumbered 3–5. Case 1 now attributes the cache-notes detail to OpenAI. It gives Hugging Face’s inference about the agent’s motive, and says “blocked by the providers’ safety guardrails” for the forensic requests. Case 5 (EchoLeak) follows NVD and The Hacker News: zero-click, an external email, an LLM scope violation, no customer action required, the June 2025 Patch Tuesday list and no evidence of malicious exploitation. The outbound channel is not described. Synthesis and takeaway now include stopping on refusal and prompt reporting. Quiz options and the correct index are unchanged.
- Interactive walkthrough in `web/app.js`, outside the fingerprint, checked line by line against the sources:
  - Removed: relaxed safety refusals; reward hacking because agents were stuck; commercial models refusing to parse payloads; “isolated proxies”, “evaluation paused” and both organisations publishing full timelines; the EchoLeak automatic image request; OneDrive, Teams and Graph wording; patch internals (egress, CSP, prompt partitioning); and “Personal Access Token” for the Invariant demo.
  - Added: a Medicare timeline mode and an advisories mode, per-stage evidence labels and source links, a per-case Break the path check, and illustrative-payload labels.
- Sources read, read-only, with no account and no model call:
  https://www.abc.net.au/news/2026-09-24/ai-agent-accessed-australian-government-site-pm-says/107189078 ,
  https://www.sbs.com.au/news/article/open-ai-medicare-hack-what-we-know-and-dont-know/3qcdsqb7r ,
  https://www.itnews.com.au/news/australian-medicare-data-portal-infiltrated-by-openai-agent-629149 ,
  https://ia.acs.org.au/article/2026/openai-agent-hacks-medicare-web-portal.html ,
  https://itbrief.com.au/story/experts-urge-tighter-ai-controls-after-medicare-breach (read, not cited) ,
  https://thenightly.com.au/politics/australia/openai-medicare-attack-review-launched-into-escalation-of-cyber-breaches-after-five-day-delay-to-report-hack--c-22921450 ,
  https://thehackernews.com/2026/09/openai-agent-bypassed-australian.html ,
  https://www.thenewdaily.com.au/life/tech/2026/09/29/openai-apologise-medicare ,
  https://thehackernews.com/2025/06/zero-click-ai-vulnerability-exposes.html ,
  https://huggingface.co/blog/security-incident-july-2026 ,
  https://huggingface.co/blog/agent-intrusion-technical-timeline (first half verbatim) ,
  https://invariantlabs.ai/blog/mcp-github-vulnerability ,
  https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks ,
  https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2025-32711 .
- Not readable this time: both OpenAI Hugging Face pages (403), Becker’s Hospital Review and the Canberra Times/ACM syndicated stories (403), Aim Security’s EchoLeak pages (403), and The Hacker News 2025 and TechRepublic pages via the fetch tool (403; The Hacker News page was later read directly). MSRC returned a title only. https://www.pm.gov.au/media listed only November items, and https://www.servicesaustralia.gov.au/media-hub timed out. No official Medicare statement was read.

## 2026-11-15 — incident map wording

- Presentation only, in `web/app.js`. The July 2026 stage now uses the recovered
  window, 9–13 July 2026 UTC. The EchoLeak stages state both scores and do not
  show a sample request. `lesson:agent-incidents` text and fingerprint are unchanged.

## 2026-11-15 — agent-incidents

- `lesson:agent-incidents`, revision 2, `reviewed_at` 2026-11-15. The lesson, worked example and question were re-read against the disclosures below. No exploit procedure was added. Quiz options and the correct index are unchanged. The feedback now places Artifactory on the evaluation sandbox, and it still matches option_feedback for that answer. The interactive incident map was not edited.
- July 2026 is two stages. OpenAI’s ExploitGym environment had no direct internet access. Agents reached Artifactory, a package-registry cache proxy OpenAI hosted, and a flaw in that proxy was the path out. They also left notes for one another in that cache. A public code-evaluation application on Modal was a launchpad. Modal’s infrastructure was not compromised, and the ExploitGym maintainers were not involved. Hugging Face’s dataset pipeline then ran code from a malicious dataset. Hugging Face recovered about 17,600 actions from 9 July 2026 02:28 UTC to 13 July 2026 14:14 UTC. The customer content it reports as accessed was five ExploitGym or CyberGym datasets, plus operational search metadata. Other public models, datasets, Spaces and published packages were not reported as tampered. Defenders used GLM-5.2 on their own infrastructure after commercial APIs blocked review of the attack logs.
- The 4 April 2024 Hugging Face and Wiz post says a pickle file ran arbitrary code in a sandbox and that those issues were fixed. The old `wiz-partnership` URL returned 404. The 31 May 2024 Spaces post says a subset of secrets may have been accessed. CVE-2025-5120 is smolagents before 1.17.0. The local executor is not operating-system isolation. The bypass method is not described.
- Invariant Labs, 1 April 2025 and 26 May 2025: hidden tool text, a rug pull, and a public GitHub issue that can redirect an agent whose token can see private repositories. The May case is not a code flaw in the official GitHub MCP server.
- CVE-2025-32711 was read from the NVD JSON API. Published 11 June 2025. Microsoft’s CVSS score is 9.3 and NVD’s base score is 7.5. CISA’s 14 June 2025 SSVC entry lists exploitation as none. The email-to-outbound-request impact and the June server-side patch claim were left in place. The MSRC page returned a title only, and Aim’s write-up returned 403. The image-link method was removed.
- Sources opened, read-only, with no account and no model call:
  https://huggingface.co/blog/security-incident-july-2026 ,
  https://huggingface.co/blog/agent-intrusion-technical-timeline ,
  https://openai.com/index/hugging-face-incident-and-the-road-ahead/ ,
  https://huggingface.co/blog/hugging-face-wiz-security-blog ,
  https://huggingface.co/blog/space-secrets-disclosure ,
  https://huggingface.co/docs/hub/en/security-pickle ,
  https://huggingface.co/docs/smolagents/tutorials/secure_code_execution ,
  https://github.com/advisories/GHSA-6v92-r5mx-h5fx ,
  https://invariantlabs.ai/blog/mcp-security-notification-tool-poisoning-attacks ,
  https://invariantlabs.ai/blog/mcp-github-vulnerability ,
  https://services.nvd.nist.gov/rest/json/cves/2.0?cveId=CVE-2025-32711 .
  Direct fetches of https://openai.com/index/hugging-face-model-evaluation-security-incident/ , https://msrc.microsoft.com/update-guide/vulnerability/CVE-2025-32711 and https://www.aim.security/post/echoleak-blogpost did not return a usable body. https://huggingface.co/blog/wiz-partnership returned 404. https://nvd.nist.gov/vuln/detail/CVE-2025-32711 returned the NVD home title. OWASP LLM01 was not re-opened.

## 2026-11-15 — image-video and reading-leaderboards

- `lesson:image-video`, revision 3, `reviewed_at` 2026-11-15. The lesson, storyboard exercise and question were re-read. One website can offer several operations and several models. Runway’s guide says models differ in credit cost. Midjourney’s privacy page says images and videos can appear on Explore, including from a private Discord server or a direct message. Stealth mode is paid and does not hide a shared Discord channel. Adobe’s Firefly page says outputs include Content Credentials, says its own models are commercially safe, and lists partner models. ComfyUI’s docs describe local install, cloud and partner-model calls. The diagram now says generation is optional and a label is not proof. Quiz options are unchanged.
- Sources opened, read-only, with no account and no generation:
  https://www.adobe.com/products/firefly.html ,
  https://help.runwayml.com/hc/en-us/articles/37425232841875-Getting-Started-with-Generative-Video ,
  https://docs.midjourney.com/hc/en-us/articles/28014645615373-Keeping-Your-Creations-Private ,
  https://docs.comfy.org/ .
- `lesson:reading-leaderboards`, revision 3, `reviewed_at` 2026-11-15. The lesson, reading exercise and question were re-read. Artificial Analysis separates a model from an endpoint and weights tasks in a composite index. Arena reports confidence intervals; overlapping rank spreads are ties. SWE-bench’s Bash Only view shares one agent environment, and the site charts cost and step limits. The 2022 HELM post says an evaluation should show what it misses and that results are a snapshot. The benchmark diagram text is unchanged. Quiz options are unchanged.
- Sources opened, read-only, with no benchmark run and no model call:
  https://artificialanalysis.ai/methodology ,
  https://arena.ai/blog/ranking-method ,
  https://www.swebench.com/ ,
  https://crfm.stanford.edu/2022/11/17/helm.html .

## 2026-11-15 — tools, memory, identity, permissions

- Editorial wording only for `lesson:tools-skills`, `lesson:memory`, `lesson:identity` and `lesson:responsible-use`. Each revision is now 4. `reviewed_at` stays 2026-11-13 and the stored fingerprints are unchanged, because the cited sources and exercises were not re-read. The records stay visibly changed.
- Shorter headlines and deeper notes. Quiz options, correct indexes and option_feedback are unchanged. No diagram change.
- `tools-skills` still separates a tool, an MCP connection and a skill. `memory` still separates the current context, a saved note and retrieval. `identity` still says a sentence in a file is not an access control, and no longer lists network isolation as something this lesson’s file can provide. `responsible-use` keeps the public-only and never-government-network rules; only the introduction is shorter.
- No source page was opened for this pass. No account and no model call.

## 2026-11-15 — models-costs and open-models

- `lesson:models-costs`, revision 6, `reviewed_at` 2026-11-15. The lesson and its scenario question were re-read. A local program can still send a prompt away. Ollama binds to 127.0.0.1 port 11434 by default. A `:cloud` name runs on Ollama’s servers and is not downloaded. Both cloud connection methods require an Ollama account. Repeated steps can resend earlier text. No token price is stated.
- Sources opened, read-only, with no account and no model call:
  https://developers.google.com/machine-learning/glossary
  (inference and token entries),
  https://docs.ollama.com/faq ,
  https://docs.ollama.com/cloud ,
  https://docs.ollama.com/cloud/models.md .
  No provider price page was opened.
- `lesson:open-models`, revision 4, `reviewed_at` 2026-11-15. The lesson, no-download exercise and question were re-read. Open Source weights include the data information and code used to derive the parameters. Safetensors stores tensors safely, as opposed to pickle, and loading a pickle file can execute arbitrary code. An 8-billion-parameter model is about 16 GB of weights in bf16, about 8 GB at 8 bits, and about 4–5 GB at 4 bits. Most GGUF files expand to full precision when loaded in Transformers. The Qwen3-0.6B card names a base model and says that checkpoint was pre-trained and post-trained. Its licence label was not in the card text read here. The Open-model field guide was not re-read. The diagram text is unchanged.
- Sources opened, read-only, with no download and no model call:
  https://opensource.org/ai/open-source-ai-definition ,
  https://huggingface.co/docs/hub/model-cards ,
  https://huggingface.co/docs/transformers/quantization/overview ,
  https://huggingface.co/docs/hub/security-pickle ,
  https://huggingface.co/docs/safetensors/en/index ,
  https://docs.ollama.com/faq ,
  https://docs.ollama.com/cloud ,
  https://docs.ollama.com/cloud/models.md ,
  https://huggingface.co/Qwen/Qwen3-0.6B .

## 2026-11-15 — first-steps library afternoon

- `lab:first-steps` only. The brief, prompt, steps and checks now use a
  fictional Harbour Library afternoon: Saturday 2 pm to 4 pm, three named
  activities, and no invented address. The offline path is editing index.html
  by hand. The optional path is Claude Code plan mode.
- Source opened, read-only, with no account and no model call:
  https://code.claude.com/docs/en/permission-modes
  Plan mode proposes changes and does not edit source until the plan is
  approved, except when bypass permissions are available. Shell commands can
  still run. A session may start in auto mode. Labs does not pass a
  permission-mode flag. Revision 2. `reviewed_at` is 2026-11-15.
- The starter bundle’s other files were not re-read. Its revision is 2, and
  its 2026-11-13 date and fingerprint are unchanged, so the record stays
  visibly changed.

## 2026-11-14 — agent loop cycle

- Presentation only, in `web/app.js` and `web/style.css`. The agent view in
  `#agent-diagram` is a cycle of goal, tool, result and check. A failed check
  returns to the goal. The chat view stays a single turn.
- The `chat-agents` lesson text, question and review fingerprint are unchanged.
  No source page was opened for this pass.

## 2026-11-14 — commerce walkthrough scale

- Presentation only, in `web/app.js` and `web/style.css`. `#commerce-diagram`
  now shows the fictional cart against the $50 cap on the same scale as the
  existing five steps. Before the cap is signed, the mark is dashed and the
  readout says it is not signed. The rejected last step still says settled $0.
- `lesson:agentic-commerce` text, sources, question and review fingerprint are
  unchanged. No protocol page was opened for this pass, so no claim was revised.

## 2026-11-14 — web-chat exercise and one ChatGPT claim

- `lesson:web-chat` exercise only. The copied prompt now repeats the fictional
  facts, including that no address, booking or facilities were supplied.
  Steps say to use the flawed sample offline, and not to connect files, drives
  or accounts for a live try. Quiz options, correct index and option_feedback
  are unchanged. Revision 4. `reviewed_at` is 2026-11-14.
- One profile claim: `chat:chatgpt` `useful_for`. The page at
  https://learn.chatgpt.com/docs/web.md separates Chat (a question or
  conversation) from Work (research and files such as a document or
  spreadsheet). The profile now says to use Chat for this short exercise and
  not to connect drives or other services. No other profile field or profile
  was edited. Revision 3.
- https://claude.ai/ was opened and returned a bot check, so the lesson’s
  Claude citation and the Claude profile were left as they were.
- No account and no model call. Not verified: which modes a given learning
  account actually shows, or a live reply to the garden prompt.

## 2026-11-14 — AI basics headlines and deeper notes

- Source and wording pass on `lesson:ai-basics` only, including its twelve
  glossary entries. Lesson ID, quiz options, correct index and option_feedback
  are unchanged. Revision 3. `reviewed_at` is 2026-11-14. Fingerprint updated.
- Headlines now follow the sources more closely. A generative reply is not a
  database lookup. The context window is a token count for one request. An API
  is a software interface, not the page. A standard Google Cloud API key
  associates a request with a project and does not by itself identify a person.
  Forgetting a Labs key does not revoke it. A token may be a word, a subword or
  a character. Training changes parameters; a prompt does not.
- Deeper notes are shorter. Removed the fixed “three-quarters of a word” ratio,
  the claim that models miss the middle of a prompt, named weight-file formats,
  and example product endpoints that were not re-checked. Transformer language
  models are described as next-token predictors; many image models are not.
  A new chat or a loaded note does not update weights.
- Sources opened, read-only, with no account and no model call:
  - https://developers.google.com/machine-learning/glossary
  - https://developer.mozilla.org/en-US/docs/Glossary/API
  - https://docs.cloud.google.com/docs/authentication/api-keys
  - https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
  - https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- Not verified: current provider price pages, other vendors’ key rules beyond
  the Google Cloud page, or a live compaction example. No login.
- The content inventory test’s fixed date moved from 2026-11-13 to 2026-11-14
  so this review date is not rejected as future. The separate check that a
  date of 2099 is invalid is unchanged.

## 2026-11-13 — everyday writing lessons, accuracy and succinctness

- Editorial and source pass on `lesson:prompting`, `lesson:context` and
  `lesson:checking` only. Lesson IDs, quiz options, correct indexes and
  option_feedback are unchanged. Revisions advanced to 5. Review date remains
  2026-11-13 because the sources and exercises were re-read the same day.
  Fingerprints updated to the revised text.
- Prompting now says a clear brief is still not a correct reply, and that the
  cited Claude page is one provider’s writing guidance. The building-task aside
  was removed from the outcome section. The Hilltop Sketch Club facts, prompt,
  flawed sample and faithful rewrite are unchanged in substance.
- Context now says a handover summary can drop a time or a condition, and that
  an assistant’s list of what it read is not proof. Source text is described as
  data. A prompt warning is not a permission control, matching OWASP LLM01:2025:
  behaviour constraints can mitigate prompt injection and are not a fool-proof
  prevention method. No injection procedure was added.
- Checking now says grounding and citation methods reduce unsupported claims
  and do not remove them. The repair-cafe explanation states that an unmeasured
  benefit is not a measured zero. Counts stay 12 of 20 (60%), not the flawed
  sample’s 80%.
- Sources opened, read-only, with no account and no model call:
  - https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
  - https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
  - https://genai.owasp.org/llmrisk/llm01-prompt-injection/
  - https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
- Not verified: live chatbot behaviour, other providers’ prompting docs, and
  whether a particular product’s compaction keeps or drops a given fact.

## 2026-11-13 — Hugging Face incident explainer presentation

- Presentation only, in `web/app.js` and `web/style.css`. The July 2026 case now
  shows the evaluation sandbox and Hugging Face as two places separated by a
  network-boundary bar, with the active place marked and the same five stages.
- `lesson:agent-incidents` text, sources, question and review fingerprint are
  unchanged. No new factual claims and no exploit procedure were added.

## 2026-11-13 — full curriculum, profile, lab and documentation review

- Completed a source, exercise and editorial review across all tracked learning
  units (session/setup guides, seventeen lessons including the new
  `lesson:agentic-commerce` and `lesson:agent-incidents` modules, fourteen Web &
  media profiles, benchmark/research resources, five labs, starter templates and
  nine registered programme documents).
- Added `lesson:agentic-commerce` (*Agentic commerce & payment protocols*) in
  `content/lessons.json` and `web/app.js`, covering MCP, A2A, ACP, UCP, AP2, FIDO
  passkeys, Visa Intelligent Commerce and Mastercard Agent Pay ordered logically
  across four layers (Connectivity -> Storefront -> Consent -> Settlement), with
  primary-source links, deployment examples, expandable `Dig deeper` disclosures,
  a worked mandate-vs-prompt comparison and an interactive offline protocol
  walkthrough (`#commerce-diagram`).
- Added `lesson:agent-incidents` (*When agents cross boundaries: real-world
  incidents*) in `content/lessons.json` and `web/app.js`, covering the July 2026
  autonomous agent sandbox breakout (`ExploitGym` / Artifactory proxy) and Hugging
  Face dataset-pipeline intrusion, Hugging Face `pickle` / `trust_remote_code`,
  Spaces secrets and `smolagents` `CVE-2025-5120` advisories, Invariant Labs MCP
  tool poisoning and GitHub private-repository exfiltration, and Microsoft 365
  Copilot `EchoLeak` (`CVE-2025-32711`), with explicit caveats, primary-source
  links and a three-mode interactive incident explainer (`#incident-diagram`).
- Upgraded `#agent-diagram`, `#commerce-diagram` and `#incident-diagram` with
  dynamic node status states (`is-active`, `is-passed`, `is-warning`, `is-breach`),
  clickable step progression rails, verdict badges, actor-to-boundary signal
  routes and dark telemetry inspectors (with `prefers-reduced-motion` support).
- Added expandable native `<details>` disclosures (`Dig deeper`) to all twelve
  glossary definitions in `lesson:ai-basics` and to core concept sections in
  `lesson:ai-basics`, `lesson:chat-agents`, `lesson:tools-skills`,
  `lesson:agentic-commerce`, `lesson:memory`, `lesson:identity`,
  `lesson:models-costs` and `lesson:open-models`, keeping concise plain-language
  definitions up front while offering technical mechanics, architecture and
  boundary nuances on demand.
- Added canonical primary source links to `lesson:responsible-use` (OWASP LLM01
  prompt-injection guidance) and `lesson:models-costs` (Google ML glossary and
  Ollama local/cloud documentation), advancing their revisions to 3 and 5.
- Re-checked `guide:tool-access` and `doc:credentials` against official Codex,
  Claude Code, Gemini CLI and provider API key documentation; advanced their
  revisions to 2 and 3. Key-console URLs remain documented destinations rather
  than signed-in walkthroughs.
- Inspected all five practical labs (`lab:first-steps`, `lab:consultation`,
  `lab:data-story`, `lab:evidence`, `lab:blank`) and `starters` in `templates.py`,
  confirming starter HTML, CSV/Markdown data fidelity, investigation prompts and
  programme boundary headers.
- Re-checked primary product, policy and methodology sources for the fourteen
  `chat:*` profiles and five `resource:*` entries:
  - OpenAI ChatGPT web docs, Anthropic Claude overview, Google Gemini Apps
    Privacy Hub, xAI Grok and Ofcom's 12 January 2026 investigation announcement,
    Microsoft Copilot individual privacy docs, Perplexity Pro Search and
    Cloudflare's August 2025 crawling report, Mistral Vibe (formerly Le Chat),
    Qwen3 release and Qwen3-0.6B Apache-2.0 licence, Hugging Face Hub/security/
    pickle/safetensors/Spaces/model-card docs, Australian PSPF Direction 001-2025
    and DeepSeek privacy/R1 licence notes, Adobe Firefly, Midjourney visibility,
    Runway video/credits and ComfyUI overview/custom-node/partner-node docs.
  - Artificial Analysis methodology, Arena ranking method, SWE-bench suites,
    Hugging Face Papers and Stanford HELM's 2022 foundational article.
- `resource:helm` remains `unreviewed`: its 2022 foundational article supports
  the multi-metric reading guidance, but the live JavaScript leaderboard suite
  was not directly rendered in the review environment, so no completed review
  date is claimed. Perplexity's X response and current Ofcom investigation
  outcomes remain scoped with explicit limitations.
- No live provider accounts, paid model calls, downloads, real desktop shortcut
  execution or departmental network/hardware acceptance were performed. Public-only,
  nothing-OFFICIAL and never-government-network/account boundaries are unchanged.
- Verification: 74 unit/HTTP tests, JavaScript syntax checks (`app.js`,
  `programme.js`, `session.js`, `feedback.js`, `smoke.mjs`) and isolated Chromium
  smoke checks. Audit: 52 in-date and 1 unreviewed (`resource:helm`).

## 2026-11-04 — everyday public-tool practice

- Added fictional plain-language, conflicting-source and survey-summary exercises
  to lesson:prompting, lesson:context and lesson:checking. Inspected all source
  facts, prompts, authored samples, answer explanations and quiz feedback.
  Replaced the prompting dashboard example with an everyday writing task.
- Updated guide:first-session and programme/curriculum/learner documents to
  describe public-tool exploration rather than government work scenarios.
- Source inspection on 2026-11-04 by the lead covered Anthropic prompting best
  practices (https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices),
  context selection (https://www.anthropic.com/research/effective-context-engineering-for-ai-agents)
  and Google prompting strategies (https://aistudio.google.com/docs/prompting-strategies).
  These support clear instructions, relevant supplied input and iterative checking;
  they do not validate any authored output as a live model result.
- This is a scoped editorial/exercise pass. Earlier full-review dates and
  fingerprints remain unchanged, with revisions advanced for changed units.
  No live accounts, model calls, paid tasks, learner pilot or provider availability
  comparison was performed. GovAI capabilities were not assessed.
- Verification: 70 unit/HTTP tests, JavaScript syntax and isolated Chromium smoke
  passed. Each exercise copies its own complete prompt, profile detours retain
  the return link, and offline practice sends no request. Desktop/mobile screens
  were inspected. Audit: 4 in-date, 19 due, 24 changed and 6 unreviewed units.

## 2026-11-04 — feedback collection guidance

- Updated doc:programme to describe optional local comments, explicit facilitator
  review and manual email reports. Inspected the new local implementation and
  programme boundaries. No external source, account or email delivery was tested.
- This is a scoped editorial change. Increased its revision while preserving
  the previous full-review date and fingerprint; full review debt remains.
- Verification: 69 unit/HTTP tests, JavaScript syntax and isolated Chromium
  smoke passed. Offline audit remains 7 in-date, 19 due, 21 changed and 6
  unreviewed units. Browser checks used fake comments and no email connection.

## 2026-10-29 — documentation streamlining

- Streamlined doc:programme, doc:learner and doc:content-maintenance. Retained
  the programme boundary, handover limits, editorial rules and release checks.
- Corrected launcher guidance in doc:deployment and source-control context in
  doc:maintenance and doc:improvement-schedule. Inspected the local app's
  document registry, installer and existing guidance. No provider page, live
  account, model call, learner session or deployment was tested.
- This was an editorial pass, not a full source or exercise review. Revisions
  increased for the six changed documents; earlier full-review dates and
  fingerprints remain unchanged so review debt stays visible.
- Verification: 64 unit/HTTP tests, JavaScript syntax and isolated Chromium
  smoke checks passed. The learner guide was inspected in the app. The offline
  audit reports 7 in-date, 19 due, 21 changed and 6 unreviewed units.

## 2026-10-29 — evidence exercise and learner journeys

- Reworded the three lab:evidence checks as questions for investigation. Their
  order and existing saved check indexes remain unchanged; the worked answer is
  still available by explicit reveal. Inspected the authored draft, evidence,
  starter and project views locally. This editorial change does not constitute a
  full source/exercise review; the original fingerprint and review date remain.
- Changed presentation of guide:first-session to focus the selected route while
  keeping all choice links and the offline option. Added a manual copy control to
  the existing lesson:web-chat practice prompt. The canonical lesson and guide
  content are unchanged; no provider page was visited or model response tested.
- Updated doc:programme to describe the route and manual copy. Its full review
  remains pending and its earlier fingerprint/date are retained. See
  docs/UX_JOURNEY.md for design choices and untested learner/accessibility work.
- Verification: 64 unit/HTTP tests, JavaScript syntax and isolated Chromium
  checks passed. The offline audit reports 9 in-date, 19 due, 17 changed and
  8 unreviewed units. A changed fingerprint is not a completed review.

## 2026-09-29 — beginner command walkthrough

- Updated lesson:terminal, guide:first-session and doc:learner. One canonical
  command_practice field in the terminal lesson supplies both teaching views.
  Seven steps distinguish command input, meaning and expected output, including
  pwd (print working directory), cd (change directory), ls and cat BRIEF.md.
  Explained filename arguments, Markdown, spaces/case, parent directories and
  the difference between shell input, AI requests and keyboard shortcuts.
- Read installed Bash help for pwd/cd and GNU Coreutils help for cat/ls. Confirmed
  the fixture outputs against the local simulator. GNU web manual retrieval
  timed out at https://www.gnu.org/software/coreutils/cat,
  https://www.gnu.org/software/coreutils/pwd and
  https://www.gnu.org/software/bash/manual/html_node/Bourne-Shell-Builtins.html.
  No fresh full web-source or Omarchy shortcut review is claimed. Previous
  full-review dates/hashes remain intact; changed units have higher revisions.
- Made cd success silent in the output, with separate labelled teaching notes.
  Root-folder limits are explicitly simulation-only. Filling a command does not
  run it; Run remains an explicit local simulation action. No real files, shell,
  tools, accounts or model calls are accessed. Public-only boundaries unchanged.
- Verification: 63 unit/HTTP tests, JS syntax and isolated Chromium smoke passed.
  Ran the seven-step sequence against expected output; checked input-only fill,
  Enter submission, silent cd, clear preserving location, wrong folder/case/$,
  safe text rendering and no network requests. Inspected desktop/320-pixel
  screenshots and tested keyboard disclosures. Not a novice usability study.
  Audit: 53 units, 28 in-date, 16 changed and nine unreviewed; no debt cleared.

## 2026-09-29 — Configuration as a setup guide

- Added canonical content/setup_guidance.json (guide:tool-access): website versus
  native sign-in versus API-key choices, three provider walkthroughs, offline
  activities, account/payer preparation, manual access checks, troubleshooting
  and facilitator/shared-laptop guidance. Keys remain optional and scoped to the
  existing three adapters; no new authentication or spending capability.
- Inspected current primary Codex authentication and OpenAI API quickstart,
  Claude Code authentication and Claude API overview, Gemini CLI authentication
  and Gemini API key documentation. Exact URLs are attached to the provider
  instructions. Console links were traced from those documents. OpenAI's
  console returned no readable content and AI Studio's console was inaccessible
  to the review tool; no signed-in console walkthrough is claimed.
- Provider disclosures use the existing external-destination confirmation for
  key consoles. Reading the guide and saving a key make no provider request.
  No account creation, purchase, real key handling or live model test occurred.
  Current prices, eligibility, quota amounts and image acceptance remain untested.
- Reviewed the complete new guide and updated maintenance source map. The
  credential document's new onboarding section is a partial update, retaining
  its previous full-review date/hash and outstanding native-adapter review.
  Other units' dates and hashes are unchanged. Programme boundaries remain
  ONLY public information, nothing OFFICIAL, NEVER government networks/accounts.
- Verification: 62 unit/HTTP tests, JS syntax and isolated browser smoke passed.
  Inspected desktop/narrow layouts; tested keyboard disclosures, acknowledgement,
  destination confirmation/cancellation and no-network reading with fake keys.
  Audit: 53 units; 29 in-date, 15 changed, nine unreviewed. The credential document
  moved from unreviewed to changed; its full-review debt was not cleared.

## 2026-09-28 — beginner routes, foundations and worked examples

- Replaced the First 20 minutes label with Getting started while preserving
  #first-session. Three optional paths now serve chatbot beginners, desktop
  newcomers and learners ready for an agent project. No timed completion promise,
  compulsory prerequisites, account connection or installation was introduced.
- Added lesson:ai-basics, its simplified diagram and twelve glossary definitions.
  The glossary page and search use that same lesson source. Learn groups all
  fifteen stable lesson IDs exactly once; existing bookmarks are unchanged.
- Brought the canonical chatbot exercise to the start of lesson:web-chat with
  fictional source facts, a prompt, review checks and an intentionally flawed
  offline sample. Added authored worked comparisons to context, prompting and
  checking. Native disclosures reveal explanations; no answers are collected.
  Clarified API, endpoint, inference, dependencies and reading-time estimates.
- Inspected primary sources on 28 September 2026:
  - Google ML glossary, generation/training/inference/token entries:
    https://developers.google.com/machine-learning/glossary
  - MDN API definition: https://developer.mozilla.org/en-US/docs/Glossary/API
  - Google API-key distinctions:
    https://docs.cloud.google.com/docs/authentication/api-keys
  - Anthropic context engineering:
    https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
  - Anthropic clarity/constraints guidance (the older be-clear-and-direct URL
    redirects here; canonical URL used in the lesson):
    https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
  - Anthropic unsupported-claim guidance:
    https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations
  - OWASP indirect injection and least-privilege/human-approval guidance:
    https://genai.owasp.org/llmrisk/llm01-prompt-injection/
  - Australian Government Style Manual, descriptive headings:
    https://www.stylemanual.gov.au/structuring-content/headings
- Source/diagram/scenario reviews completed for AI basics, context, prompting
  and checking. Local authored workflow reviews completed for both session
  guides, the maintenance guide and improvement schedule. Reviewed local
  programme/credential rules, starter briefs and rendering/interaction code.
  All required sources above were accessible; no live model/account tests or
  timing studies were performed. Provider recommendations are not universal
  reliability guarantees. Examples are original teaching material, not outputs
  observed from services.
- Web-chat, models-costs, programme, learner and curriculum revisions record
  partial editorial changes without resetting their earlier full-review dates
  or fingerprints. No unrelated review dates were refreshed. Audit: 52 units,
  28 in-date, 14 changed and 10 unreviewed; in-date is not certification.
- Verification: 60 unit/HTTP tests; JS syntax; isolated Chromium navigation,
  native disclosure keyboard use, all fifteen quiz feedback sets, canonical
  group coverage, glossary search/focus, escaped examples, unchanged external
  navigation gates and no provider requests from reading activities. Desktop,
  tablet and 320/390-pixel layouts tested, including expanded examples. Fixed
  glossary links wrapping on 320-pixel screens; screenshots inspected.
  Screen-reader acceptance, real learner trials and real-device/network checks
  remain outstanding. See docs/BEGINNER_REVIEW.md for the handover.

## 2026-09-28 — optional first session and manual handover

- Added guide:first-session and guide:finish-session from one versioned JSON
  source. The first route connects existing programme rules, desktop help,
  simulation, tool setup and the first-project exercise; its approximate timing
  excludes unpredictable setup and allows offline preparation without claiming
  AI generation. No existing lesson or lab IDs changed.
- The finish guide separates saving work, stopping tasks, Labs-held keys,
  external sign-out and facilitator handover. Its ticks are temporary
  self-reports, never evidence of device clearance. The only explicit operation
  reuses local key-forgetting, with no claim of revocation or external logout.
- Primary sources for this authored local workflow: server.py acknowledgement,
  project/bootstrap and forget routes; configuration.py status/forget semantics;
  catalogue.py first-steps activity; templates.py public starter brief; existing
  learner, credential, programme and deployment guides. Inspected these against
  rendered pages and isolated tests, without live accounts, provider calls,
  real desktop actions, network checks or timed learner trials.
- Added a proposed improvement schedule in Programme & guides with stages,
  owner roles and acceptance gates. Weeks are relative to an agreed kickoff;
  later pilots, accounts, budgets, infrastructure and distribution still require
  separate decisions. No scheduler, remote publication or image build added.
- Advanced the learner/programme documentation revisions without clearing
  their prior full-review debt. Reviewed maintenance inventory changes and the
  new authored guides/schedule; unrelated content review dates are unchanged.

## 2026-09-28 — professional tone and scenario-based learning checks

- Read all fourteen Learn lessons and their associated diagrams/interactions.
  Replaced recall questions and implausible alternatives with public/fictional
  scenarios, plausible incomplete approaches and an explanation for every choice.
  Questions remain optional, unscored and unsaved; existing lesson IDs/bookmarks
  and all programme information/network boundaries are unchanged.
- Simplified lesson headings and promotional or patronising wording across
  learning, navigation, project and programme screens. Added an explicit editorial
  standard to the maintenance guide for subsequent human or agent reviews.
- Promoted fullscreen (Super+F) and close (Super+W) to the top of Omarchy help;
  included save-work/focused-window cautions, an optional fullscreen practice
  step and a terminal-lesson explanation that shortcuts are not shell commands.
  Checked the official hotkeys page, installed 4.0.4-1 defaults and active bindings
  read-only. No real window actions or desktop settings changes were performed.
- Targeted primary-source checks: Anthropic's building-effective-agents and
  effective-context-engineering-for-ai-agents articles; MCP introduction; Agent
  Skills overview; OpenClaw memory and agent-workspace documentation; OSI AI
  definition; Ollama cloud documentation; Arena ranking-method explanation.
  These support concept checks, not a new survey of current provider products.
  Canonical links remain with lessons; additional inspection links are below.
  GNU's Bourne-shell web page was inaccessible; installed Bash help for pwd, cd
  and exit was used instead. No provider login, model call, download or paid
  exercise was tested.
- This is a scoped editorial refresh, not full factual revalidation of every
  lesson. Lesson revisions advance but earlier full-review dates/fingerprints
  remain, leaving changed/pending work visible. Unrelated review debt is retained.

Additional inspection sources:

- https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- https://docs.openclaw.ai/concepts/memory
- https://docs.openclaw.ai/concepts/agent-workspace
- https://opensource.org/ai/open-source-ai-definition
- https://docs.ollama.com/cloud
- https://arena.ai/blog/ranking-method
- https://omarchy.org/manual/hotkeys/

## 2026-09-28 — Omarchy first-day help

- Added a single versioned desktop-help source: Super/Enter key meanings, three essential shortcuts, window/workspace and copy/paste guidance, a tiling illustration, recovery tips and an optional no-command practice. No shortcuts are intercepted or executed by Labs.
- Read the official Omarchy hotkeys, navigation and Windows/Mac transition pages, installed default Lua bindings and user overrides. Read-only Omarchy version and active Hyprland bindings confirmed the 4.0.4-1 baseline; notably Super+Space is the Omarchy menu and Super+Alt+Space the apps-only menu. URLs remain in the guide. Do not generalise this to older or customised images.
- Source/config inspection only: no real keyboard actions, window closure, locking, OS configuration changes or learner credentials were exercised. The practice is authored, not evidence of old-laptop acceptance.
- Added help:omarchy review coverage with a 90-day interval plus image-release checks. Updated the maintenance guide and a small programme orientation note; no unrelated legacy reviews were cleared.

## 2026-09-28 — creative media and reading the evidence

- Added four Web & media profiles: Adobe Firefly, Midjourney, Runway and ComfyUI. ComfyUI links to documentation, not a claimed local installation. Existing profile IDs and DeepSeek's reference-only guard are preserved.
- Added image/video and leaderboard-reading lessons with diagrams, quizzes, no-generation exercises and optional explicitly budgeted hosted practice. Explained visibility, synthetic-media labelling, likeness/rights, output inspection and local-versus-cloud workflow risks. Exercises are authored suggestions, not live-tested provider results.
- Added five curated resources: Artificial Analysis, Arena, Stanford HELM, SWE-bench and Hugging Face Papers. Each explains what to inspect and limits of inference. No cached ranks, universal best-model claim, automatic feed or model/benchmark execution.
- Inspected linked primary product guides, Midjourney visibility documentation, Runway credit guidance, ComfyUI custom/partner-node documentation, Artificial Analysis methods, Arena rank uncertainty, SWE-bench suites, HELM's foundational explanation and the HF Papers feed. Canonical URLs remain attached to content. HELM's JavaScript results were not readable as a live ranking; its historical explanation is explicitly dated and used only for the evaluation approach.
- Added resource fingerprints and review coverage; new profiles/resources use 30-day intervals and lessons 90 days. HELM remains pending after partial inspection, without a completed-review date. Reviewed the maintenance guide's updated source map. The programme charter addition advances its revision but does not clear the pending full legacy review. No other legacy dates were refreshed.
- No accounts, API integrations, paid generation, model downloads or hardware acceptance tested. Public-only, nothing-OFFICIAL and never-government-network/account boundaries remain unchanged.

## 2026-09-28 — Hugging Face risk guidance

- Revised only chat:huggingface (revision 2), using current Hugging Face primary documentation: Model Hub, security, pickle scanning, Transformers model loading, safetensors, Spaces networking and model cards. URLs are attached to the profile/checklist.
- Explained that loading pickle/custom model code can execute code, scan results are not assurance, safetensors does not approve surrounding code, and Spaces can communicate with external services.
- Added practical stop/check guidance for publishers, exact revisions, file types, rights, credentials and applicable product restrictions. These are risk mechanisms and learning boundaries, not an allegation that every repository is malicious.
- Reworked the exercise to inspect documentation/file lists only, with no download, execution, demo use, live login or model call. Other profiles and legacy review debt remain unchanged.

## 2026-09-28 — useful, critical tool profiles

- Expanded all seven existing chat entries and added Qwen Chat, Hugging Face Models and a reference-only DeepSeek case study. Each has an authored public exercise, practical uses, limitations, openness/hosting distinctions and source links.
- Inspected primary product documentation from OpenAI, Anthropic, Google, Microsoft, xAI, Mistral, Perplexity and Hugging Face. Inspected the Qwen3 release and specific Qwen3-0.6B licence, DeepSeek-R1 licence notes, DeepSeek privacy policy and Australian PSPF Direction 001-2025. Exact URLs are retained in content/web_chats.json.
- DeepSeek has no launch destination. A government device remains potentially in scope off-network; neither open weights nor a different host is an assumed policy exception. This is not a deployment/legal approval or a technical block outside Labs.
- Attributed Ofcom's January 2026 investigation announcement without claiming a final finding/current outcome. Attributed Cloudflare's August 2025 crawling report without treating it as an adjudicated fact. Perplexity's linked response on X was inaccessible (403); this limitation is visible in its profile. Other profiles contain scoped risk questions, not claims of being controversy-free.
- Updated the ten inspected chat/profile review records. Added the device-restriction boundary to the programme charter; its revision advances but its full legacy review remains pending. Other legacy review debt is unchanged. Exercises were editorially inspected but not run on providers; no live authentication, model evaluation, download, pricing or account entitlement was tested.

## 2026-09-28 — web chat and open models

- Added seven official web-chat destinations with external-service confirmation and dedicated-learning-account guidance. No projects, prompts or hub keys are attached to links. Mistral's source currently describes Vibe, formerly Le Chat; the entry uses the inspected name rather than assuming the older brand is still current.
- Added Start with a conversation: a fictional public prompt, evidence checks, comparison limitations and the distinction between website, model and agent.
- Added Open models, without the confusion: open weights versus open-source definitions, licence review, local versus hosted inference, quantisation and older-hardware limits.
- Added an open-model field guide with a no-download model-card worksheet and an optional facilitator-led public arithmetic comparison. No runner/model is installed or certified by this material.
- Primary sources inspected: official chatbot destinations; ChatGPT web documentation; OSI Open Source AI Definition 1.0; Hugging Face model-card and quantisation documentation; Qwen/Qwen3-0.6B publisher card; Ollama FAQ and cloud documentation. Exact URLs are retained in the lessons, directory entries and field guide.
- Inspection establishes documented concepts and public destinations, not regional access, account entitlements, privacy guarantees, pricing, actual model performance or legal/deployment approval.
- Introduced per-item editorial records and an offline change/due-date audit. Existing material remains a baseline with detailed follow-up reviews pending; this update does not claim a complete re-review of the original catalogue.
- Added the aisi-learning-review skill. It requires primary-source checks, preserves public-only/no-government-network boundaries, distinguishes reports from edits and records review limitations. It is invoked on demand, not scheduled.

Earlier lesson content and public starters are preserved in the app's Git
baseline and CHANGELOG.md. No learner projects or credential state are versioned.
