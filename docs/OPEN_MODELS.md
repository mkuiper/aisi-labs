# Open-model field guide

For APS professional development. ONLY public information, nothing OFFICIAL;
NEVER connect this learning laptop to government networks, accounts or systems.
These rules still apply to an offline model. This guide installs nothing.

## Three separate questions

- What is available? Weights are learned numbers. Code is the software used to train or run a model. Training-data information explains what went into it. Downloadable weights alone do not establish that the whole system meets an open-source definition.
- What is permitted? Read the exact checkpoint’s licence and associated conditions. Do not infer permission from a family name or a free download button. OSI’s Open Source AI Definition is one specific framework; a provider’s marketing use of open may mean less.
- Where does it run? A runner loads a model for inference. The runner may be on the laptop, a separate learning server or a cloud service. All three can use open-weight models. Never connect to a government server for these activities.

## Reading exercise: no download required

Use the publisher’s Qwen/Qwen3-0.6B card as a concrete example. It is a historical
teaching example, not a claim that it is the latest, safest or best choice. Read
the card and associated licence; do not run the installation snippets.

Create a blank Labs project and make MODEL-NOTES.md with these fields:

```text
Date:
Publisher and official card URL:
Exact checkpoint and revision, if available:
Release contents: weights / code / training-data information:
Licence and conditions to investigate:
Intended task and language coverage:
Limitations or missing documentation:
Evaluation evidence and questions about it:
Proposed runner and where inference would happen:
Hardware, memory, disk and download requirements to verify:
Network features, plugins and cloud fallback to inspect:
One reason to try it, and one reason to pause:
```

The publisher card inspected for this guide identifies a 0.6B-parameter model
and displays an Apache-2.0 licence label. Treat the label as a starting point
for reading the actual terms, not a licence review of every file, derivative,
dataset or use. Model cards document intentions and reported evaluations; they
do not independently prove that a model is accurate or suitable for APS work.

## Small models and older laptops

The number of parameters is not a quality rating. Task fit, data, training,
context, prompting and the surrounding software all matter. Quantisation reduces
numeric precision to reduce memory requirements, with potential accuracy costs.
A smaller download does not guarantee that the model fits in available RAM.

As a rough arithmetic illustration, one billion numbers at four bits each are
about 0.5 GB of raw numbers. That excludes extra metadata, runtime overhead,
context caches and other applications. It is not a hardware recommendation.
Ask a facilitator to measure a reviewed model/runner combination on the actual
teaching laptop, with a short context first. Record load time, response latency,
peak memory and whether the browser and desktop remain usable.

Do not download large models during an unplanned classroom exercise. A model
cache is not a substitute for provenance, integrity and licence checks. A
community quantisation is a separate artefact whose source should be traced.

## Optional facilitator-led comparison

Only after a runner and model are installed and accepted for the learning image,
compare a local configuration with one permitted hosted chatbot. Use dedicated
learning accounts, check potential costs and do not enable extra connectors.
Ollama is one example of a runner with both local and cloud options; its name
alone does not prove offline operation. Check the selected model, endpoint and
network-dependent features. No runner is claimed to be installed by this guide.

Use the same authored public prompt in both:

```text
Fictional workshop registrations: Monday 12, Tuesday 18, Wednesday 15.
Give the total and the busiest day. Explain your arithmetic briefly.
Can these figures tell us why attendance differed? Do not invent a cause.
```

Expected checks: total 45; Tuesday is busiest; the figures do not explain the
cause. Record the prompt, date, model or mode shown, runner version, quantisation
if known, tool settings, answer and time taken. Repeat on several public tasks
before drawing conclusions. A hosted product may add hidden prompts or tools,
so this compares configurations rather than isolating model quality.

Discuss a failure as evidence: Did it calculate incorrectly, invent an explanation,
ignore uncertainty or simply take too long? Do not replace careful checking with
a leaderboard ranking or the assumption that larger, newer or open is better.

## Safety and review

Keep ordinary permission prompts. Review plugins, code dependencies, telemetry,
web search and cloud fallback separately. A local inference step does not
guarantee that the whole application stays offline or that logs are private.
Do not enable unreviewed remote code or expose a local inference server on the
LAN. The image/network owner must approve that deployment separately.

Use the lesson’s linked primary sources for the underlying concepts. Source
inspection for this guide: 28 September 2026. No models were downloaded, no
licence/legal approval was performed, and no real inference was tested.

## Primary references

- OSI definition: https://opensource.org/ai/open-source-ai-definition
- Model-card guide: https://huggingface.co/docs/hub/model-cards
- Concrete publisher card: https://huggingface.co/Qwen/Qwen3-0.6B
- Quantisation: https://huggingface.co/docs/transformers/quantization/overview
- Runner behaviour: https://docs.ollama.com/faq
- Cloud options: https://docs.ollama.com/cloud
