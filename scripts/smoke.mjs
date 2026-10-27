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
  let nextID=0;const pending=new Map();const errors=[];const requests=[];
  socket.addEventListener('message',event=>{
    const msg=JSON.parse(event.data);
    if(msg.id){const call=pending.get(msg.id);if(call){pending.delete(msg.id);clearTimeout(call.timer);msg.error?call.reject(new Error(JSON.stringify(msg.error))):call.resolve(msg.result);}}
    else if(msg.method==='Runtime.exceptionThrown')errors.push(msg.params.exceptionDetails.text+' '+JSON.stringify(msg.params.exceptionDetails.exception));
    else if(msg.method==='Network.requestWillBeSent')requests.push({url:msg.params.request.url,method:msg.params.request.method});
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
  async function screenshot(name,full=true){if(full)await evaluate('window.scrollTo(0,0)');await delay(50);const result=await cdp('Page.captureScreenshot',{format:'png',captureBeyondViewport:full});await writeFile(join(reports,name+'.png'),Buffer.from(result.data,'base64'));}
  async function noOverflow(label){const sizes=await evaluate('({width:innerWidth,body:document.documentElement.scrollWidth})');if(sizes.body>sizes.width+1){console.log(await evaluate('[...document.querySelectorAll("body *")].filter(e=>e.getBoundingClientRect().right>innerWidth+1).map(e=>({tag:e.tagName,class:e.className,right:e.getBoundingClientRect().right})).slice(0,15)'));await screenshot('overflow');}assert(sizes.body<=sizes.width+1,`${label}: overflow ${JSON.stringify(sizes)}`);}
  await cdp('Page.enable');await cdp('Runtime.enable');await cdp('Log.enable');await cdp('Network.enable');
  await cdp('Emulation.setDeviceMetricsOverride',{width:1440,height:1080,deviceScaleFactor:1,mobile:false});
  await cdp('Page.navigate',{url});
  await waitFor('!!document.querySelector(".hero")');
  await waitFor('!!document.querySelector("#policy-form")');
  assert(await evaluate('document.querySelector("#modal").textContent.includes("ONLY public information")'));
  assert(await evaluate('document.querySelector("#modal").textContent.includes("government networks")'));
  await click('[data-close]');
  const sessionRequestStart=requests.length;
  await go('#configuration');
  assert.equal(await evaluate('document.querySelectorAll("main h1").length'),1);
  assert.equal(await evaluate('data.acknowledged'),false);
  assert(await evaluate('document.querySelector("#access-settings").textContent.includes("do not need an API key for every tool")'));
  await click('[data-settings-section=key-settings]');
  assert.equal(await evaluate('document.activeElement.id'),'key-settings');
  await evaluate('document.querySelector("[data-setup-provider=openai] summary").focus()');
  await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:' ',code:'Space',windowsVirtualKeyCode:32});
  await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:' ',code:'Space',windowsVirtualKeyCode:32});
  assert.equal(await evaluate('document.querySelector("[data-setup-provider=openai]").open'),true);
  await click('[data-key-console=openai]');
  assert(await evaluate('!!document.querySelector("#policy-form")'));
  assert.equal(await evaluate('!!document.querySelector("#external-chat-link")'),false);
  await click('[data-close]');
  assert.equal(await evaluate('data.acknowledged'),false);
  assert.equal(requests.length,sessionRequestStart,'Reading setup and cancelling needs no network');
  await click('#first-session-link');await waitFor('!!document.querySelector(".session-guide")');
  assert.equal(await evaluate('data.acknowledged'),false);
  assert.equal(await evaluate('document.querySelectorAll("[data-starting-path]").length'),3);
  assert.equal(await evaluate('document.querySelector("#first-session-link").textContent'),'Getting started');
  assert.equal(await evaluate('document.querySelector("h1").textContent'),'Getting started: a guide for beginners');
  for(const id of ['chat','desktop','build']){
    await click('a[href="#first-session/'+id+'"]');
    assert.equal(await evaluate('document.activeElement.id'),'start-'+id);
    assert(await evaluate('document.activeElement.getBoundingClientRect().top>=0'));
  }
  await go('#first-session');
  assert.equal(await evaluate('document.querySelector("#first-session-link").getAttribute("aria-current")'),'page');
  assert(await evaluate('document.querySelector(".session-offline").textContent.includes("not AI-generated work")'));
  await screenshot('first-session-desktop');await noOverflow('first session');
  await go('#learn/web-chat');
  assert.equal(await evaluate('document.querySelectorAll(".practice-exercise").length'),1);
  assert(await evaluate('document.querySelector(".practice-exercise").textContent.includes("fictional")'));
  await evaluate('document.querySelector(".practice-exercise summary").focus()');
  assert.equal(await evaluate('document.activeElement.tagName'),'SUMMARY');
  await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:' ',code:'Space',windowsVirtualKeyCode:32});
  await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:' ',code:'Space',windowsVirtualKeyCode:32});
  assert.equal(await evaluate('document.querySelector(".practice-exercise details").open'),true);
  assert(await evaluate('document.querySelector(".practice-exercise details").textContent.includes("unsupported additions")'));
  await screenshot('chatbot-exercise-desktop');
  await go('#learn/ai-basics');
  assert.equal(await evaluate('document.querySelectorAll(".diagram-node").length'),3);
  await go('#glossary');
  assert.equal(await evaluate('document.querySelectorAll(".glossary-term").length'),12);
  await click('a[href="#glossary/api"]');
  assert.equal(await evaluate('document.activeElement.id'),'term-api');
  await go('#search/endpoint');
  await click('main a[href="#glossary/endpoint"]');
  assert.equal(await evaluate('document.activeElement.id'),'term-endpoint');
  await go('#search/beginners');
  assert(await evaluate('!!document.querySelector("main a[href=\\\"#first-session\\\"]")'));
  await go('#learn');
  assert.equal(await evaluate('document.querySelectorAll(".learning-group").length'),3);
  assert.equal(await evaluate('document.querySelectorAll(".lesson-card").length'),15);
  assert.deepEqual(await evaluate('learningGroups.flatMap(g=>g.lessons).sort()'),await evaluate('data.lessons.map(l=>l.id).sort()'));
  for(const id of ['prompting','checking','context']){
    await go('#learn/'+id);
    assert.equal(await evaluate('document.querySelectorAll(".worked-example").length'),1);
    await click('.worked-example summary');
    assert.equal(await evaluate('document.querySelector(".worked-example details").open'),true);
  }
  // Curated teaching text must still be escaped, including the new renderers.
  assert(await evaluate(`(()=>{
    const unsafe='<img src=x onerror=alert(1)>';
    const example=Object.fromEntries(['title','context','before','after','question','explanation'].map(k=>[k,unsafe]));
    const exercise={title:unsafe,intro:unsafe,facts:unsafe,prompt:unsafe,steps:[unsafe],checks:[unsafe],sample:unsafe,explanation:unsafe,reflection:unsafe};
    const node=document.createElement('div');node.innerHTML=workedExample(example)+practiceExercise(exercise);
    return !node.querySelector('img')&&node.textContent.includes(unsafe);
  })()`));
  await go('#first-session');
  await click('a[href="#lab/first-steps"]');await click('[data-create]');
  assert(await evaluate('!!document.querySelector("#policy-form")'));
  await click('[data-close]');
  await click('#finish-session-link');await waitFor('!!document.querySelector("[data-session-review]")');
  assert.equal(await evaluate('data.acknowledged'),false);
  assert.equal(await evaluate('document.querySelector("#finish-session-link").getAttribute("aria-current")'),'page');
  await evaluate('document.querySelector("[data-session-review]").focus()');
  await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:' ',code:'Space',windowsVirtualKeyCode:32});
  await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:' ',code:'Space',windowsVirtualKeyCode:32});
  assert.equal(await evaluate('document.querySelector("[data-session-review]").checked'),true);
  await go('#home');await go('#finish-session');
  assert.equal(await evaluate('document.querySelector("[data-session-review]").checked'),true);
  assert.equal(await evaluate('localStorage.length+sessionStorage.length'),0);
  assert(requests.slice(sessionRequestStart).every(r=>r.method==='GET'&&new URL(r.url).origin===url),'Reading guides and ticks must not mutate state or contact providers');
  await click('[data-session-forget]');
  await waitFor('document.querySelector("#session-key-result").textContent.includes("Labs has forgotten")');
  assert.equal(await evaluate('data.acknowledged'),false);
  assert.equal(await evaluate('document.querySelector("[data-session-review=keys]").checked'),false);
  await cdp('Page.reload');await waitFor('!!document.querySelector("[data-session-review]")');
  if(await evaluate('document.querySelector("#modal").open'))await click('[data-close]');
  assert.equal(await evaluate('document.querySelectorAll("[data-session-review]:checked").length'),0);
  await go('#search/handover');
  assert(await evaluate('!!document.querySelector("main a[href=\\\"#finish-session\\\"]")'));
  await go('#home');
  const helpRequestStart=requests.length;
  await click('#omarchy-help-link');await waitFor('!!document.querySelector(".desktop-help")');
  assert.equal(await evaluate('data.acknowledged'),false);
  assert.equal(await evaluate('document.querySelector("#modal").open'),false);
  assert.equal(await evaluate('document.querySelector("#omarchy-help-link").getAttribute("aria-current")'),'page');
  assert.equal(await evaluate('document.querySelectorAll(".shortcut-card").length'),5);
  assert.equal(await evaluate('document.querySelectorAll("[data-shortcut]").length'),15);
  assert.deepEqual(await evaluate('[...document.querySelectorAll(".window-controls [data-shortcut]")].map(el=>el.dataset.shortcut)'),['fullscreen','close']);
  assert.equal(await evaluate('document.querySelector("[data-shortcut=fullscreen] .shortcut-keys").textContent'),'Super + F');
  assert.equal(await evaluate('document.querySelector("[data-shortcut=close] .shortcut-keys").textContent'),'Super + W');
  assert(await evaluate('document.querySelector("[data-shortcut=close]").textContent.includes("Save first")'));
  assert.equal(await evaluate('document.querySelectorAll("main button").length'),0);
  assert(await evaluate('document.querySelector("[data-shortcut=menu]").textContent.includes("Omarchy menu")'));
  assert(await evaluate('document.querySelector(".content-review").textContent.includes("4.0.4-1")'));
  assert(await evaluate('[...document.querySelectorAll(".desktop-help .sources a")].every(a=>a.href.startsWith("https://omarchy.org/manual/")&&a.target==="_blank"&&a.rel==="noopener noreferrer")'));
  await click('.desktop-help details summary');
  assert(await evaluate('document.querySelector(".desktop-help details").open'));
  await noOverflow('Omarchy help desktop');await screenshot('omarchy-help-desktop');
  assert(requests.slice(helpRequestStart).every(r=>r.method==='GET'&&new URL(r.url).origin===url),'Help must stay read-only and local');
  await click('a[href="#learn/terminal"]');await waitFor('!!document.querySelector("#terminal-form")');
  await go('#search/workspace');
  assert(await evaluate('!!document.querySelector("main a[href=\\"#omarchy-help\\"]")'));
  await go('#home');await evaluate('policyDialog()');
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
    assert(await evaluate('document.querySelector("#quiz-feedback").textContent.startsWith("Best fit.")'));
    await screenshot(id+'-desktop');
  }
  await go('#search/Perplexity');assert.equal(await evaluate('document.querySelectorAll(".web-chat-card").length'),1);
  await go('#learn/open-models');
  assert(await evaluate('document.querySelector(".diagram").textContent.includes("Hosted runner")'));
  assert(await evaluate('document.querySelector(".content-review").textContent.includes("2026-09-28")'));
  await click('[data-answer="2"]');
  assert(await evaluate('document.querySelector("#quiz-feedback").textContent.startsWith("Best fit.")'));
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
  assert(await evaluate('document.querySelector("#quiz-feedback").textContent.startsWith("Best fit.")'));
  await click('[data-complete]');
  await waitFor('document.querySelector("[data-complete]").textContent.includes("undo")');
  await screenshot('concept-guide-desktop');

  await go('#learn/terminal');
  const terminalRequestStart=requests.length;
  assert.equal(await evaluate('document.querySelectorAll(".command-step").length'),7);
  await evaluate('document.querySelector(".command-guide-title").scrollIntoView()');
  await screenshot('terminal-commands-desktop',false);
  const initialTerminal=await evaluate('document.querySelector("#terminal-output").textContent');
  await click('[data-fill-command=pwd]');
  assert.equal(await evaluate('document.activeElement.id'),'terminal-command');
  assert.equal(await evaluate('document.querySelector("#terminal-command").value'),'pwd');
  assert.equal(await evaluate('document.querySelector("#terminal-output").textContent'),initialTerminal);
  await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:'Enter',code:'Enter',text:'\r',windowsVirtualKeyCode:13});
  await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:'Enter',code:'Enter',windowsVirtualKeyCode:13});
  await waitFor('simHistory.length===1');
  const commandSteps=await evaluate('findLesson("terminal").command_practice.steps');
  for(const [index,step] of commandSteps.entries()){
    if(index)await evaluate(`document.querySelector('#terminal-command').value=${JSON.stringify(step.command)};document.querySelector('#terminal-form').requestSubmit()`);
    assert.equal(await evaluate('simHistory.at(-1)'),('$ '+step.command+'\n'+step.output).trimEnd());
    if(step.command.startsWith('cd '))assert(await evaluate('document.querySelector("#terminal-explanation").textContent.includes("no text output")'));
  }
  await click('[data-command="cd .."]');
  assert(await evaluate('simHistory.at(-1).includes("Simulation boundary")'));
  for(const [command,expected] of [['$ pwd','without the $ prompt'],['cat brief.md','File or folder not found'],['<img src=x onerror=alert(1)>','Nothing was executed']]){
    await evaluate(`document.querySelector('#terminal-command').value=${JSON.stringify(command)};document.querySelector('#terminal-form').requestSubmit()`);
    assert(await evaluate(`simHistory.at(-1).includes(${JSON.stringify(expected)})`));
  }
  assert.equal(await evaluate('!!document.querySelector("#terminal-output img")'),false);
  assert(await evaluate(`(()=>{const step=findLesson('terminal').command_practice.steps[0], original=step.command;try{step.command='<img src=x onerror=alert(1)>';const node=document.createElement('div');node.innerHTML=terminalCommandGuide(true);return !node.querySelector('img')&&node.textContent.includes(step.command);}finally{step.command=original;}})()`));
  assert.equal(requests.length,terminalRequestStart,'Terminal teaching and simulation make no requests');
  await click('[data-command="pwd"]');
  assert(await evaluate('document.querySelector("#terminal-output").textContent.includes("/practice/my-project")'));
  await click('[data-command="cd examples"]');await click('[data-command="pwd"]');
  await click('[data-command="clear"]');
  assert.equal(await evaluate('simFolder'),'examples');
  assert.equal(await evaluate('document.querySelector("#terminal-output").textContent'),'');
  await click('[data-command="pwd"]');
  assert(await evaluate('document.querySelector("#terminal-output").textContent.includes("/practice/my-project/examples")'));
  await click('[data-command="cat BRIEF.md"]');
  assert(await evaluate('document.querySelector("#terminal-output").textContent.trim().endsWith("File or folder not found in the current simulated folder. Use pwd and ls to check the location.")'));
  await click('[data-command="cd .."]');await click('[data-command="pwd"]');
  assert(await evaluate('document.querySelector("#terminal-output").textContent.trim().endsWith("/practice/my-project")'));
  await click('[data-command="cat BRIEF.md"]');
  assert(await evaluate('document.querySelector("#terminal-output").textContent.includes("Build a welcome page for a fictional community learning day.")'));
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
  await go('#search/terminal');assert(await evaluate('document.querySelector("main").textContent.includes("Using the terminal")'));
  await go('#projects');assert.equal(await evaluate('document.querySelectorAll(".project-row").length'),5);

  await go('#configuration');
  assert.equal(await evaluate('document.querySelectorAll(".key-form").length'),3);
  assert.equal(await evaluate('document.querySelectorAll(".model-form").length'),4);
  await screenshot('configuration-intro-desktop',false);
  const setupRequestStart=requests.length;
  for(const [provider,destination] of [['openai','https://platform.openai.com/api-keys'],['anthropic','https://platform.claude.com/settings/keys'],['google','https://aistudio.google.com/api-keys']]){
    await click('[data-setup-provider='+provider+'] summary');
    await click('[data-key-console='+provider+']');
    assert.equal(await evaluate('document.querySelector("#external-chat-link").href'),destination);
    assert.equal(await evaluate('document.querySelector("#external-chat-link").referrerPolicy'),'no-referrer');
    assert(await evaluate('document.querySelector("#external-chat-link").rel.includes("noopener")'));
    assert(await evaluate('document.querySelector("#modal").textContent.includes("Nothing OFFICIAL")'));
    await click('[data-close]');
  }
  await click('[data-settings-section=key-settings]');
  await screenshot('configuration-provider-desktop',false);
  await evaluate('document.querySelector("[data-key-console=openai]").setAttribute("data-key-console","unrecognised")');
  await click('[data-key-console=unrecognised]');
  assert.equal(await evaluate('document.querySelector("#modal").open'),false);
  assert.equal(requests.length,setupRequestStart,'Setup disclosures/confirmation send no provider requests');
  assert(await evaluate(`(()=>{
    const original=data.setup_guidance.intro;
    try{data.setup_guidance.intro='<img src=x onerror=alert(1)>';const node=document.createElement('div');node.innerHTML=setupGuidePanel();return !node.querySelector('img')&&node.textContent.includes(data.setup_guidance.intro);}
    finally{data.setup_guidance.intro=original;}
  })()`));
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

  await evaluate('api("configuration/key",{provider:"anthropic",key:"FAKE-FINISH-KEY-NOT-REAL"})');
  await evaluate('api("configuration/key",{provider:"google",key:"FAKE-FINISH-KEY-NOT-REAL"})');
  const beforeFinish=await evaluate('fetch("/api/bootstrap").then(r=>r.json()).then(d=>JSON.stringify([d.projects,d.progress,d.configuration.models,d.acknowledged]))');
  await go('#finish-session');await click('[data-session-review=save]');
  await evaluate('window.originalSessionApi=api;api=async()=>{throw new Error("Simulated request failure")};');
  await click('[data-session-forget]');
  await waitFor('document.querySelector("#session-key-result").textContent.includes("could not confirm")');
  assert(await evaluate('fetch("/api/bootstrap").then(r=>r.json()).then(d=>d.configuration.providers.every(p=>p.configured))'));
  assert.equal(await evaluate('document.querySelector("[data-session-forget]").disabled'),false);
  assert.equal(await evaluate('document.querySelector("[data-session-review=save]").checked'),true);
  await evaluate('api=window.originalSessionApi;delete window.originalSessionApi;');
  const finishRequestStart=requests.length;
  await click('[data-session-forget]');
  await waitFor('document.querySelector("#session-key-result").textContent.includes("Labs has forgotten")');
  assert.equal(requests.slice(finishRequestStart).filter(r=>r.method==='POST').length,1);
  assert(requests.slice(finishRequestStart).every(r=>new URL(r.url).origin===url&&new URL(r.url).pathname==='/api/configuration/forget'));
  assert(await evaluate('fetch("/api/bootstrap").then(r=>r.json()).then(d=>d.configuration.providers.every(p=>!p.configured))'));
  assert.equal(await evaluate('document.querySelector("[data-session-review=keys]").checked'),false);
  for(const id of ['stop','keys','accounts','handover'])await click('[data-session-review="'+id+'"]');
  assert(await evaluate('document.querySelector("#finish-review-status").textContent.includes("does not verify")'));
  await delay(6100); // Let the action status toast expire before visual evidence.
  await screenshot('finish-session-desktop');await noOverflow('finish session');
  const tickRequestStart=requests.length;
  await click('[data-session-clear]');
  assert.equal(await evaluate('document.querySelectorAll("[data-session-review]:checked").length'),0);
  assert.equal(requests.length,tickRequestStart);
  assert.equal(await evaluate('fetch("/api/bootstrap").then(r=>r.json()).then(d=>JSON.stringify([d.projects,d.progress,d.configuration.models,d.acknowledged]))'),beforeFinish);
  await go('#configuration');await click('[data-forget="all"]');
  await waitFor('!document.querySelector("[data-forget=openai]")');
  await screenshot('configuration-desktop');
  await go('#programme');assert.equal(await evaluate('document.querySelectorAll(".doc-card").length'),9);
  await screenshot('programme-desktop');
  for(const id of ['programme','learner','deployment','credentials','curriculum','maintenance','open-models','content-maintenance','improvement-schedule']){await go('#docs/'+id);assert(await evaluate('document.querySelector(".document-reader").textContent.length>1000'));}

  // Every answer must explain that choice, allow a retry and leave bookmarks unchanged.
  const progressBeforeQuiz=await evaluate('JSON.stringify(data.progress)');
  // Exercise every guide and both keyboard-sized and narrow viewports.
  for(const id of ['ai-basics','chat-agents','terminal','context','prompting','tools-skills','checking','memory','identity','responsible-use','models-costs','web-chat','open-models','image-video','reading-leaderboards']){
    await go('#learn/'+id);assert.equal(await evaluate('document.querySelectorAll(".quiz-option").length'),3);await noOverflow('guide '+id);
    const lesson=await evaluate('data.lessons.find(x=>x.id==='+JSON.stringify(id)+')');
    assert.equal(await evaluate('document.querySelectorAll(".quiz-option[aria-pressed=true]").length'),0);
    for(const answer of [0,1,2,lesson.correct]){
      await click('[data-answer="'+answer+'"]');
      assert.equal(await evaluate('document.querySelector("#quiz-feedback").textContent'),(answer===lesson.correct?'Best fit. ':'Not the best fit. ')+lesson.option_feedback[answer]);
      assert.equal(await evaluate('document.querySelectorAll(".quiz-option[aria-pressed=true]").length'),1);
      assert.equal(await evaluate('document.querySelectorAll(".quiz-option.correct").length'),Number(answer===lesson.correct));
      assert.equal(await evaluate('document.querySelectorAll(".quiz-option.incorrect").length'),Number(answer!==lesson.correct));
    }
  }
  assert.equal(await evaluate('JSON.stringify(data.progress)'),progressBeforeQuiz);
  assert.equal(await evaluate("fetch('/api/bootstrap').then(r=>r.json()).then(d=>JSON.stringify(d.progress))"),progressBeforeQuiz);
  await go('#learn');await screenshot('learn-index-desktop');
  await go('#learn/memory');await click('[data-answer="0"]');await screenshot('scenario-feedback-desktop');
  await cdp('Emulation.setDeviceMetricsOverride',{width:820,height:900,deviceScaleFactor:1,mobile:false});
  for(const hash of ['#home','#first-session','#glossary','#learn/ai-basics','#learn/web-chat','#learn/context','#learn/checking','#finish-session','#omarchy-help','#keep-current','#learn/image-video','#learn/reading-leaderboards','#web-tool/runway','#web-chats','#web-tool/deepseek','#web-tool/perplexity','#tools','#labs','#learn/open-models','#learn/chat-agents','#configuration','#programme','#project/'+projectIDs[1]]){await go(hash);await noOverflow('tablet '+hash);}
  await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});
  for(const hash of ['#home','#first-session','#glossary','#learn/ai-basics','#learn/web-chat','#learn/context','#learn/checking','#finish-session','#omarchy-help','#keep-current','#learn/image-video','#learn/reading-leaderboards','#web-tool/runway','#web-chats','#web-tool/deepseek','#web-tool/perplexity','#tools','#labs','#learn/open-models','#learn/web-chat','#learn/chat-agents','#learn/terminal','#projects','#configuration','#programme','#docs/deployment','#docs/open-models','#project/'+projectIDs[1]]){await go(hash);await noOverflow('mobile '+hash);}
  await go('#omarchy-help');await screenshot('omarchy-help-mobile');
  assert(await evaluate('document.querySelector("#omarchy-help-link").getBoundingClientRect().width>0'));
  await cdp('Emulation.setDeviceMetricsOverride',{width:320,height:740,deviceScaleFactor:1,mobile:false});
  await noOverflow('Omarchy help small phone');
  await go('#configuration');
  for(const detail of ['#facilitator-access','[data-setup-provider=openai]','[data-setup-provider=anthropic]','[data-setup-provider=google]'])await click(detail+' summary');
  await noOverflow('expanded setup guide small phone');
  await evaluate('document.querySelector("[data-settings-section=key-settings]").click()');
  await screenshot('configuration-keys-mobile',false);
  await evaluate('document.querySelector("[data-setup-provider=google]").scrollIntoView()');
  await screenshot('configuration-provider-mobile',false);
  await click('[data-key-console=google]');await noOverflow('key console confirmation small phone');await click('[data-close]');
  await go('#configuration');await evaluate('window.scrollTo(0,0)');await screenshot('configuration-mobile',false);
  await go('#first-session');await noOverflow('first session small phone');
  await evaluate('document.querySelector(".starting-command-guide summary").focus()');
  await cdp('Input.dispatchKeyEvent',{type:'keyDown',key:' ',code:'Space',windowsVirtualKeyCode:32});
  await cdp('Input.dispatchKeyEvent',{type:'keyUp',key:' ',code:'Space',windowsVirtualKeyCode:32});
  assert(await evaluate('document.querySelector(".starting-command-guide").open'));
  assert.equal(await evaluate('document.querySelectorAll(".starting-command-guide .command-step").length'),7);
  assert.equal(await evaluate('document.querySelectorAll(".starting-command-guide button").length'),0);
  await noOverflow('getting started expanded commands small phone');
  await go('#learn/terminal');
  assert.equal(await evaluate('simFolder'),'');
  await click('.command-parts summary');
  await noOverflow('terminal command walkthrough small phone');
  await evaluate('document.querySelector(".command-step").scrollIntoView()');
  await screenshot('terminal-commands-mobile',false);
  await go('#finish-session');await noOverflow('finish session small phone');
  for(const hash of ['#glossary','#learn/ai-basics','#learn/web-chat','#learn/prompting','#learn/checking','#learn/context']){
    await go(hash);await noOverflow('beginner small phone '+hash);
    if(await evaluate('!!document.querySelector(".reader details")')){await click('.reader details summary');await noOverflow('expanded example '+hash);}
  }
  await cdp('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:false});
  await go('#learn/memory');await click('[data-answer="1"]');await screenshot('scenario-feedback-mobile');await noOverflow('mobile scenario feedback');
  await go('#learn/web-chat');await click('.practice-exercise summary');await screenshot('chatbot-exercise-mobile');
  await go('#glossary');await screenshot('glossary-mobile');
  await go('#learn');await screenshot('learn-index-mobile');
  await go('#first-session');await screenshot('first-session-mobile');
  await go('#finish-session');await screenshot('finish-session-mobile');
  assert(await evaluate('document.querySelector("#finish-session-link").getBoundingClientRect().width>0'));
  await go('#keep-current');await screenshot('keep-current-mobile');
  await go('#learn/image-video');await screenshot('image-video-mobile');
  await go('#web-tool/perplexity');await screenshot('tool-profile-mobile');
  await go('#web-tool/huggingface');await noOverflow('mobile Hugging Face risks');await screenshot('huggingface-risks-mobile');
  await go('#tools');await click('[data-filter="Desktop tools"]');await checkLogos(8);await noOverflow('mobile desktop logos');
  await go('#home');await screenshot('launchpad-mobile');
  assert.deepEqual(errors,[],'Browser errors');
  assert.equal(serverErrors,'','Server errors');
  console.log('PASS: offline Omarchy help before acknowledgement, shortcut guidance/search/recovery, bundled tool/chat logos and fallback, launchpad, web-chat confirmation/gate/search, open-model diagrams/reviews/quiz, credentials without leaks, models/persistence, inventory, optional first-session route, manual finish checklist/key removal/failure/reload checks, nine documents, fifteen lessons, three beginner routes, glossary navigation/search, offline chatbot exercise and worked examples, five current-awareness resources, five projects and responsive layouts.');
  console.log('Screenshots: '+reports);
}finally{
  if(socket)socket.close();
  if(browser){browser.kill('SIGTERM');await new Promise(resolve=>{if(browser.exitCode!==null)resolve();else browser.once('exit',resolve);});}
  if(server){server.kill('SIGTERM');await new Promise(resolve=>{if(server.exitCode!==null)resolve();else server.once('exit',resolve);});}
  await rm(temporary,{recursive:true,force:true});
}
