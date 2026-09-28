/* Optional orientation and manual handover guidance. No stored checklist or logout automation. */
const sessionReview = new Set();
let sessionForgetPending = false;

function sessionLinks(links) {
  return links.map(([label, href])=>`<a class="btn secondary small" href="${esc(href)}">${esc(label)} →</a>`).join('');
}
function sessionGuideNote(id) {
  const review=data.content_reviews.find(item=>item.id==='guide:'+id);
  return `<p class="small-note content-review">Revision ${review?.revision||1} · ${esc(review?.status||'unreviewed')}. Authored guidance checked against local app behaviour; not a live sign-in, network or device-handover verification.</p>`;
}
function firstSessionPage() {
  const guide=data.session_guides.find(item=>item.id==='first-session');
  return `<article class="session-guide"><a class="back" href="#home">← Launchpad</a>${heading('Optional orientation',guide.title,guide.subtitle)}
    <p class="intro">${esc(guide.intro)}</p>
    <div class="actions"><a class="btn secondary" href="#tools">Go directly to tools →</a><a class="text-link" href="#learn">Browse concepts →</a></div>
    <div class="note">${esc(guide.boundary)}</div>
    <ol class="session-steps">${guide.steps.map((step,index)=>`<li class="panel" data-session-step="${esc(step.id)}"><span class="eyebrow">STEP ${index+1} · ABOUT ${step.minutes} MIN</span><h2>${esc(step.title)}</h2><p>${esc(step.body)}</p><div class="actions">${sessionLinks(step.links)}</div></li>`).join('')}</ol>
    <section class="panel session-offline"><h2>${esc(guide.offline.title)}</h2><p>${esc(guide.offline.body)}</p><div class="actions">${sessionLinks(guide.offline.links)}</div></section>
    <div class="note"><strong>Reflection:</strong> ${esc(guide.check)}</div>${sessionGuideNote(guide.id)}
  </article>`;
}
function finishReviewText() {
  const total=data.session_guides.find(guide=>guide.id==='finish-session').steps.length;
  return `${sessionReview.size} of ${total} items reviewed by you. This does not verify sign-out, credential removal or device readiness.`;
}
function finishSessionPage() {
  const guide=data.session_guides.find(item=>item.id==='finish-session');
  const count=data.configuration.providers.filter(provider=>provider.configured).length;
  return `<article class="session-guide"><a class="back" href="#home">← Launchpad</a>${heading('Manual checklist',guide.title,guide.subtitle)}
    <p class="intro">${esc(guide.intro)}</p><div class="note">${esc(guide.boundary)}</div>
    <p class="small-note" id="finish-review-status" role="status">${finishReviewText()}</p>
    <ol class="session-steps">${guide.steps.map((step,index)=>`<li class="panel" data-session-step="${esc(step.id)}"><span class="eyebrow">STEP ${index+1}</span><h2>${esc(step.title)}</h2><p>${esc(step.body)}</p>
      ${step.id==='keys'?`<div class="session-key-action"><p class="small-note">At the last Labs status check: ${count} provider key${count===1?'':'s'} set in this hub. This does not include native tool or website logins.</p><button class="btn secondary" data-session-forget ${sessionForgetPending?'disabled':''}>${sessionForgetPending?'Forgetting…':'Forget keys held by Labs'}</button><p id="session-key-result" class="small-note" role="status"></p></div>`:''}
      <div class="actions">${sessionLinks(step.links)}</div><label class="session-review"><input type="checkbox" data-session-review="${esc(step.id)}" ${sessionReview.has(step.id)?'checked':''}><span>I have reviewed this step: ${esc(step.title.toLowerCase())}.</span></label>
    </li>`).join('')}</ol>
    <section class="note"><h2>Uncertain or something went wrong?</h2><p>${esc(guide.incident)}</p></section>
    <p class="small-note">No automatic reset or sign-out has been performed. Checklist ticks do not erase projects, revoke keys or end the hub session.</p>
    <div class="actions"><a class="btn secondary" href="#home">Return to Labs →</a><button class="btn secondary" data-session-clear>Clear checklist ticks</button></div>
    ${sessionGuideNote(guide.id)}</article>`;
}
document.addEventListener('change',event=>{
  const input=event.target.closest('[data-session-review]');if(!input)return;
  const id=input.dataset.sessionReview;
  if(!data.session_guides.find(guide=>guide.id==='finish-session').steps.some(step=>step.id===id))return;
  input.checked?sessionReview.add(id):sessionReview.delete(id);
  document.getElementById('finish-review-status').textContent=finishReviewText();
});
document.addEventListener('click',async event=>{
  const button=event.target.closest('button');if(!button)return;
  if(button.hasAttribute('data-session-clear')){
    sessionReview.clear();
    document.querySelectorAll('[data-session-review]').forEach(input=>input.checked=false);
    document.getElementById('finish-review-status').textContent=finishReviewText();
  }
  if(!button.hasAttribute('data-session-forget')||sessionForgetPending)return;
  sessionForgetPending=true;button.disabled=true;button.textContent='Forgetting…';
  let message, forgotten=false;
  try{
    data.configuration=await api('configuration/forget',{provider:'all'});
    forgotten=true;
    message='Labs has forgotten its keys for future launches. External logins and credentials held by tools were not cleared or verified.';
  }catch(error){
    message='Labs could not confirm that its keys were forgotten. Try again or ask the facilitator. Do not assume they were removed.';
  }finally{
    sessionForgetPending=false;
    if(route()[0]==='finish-session'){
      render();
      document.getElementById('session-key-result').textContent=message;
      document.querySelector('[data-session-forget]').focus({preventScroll:true});
    }
    toast(forgotten?'Labs-held keys forgotten. External sign-outs are still manual.':'Key removal was not confirmed. Try again or ask the facilitator.');
  }
});
