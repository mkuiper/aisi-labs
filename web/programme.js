/* Programme and credential settings. Never persist API keys in the browser. */
let afterAcknowledgement = null;
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
function configurationPage() {
  return `${heading('Make the tools work for you','Configuration','Set dedicated learning API keys, or keep using each tool’s own sign-in.')}<div class="note"><strong>Keys are an authentication exception to the public-input rule.</strong> Enter only dedicated learning keys in these password fields. Never put keys in prompts, project files, memory, screenshots or a shared laptop image. Do not use credentials that grant access to government systems.</div><div class="settings-summary"><div><h2>For this hub session only</h2><p>Keys stay in the running hub’s memory and are forgotten when it restarts. Closing the window does not stop the hub. Keys are passed only to the matching tool when launched from Labs; they are never returned to this page.</p></div><button class="btn secondary" data-forget="all">Forget all keys</button></div><div class="provider-grid">${data.configuration.providers.map(p=>`<section class="panel provider-card"><div class="provider-heading"><h2>${esc(p.name)}</h2><span class="badge-count">${p.configured?'Set for session':'Not set in Labs'}</span></div><p><strong>${esc(p.tool_name)}</strong> · ${esc(p.env)}</p><p class="small-note">${esc(p.help)}</p><form class="key-form" data-provider="${p.id}"><label class="field"><span>${p.configured?'Replace learning API key':'Learning API key'}</span><input type="password" name="key" autocomplete="new-password" spellcheck="false" autocapitalize="none" minlength="8" maxlength="4096" required aria-label="${esc(p.name)} learning API key" placeholder="Enter a dedicated learning key"></label><div class="actions"><button class="btn" type="submit">Set for session</button>${p.configured?`<button class="btn secondary" type="button" data-forget="${p.id}">Forget key</button>`:''}</div><p class="key-feedback small-note" role="status">${p.configured?'Stored in memory; not validated with the provider.':'Native tool sign-in is available without adding a key here.'}</p></form><div class="settings-links"><a class="text-link" href="${p.docs}" target="_blank" rel="noopener noreferrer">Authentication guide ↗</a><a class="text-link" href="${p.billing}" target="_blank" rel="noopener noreferrer">Usage and account ↗</a></div></section>`).join('')}</div><section class="panel"><h2>What these settings do</h2><p>Saving a key makes no provider request and does not verify credit, access or model availability. Other AI tools use their own authentication; Labs does not distribute these keys to every tool. A compatible model or an authentication choice inside the tool may be required.</p><p class="small-note">Forgetting a key stops Labs supplying it to new launches. Already-running tools may retain it or save their own credentials. Close those sessions and revoke a key with the provider if necessary. Processes running as this Linux user may access process memory or environment; this is not isolation between users.</p><p class="small-note">API billing can be separate from a chat subscription. Configure budgets and alerts with the provider; Labs does not enforce a spending cap.</p><a class="text-link" href="#docs/credentials">Read the credential guide ↗</a></section>`;
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
  if(button.hasAttribute('data-policy'))policyDialog();
  if(button.dataset.forget){button.disabled=true;try{data.configuration=await api('configuration/forget',{provider:button.dataset.forget});render();toast('Forgotten for future launches. Existing tool sessions may still hold the key.');}catch(error){button.disabled=false;toast(error.message);}}
});
