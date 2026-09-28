/* Programme and credential settings. Never persist API keys in the browser. */
let afterAcknowledgement = null;
function chatCard(chat) {
  const label=chat.kind==='reference'?'Reference only · restricted product':chat.kind==='library'?'Model library · online':chat.kind==='creative'?(chat.id==='comfyui'?'Workflow guide · no installation':'Image & video · hosted'):'Hosted chat · online';
  return `<article class="tool-card web-chat-card">${mark(chat, 'chat')}<h3>${esc(chat.name)}</h3><span class="tag">${label}</span><p>${esc(chat.description)}</p><div class="actions"><a class="btn secondary" href="#web-tool/${esc(chat.id)}">About this tool →</a>${chat.url&&chat.kind!=='reference'?`<button class="btn secondary" data-web-chat="${esc(chat.id)}">Visit website ↗</button>`:''}</div></article>`;
}
function webToolPage(id) {
  const chat=data.web_chats.find(x=>x.id===id);if(!chat)return '<p>Tool profile not found.</p>';
  const review=data.content_reviews.find(x=>x.id==='chat:'+id);
  return `<article class="reader tool-profile"><a class="back" href="#web-chats">← Web & media</a>${mark(chat,'chat')}<h1>${esc(chat.name)}</h1><p class="intro">${esc(chat.description)}</p>
    <p class="small-note content-review">Revision ${review?.revision||1} · ${review?.reviewed_at?'Source review '+esc(review.reviewed_at):'Detailed review pending'} · ${esc(review?.status||'unreviewed')}. This is a learning profile, not procurement advice or approval.</p>
    ${chat.kind==='reference'?'<div class="note"><strong>Reference only — no launch or download.</strong> Device restrictions can still apply on a separate network. Ask the deployment owner; do not assume a learning-purpose exception.</div>':''}
    ${[['Useful learning uses',chat.useful_for],['What is open—and where does it run?',chat.openness],['Limitations',chat.limits],['Concerns and context',chat.considerations]].map(([title,body])=>`<section class="article-section"><h2>${title}</h2><p>${esc(body)}</p></section>`).join('')}
    ${chat.risk_checks?.length?`<section class="panel risk-checks"><h2>Before you go further</h2><ul>${chat.risk_checks.map(check=>`<li><h3>${esc(check.title)}</h3><p>${esc(check.body)}</p><a class="text-link" href="${esc(check.source[1])}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">${esc(check.source[0])} ↗</a></li>`).join('')}</ul></section>`:''}
    <section class="panel"><h2>A small learning exercise</h2><p>${esc(chat.exercise)}</p><p class="small-note">An authored suggestion, not a benchmark or tested provider result. ONLY public information; nothing OFFICIAL. NEVER use government networks or accounts.</p></section>
    <div class="sources"><h2>Sources and review limits</h2><p>Primary sources support the product and policy notes. Suggested uses are editorial examples. This is not an exhaustive legal, safety or controversy assessment; missing concerns do not mean a tool is risk-free. Features and terms change. No live sign-in, paid task or model download was tested.</p>${chat.sources.map(([title,url])=>`<a href="${esc(url)}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">${esc(title)} ↗</a>`).join('')}</div>
    <div class="actions">${chat.url&&chat.kind!=='reference'?`<button class="btn" data-web-chat="${esc(chat.id)}">Visit website ↗</button>`:''}<a class="btn secondary" href="#learn/open-models">Understand open models →</a></div></article>`;
}
function webChatsPage() {
  return `${heading('Explore different ways to create','Web & media','Chatbot websites, image/video tools and open-model learning resources.')}
    <div class="note"><strong>These links open external websites, not local apps.</strong> Use ONLY public information—nothing OFFICIAL. NEVER use government accounts or connect this laptop to government networks. Inclusion is not agency approval. Account requirements, models, prices and privacy settings can change.</div>
    <div class="actions"><a class="btn secondary" href="#learn/web-chat">First conversation guide →</a><a class="btn secondary" href="#learn/open-models">Understand open models →</a></div>
    <section class="panel"><h2>Learn how to choose, not just what to click</h2><p>Read each profile for useful exercises, limitations and sourced concerns. These are learning suggestions, not rankings or agency approvals. No listed controversy does not mean no risk. A government-owned laptop can remain subject to product restrictions even on a separate learning network.</p></section>
    <h2>Hosted assistants</h2><div class="tool-grid web-chat-grid">${data.web_chats.filter(x=>x.kind==='chat').map(chatCard).join('')}</div>
    <h2>Image & video</h2><p>Explore visual briefs, generation and review. ComfyUI links to documentation only; no local installation is implied.</p><p><a class="text-link" href="#learn/image-video">Learn to make media responsibly →</a></p><div class="tool-grid web-chat-grid">${data.web_chats.filter(x=>x.kind==='creative').map(chatCard).join('')}</div>
    <h2>Explore open-model releases</h2><p>Start with model cards and licences. Qwen and Mistral above also illustrate why a hosted chat service is different from a model release. Browsing this directory installs nothing.</p><div class="tool-grid web-chat-grid">${data.web_chats.filter(x=>x.kind==='library'||x.kind==='reference').map(chatCard).join('')}</div>
    <section class="panel"><h2>Chat website ≠ model ≠ local agent</h2><p>The website provides the interface and its own tools and permissions. Your Labs API key and project folder are not sent by these links. Each website manages its own sign-in, privacy settings and billing; existing browser sessions may still be signed in. Check the account before you type.</p><p class="small-note">Try the same fictional public prompt in two services, then compare what you can verify—not just which answer sounds more confident. A hosted open-weight model is still hosted, not local inference.</p></section>`;
}
function webChatDialog(id) {
  const chat=data.web_chats.find(x=>x.id===id);if(!chat||chat.kind==='reference'||!chat.url)return;
  externalSiteDialog(chat);
}
function externalSiteDialog(chat) {
  withAcknowledgement(()=>openModal(`${modalTop('Open '+chat.name+'?')}<p>You are leaving the local Labs app for <strong>${esc(new URL(chat.url).hostname)}</strong>.</p><div class="note">ONLY public information. Nothing OFFICIAL. Use a dedicated learning account and the separate non-government network. NEVER connect government accounts or internal sources.</div><p class="small-note">Labs sends no prompt, project or API key. The site can use existing browser cookies and sign-in. Its own terms, privacy settings and charges apply. Closing Labs does not sign out of the website.</p><div class="actions"><button class="btn secondary" data-close>Stay in Labs</button><a class="btn" id="external-chat-link" href="${esc(chat.url)}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">Continue to website ↗</a></div>`));
}
function resourceCard(resource) {
  const review=data.content_reviews.find(x=>x.id==='resource:'+resource.id);
  return `<article class="panel resource-card"><span class="eyebrow">${esc(resource.kind)}</span><h2>${esc(resource.name)}</h2><p>${esc(resource.description)}</p><h3>How to read it</h3><p>${esc(resource.check)}</p><div class="note">${esc(resource.caution)}</div><p class="small-note content-review">Revision ${review?.revision||1} · ${review?.reviewed_at?'Source review '+esc(review.reviewed_at):'Review pending'} · ${esc(review?.status||'unreviewed')}. Links and methods reviewed, not every live result.</p><div class="actions"><button class="btn secondary" data-resource="${esc(resource.id)}">Explore resource ↗</button><a class="text-link" href="${esc(resource.source[1])}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">${esc(resource.source[0])} ↗</a></div>${resource.id==='hf-papers'?'<p><a class="text-link" href="#web-tool/huggingface">Read the Hugging Face risk checklist →</a></p>':''}</article>`;
}
function keepCurrentPage() {
  return `${heading('A small window onto a fast-moving field','Keep current','Understand the evidence behind “state of the art”—not just the top-ranked name.')}
    <div class="note"><strong>Discovery, not approval.</strong> These are external public resources. ONLY public information; nothing OFFICIAL. NEVER government networks or accounts. Inclusion is not an endorsement. No prompts, files or API keys are sent by Labs; external sites have their own cookies and terms.</div>
    <div class="actions"><a class="btn" href="#learn/reading-leaderboards">How to read a leaderboard →</a><a class="btn secondary" href="#web-chats">Explore tools and primary sources →</a></div>
    <section class="panel"><h2>A ten-minute learning habit</h2><ol class="steps"><li>Choose a task, then inspect a relevant leaderboard and its method.</li><li>Check a primary release note or publisher model card for what is actually available.</li><li>Write down the date, evidence, one trade-off and one unanswered question.</li></ol><p class="small-note">SOTA = state of the art under stated conditions. We link to live sources, not a cached winner list. This page is a curated directory, not a live feed or automatic monitor.</p></section>
    <div class="resource-grid">${data.resources.map(resourceCard).join('')}</div>`;
}
function learningReviewNote(lesson) {
  const review=data.content_reviews.find(x=>x.id==='lesson:'+lesson.id);
  if(!review)return '';
  return `<p class="small-note content-review">Content revision ${review.revision} · ${review.reviewed_at?'Source review '+esc(review.reviewed_at):'Baseline material; detailed review pending'}${review.status==='changed'?' · Changed since recorded review':review.status==='due'?' · Review due':''}. A review date is not a guarantee of accuracy. <a class="text-link" href="#docs/curriculum">How content is maintained ↗</a></p>`;
}
function openModelsDiagram() {
  return `<div class="diagram"><div class="diagram-label">Two independent choices: release and location</div><div class="diagram-row"><div class="diagram-node"><strong>Model release</strong><small>Weights · code · terms</small></div><span class="diagram-arrow">→</span><div class="diagram-node"><strong>Local runner</strong><small>Inference on the laptop</small></div></div><div class="diagram-row"><div class="diagram-node"><strong>Same model release</strong><small>Openness has not changed</small></div><span class="diagram-arrow">→</span><div class="diagram-node"><strong>Hosted runner</strong><small>Inference on a server</small></div></div><p class="diagram-caption">Check actual endpoints and network features. Both paths remain public-information-only in this programme.</p></div>`;
}
function policyDialog(next = null) {
  afterAcknowledgement = next;
  openModal(`${modalTop('A place to learn. A clear boundary.')}<span class="eyebrow">AUSTRALIAN AI SAFETY INSTITUTE</span><p>${esc(data.policy.purpose)}</p><form id="policy-form"><div class="policy-checks"><label><input type="checkbox" required><span>I will input <strong>ONLY public information</strong>. No OFFICIAL or higher-classified material, internal work files or non-public personal information.</span></label><label><input type="checkbox" required><span>I will <strong>NEVER connect this learning laptop to government networks</strong> or use it to connect to government accounts or internal systems.</span></label><label><input type="checkbox" required><span>I will use the tools responsibly, review permissions and outputs, and monitor costs using dedicated learning credentials.</span></label></div><p class="small-note">${esc(data.policy.examples)}</p><p class="small-note">This acknowledgement is for the current hub session. It does not verify your network or permissions.</p><p class="error" id="modal-error" role="alert"></p><div class="actions"><button class="btn secondary" type="button" data-close>Read guides first</button><button class="btn" type="submit">I understand — continue</button></div></form>`);
}
function withAcknowledgement(next) { if (data.acknowledged) next(); else policyDialog(next); }
function configuredFor(tool) { return data.configuration.providers.find(p=>p.tool===tool&&p.configured); }
function credentialNotice(tool) {
  const provider=configuredFor(tool);
  return provider ? `<p class="credential-notice">${esc(provider.name)} API key set for this hub session. API charges may apply. <a href="#configuration">Manage keys ↗</a></p>` : '';
}
function credentialsPanel() {
  return `${heading('Make the tools work for you','Configuration','Set dedicated learning API keys, or keep using each tool’s own sign-in.')}<div class="note"><strong>Keys are an authentication exception to the public-input rule.</strong> Enter only dedicated learning keys in these password fields. Never put keys in prompts, project files, memory, screenshots or a shared laptop image. Do not use credentials that grant access to government systems.</div><div class="settings-summary"><div><h2>For this hub session only</h2><p>Keys stay in the running hub’s memory and are forgotten when it restarts. Closing the window does not stop the hub. Keys are passed only to the matching tool when launched from Labs; they are never returned to this page.</p></div><button class="btn secondary" data-forget="all">Forget all keys</button></div><div class="provider-grid">${data.configuration.providers.map(p=>`<section class="panel provider-card"><div class="provider-heading"><h2>${esc(p.name)}</h2><span class="badge-count">${p.configured?'Set for session':'Not set in Labs'}</span></div><p><strong>${esc(p.tool_name)}</strong> · ${esc(p.env)}</p><p class="small-note">${esc(p.help)}</p><form class="key-form" data-provider="${p.id}"><label class="field"><span>${p.configured?'Replace learning API key':'Learning API key'}</span><input type="password" name="key" autocomplete="new-password" spellcheck="false" autocapitalize="none" minlength="8" maxlength="4096" required aria-label="${esc(p.name)} learning API key" placeholder="Enter a dedicated learning key"></label><div class="actions"><button class="btn" type="submit">Set for session</button>${p.configured?`<button class="btn secondary" type="button" data-forget="${p.id}">Forget key</button>`:''}</div><p class="key-feedback small-note" role="status">${p.configured?'Stored in memory; not validated with the provider.':'Native tool sign-in is available without adding a key here.'}</p></form><div class="settings-links"><a class="text-link" href="${p.docs}" target="_blank" rel="noopener noreferrer">Authentication guide ↗</a><a class="text-link" href="${p.billing}" target="_blank" rel="noopener noreferrer">Usage and account ↗</a></div></section>`).join('')}</div><section class="panel"><h2>What these settings do</h2><p>Saving a key makes no provider request and does not verify credit, access or model availability. Other AI tools use their own authentication; Labs does not distribute these keys to every tool. A compatible model or an authentication choice inside the tool may be required.</p><p class="small-note">Forgetting a key stops Labs supplying it to new launches. Already-running tools may retain it or save their own credentials. Close those sessions and revoke a key with the provider if necessary. Processes running as this Linux user may access process memory or environment; this is not isolation between users.</p><p class="small-note">API billing can be separate from a chat subscription. Configure budgets and alerts with the provider; Labs does not enforce a spending cap.</p><a class="text-link" href="#docs/credentials">Read the credential guide ↗</a></section>`;
}
let maintenanceResult = null;
function configurationPage() {
  const jumps=`<nav class="settings-jumps" aria-label="Configuration sections"><button class="btn secondary" data-settings-section="key-settings">API keys</button><button class="btn secondary" data-settings-section="model-settings">Models</button><button class="btn secondary" data-settings-section="native-settings">Tool setup</button><button class="btn secondary" data-settings-section="maintenance-settings">Version checks</button></nav>`;
  return jumps + `<div id="key-settings" tabindex="-1">${credentialsPanel()}</div>` + modelPanel() + nativeSetupPanel() + maintenancePanel();
}
function modelPanel() {
  return `<section class="panel" id="model-settings" tabindex="-1" aria-labelledby="model-heading">
    <h2 id="model-heading">Choose your models</h2>
    <p>Leave a field empty to use the tool’s own default. Set an exact model ID or a supported alias to override it for new launches from Labs. These non-secret preferences are saved on this laptop; API keys are not.</p>
    <p class="small-note">There is no universal “latest”. A tool update, a new model release and access on your account are different things. Use each tool’s model picker and the official guide. An alias can move; an exact version is more repeatable. Labs does not verify availability, quality or price.</p>
    ${data.configuration.warning?`<p class="error">${esc(data.configuration.warning)}</p>`:''}
    <div class="provider-grid">${data.configuration.models.map(tool=>`
      <form class="model-form" data-model-tool="${tool.id}">
        <label class="field"><span>${esc(tool.name)} model</span><input name="model" value="${esc(tool.model)}" maxlength="160" autocomplete="off" spellcheck="false" placeholder="Use the tool’s default"></label>
        <p class="small-note">${esc(tool.help)}</p>
        <div class="actions"><button class="btn secondary" type="submit">Save model</button><a class="text-link" href="${tool.docs}" target="_blank" rel="noopener noreferrer">Model guide ↗</a></div>
      </form>`).join('')}</div>
    <p class="small-note">Model IDs are not secrets. Never paste an API key here. Saving a preference makes no model call and does not change an already-running session.</p>
  </section>`;
}
function nativeSetupPanel() {
  const managed=new Set(data.configuration.providers.map(p=>p.tool));
  const native=data.tools.filter(t=>t.category!=='Desktop tools'&&!managed.has(t.id));
  return `<section class="panel" id="native-settings" tabindex="-1"><h2>Grok and the rest of your toolkit</h2>
    <p>Every tool has a setup route, but not every tool should receive a key from Labs. Multi-provider tools and account-based products keep their own login, provider selection, permissions, MCP and skills settings.</p>
    <div class="note"><strong>Grok:</strong> choose the model above, then use Grok’s native sign-in. Its official guide also explains xAI API-key authentication. Labs does not yet inject xAI keys: its background leader and existing login need dedicated acceptance testing first. <a class="text-link" href="https://docs.x.ai/build/overview" target="_blank" rel="noopener noreferrer">Grok setup guide ↗</a></div>
    <div class="setup-list">${native.map(t=>`<div class="setup-row"><div><strong>${esc(t.name)}</strong><p class="small-note">Native setup · account, provider and permissions inside the tool</p></div><button class="btn secondary" data-tool="${t.id}" ${t.available?'':'disabled'}>Open ${esc(t.name)}</button></div>`).join('')}</div>
    <p class="small-note">Desktop applications, the editor and terminal use their own preferences and need no hub API key to open. Review any third-party login or extension before connecting it. Do not use government accounts.</p>
  </section>`;
}
function maintenancePanel() {
  const result=maintenanceResult;
  return `<section class="panel" id="maintenance-settings" tabindex="-1" aria-labelledby="maintenance-heading"><h2 id="maintenance-heading">Versions and maintenance</h2>
    <p>Check what this machine can launch, then optionally compare four core AI tools with their public npm release metadata. This does not install or update anything.</p>
    <div class="actions"><button class="btn secondary" data-inventory="local">Inspect local versions</button><button class="btn secondary" data-inventory="online">Check public releases ↗</button><a class="text-link" href="#docs/maintenance">Update and release guide ↗</a></div>
    <p class="small-note">The online check contacts registry.npmjs.org over the separate learning network. It sends no API keys, prompts, projects or installed-version list. The registry sees the network address and requested package names.</p>
    ${result?`<p role="status">${result.online?'Public release check':'Local inspection'}: ${esc(new Date(result.checked_at).toLocaleString())}</p><p class="small-note">${esc(result.scope)} Content reviewed: ${esc(result.content_reviewed)}.</p>${result.warning?`<p class="error">${esc(result.warning)}</p>`:''}
    <div class="table-scroll" tabindex="0" role="region" aria-label="Tool version inventory"><table class="inventory-table"><thead><tr><th scope="col">Tool</th><th scope="col">Active Mise version</th><th scope="col">Public release</th><th scope="col">Check result</th></tr></thead><tbody>${result.tools.map(t=>`<tr><th scope="row">${esc(t.name)}<small>${t.detected?'Command detected':'Not detected'}${t.dynamic_wrapper?' · May update on launch':''}</small></th><td>${esc(t.version||'Unknown')}</td><td>${t.source?`<a href="${esc(t.source)}" target="_blank" rel="noopener noreferrer">${esc(t.latest||'Not checked')} ↗</a>`:'Manual review'}</td><td>${esc(t.status)}</td></tr>`).join('')}</tbody></table></div>`:''}
    <p class="small-note">A matching version is not a security approval. Wrappers may select or download another version when opened. Maintain a tested image, review changes, pilot updates and keep a rollback image. OS, desktop apps, plugins, skills and MCP servers need their own checks.</p>
  </section>`;
}
function programmePage() {
  return `${heading('Australian AI Safety Institute','Explore freely. Work responsibly.','Professional development and personal upskilling for Australian Public Service staff.')}<div class="programme-purpose"><h2>Hands-on exposure to contemporary AI tools.</h2><p>Use a dedicated learning laptop to understand how the tools work, make public practice projects and build your own capability. Activities are learning exercises; this is not an environment for processing official work.</p></div><div class="programme-rules">${data.policy.rules.map((rule,i)=>`<section class="panel"><span class="eyebrow">BOUNDARY ${i+1}</span><p>${esc(rule)}</p></section>`).join('')}</div><div class="diagram"><div class="diagram-label">Intended deployment — must be implemented outside the app</div><div class="diagram-row"><div class="diagram-node"><strong>Learning laptop</strong><small>Public practice material</small></div><span class="diagram-arrow">→</span><div class="diagram-node"><strong>Separate network</strong><small>Non-government internet</small></div><span class="diagram-arrow">→</span><div class="diagram-node"><strong>AI providers</strong><small>Dedicated learning accounts</small></div></div><p class="network-boundary">Government networks and systems: NEVER CONNECT</p><p class="diagram-caption">${esc(data.policy.limits)}</p></div><div class="note"><strong>Public means public.</strong> ${esc(data.policy.examples)} Public availability also does not remove privacy, copyright or acceptable-use responsibilities.</div><div class="actions"><button class="btn secondary" data-policy>Review learning rules</button><a class="btn" href="#learn/responsible-use">Learn about responsible use →</a><span class="tiny-label">${data.acknowledged?'Acknowledged for this hub session':'Please acknowledge before launching tools'}</span></div><div class="section-heading"><div><h2>Programme documentation</h2><p>For learners, facilitators and the people preparing departmental laptops.</p></div></div><div class="about-grid">${data.documents.map(d=>`<a class="panel doc-card" href="#docs/${d.id}"><span class="eyebrow">${esc(d.audience)}</span><h2>${esc(d.title)}</h2><p>${esc(d.description)}</p><span class="text-link">Read guide ↗</span></a>`).join('')}</div>`;
}
function documentPage(id) {
  const doc=data.documents.find(d=>d.id===id);
  if(!doc)return '<p>Document not found.</p>';
  const inline=s=>esc(s).replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>');
  const blocks=doc.body.split(/\n\s*\n/).map(block=>{
    if(/^#{1,3} /.test(block)){const level=Math.min(block.match(/^#+/)[0].length+1,4);return `<h${level}>${inline(block.replace(/^#+ /,''))}</h${level}>`;}
    if(block.startsWith('- '))return '<ul>'+block.split('\n').map(line=>'<li>'+inline(line.replace(/^- /,''))+'</li>').join('')+'</ul>';
    if(block.startsWith('```'))return '<pre>'+esc(block.replace(/^```[^\n]*\n/,'').replace(/\n```$/,''))+'</pre>';
    return '<p>'+inline(block).replace(/\n/g,' ')+'</p>';
  }).join('');
  return `<article class="reader document-reader"><a class="back" href="#programme">← Programme and guides</a><span class="eyebrow">${esc(doc.audience)}</span><h1>${esc(doc.title)}</h1>${blocks}</article>`;
}
document.addEventListener('submit',async event=>{
  const form=event.target;
  if(form.id!=='policy-form'&&!form.classList.contains('key-form'))return;
  event.preventDefault();
  const button=form.querySelector('[type="submit"]');button.disabled=true;
  try {
    if(form.id==='policy-form'){
      if(!form.checkValidity()){form.reportValidity();return;}
      await api('acknowledge',{version:data.policy.version});data.acknowledged=true;modal.close();
      const next=afterAcknowledgement;afterAcknowledgement=null;
      if(next)next();else render();toast('Learning rules acknowledged for this hub session.');
    }else{
      const input=form.querySelector('[name="key"]');
      if(!data.acknowledged){input.value='';policyDialog(()=>{location.hash='#configuration';});return;}
      try {data.configuration=await api('configuration/key',{provider:form.dataset.provider,key:input.value});}
      finally {input.value='';}
      render();toast('Key set for this hub session. No provider request was made.');
    }
  }catch(error){const el=form.querySelector('.key-feedback')||document.querySelector('#modal-error');if(el)el.textContent=error.message;else toast(error.message);}
  finally {button.disabled=false;}
});
document.addEventListener('click',async event=>{
  const button=event.target.closest('button');if(!button)return;
  if(button.dataset.webChat)webChatDialog(button.dataset.webChat);
  if(button.dataset.resource){const resource=data.resources.find(x=>x.id===button.dataset.resource);if(resource)externalSiteDialog(resource);}
  if(button.dataset.settingsSection){const section=document.getElementById(button.dataset.settingsSection);section?.focus({preventScroll:true});section?.scrollIntoView({block:'start'});}
  if(button.dataset.inventory){
    const online=button.dataset.inventory==='online';
    if(online&&!data.acknowledged){policyDialog(()=>{location.hash='#configuration';});return;}
    button.disabled=true;button.textContent='Checking…';
    try{maintenanceResult=await api('maintenance',{online});render();toast('Read-only check complete. No software was installed.');}
    catch(error){button.disabled=false;button.textContent='Try version check again';toast(error.message);}
  }
  if(button.hasAttribute('data-policy'))policyDialog();
  if(button.dataset.forget){button.disabled=true;try{data.configuration=await api('configuration/forget',{provider:button.dataset.forget});render();toast('Forgotten for future launches. Existing tool sessions may still hold the key.');}catch(error){button.disabled=false;toast(error.message);}}
});
document.addEventListener('submit',async event=>{
  const form=event.target;if(!form.classList.contains('model-form'))return;
  event.preventDefault();
  if(!data.acknowledged){policyDialog(()=>{location.hash='#configuration';});return;}
  const button=form.querySelector('button');button.disabled=true;
  try{data.configuration=await api('configuration/model',{tool:form.dataset.modelTool,model:form.elements.model.value.trim()});render();toast('Model preference saved for future launches. No model call was made.');}
  catch(error){toast(error.message);button.disabled=false;}
});
