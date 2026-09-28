// Browser integration checks using Chromium's DevTools protocol; no npm dependencies.
import assert from 'node:assert/strict';
import {spawn} from 'node:child_process';
import {mkdtemp, mkdir, writeFile, rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const temporary=await mkdtemp(join(tmpdir(),'aisi-labs-2-smoke-'));
const reports=join(root,'reports');
await mkdir(reports,{recursive:true});
let browser,server,socket;
const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
function captureUntil(process,stream,pattern){
  return new Promise((resolve,reject)=>{
    let output='';
    const timeout=setTimeout(()=>reject(new Error('Startup timeout: '+output)),15000);
    process[stream].on('data',chunk=>{output+=chunk;const match=output.match(pattern);if(match){clearTimeout(timeout);resolve(match[1]);}});
    process.once('exit',code=>{clearTimeout(timeout);reject(new Error(`Process exited ${code}: ${output}`));});
  });
}
try{
  server=spawn('/usr/bin/python3',[join(root,'server.py'),'--port','0','--data-dir',join(temporary,'state')],{cwd:root});
  let serverErrors='';server.stderr.on('data',chunk=>serverErrors+=chunk);
  const url=await captureUntil(server,'stdout',/(http:\/\/127\.0\.0\.1:\d+)/);
  browser=spawn(process.env.CHROMIUM_BIN||'/usr/bin/chromium',['--headless','--disable-gpu','--no-first-run','--no-default-browser-check','--disable-background-networking','--remote-debugging-port=0',`--user-data-dir=${join(temporary,'browser')}`,'about:blank']);
  const browserWS=await captureUntil(browser,'stderr',/DevTools listening on (ws:\/\/[^\s]+)/);
  const host=new URL(browserWS).host;
  const pages=await (await fetch(`http://${host}/json/list`)).json();
  socket=new WebSocket(pages.find(p=>p.type==='page').webSocketDebuggerUrl);
  await new Promise((resolve,reject)=>{socket.addEventListener('open',resolve,{once:true});socket.addEventListener('error',reject,{once:true});});
  let nextID=0;const pending=new Map();const errors=[];
  socket.addEventListener('message',event=>{
    const msg=JSON.parse(event.data);
    if(msg.id){const call=pending.get(msg.id);if(call){pending.delete(msg.id);clearTimeout(call.timer);msg.error?call.reject(new Error(JSON.stringify(msg.error))):call.resolve(msg.result);}}
    else if(msg.method==='Runtime.exceptionThrown')errors.push(msg.params.exceptionDetails.text+' '+JSON.stringify(msg.params.exceptionDetails.exception));
    else if(msg.method==='Log.entryAdded'&&msg.params.entry.level==='error')errors.push(msg.params.entry.text);
  });
  function cdp(method,params={}){return new Promise((resolve,reject)=>{const id=++nextID;const timer=setTimeout(()=>{pending.delete(id);reject(new Error('CDP timeout: '+method));},10000);pending.set(id,{resolve,reject,timer});socket.send(JSON.stringify({id,method,params}));});}
  async function evaluate(expression){const result=await cdp('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true,userGesture:true});if(result.exceptionDetails)throw new Error(JSON.stringify(result.exceptionDetails));return result.result.value;}
  async function waitFor(expression){for(let i=0;i<80;i++){if(await evaluate(expression))return;await delay(50);}throw new Error('Wait failed: '+expression);}
  async function go(hash){await evaluate(`location.hash=${JSON.stringify(hash)}`);await waitFor(`location.hash===${JSON.stringify(hash)}`);await delay(80);}
  async function click(selector){assert(await evaluate(`!!document.querySelector(${JSON.stringify(selector)})`),'Missing '+selector);await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);await delay(80);}
  async function checkLogos(count){
    assert.equal(await evaluate('document.querySelectorAll("main .tool-logo").length'),count);
    await waitFor('[...document.querySelectorAll("main .tool-logo")].every(i=>i.complete&&i.naturalWidth>0)');
    assert(await evaluate('[...document.querySelectorAll("main .tool-logo")].every(i=>new URL(i.src).origin===location.origin&&i.alt===""&&i.closest(".mark").getAttribute("aria-hidden")==="true")'));
  }
  async function screenshot(name){const result=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});await writeFile(join(reports,name+'.png'),Buffer.from(result.data,'base64'));}
  async function noOverflow(label){const sizes=await evaluate('({width:innerWidth,body:document.documentElement.scrollWidth})');if(sizes.body>sizes.width+1){console.log(await evaluate('[...document.querySelectorAll("body *")].filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>({tag:e.tagName,class:e.className,right:e.getBoundingClientRect().right})).slice(0,15)'));await screenshot('overflow');}assert(sizes.body<=sizes.width+1,`${label}: overflow ${JSON.stringify(sizes)}`);}
  await cdp('Page.enable');await cdp('Runtime.enable');await cdp('Log.enable');
  await cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1080,deviceScaleFactor:1,mobile:false});
  await cdp('Page.navigate',{url});
  await waitFor('!!document.querySelector(".hero")');
  await waitFor('!!document.querySelector("#policy-form")');
  assert(await evaluate('document.querySelector("#modal").textContent.includes("ONLY public information")'));
  assert(await evaluate('document.querySelector("#modal").textContent.includes("government networks")'));
  await evaluate('document.querySelectorAll("#policy-form input").forEach(el=>el.checked=true);document.querySelector("#policy-form").requestSubmit()');
  await waitFor('!document.querySelector("#modal").open');
  await screenshot('launchpad-desktop');await noOverflow('desktop home');
  assert.equal(await evaluate('document.querySelectorAll(".quick-tool").length'),4);
  await checkLogos(4);
  // Exercise the fallback without making an intentional failed network request.
  await evaluate('document.querySelector(".tool-logo").dispatchEvent(new Event("error"))');
  assert.equal(await evaluate('getComputedStyle(document.querySelector(".logo-unavailable .tool-logo")).display'),'none');
  assert.notEqual(await evaluate('getComputedStyle(document.querySelector(".logo-unavailable .logo-fallback")).display'),'none');

  await go('#web-chats');
  await delay(6100); // Let the acknowledgement toast expire before visual evidence.
  assert.equal(await evaluate('document.querySelectorAll(".web-chat-card").length'),14);
  assert.equal(await evaluate('document.querySelectorAll("[data-web-chat]").length'),13);
  await checkLogos(14);
  await screenshot('web-chat-desktop');await noOverflow('web chat');
  // Exercise the gate without visiting or logging into any external provider.
  await evaluate('data.acknowledged=false');
  await click('[data-web-chat=chatgpt]');
  assert(await evaluate('!!document.querySelector("#policy-form")'));
  assert.equal(await evaluate('!!document.querySelector("#external-chat-link")'),false);
  await evaluate('document.querySelectorAll("#policy-form input").forEach(el=>el.checked=true);document.querySelector("#policy-form").requestSubmit()');
  await waitFor('!!document.querySelector("#external-chat-link")');
  assert.equal(await evaluate('document.querySelector("#external-chat-link").href'),'https://chatgpt.com/');
  assert.equal(await evaluate('document.querySelector("#external-chat-link").rel'),'noopener noreferrer');
  assert(await evaluate('document.querySelector("#modal").textContent.includes("Nothing OFFICIAL")'));
  await click('[data-close]');
  for(const id of ['chatgpt','claude-chat','gemini-chat','grok-chat','copilot-chat','perplexity','mistral-chat','qwen-chat','huggingface','deepseek','firefly','midjourney','runway','comfyui']){
    await go('#web-tool/'+id);await checkLogos(1);
    assert(await evaluate('document.querySelector("main").textContent.includes("Concerns and context")'));
    assert(await evaluate('document.querySelector("main").textContent.includes("A small learning exercise")'));
    assert(await evaluate('document.querySelector(".content-review").textContent.includes("2026-09-28")'));
    assert(await evaluate('document.querySelectorAll(".sources a").length>0'));
    assert.equal(await evaluate('document.querySelector(".nav-link[aria-current]").hash'),'#web-chats');
    if(id==='huggingface'){
      assert.equal(await evaluate('document.querySelectorAll(".risk-checks li").length'),4);
      assert(await evaluate('document.querySelector(".risk-checks").textContent.includes("trust_remote_code=True")'));
      assert(await evaluate('document.querySelector(".risk-checks").textContent.includes("not a safety certificate")'));
      assert(await evaluate('[...document.querySelectorAll(".risk-checks a")].every(a=>new URL(a.href).hostname==="huggingface.co"&&a.rel==="noopener noreferrer")'));
      await screenshot('huggingface-risks-desktop');
    }
    if(id==='deepseek'){
      assert.equal(await evaluate('document.querySelectorAll("[data-web-chat]").length'),0);
      await evaluate('webChatDialog("deepseek")');
      assert.equal(await evaluate('document.querySelector("#modal").open'),false);
      assert(await evaluate('document.querySelector("main").textContent.includes("001-2025")'));
      await screenshot('deepseek-profile-desktop');
    }else{
      await click('[data-web-chat="'+id+'"]');
      assert.equal(await evaluate('document.querySelector("#external-chat-link").href'),await evaluate('data.web_chats.find(x=>x.id==='+JSON.stringify(id)+').url'));
      await click('[data-close]');
    }
  }
  await go('#web-tool/runway');await screenshot('creative-profile-desktop');
  await go('#keep-current');
  assert.equal(await evaluate('document.querySelectorAll(".resource-card").length'),5);
  assert.equal(await evaluate('document.querySelector(".nav-link[aria-current]").hash'),'#keep-current');
  assert(await evaluate('[...document.querySelectorAll(".resource-card")].find(el=>el.querySelector("h2").textContent==="Stanford HELM").textContent.includes("Review pending")'));
  await screenshot('keep-current-desktop');await noOverflow('keep current');
  await evaluate('data.acknowledged=false');
  await click('[data-resource=artificial-analysis]');
  assert(await evaluate('!!document.querySelector("#policy-form")'));
  await evaluate('document.querySelectorAll("#policy-form input").forEach(el=>el.checked=true);document.querySelector("#policy-form").requestSubmit()');
  await waitFor('!!document.querySelector("#external-chat-link")');
  assert.equal(await evaluate('document.querySelector("#external-chat-link").href'),'https://artificialanalysis.ai/');
  assert.equal(await evaluate('document.querySelector("#external-chat-link").rel'),'noopener noreferrer');
  await click('[data-close]');
  for(const id of ['arena','helm','swe-bench','hf-papers']){
    await click('[data-resource="'+id+'"]');
    assert.equal(await evaluate('document.querySelector("#external-chat-link").href'),await evaluate('data.resources.find(x=>x.id==='+JSON.stringify(id)+').url'));
    await click('[data-close]');
  }
  await go('#search/Artificial%20Analysis');
  assert.equal(await evaluate('document.querySelectorAll(".resource-card").length'),1);
  await go('#search/Runway');
  assert.equal(await evaluate('document.querySelectorAll(".web-chat-card").length'),1);
  for(const [id,answer] of [['image-video',2],['reading-leaderboards',0]]){
    await go('#learn/'+id);
    assert.equal(await evaluate('document.querySelectorAll(".diagram-node").length'),3);
    await click('[data-answer="'+answer+'"]');
    assert(await evaluate('document.querySelector("#quiz-feedback").textContent.startsWith("That’s it")'));
    await screenshot(id+'-desktop');
  }
  await go('#search/Perplexity');assert.equal(await evaluate('document.querySelectorAll(".web-chat-card").length'),1);
  await go('#learn/open-models');
  assert(await evaluate('document.querySelector(".diagram").textContent.includes("Hosted runner")'));
  assert(await evaluate('document.querySelector(".content-review").textContent.includes("2026-09-28")'));
  await click('[data-answer="2"]');
  assert(await evaluate('document.querySelector("#quiz-feedback").textContent.startsWith("That’s it")'));
  await screenshot('open-models-desktop');

  await go('#tools');await checkLogos(17);await screenshot('tool-logos-desktop');
  await click('[data-filter="Desktop tools"]');
  assert.equal(await evaluate('document.querySelectorAll(".tool-card").length'),8);
  await checkLogos(8);await screenshot('desktop-tool-logos');
  await click('[data-tool="terminal"]');
  assert(await evaluate('document.querySelector("#modal").open'));
  // Do not submit the launch form: no external app/account interaction in smoke tests.
  await click('[data-close]');

  await go('#learn/chat-agents');
  await click('[data-mode="chat"]');
  assert(await evaluate('document.querySelector("#agent-diagram").textContent.includes("Ask a question")'));
  await click('[data-mode="agent"]');
  await click('[data-trace="1"]');
  assert(await evaluate('document.querySelector("#trace-title").textContent.includes("requests a tool")'));
  await click('[data-answer="1"]');
  assert(await evaluate('document.querySelector("#quiz-feedback").textContent.startsWith("That’s it")'));
  await click('[data-complete]');
  await waitFor('document.querySelector("[data-complete]").textContent.includes("undo")');
  await screenshot('concept-guide-desktop');

  await go('#learn/terminal');
  await click('[data-command="pwd"]');
  assert(await evaluate('document.querySelector("#terminal-output").textContent.includes("/practice/my-project")'));
  await click('[data-command="cd examples"]');await click('[data-command="pwd"]');
  assert(await evaluate('document.querySelector("#terminal-output").textContent.includes("/practice/my-project/examples")'));
  await evaluate('document.querySelector("#terminal-command").value="touch forbidden";document.querySelector("#terminal-form").requestSubmit()');
  assert(await evaluate('document.querySelector("#terminal-output").textContent.includes("Nothing was executed")'));

  const labIDs=['first-steps','consultation','data-story','evidence','blank'];
  const projectIDs=[];
  for(const id of labIDs){
    await go('#lab/'+id);await click('[data-create]');
    await evaluate(`document.querySelector('#project-name').value=${JSON.stringify('Smoke '+id+' <safe>')};document.querySelector('#create-form').requestSubmit()`);
    await waitFor('location.hash.startsWith("#project/") && !!document.querySelector("[data-project-launch]")');
    projectIDs.push(await evaluate('location.hash.split("/")[1]'));
    assert.equal(await evaluate('document.querySelector("h1").textContent'),'Smoke '+id+' <safe>');
    assert.equal(await evaluate('document.querySelectorAll("[data-check]").length'),3);
    await click('[data-check="0"]');
    await waitFor('document.querySelector("#check-status").textContent.includes("saved")');
    assert.equal(await evaluate('!!document.querySelector("[data-direct=preview]")'),['first-steps','consultation','data-story'].includes(id));
  }
  await go('#project/'+projectIDs[1]);await screenshot('project-desktop');
  await cdp('Page.reload');await waitFor('!!document.querySelector("[data-check]")');
  assert(await evaluate('document.querySelectorAll("[data-check]")[0].checked'));
  await go('#learn/chat-agents');assert(await evaluate('document.querySelector("[data-complete]").textContent.includes("undo")'));
  await go('#search/terminal');assert(await evaluate('document.querySelector("main").textContent.includes("A terminal, without the mystery")'));
  await go('#projects');assert.equal(await evaluate('document.querySelectorAll(".project-row").length'),5);

  await go('#configuration');
  assert.equal(await evaluate('document.querySelectorAll(".key-form").length'),3);
  assert.equal(await evaluate('document.querySelectorAll(".model-form").length'),4);
  assert(await evaluate('document.body.textContent.includes("Grok’s native sign-in")'));
  await evaluate('document.querySelector("[data-model-tool=grok] input").value="test-model-id";document.querySelector("[data-model-tool=grok]").requestSubmit()');
  await waitFor('document.querySelector("#toast").textContent.includes("Model preference saved")');
  await cdp('Page.reload');await waitFor('!!document.querySelector(".model-form")');
  assert.equal(await evaluate('document.querySelector("[data-model-tool=grok] input").value'),'test-model-id');
  await evaluate('document.querySelector("[data-model-tool=grok] input").value="";document.querySelector("[data-model-tool=grok]").requestSubmit()');
  await waitFor('document.querySelector("#toast").textContent.includes("Model preference saved")');
  // Local inspection only: no provider/registry traffic in the browser suite.
  await click('[data-inventory=local]');await waitFor('!!document.querySelector(".inventory-table")');
  assert.equal(await evaluate('document.querySelectorAll(".inventory-table tbody tr").length'),21);
  const fake='FAKE-BROWSER-TEST-KEY-DO-NOT-USE';
  await evaluate(`document.querySelector('.key-form input').value=${JSON.stringify(fake)};document.querySelector('.key-form').requestSubmit()`);
  await waitFor('!!document.querySelector("[data-forget=openai]")');
  assert.equal(await evaluate('document.querySelector(".key-form input").value'),'');
  assert.equal(await evaluate(`document.body.innerHTML.includes(${JSON.stringify(fake)})`),false);
  assert.equal(await evaluate('localStorage.length+sessionStorage.length'),0);
  assert.equal(await evaluate(`fetch('/api/bootstrap').then(r=>r.text()).then(s=>s.includes(${JSON.stringify(fake)}))`),false);
  await go('#tools');await click('[data-filter="All tools"]');await click('[data-tool="codex"]');
  assert(await evaluate('document.querySelector("#modal").textContent.includes("API charges may apply")'));
  await click('[data-close]');
  await go('#configuration');await click('[data-forget="all"]');
  await waitFor('!document.querySelector("[data-forget=openai]")');
  await screenshot('configuration-desktop');
  await go('#programme');assert.equal(await evaluate('document.querySelectorAll(".doc-card").length'),8);
  await screenshot('programme-desktop');
  for(const id of ['programme','learner','deployment','credentials','curriculum','maintenance','open-models','content-maintenance']){await go('#docs/'+id);assert(await evaluate('document.querySelector(".document-reader").textContent.length>1000'));}

  // Exercise every guide and both keyboard-sized and narrow viewports.
  for(const id of ['chat-agents','terminal','context','prompting','tools-skills','checking','memory','identity','responsible-use','models-costs','web-chat','open-models','image-video','reading-leaderboards']){
    await go('#learn/'+id);assert.equal(await evaluate('document.querySelectorAll(".quiz-option").length'),3);await noOverflow('guide '+id);
  }
  await cdp('Emulation.setDeviceMetricsOverride',{width:820,height:900,deviceScaleFactor:1,mobile:false});
  for(const hash of ['#home','#keep-current','#learn/image-video','#learn/reading-leaderboards','#web-tool/runway','#web-chats','#web-tool/deepseek','#web-tool/perplexity','#tools','#labs','#learn/open-models','#learn/chat-agents','#configuration','#programme','#project/'+projectIDs[1]]){await go(hash);await noOverflow('tablet '+hash);}
  await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});
  for(const hash of ['#home','#keep-current','#learn/image-video','#learn/reading-leaderboards','#web-tool/runway','#web-chats','#web-tool/deepseek','#web-tool/perplexity','#tools','#labs','#learn/open-models','#learn/web-chat','#learn/chat-agents','#learn/terminal','#projects','#configuration','#programme','#docs/deployment','#docs/open-models','#project/'+projectIDs[1]]){await go(hash);await noOverflow('mobile '+hash);}
  await go('#keep-current');await screenshot('keep-current-mobile');
  await go('#learn/image-video');await screenshot('image-video-mobile');
  await go('#web-tool/perplexity');await screenshot('tool-profile-mobile');
  await go('#web-tool/huggingface');await noOverflow('mobile Hugging Face risks');await screenshot('huggingface-risks-mobile');
  await go('#tools');await click('[data-filter="Desktop tools"]');await checkLogos(8);await noOverflow('mobile desktop logos');
  await go('#home');await screenshot('launchpad-mobile');
  assert.deepEqual(errors,[],'Browser errors');
  assert.equal(serverErrors,'','Server errors');
  console.log('PASS: bundled tool/chat logos and fallback, launchpad, web-chat confirmation/gate/search, open-model diagrams/reviews/quiz, credentials without leaks, models/persistence, inventory, eight documents, fourteen lessons, five current-awareness resources, five projects and responsive layouts.');
  console.log('Screenshots: '+reports);
}finally{
  if(socket)socket.close();
  if(browser){browser.kill('SIGTERM');await new Promise(resolve=>{if(browser.exitCode!==null)resolve();else browser.once('exit',resolve);});}
  if(server){server.kill('SIGTERM');await new Promise(resolve=>{if(server.exitCode!==null)resolve();else server.once('exit',resolve);});}
  await rm(temporary,{recursive:true,force:true});
}
