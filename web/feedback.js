'use strict';
const feedbackState = {draft: null, pending: false, result: '', error: false, review: null, reviewing: false, reportStatus: ''};

function feedbackPage() {
  const state=feedbackState;
  if(!state.draft)state.draft={submission_id:crypto.randomUUID(),category:'suggestion',message:'',confirmed:false};
  const draft=state.draft;
  return `<article class="reader feedback-page">${heading('Help improve Labs','Give feedback','Tell us what helped, what was confusing or what we could improve. Feedback is optional.')}
    <div class="note"><strong>Saved on this laptop, for facilitator review.</strong> Feedback can be read by people sharing this Linux account. Do not include names, contact details, API keys, OFFICIAL information or other non-public material. No project files, activity history or device details are attached. NEVER use government networks or accounts to share feedback.</div>
    <form id="feedback-form" class="panel"><label class="field"><span>Feedback type</span><select id="feedback-category" ${state.pending?'disabled':''}>${Object.entries(data.feedback_options.categories).map(([id,label])=>`<option value="${esc(id)}" ${draft.category===id?'selected':''}>${esc(label)}</option>`).join('')}</select></label>
      <label class="field"><span>Your comment</span><textarea id="feedback-message" rows="6" maxlength="${data.feedback_options.max_message}" required aria-describedby="feedback-help" ${state.pending?'disabled':''}>${esc(draft.message)}</textarea></label><p id="feedback-help" class="small-note">Up to 2000 characters. Describe the part of Labs and what you would change. Use public information only.</p>
      <label class="feedback-consent"><input id="feedback-confirmed" type="checkbox" required ${draft.confirmed?'checked':''} ${state.pending?'disabled':''}><span>I have checked that this comment contains only public information and can be saved on this shared laptop.</span></label>
      <p id="feedback-result" role="status" tabindex="-1" class="${state.error?'error':'small-note'}">${esc(state.result)}</p><div class="actions"><button class="btn" type="submit" ${state.pending?'disabled':''}>${state.pending?'Saving…':'Save feedback on this laptop'}</button><button class="btn secondary" type="button" data-feedback-new ${state.pending?'disabled':''}>Start a new comment</button></div>
      <p class="small-note">The facilitator can compile comments and email developers after review. Saving here does not send an email or guarantee a reply. A draft stays in this tab until reload; it is not saved until you choose Save.</p></form>
    <section class="panel"><h2>For facilitators: compile feedback</h2><p>Load this laptop’s saved comments only when you are ready to review them. This is a shared-account view, with no separate reviewer sign-in. Inspect the report for public-only content before copying it into an email to the agreed developer address. Use the designated non-government learning network and permitted learning account.</p>
      <button class="btn secondary" data-feedback-review ${state.reviewing?'disabled':''}>${state.reviewing?'Loading…':'Review saved feedback'}</button>
      ${state.review?`<p role="status">${state.review.count} saved comment${state.review.count===1?'':'s'} included. Report prepared, not sent.</p>${state.review.warnings.map(w=>`<p class="error">${esc(w)}</p>`).join('')}<label class="field"><span>Email report, review before sending</span><textarea id="feedback-report" rows="12" readonly>${esc(state.review.report)}</textarea></label><div class="actions"><button class="btn secondary" data-feedback-copy>Copy email report</button><button class="btn secondary" data-feedback-download>Download report (.txt)</button></div><p class="small-note">Copying or downloading does not send the report or remove saved feedback. You can select the report above and copy it manually.</p>`:''}
      <p id="feedback-report-status" role="status" tabindex="-1">${esc(state.reportStatus)}</p></section></article>`;
}
function renderFeedback(focus) {if(route()[0]==='feedback'){render();if(focus)document.getElementById(focus).focus({preventScroll:true});}}
document.addEventListener('input',event=>{
  const draft=feedbackState.draft;if(!draft)return;
  if(event.target.id==='feedback-message')draft.message=event.target.value;
  if(event.target.id==='feedback-category')draft.category=event.target.value;
  if(event.target.id==='feedback-confirmed')draft.confirmed=event.target.checked;
});
document.addEventListener('submit',async event=>{
  if(event.target.id!=='feedback-form')return;
  event.preventDefault();
  const state=feedbackState;
  if(state.pending||!event.target.reportValidity())return;
  const {submission_id,category,message}=state.draft;
  state.pending=true;state.error=false;state.result='Saving feedback on this laptop…';renderFeedback('feedback-result');
  try{
    const result=await api('feedback',{submission_id,category,message});
    state.result=`Feedback saved on this laptop. Receipt: ${result.receipt}. No email was sent.`;
    state.draft=null;state.review=null;
  }catch(error){state.error=true;state.result=error.message+' Your draft is still here. Retry, or start a new comment if the receipt was already used.';}
  finally{state.pending=false;renderFeedback('feedback-result');}
});
document.addEventListener('click',async event=>{
  const button=event.target.closest('button');if(!button)return;
  const state=feedbackState;
  if(button.hasAttribute('data-feedback-new')&&!state.pending){state.draft=null;state.result='';state.error=false;renderFeedback();document.getElementById('feedback-message').focus();}
  if(button.hasAttribute('data-feedback-review')&&!state.reviewing){
    state.reviewing=true;state.reportStatus='Loading saved feedback…';renderFeedback('feedback-report-status');
    try{state.review=await api('feedback/review',{});state.reportStatus='Report prepared, not sent.';}catch(error){state.review=null;state.reportStatus='Could not load feedback: '+error.message;}
    finally{state.reviewing=false;renderFeedback(state.review?'feedback-report':'feedback-report-status');}
  }
  if(button.hasAttribute('data-feedback-copy')&&state.review){
    try{await navigator.clipboard.writeText(state.review.report);state.reportStatus='Report copied. Inspect it before emailing developers. It has not been sent.';}
    catch(error){state.reportStatus='Could not copy. Select the report above and copy it manually. It has not been sent.';}
    if(route()[0]==='feedback')document.getElementById('feedback-report-status').textContent=state.reportStatus;
  }
  if(button.hasAttribute('data-feedback-download')&&state.review){
    const url=URL.createObjectURL(new Blob([state.review.report],{type:'text/plain;charset=utf-8'}));
    const link=document.createElement('a');link.href=url;link.download='aisi-labs-feedback.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
    state.reportStatus='Report download requested. Inspect it before emailing developers. It has not been sent.';
    document.getElementById('feedback-report-status').textContent=state.reportStatus;
  }
});
