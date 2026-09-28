/* Local, dependency-free learning interface. All desktop actions are explicit. */
'use strict';
let data;
let toolFilter = 'All tools';
let toastTimer;
let traceMode = 'agent';
let traceStep = 0;
let simFolder = '';
let simHistory = [];
const main = document.querySelector('#main');
const modal = document.querySelector('#modal');
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const paths = {
  home: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  tools: '<path d="m14 6 4-4 4 4-4 4M3 21l9-9M5 3l4 4-2 2-4-4v4l4 4 4-2 9 9 2-2-9-9 2-4-4-4z"/>',
  spark: '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5zM20 2v4m-2-2h4"/>',
  book: '<path d="M12 5v16M3 4c4-1 6-1 9 1 3-2 5-2 9-1v15c-4-1-6-1-9 1-3-2-5-2-9-1z"/>',
  folder: '<path d="M3 7V5a2 2 0 0 1 2-2h5l3 4h6a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"/>',
  terminal: '<rect x="2" y="4" width="20" height="16" rx="3"/><path d="m6 9 3 3-3 3m7 0h4"/>',
  layers: '<path d="m12 3 10 5-10 5L2 8zM2 12l10 5 10-5M2 16l10 5 10-5"/>',
  chart: '<path d="M4 3v17h17M8 15v-4m5 4V6m5 9V9"/>',
  check: '<path d="m7 12 3 3 7-7"/><circle cx="12" cy="12" r="9"/>',
  nodes: '<rect x="2" y="8" width="6" height="8" rx="2"/><rect x="16" y="2" width="6" height="6" rx="2"/><rect x="16" y="16" width="6" height="6" rx="2"/><path d="M8 12h4V5h4m-4 7v7h4"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
  copy: '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',
  play: '<path d="m8 4 12 8-12 8z"/>',
};
const icon = key => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[key] || paths.spark}</svg>`;
const mark = (tool, kind = 'tool') => {
  const logo = data.logos?.[kind]?.[tool.id];
  return `<span class="mark ${esc(tool.colour)}${logo?' has-logo':''}" aria-hidden="true"><span class="logo-fallback">${esc(tool.mark)}</span>${logo?`<img class="tool-logo" src="${esc(logo)}" alt="" width="32" height="32" decoding="async">`:''}</span>`;
};
// Capture image errors: no inline handlers (CSP), and no retry loop.
document.addEventListener('error', event => {
  if(event.target instanceof HTMLImageElement && event.target.classList.contains('tool-logo')) {
    event.target.closest('.mark')?.classList.add('logo-unavailable');
  }
}, true);
const lessonMark = lesson => `<span class="mark ${esc(lesson.colour)}">${icon(lesson.icon)}</span>`;
const findLab = id => data.labs.find(x => x.id === id);
const findLesson = id => data.lessons.find(x => x.id === id);
const findProject = id => data.projects.find(x => x.id === id);
function route() { const [page = 'home', ...rest] = location.hash.slice(1).split('/'); return [page || 'home', decodeURIComponent(rest.join('/'))]; }

async function api(path, payload) {
  const options = payload === undefined ? {} : {method:'POST', headers:{'Content-Type':'application/json','X-Labs-Token':document.querySelector('meta[name="labs-token"]').content}, body:JSON.stringify(payload)};
  const response = await fetch(`/api/${path}`, options);
  const result = await response.json();
  if (!response.ok) throw new Error(result.error || 'The request could not be completed.');
  return result;
}
function toast(message) {
  const el = document.querySelector('#toast');
  el.textContent = message; el.classList.add('visible');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('visible'), 6000);
}
function heading(kicker, title, subtitle, extra = '') {
  return `<div class="page-title"><div><span class="eyebrow">${esc(kicker)}</span><h1>${esc(title)}</h1><p>${esc(subtitle)}</p></div>${extra}</div>`;
}
function heroArt() {
  return `<svg viewBox="0 0 360 260" role="img" aria-label="An idea connected to a webpage, a terminal and a finished project">
  <g fill="none" stroke="#b6c4a5" stroke-width="1"><circle cx="185" cy="128" r="95" stroke-dasharray="3 6"/><ellipse cx="185" cy="128" rx="145" ry="60" transform="rotate(-32 185 128)"/><path d="m60 180 92-61 134 43M92 44l92 79 70-88"/></g>
  <g transform="translate(66 34) rotate(-9)"><rect width="106" height="73" rx="8" fill="#fffcf3" stroke="#aebca0"/><path d="M0 17h106" stroke="#c2cbb4"/><circle cx="10" cy="9" r="2" fill="#c49c7d"/><circle cx="18" cy="9" r="2" fill="#b2bf9e"/><rect x="10" y="27" width="35" height="33" rx="3" fill="#eac09e"/><path d="M55 31h37M55 41h28M55 51h34" stroke="#b1bfa1" stroke-width="3"/></g>
  <g transform="translate(202 145) rotate(8)"><rect width="123" height="77" rx="8" fill="#284b3b"/><path d="m15 25 9 8-9 8m20 0h18" stroke="#dfbe95" stroke-width="3" fill="none"/><path d="M16 55h72M16 63h50" stroke="#6b8972" stroke-width="3"/></g>
  <g transform="translate(141 86)"><rect width="83" height="83" rx="23" fill="#f3d3b4" stroke="#c79b75"/><path d="m42 18 6 17 17 7-17 6-6 18-7-18-17-6 17-7z" fill="#9d553b"/></g>
  <g transform="translate(54 173) rotate(-8)"><rect width="61" height="53" rx="10" fill="#fdfbf1" stroke="#a6b696"/><circle cx="30" cy="27" r="13" fill="#e3ead5"/><path d="m23 27 5 5 10-11" stroke="#648453" stroke-width="2.5" fill="none"/></g>
  <circle cx="277" cy="61" r="20" fill="#d3dfbe"/><path d="m277 51 3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#70884d"/><circle cx="42" cy="119" r="4" fill="#c49a73"/><circle cx="301" cy="122" r="3" fill="#7f966a"/>
  </svg>`;
}
function labArt(lab) {
  let drawing;
  if (lab.id === 'consultation') drawing = '<rect x="81" y="37" width="127" height="72" rx="7" fill="#fffdf5" stroke="#adbea1" transform="rotate(-6 140 70)"/><rect x="102" y="27" width="130" height="77" rx="7" fill="#fffdf5" stroke="#adbea1"/><rect x="114" y="39" width="31" height="9" rx="4" fill="#b9cba7"/><path d="M115 61h96m-96 13h78m-78 13h89" stroke="#c4d1b7" stroke-width="5"/><circle cx="227" cy="96" r="19" fill="#4f7150"/><path d="m220 96 5 5 10-11" stroke="#edf1e5" stroke-width="2" fill="none"/>';
  else if (lab.id === 'data-story') drawing = '<rect x="87" y="27" width="148" height="83" rx="8" fill="#fffdf5" stroke="#adbed0"/><path d="M105 42v48h110" stroke="#c3cdd8" fill="none"/><rect x="116" y="65" width="16" height="24" rx="3" fill="#b8c6d7"/><rect x="143" y="53" width="16" height="36" rx="3" fill="#91a9c3"/><rect x="170" y="60" width="16" height="29" rx="3" fill="#b8c6d7"/><rect x="197" y="40" width="16" height="49" rx="3" fill="#6588ad"/>';
  else if (lab.id === 'evidence') drawing = '<rect x="110" y="23" width="101" height="93" rx="7" fill="#fffdf5" stroke="#c7aeba"/><path d="M126 42h62m-62 13h51m-51 13h60m-60 13h43" stroke="#d4bdc7" stroke-width="4"/><circle cx="210" cy="89" r="20" fill="#eadce2" stroke="#9e788b" stroke-width="3"/><path d="m224 104 14 14" stroke="#9e788b" stroke-width="6"/>';
  else if (lab.id === 'blank') drawing = '<path d="M96 104V44q0-9 9-9h43l13 14h59q9 0 9 9v46z" fill="#fffdf5" stroke="#adbaa8"/><path d="M162 67v24m-12-12h24" stroke="#759168" stroke-width="3"/>';
  else drawing = '<rect x="79" y="28" width="158" height="85" rx="7" fill="#fffdf5" stroke="#cfad94"/><path d="M79 45h158" stroke="#ddc7b4"/><circle cx="90" cy="36" r="2" fill="#c28c67"/><circle cx="98" cy="36" r="2" fill="#d9b69b"/><rect x="94" y="59" width="47" height="39" rx="4" fill="#e5b18a"/><path d="M153 64h64m-64 13h46m-46 13h54" stroke="#d8c1a8" stroke-width="5"/><path d="m231 82 5 12 13 4-13 5-5 12-4-12-12-5 12-4z" fill="#ab6242"/>';
  return `<div class="lab-art ${esc(lab.colour)}"><span class="art-label">${esc(lab.level.toUpperCase())}</span><svg viewBox="0 0 320 135" aria-hidden="true">${drawing}</svg></div>`;
}
function labCard(lab) {
  return `<a class="lab-card" href="#lab/${lab.id}">${labArt(lab)}<div class="lab-card-body"><h3>${esc(lab.title)}</h3><p>${esc(lab.subtitle)}</p><div class="card-meta"><span>◷</span> ${esc(lab.minutes)}${lab.id === 'blank' ? '' : ' min'}<span class="arrow">↗</span></div></div></a>`;
}
function toolCard(tool) {
  return `<article class="tool-card"><div class="tool-card-top">${mark(tool)}<span class="availability ${tool.available ? '' : 'unavailable'}">${tool.available ? 'Command detected' : 'Not detected'}</span></div><h3>${esc(tool.name)}</h3><span class="tag">${esc(tool.category)}</span><p>${esc(tool.description)}</p><small>${esc(tool.account)}</small><button class="btn secondary" data-tool="${tool.id}" ${tool.available ? '' : 'disabled'}>${tool.available ? 'Open tool' : 'Not installed'} ${icon('arrow')}</button></article>`;
}
function lessonCard(lesson) {
  return `<a class="lesson-card" href="#learn/${lesson.id}">${lessonMark(lesson)}<h3>${esc(lesson.title)}</h3><p>${esc(lesson.subtitle)}</p><div class="card-meta"><span>${lesson.minutes} min · Illustrated guide</span><span class="arrow">${data.progress[lesson.id] ? '✓' : '↗'}</span></div></a>`;
}
function home() {
  const count = data.tools.filter(t => t.available).length;
  const last = data.projects[0];
  return `${heading('Australian AI Safety Institute · APS professional development', 'What will you make today?', 'Build your capability with contemporary AI tools and public practice projects.', '<span class="tiny-label">EXPLORE · MAKE · UNDERSTAND</span>')}
  <section class="session-entry panel"><div><span class="eyebrow">OPTIONAL STARTING POINT</span><h2>First 20 minutes</h2><p>Follow one public practice task, with an offline preparation option.</p></div><a class="btn" href="#first-session">Open the starter route →</a></section>
  <section class="hero"><div class="hero-copy"><span class="eyebrow">AI PROFESSIONAL DEVELOPMENT</span><h2>Explore AI tools.<br>Build practical skills.</h2><p>AISI AI Labs is the Australian AI Safety Institute’s hands-on learning space for APS staff. Try contemporary AI tools, build practice projects and understand the ideas behind them — from your first terminal command to agents, MCP, skills and memory.</p><div class="actions"><a href="#labs" class="btn">Find an experiment ${icon('arrow')}</a><a href="#tools" class="btn ghost">Explore the tools ↗</a></div></div><div class="hero-art">${heroArt()}</div></section>
  <div class="note"><strong>A learning environment, not a workplace processing system.</strong> Professional development using ONLY public information — nothing OFFICIAL or non-public. Use a separate non-government network; NEVER connect this laptop to government networks, accounts or internal systems. For official work, use your department’s approved platforms and policies. <a class="text-link" href="#programme">Read the boundaries ↗</a></div>
  <section class="panel"><h2>Chat, media and current research</h2><p>Explore chatbot and image/video websites, learn about open models, or keep a critical eye on new capabilities.</p><div class="actions"><a class="btn secondary" href="#web-chats">Browse web & media ↗</a><a class="text-link" href="#learn/image-video">Make media responsibly →</a><a class="text-link" href="#keep-current">Keep current →</a></div></section>
  <section aria-labelledby="quick-heading"><div class="section-heading"><div><h2 id="quick-heading">Your tools, ready to explore</h2><p>Open a familiar tool, or try a different way of working.</p></div><a href="#tools" class="text-link">All ${count} detected tools ↗</a></div><div class="tool-strip">${data.tools.slice(0,4).map(t=>`<button class="quick-tool" data-tool="${t.id}" ${t.available?'':'disabled'}>${mark(t)}<span><strong>${esc(t.name)}</strong><small>${t.available?'Command detected':'Not detected'}</small></span><span class="arrow">↗</span></button>`).join('')}</div></section>
  <section aria-labelledby="labs-heading"><div class="section-heading"><div><h2 id="labs-heading">Start with something small</h2><p>A few ideas to get your hands on the tools.</p></div><a href="#labs" class="text-link">Browse all experiments ↗</a></div><div class="lab-grid home-labs">${data.labs.slice(0,3).map(labCard).join('')}</div></section>
  <div class="home-bottom"><a class="concept-banner" href="#learn/chat-agents"><span class="mark sage">${icon('layers')}</span><div><h3>Chatbot? Agent? Harness?</h3><p>Get a clear picture of what’s doing what.</p><span class="text-link">Explore the moving parts ↗ <span>· 5 min</span></span></div></a><div class="continue-banner"><div><span class="eyebrow">${last?'PICK UP WHERE YOU LEFT OFF':'START A PROJECT'}</span><h3>${last?esc(last.name):'Create a practice project.'}</h3><p>${last?'Your files and review checklist are waiting.':'A separate folder with a brief and starter files.'}</p><a class="text-link" href="${last?'#project/'+last.id:'#lab/blank'}">${last?'Continue project':'Start your own project'} ↗</a></div></div></div>`;
}
function toolsPage() {
  const categories = ['All tools','Coding agents','AI assistants','Desktop tools'];
  const tools = data.tools.filter(t=>toolFilter==='All tools'||t.category===toolFilter);
  return `${heading('The toolkit','AI assistants and desktop tools','Try the AI assistants and creative tools available on this machine.')}<div class="filters" aria-label="Filter tools">${categories.map(c=>`<button class="filter ${toolFilter===c?'active':''}" data-filter="${c}" aria-pressed="${toolFilter===c}">${c}</button>`).join('')}</div><div class="tool-grid">${tools.map(toolCard).join('')}</div><div class="note"><strong>Command detected means the launcher was found, not that the tool is authenticated, installed behind a bootstrap wrapper, or current.</strong> An AI tool may still need setup, an internet connection or a paid account. Tools open in your chosen project or the Playground folder. Desktop applications may show their own welcome screen.</div>`;
}
function labsPage() {
  return `${heading('Learn by making','Practical AI experiments','Follow a short guide, or take a blank project in your own direction.')}<div class="lab-grid">${data.labs.map(labCard).join('')}</div><div class="note"><strong>Suggested starting point:</strong> Start with Your first agent session. You can explore <a class="text-link" href="#learn/terminal">the practice terminal ↗</a> before opening a real one. Each activity includes a brief, a starter prompt and checks you can do yourself.</div>`;
}
function labPage(lab) {
  return `<a class="back" href="#labs">← All experiments</a>${heading(lab.level,lab.title,lab.subtitle,`<span class="badge-count">${esc(lab.minutes)}${lab.id==='blank'?'':' min'}</span>`)}<div class="project-grid"><div><div class="panel"><h2>Activity steps</h2><ol class="steps">${lab.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol></div><div class="panel"><h2>Acceptance checks</h2><ol class="steps">${lab.checks.map(c=>`<li>${esc(c)}</li>`).join('')}</ol></div></div><div><div class="panel">${labArt(lab)}<h2>${esc(lab.output)}</h2><p>We’ll prepare a fresh folder with everything you need to begin.</p><div class="file-chips">${lab.files.map(f=>`<span>${esc(f)}</span>`).join('')}</div><button class="btn" data-create="${lab.id}">Create my project ${icon('arrow')}</button><p class="small-note">Creating a project makes local files. Your AI tool starts only when you choose to open it.</p></div><a class="concept-banner" href="#learn/${lab.concept}">${lessonMark(findLesson(lab.concept))}<div><h3>Related concepts</h3><p>${esc(findLesson(lab.concept).title)} ↗</p></div></a></div></div>`;
}
function learnPage() {
  return `${heading('Learn','AI concepts and working practices','Short explanations, diagrams and scenarios to help you apply the concepts.',`<span class="badge-count">${Object.values(data.progress).filter(Boolean).length} of ${data.lessons.length} explored</span>`)}<p class="note">Want a suggested starting point? <a class="text-link" href="#first-session">Follow the First 20 minutes route →</a></p><div class="lab-grid">${data.lessons.map(lessonCard).join('')}</div><div class="note">Choose any guide, in any order. “Explored” is your own bookmark, not a test score. Learning progress is saved on this computer for this Linux account.</div>`;
}
const traces = [
  ['You set a goal', '“Build a page that filters our six fictional submissions.” The harness sends the goal and relevant context to the model.'],
  ['The model requests a tool', 'It asks to read submissions.csv. The harness checks the request against its configured permissions and runs the file-reading tool.'],
  ['The result becomes context', 'The tool returns six source rows. The model uses this result to propose and write the page.'],
  ['A check gives feedback', 'A filter shows the wrong count. A check exposes the mismatch; the result is supplied back to the model.'],
  ['The work is reviewed', 'The agent corrects the filter and repeats the check. You inspect the page and decide whether it meets the brief.'],
];
function agentDiagram() {
  return `<div class="diagram-label">One goal. Different ways of working.</div><div class="mode-buttons" role="group" aria-label="Compare interaction patterns"><button data-mode="chat" class="${traceMode==='chat'?'active':''}" aria-pressed="${traceMode==='chat'}">Simple chat</button><button data-mode="agent" class="${traceMode==='agent'?'active':''}" aria-pressed="${traceMode==='agent'}">Agent loop</button></div>${traceMode==='chat'?'<div class="diagram-row"><div class="diagram-node"><strong>You</strong><small>Ask a question</small></div><span class="diagram-arrow">→</span><div class="diagram-node"><strong>Model</strong><small>Generate a reply</small></div><span class="diagram-arrow">→</span><div class="diagram-node"><strong>You</strong><small>Review the answer</small></div></div><p class="diagram-caption">A basic exchange. Chat applications can also offer tools and agent loops.</p>':`<div class="harness"><div class="harness-title"><strong>THE HARNESS</strong><span>Context · permissions · execution</span></div><div class="diagram-row"><div class="diagram-node"><strong>Model</strong><small>Choose next action</small></div><span class="diagram-arrow">→</span><div class="diagram-node"><strong>Tool</strong><small>Read, edit or check</small></div><span class="diagram-arrow">→</span><div class="diagram-node"><strong>Result</strong><small>New evidence</small></div></div><p class="diagram-caption">↶ Results return to the model; continue, ask for help or stop.</p></div><div class="trace"><div class="trace-head"><strong id="trace-title">${traceStep+1}. ${traces[traceStep][0]}</strong><span>AUTHORED EXAMPLE · NO AI CALLS</span></div><p id="trace-text" aria-live="polite">${traces[traceStep][1]}</p><div class="actions"><button class="btn secondary small" data-trace="-1" ${traceStep===0?'disabled':''}>← Back</button><button class="btn small" data-trace="1">${traceStep===traces.length-1?'Replay ↺':'Next step →'}</button><span class="tiny-label">${traceStep+1} / ${traces.length}</span></div></div>`}`;
}
function conceptDiagram(lesson) {
  if (lesson.diagram==='open-models') return openModelsDiagram();
  if (lesson.diagram==='agent') return `<div class="diagram" id="agent-diagram">${agentDiagram()}</div>`;
  if (lesson.diagram==='terminal') return `<div class="diagram"><div class="diagram-label">Same window. Different programs.</div><div class="diagram-row"><div class="diagram-node"><strong>Terminal</strong><small>The text window</small></div><span class="diagram-arrow">→</span><div class="diagram-node"><strong>Shell</strong><small>Understands commands</small></div><span class="diagram-arrow">→</span><div class="diagram-node"><strong>AI assistant</strong><small>A program you open</small></div></div><p class="diagram-caption">Use commands at the shell prompt. Use requests inside the assistant.</p></div>`;
  const nodes = {media:[['Brief','Public, rights-cleared inputs'],['Generate','Check settings and cost'],['Review & label','Inspect, describe, disclose']],benchmark:[['Task','What is being measured?'],['Setup','Model, harness and budget'],['Result','Metric and uncertainty']],'web-chat':[['Public task','Share only what is public'],['Chat website','Provider models and tools'],['Your review','Check evidence and permissions']],context:[['Your brief','Goal and boundaries'],['Source material','Files and tool results'],['Response','Grounded in context']],brief:[['Goal','What should exist?'],['Boundaries','What is allowed?'],['Checks','How will you know?']],tools:[['Skill','Task guidance'],['MCP','Connection protocol'],['Tool','An available action']],check:[['Output','Read or try it'],['Evidence','Compare and test'],['Judgement','Accept or improve']],memory:[['Saved notes','Persist outside a session'],['Load or retrieve','Select relevant material'],['Context now','Available to the model']],identity:[['Identity','Tone and priorities'],['Instructions','How to approach tasks'],['Permissions','Actual action controls']],permissions:[['Request','What will it do?'],['Permission','What is allowed?'],['Review','Check the result']],cloud:[['Laptop','Interface and local tools'],['Internet','Public information only'],['Provider','Model and API billing']]}[lesson.diagram];
  return `<div class="diagram"><div class="diagram-label">${lesson.diagram==='tools'?'Three different roles':'A useful way to think about it'}</div><div class="diagram-row">${nodes.map(([a,b],i)=>`${i?`<span class="diagram-arrow">${lesson.diagram==='tools'?'·':'→'}</span>`:''}<div class="diagram-node"><strong>${a}</strong><small>${b}</small></div>`).join('')}</div>${lesson.diagram==='tools'?'<p class="diagram-caption">A skill can guide use of a tool; MCP is one way to expose a tool. None guarantees correctness.</p>':''}</div>`;
}
function terminalPractice() {
  return `<section aria-labelledby="terminal-title"><h2 id="terminal-title">Terminal simulation</h2><p class="small-note">A simulated project with sample files. Try pwd, then ls, then cat BRIEF.md.</p><div class="terminal-box"><div class="terminal-header"><span class="dots">● ● ●</span> PRACTICE TERMINAL · SIMULATION ONLY</div><div class="terminal-output" id="terminal-output" role="log" aria-live="polite">Practice project: /practice/my-project
Type help for commands. Nothing here runs on your computer.</div><form id="terminal-form" class="terminal-input"><label for="terminal-command" aria-label="Practice command">$</label><input id="terminal-command" aria-label="Practice terminal command" autocomplete="off" spellcheck="false" placeholder="Try pwd"><button class="btn small" type="submit">Run ↵</button></form><div class="terminal-hints">${['pwd','ls','cat BRIEF.md','cd examples','cd ..','help','clear'].map(c=>`<button data-command="${c}">${c}</button>`).join('')}</div></div><p class="small-note">For a real terminal, create a project and use its Open terminal button. The real terminal can change files; this practice version cannot.</p></section>`;
}
function lessonPage(lesson) {
  return `<article class="reader"><a class="back" href="#learn">← All concepts</a><span class="eyebrow">${lesson.minutes} MIN · CONCEPT GUIDE</span><h1>${esc(lesson.title)}</h1><p class="intro">${esc(lesson.intro)}</p>${learningReviewNote(lesson)}${conceptDiagram(lesson)}${lesson.sections.map(([title,body])=>`<section class="article-section"><h2>${esc(title)}</h2><p>${esc(body)}</p></section>`).join('')}<div class="note"><strong>Key point:</strong> ${esc(lesson.takeaway)}</div>${lesson.id==='terminal'?terminalPractice()+'<p><a class="text-link" href="#omarchy-help">Omarchy fullscreen, close-window and other shortcuts ↗</a></p>':''}${lesson.id==='open-models'?'<p><a class="text-link" href="#docs/open-models">Open-model field guide and worksheet ↗</a></p>':lesson.id==='image-video'?'<p><a class="text-link" href="#web-chats">Explore image and video tools ↗</a></p>':lesson.id==='reading-leaderboards'?'<p><a class="text-link" href="#keep-current">Explore public resources ↗</a></p>':lesson.id==='web-chat'?'<p><a class="text-link" href="#web-chats">Explore chatbot websites ↗</a></p>':''}<section class="quiz"><span class="eyebrow">APPLY THE CONCEPT</span><h3>${esc(lesson.question)}</h3><p class="small-note">Choose the best fit for the stated scenario. Compare the explanations for each choice; answers are not scored or saved.</p><div class="quiz-options">${lesson.options.map((o,i)=>`<button class="quiz-option" aria-pressed="false" data-answer="${i}" data-lesson="${lesson.id}">${esc(o)}</button>`).join('')}</div><p class="quiz-feedback" id="quiz-feedback" role="status"></p></section><div class="reader-end"><button class="btn secondary" data-complete="${lesson.id}">${data.progress[lesson.id]?'✓ Explored — undo':'Mark as explored'}</button><a class="btn" href="#lab/${lesson.lab}">Try it in a project ${icon('arrow')}</a></div>${lesson.sources.length?`<div class="sources">Further reading · links open online${lesson.sources.map(([title,url])=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(title)} ↗</a>`).join('')}</div>`:''}</article>`;
}
function projectsPage() {
  return `${heading('My projects','Pick up where you left off.','Each experiment has its own folder and review checklist.', '<a class="btn" href="#lab/blank">New project +</a>')}${data.projects.length?`<div class="project-list">${data.projects.map(p=>`<article class="project-row">${lessonMark(findLab(p.lab))}<div class="project-info"><h3>${esc(p.name)}</h3><p>${esc(findLab(p.lab).title)} · ${new Date(p.created).toLocaleDateString('en-AU',{day:'numeric',month:'short'})} · ${p.checks.length}/${findLab(p.lab).checks.length} checks reviewed</p></div><a class="btn secondary" href="#project/${p.id}">Continue ${icon('arrow')}</a></article>`).join('')}</div>`:'<div class="empty"><span class="mark sage">'+icon('folder')+'</span><h2>No projects yet.</h2><p>Start an experiment and your project will appear here.</p><a class="btn" href="#labs">Find an experiment →</a></div>'}<div class="note">Files are saved under <strong>~/.local/share/aisi-labs-2/projects/</strong>. Your project folder is a starting location, not a security sandbox. Tools apply their own access controls.</div>`;
}
function projectPage(project) {
  const lab = findLab(project.lab);
  return `<a class="back" href="#projects">← My projects</a>${heading(lab.title,project.name,lab.output, '<button class="btn secondary" data-refresh>Refresh ↻</button>')}<div class="project-grid"><div><section class="panel"><h2>Your next steps</h2><ol class="steps">${lab.steps.map(s=>`<li>${esc(s)}</li>`).join('')}</ol></section><section class="panel"><h2>A prompt to get you started</h2><p class="prompt">${esc(lab.prompt)}</p><button class="btn secondary small" data-copy="${lab.id}">${icon('copy')} Copy starter prompt</button><p class="small-note">Paste this inside your AI assistant, not at the shell’s $ prompt.</p></section><section class="panel"><h2>Check what you made</h2><p class="small-note">Tick these after reviewing the result yourself.</p><div class="checklist">${lab.checks.map((check,i)=>`<label><input type="checkbox" data-check="${i}" data-project="${project.id}" ${project.checks.includes(i)?'checked':''}><span>${esc(check)}</span></label>`).join('')}</div><div class="project-status" id="check-status">${project.checks.length} of ${lab.checks.length} checks reviewed</div>${lab.answer?`<details><summary>Reveal the worked answer</summary><p>${esc(lab.answer)}</p></details>`:''}</section></div><div><section class="panel"><h2>Open your workspace</h2><p>Pick the tool you want to work with. It will open in this project folder.</p><label class="field"><span>Your AI tool</span><select id="project-tool">${data.tools.filter(t=>t.available&&t.category!=='Desktop tools').map(t=>`<option value="${t.id}">${esc(t.name)}</option>`).join('')}</select></label><div id="project-credential">${credentialNotice(data.tools.find(t=>t.available&&t.category!=='Desktop tools')?.id)}</div><button class="btn" data-project-launch="${project.id}">Open selected tool ${icon('arrow')}</button><p class="small-note">Uses the tool’s account and model settings. Sign-in or charges may apply. Prompts are never sent automatically.</p><div class="file-chips">${lab.files.map(f=>`<span>${esc(f)}</span>`).join('')}</div><div class="actions"><button class="btn secondary small" data-direct="files" data-project="${project.id}">${icon('folder')} Files</button><button class="btn secondary small" data-direct="editor" data-project="${project.id}">Editor ↗</button><button class="btn secondary small" data-direct="terminal" data-project="${project.id}">${icon('terminal')} Terminal</button></div><p class="project-path">${esc(project.path)}</p>${project.preview?`<button class="btn secondary" data-direct="preview" data-project="${project.id}">${icon('play')} Open page preview</button>`:'<p class="small-note">For text projects, inspect the results in Files or the editor. An index.html file enables a page preview after Refresh.</p>'}</section><a class="concept-banner" href="#learn/${lab.concept}">${lessonMark(findLesson(lab.concept))}<div><h3>Understand the idea</h3><p>${esc(findLesson(lab.concept).title)} ↗</p></div></a><div class="note">Use ONLY public information. Never use OFFICIAL material or connect to government networks. Inspect proposed changes and permissions in the tool before accepting them.</div></div></div>`;
}
function searchPage(query) {
  const q = query.trim().toLowerCase();
  const matches = item=>JSON.stringify(item).toLowerCase().includes(q);
  const tools = q ? data.tools.filter(matches) : [];
  const labs = q ? data.labs.filter(matches) : [];
  const lessons = q ? data.lessons.filter(matches) : [];
  const projects = q ? data.projects.filter(matches) : [];
  const chats = q ? data.web_chats.filter(matches) : [];
  const resources = q ? data.resources.filter(matches) : [];
  const sessionGuides = q ? data.session_guides.filter(matches) : [];
  const desktopHelp = q && matches(data.omarchy_help);
  const total = tools.length+labs.length+lessons.length+projects.length+chats.length+resources.length+sessionGuides.length+(desktopHelp?1:0);
  const rows = (items, type)=>items.map(x=>`<a class="result-row" href="#${type}/${x.id}">${lessonMark(x)}<div><h3>${esc(x.title||x.name)}</h3><p>${esc(x.subtitle||findLab(x.lab)?.title||'')}</p></div><span>↗</span></a>`).join('');
  return `${heading('Find your next step',query?`Results for “${query}”`:'Search the learning platform',`${total} matches across tools, web & media, resources, session guides, desktop help, experiments, concepts and projects.`)}${sessionGuides.length?`<section class="result-group"><h2>Session guides</h2>${sessionGuides.map(guide=>`<a class="result-row" href="#${esc(guide.id)}"><div><h3>${esc(guide.title)}</h3><p>${esc(guide.subtitle)}</p></div><span>↗</span></a>`).join('')}</section>`:''}${desktopHelp?'<section class="result-group"><h2>Desktop help</h2><a class="result-row" href="#omarchy-help"><div><h3>Omarchy help</h3><p>Find apps, switch windows and learn the keyboard shortcuts.</p></div><span>↗</span></a></section>':''}${chats.length?`<section class="result-group"><h2>Web & media</h2><div class="tool-grid">${chats.map(chatCard).join('')}</div></section>`:''}${resources.length?`<section class="result-group"><h2>Keep current</h2><div class="resource-grid">${resources.map(resourceCard).join('')}</div></section>`:''}${tools.length?`<section class="result-group"><h2>Tools</h2><div class="tool-grid">${tools.map(toolCard).join('')}</div></section>`:''}${labs.length?`<section class="result-group"><h2>Experiments</h2>${rows(labs,'lab')}</section>`:''}${lessons.length?`<section class="result-group"><h2>Concepts</h2>${rows(lessons,'learn')}</section>`:''}${projects.length?`<section class="result-group"><h2>Projects</h2>${rows(projects,'project')}</section>`:''}${!total?'<div class="empty"><h2>Try another starting point.</h2><p>Search for “terminal”, “agent”, “data” or the name of a tool.</p><a class="btn secondary" href="#home">Back to the launchpad</a></div>':''}`;
}
function aboutPage() {
  return programmePage();
}
function render(moveFocus = false) {
  if (!data) return;
  const [page,id] = route();
  const nav = [['home','home','Launchpad'],['tools','nodes','Tools'],['web-chats','book','Web & media'],['labs','spark','Experiments'],['learn','book','Learn'],['keep-current','chart','Keep current'],['projects','folder','My projects'],['configuration','tools','Configuration'],['programme','check','Programme & guides']];
  const active = {lab:'labs',project:'projects',docs:'programme',about:'programme','web-tool':'web-chats'}[page]||page;
  document.querySelector('#navigation').innerHTML = nav.map(([key,ico,title])=>`<a class="nav-link ${key===active?'active':''}" href="#${key}" ${key===active?'aria-current="page"':''}>${icon(ico)}<span>${title}</span>${key==='projects'&&data.projects.length?`<span class="nav-count">${data.projects.length}</span>`:''}</a>`).join('');
  document.querySelector('#breadcrumb').textContent = nav.find(x=>x[0]===active)?.[2]||({search:'Search',about:'About this space','omarchy-help':'Omarchy help','first-session':'First 20 minutes','finish-session':'Finish session'}[page]||'The launchpad');
  document.querySelector('#omarchy-help-link').setAttribute('aria-current',page==='omarchy-help'?'page':'false');
  for(const id of ['first-session','finish-session'])document.getElementById(id+'-link').setAttribute('aria-current',page===id?'page':'false');
  const fallback = '<div class="empty"><h2>We couldn’t find that page.</h2><p>It may have moved, or the project folder may be missing.</p><a class="btn" href="#home">Back to the launchpad</a></div>';
  const pages = {home,'first-session':firstSessionPage,'finish-session':finishSessionPage,'omarchy-help':omarchyHelpPage,'keep-current':keepCurrentPage,'web-chats':webChatsPage,'web-tool':()=>webToolPage(id),tools:toolsPage,labs:labsPage,learn:()=>id?(findLesson(id)?lessonPage(findLesson(id)):fallback):learnPage(),lab:()=>findLab(id)?labPage(findLab(id)):fallback,projects:projectsPage,project:()=>findProject(id)?projectPage(findProject(id)):fallback,search:()=>searchPage(id),about:programmePage,programme:programmePage,configuration:configurationPage,docs:()=>documentPage(id)};
  main.innerHTML = (data.warnings||[]).map(w=>`<p class="error">${esc(w)}</p>`).join('') + (pages[page]||(()=>fallback))();
  document.title = `${main.querySelector('h1')?.textContent||'Launchpad'} · AISI AI Labs`;
  if (page==='learn'&&id==='terminal') {simFolder='';simHistory=[];}
  if (moveFocus) {window.scrollTo(0,0);main.focus({preventScroll:true});}
}
function openModal(body) {
  modal.innerHTML = body;
  if (!modal.open) modal.showModal();
}
function modalTop(title) {return `<div class="modal-top"><h2 id="modal-title">${esc(title)}</h2><button class="modal-close" data-close aria-label="Close dialog">×</button></div>`;}
function createModal(id) {
  if(!data.acknowledged){policyDialog(()=>createModal(id));return;}
  const lab=findLab(id);
  openModal(`${modalTop('Create a project')}<p>We’ll create a new ${esc(lab.title.toLowerCase())} project, with a brief and starter files.</p><form id="create-form" data-lab="${lab.id}"><label class="field"><span>Project name</span><input id="project-name" name="name" maxlength="80" required value="${esc(lab.id==='blank'?'Practice project':lab.title)}" autofocus></label><p class="small-note">Every attempt gets a separate folder. Your previous work is preserved.</p><p class="error" id="modal-error" role="alert"></p><div class="actions"><button type="button" class="btn secondary" data-close>Cancel</button><button class="btn" type="submit">Create project →</button></div></form>`);
  document.querySelector('#project-name').select();
}
function toolModal(id, selectedProject) {
  if(!data.acknowledged){policyDialog(()=>toolModal(id,selectedProject));return;}
  const tool=data.tools.find(x=>x.id===id);
  openModal(`${modalTop(`Open ${tool.name}`)}<p>${esc(tool.description)}</p>${credentialNotice(tool.id)}<form id="launch-form" data-tool="${tool.id}"><label class="field"><span>Choose your workspace</span><select id="launch-project"><option value="">Playground — explore freely</option>${data.projects.map(p=>`<option value="${p.id}" ${p.id===selectedProject?'selected':''}>${esc(p.name)}</option>`).join('')}</select></label><div class="note">${esc(tool.account)} ${tool.category!=='Desktop tools'?'You’ll enter your request inside the tool after it opens.':''}</div><p class="small-note">Use ONLY public information. Never use OFFICIAL material or connect to government networks. The project folder does not restrict the tool’s filesystem access.</p><p class="error" id="modal-error" role="alert"></p><div class="actions"><button type="button" class="btn secondary" data-close>Cancel</button><button class="btn" type="submit">Open ${esc(tool.name)} ↗</button></div></form>`);
}
async function launch(tool, project, button) {
  if(!data.acknowledged){policyDialog(()=>launch(tool,project,button));return false;}
  if (button) button.disabled=true;
  try { const result=await api('launch',{tool,project:project||null});toast(result.message);return true; }
  catch(error) {toast(error.message);return false;}
  finally {if(button)button.disabled=false;}
}
function runSim(command) {
  command=command.trim();
  if (!command) return;
  const input = document.querySelector('#terminal-command');
  const output = document.querySelector('#terminal-output');
  let result='';
  if(command==='clear'){simHistory=[];output.textContent='';input.value='';input.focus();return;}
  if(command==='pwd')result='/practice/my-project'+(simFolder?'/examples':'');
  else if(command==='ls')result=simFolder?'hello.txt':'BRIEF.md    index.html    examples/';
  else if(command==='help')result='pwd — show your folder\nls — list files\ncat BRIEF.md — read the brief (in the project folder)\ncd examples — enter the examples folder\ncat hello.txt — read its example file\ncd .. — go back\nclear — clear this practice screen';
  else if(command==='cd examples'){if(simFolder)result='No examples folder here. Try cd .. first.';else simFolder='examples';}
  else if(command==='cd ..'){simFolder='';result='Back in /practice/my-project';}
  else if(command==='cat BRIEF.md'&&!simFolder)result='Build a welcome page for a fictional community learning day.\nInclude a title and three activities. Keep it offline.';
  else if(command==='cat index.html'&&!simFolder)result='<h1>Community learning day</h1>\n<p>Practice page for a fictional event.</p>';
  else if(command==='cat hello.txt'&&simFolder)result='This sample file is in the examples folder.';
  else if(command==='exit')result='In a real shell, exit closes the session. This simulation stays here so you can keep practising.';
  else if(command.startsWith('cat ')||command.startsWith('cd '))result='File or folder not found in the current simulated folder. Use pwd and ls to check the location.';
  else result='This simulation understands a few practice commands only. Try help. Nothing was executed.';
  simHistory.push(`$ ${command}\n${result}`.trimEnd());
  simHistory=simHistory.slice(-30);
  output.textContent=simHistory.join('\n\n');output.scrollTop=output.scrollHeight;input.value='';input.focus();
}
document.addEventListener('click', async event=>{
  const button=event.target.closest('button');if(!button)return;
  try {
    if(button.hasAttribute('data-close'))modal.close();
    else if(button.dataset.create)createModal(button.dataset.create);
    else if(button.dataset.tool)toolModal(button.dataset.tool);
    else if(button.dataset.filter){toolFilter=button.dataset.filter;render();document.querySelector(`[data-filter="${toolFilter}"]`).focus();}
    else if(button.dataset.mode){traceMode=button.dataset.mode;document.querySelector('#agent-diagram').innerHTML=agentDiagram();document.querySelector(`[data-mode="${traceMode}"]`).focus();}
    else if(button.dataset.trace){traceStep=(traceStep+Number(button.dataset.trace)+traces.length)%traces.length;document.querySelector('#agent-diagram').innerHTML=agentDiagram();document.querySelector('[data-trace="1"]').focus();}
    else if(button.dataset.command)runSim(button.dataset.command);
    else if(button.hasAttribute('data-answer')){
      const lesson=findLesson(button.dataset.lesson);const correct=Number(button.dataset.answer)===lesson.correct;
      document.querySelectorAll('.quiz-option').forEach(b=>{b.classList.remove('correct','incorrect');b.setAttribute('aria-pressed','false');});button.classList.add(correct?'correct':'incorrect');button.setAttribute('aria-pressed','true');
      document.querySelector('#quiz-feedback').textContent=(correct?'Best fit. ':'Not the best fit. ')+(lesson.option_feedback?.[Number(button.dataset.answer)]||lesson.feedback);
    }
    else if(button.dataset.complete){button.disabled=true;data.progress=await api('progress',{lesson:button.dataset.complete,completed:!data.progress[button.dataset.complete]});button.textContent=data.progress[button.dataset.complete]?'✓ Explored — undo':'Mark as explored';button.disabled=false;toast('Learning bookmark saved on this computer.');}
    else if(button.dataset.copy){await navigator.clipboard.writeText(findLab(button.dataset.copy).prompt);toast('Starter prompt copied. Paste it inside your AI assistant.');}
    else if(button.dataset.direct)await launch(button.dataset.direct,button.dataset.project,button);
    else if(button.dataset.projectLaunch){const value=document.querySelector('#project-tool').value;if(value)await launch(value,button.dataset.projectLaunch,button);else toast('No AI tools are available. You can still open Files, the editor or Terminal.');}
    else if(button.hasAttribute('data-refresh')){data=await api('bootstrap');render();toast('Project details refreshed.');}
  } catch(error){button.disabled=false;toast(error.message);}
});
document.addEventListener('change',async event=>{
  const input=event.target;
  if(input.id==='project-tool'){document.querySelector('#project-credential').innerHTML=credentialNotice(input.value);return;}
  if(!input.hasAttribute('data-check'))return;
  const project=findProject(input.dataset.project);
  const checks=[...document.querySelectorAll('[data-check]:checked')].map(el=>Number(el.dataset.check));
  document.querySelectorAll('[data-check]').forEach(el=>el.disabled=true);
  try{const updated=await api('checks',{project:project.id,checks});Object.assign(project,updated);document.querySelector('#check-status').textContent=`${project.checks.length} of ${findLab(project.lab).checks.length} checks reviewed · saved`;}
  catch(error){input.checked=!input.checked;toast(error.message);}
  finally{document.querySelectorAll('[data-check]').forEach(el=>el.disabled=false);}
});
document.addEventListener('submit',async event=>{
  const form=event.target;event.preventDefault();
  if(form.id==='policy-form'||form.classList.contains('key-form'))return;
  if(form.id==='search-form'){location.hash='#search/'+encodeURIComponent(document.querySelector('#search').value.trim());return;}
  if(form.id==='terminal-form'){runSim(document.querySelector('#terminal-command').value);return;}
  const submit=form.querySelector('[type="submit"]');if(submit)submit.disabled=true;
  try {
    if(form.id==='create-form'){
      const project=await api('projects',{lab:form.dataset.lab,name:document.querySelector('#project-name').value});
      data.projects.unshift(project);modal.close();location.hash='#project/'+project.id;toast('Your project is ready. Choose a tool when you’re ready to begin.');
    }else if(form.id==='launch-form'){
      const result=await api('launch',{tool:form.dataset.tool,project:document.querySelector('#launch-project').value||null});modal.close();toast(result.message);
    }
  }catch(error){const el=document.querySelector('#modal-error');if(el)el.textContent=error.message;else toast(error.message);}
  finally{if(submit)submit.disabled=false;}
});
document.addEventListener('keydown',event=>{if((event.ctrlKey||event.metaKey)&&event.key.toLowerCase()==='k'){event.preventDefault();document.querySelector('#search').focus();}});
window.addEventListener('hashchange',()=>{if(modal.open)modal.close();render(true);});
async function boot(){try{data=await api('bootstrap');render();if(!data.acknowledged)policyDialog();}catch(error){main.innerHTML=`<div class="empty"><h1>Your workbench couldn’t load.</h1><p>${esc(error.message)}</p><p>Reopen AISI AI Labs from the app launcher to restart the local service.</p><button class="btn" id="retry">Try again</button></div>`;document.querySelector('#retry').addEventListener('click',boot);}}
boot();
