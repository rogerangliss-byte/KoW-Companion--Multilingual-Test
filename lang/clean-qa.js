/* KoW Companion v4.4.0 TEST — runtime multilingual QA, clean7. */
(function(){
'use strict';
const QA_VERSION='clean7-runtime';
const EXPECTED_TITLE='KoW Companion v4.4.0 TEST';
const SAFE_EXACT=new Set(['XP','ORV','SRV','MAXED','IN PROGRESS','NOT STARTED','CURRENT','NEXT']);
function dictionaries(){return window.KOW_CLEAN_I18N?.getDictionaries?.()||{en:window.KOW_I18N_EN||{},fr:window.KOW_I18N_FR||{},de:window.KOW_I18N_DE||{},it:window.KOW_I18N_IT||{}};}
function canonical(){return Object.keys(dictionaries().en||{}).filter(Boolean).sort((a,b)=>a.localeCompare(b));}
function missingFor(lang){if(lang==='en')return[];const d=dictionaries()[lang]||{};return canonical().filter(k=>!Object.prototype.hasOwnProperty.call(d,k));}
function untranslatedFor(lang){if(lang==='en')return[];const d=dictionaries()[lang]||{};return canonical().filter(k=>Object.prototype.hasOwnProperty.call(d,k)&&d[k]===k&&/[A-Za-z]/.test(k)&&!SAFE_EXACT.has(k));}
function currentLang(){return window.KOW_CLEAN_I18N?.current?.()||document.documentElement.lang||'en';}
function visible(el){if(!el||!el.isConnected)return false;const s=getComputedStyle(el);return s.display!=='none'&&s.visibility!=='hidden'&&s.opacity!=='0';}
function norm(s){return String(s??'').replace(/\s+/g,' ').trim();}
function boundaryContains(text,key){
 const t=norm(text),k=norm(key);if(!t||!k)return false;
 if(t===k)return true;
 const escaped=k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
 try{return new RegExp(`(^|[^A-Za-zÀ-ÿ0-9])${escaped}($|[^A-Za-zÀ-ÿ0-9])`,'u').test(t);}catch{return t.includes(k);}
}
function renderedEnglish(lang){
 if(lang==='en')return[];
 const en=dictionaries().en||{},target=dictionaries()[lang]||{};
 const keys=Object.keys(en).filter(k=>k&&/[A-Za-z]/.test(k)&&!SAFE_EXACT.has(k)&&target[k]&&target[k]!==k).sort((a,b)=>b.length-a.length);
 const findings=[];const seen=new Set();
 const add=(kind,text,key,where)=>{const sig=kind+'|'+where+'|'+text+'|'+key;if(seen.has(sig))return;seen.add(sig);findings.push({kind,text:norm(text),key,where});};
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
 while(n=walker.nextNode()){
  const p=n.parentElement;if(!p||!visible(p)||p.closest('#cleanLanguageQaCard')||['SCRIPT','STYLE','NOSCRIPT','TEXTAREA','CODE','PRE'].includes(p.tagName))continue;
  const text=norm(n.nodeValue);if(!text)continue;
  for(const key of keys){if(boundaryContains(text,key)){add('text',text,key,p.tagName.toLowerCase()+(p.id?'#'+p.id:''));break;}}
 }
 document.querySelectorAll('[placeholder],[title],[aria-label]').forEach(el=>{
  if(!visible(el)||el.closest('#cleanLanguageQaCard'))return;
  ['placeholder','title','aria-label'].forEach(a=>{if(!el.hasAttribute(a))return;const text=norm(el.getAttribute(a));for(const key of keys){if(boundaryContains(text,key)){add(a,text,key,el.tagName.toLowerCase()+(el.id?'#'+el.id:''));break;}}});
 });
 return findings;
}
function buildIdentityIssues(){
 const issues=[];
 if(document.title!==EXPECTED_TITLE)issues.push(`Wrong document title/build identity: "${document.title}" (expected "${EXPECTED_TITLE}")`);
 const h=location.hostname,p=location.pathname;
 const correctHost=h==='multilingualtest.firestorm-companion.uk';
 const correctGithub=h==='rogerangliss-byte.github.io'&&p.startsWith('/KoW-Companion--Multilingual-Test');
 if(!correctHost&&!correctGithub)issues.push(`Wrong QA deployment: ${location.href}`);
 return issues;
}
function qaData(choice='all'){
 const active=currentLang();
 const langs=choice==='all'?['en','fr','de','it']:[choice];
 const names={en:'English',fr:'French',de:'German',it:'Italian'};
 const identity=buildIdentityIssues();
 return langs.map(l=>{
  const missing=missingFor(l),untranslated=untranslatedFor(l);
  const runtime=l===active?renderedEnglish(l):[];
  const runtimeSkipped=l!==active;
  const issues=missing.map(k=>'[missing key] '+k).concat(untranslated.map(k=>'[same as English] '+k));
  if(!runtimeSkipped)runtime.forEach(x=>issues.push(`[rendered English] ${x.text}  ← matched: ${x.key}`));
  identity.forEach(x=>issues.push('[build identity] '+x));
  const status=runtimeSkipped?(issues.length?'WARNING':'DICTIONARY ONLY'):(issues.length?'FAIL':'PASS');
  return {lang:l,name:names[l],status,missing,untranslated,runtime,runtimeSkipped,identity,issues};
 });
}
function buildReport(choice='all'){
 const rows=qaData(choice),active=currentLang(),now=new Date();
 const lines=[
  'KoW Companion v4.4.0 TEST — Runtime Language QA Report',
  'QA module: '+QA_VERSION,
  'Active app language: '+active,
  'URL: '+location.href,
  'Document title: '+document.title,
  'Generated: '+now.toISOString(),'',
  'IMPORTANT: rendered-browser QA is only authoritative for the currently active app language. Switch language, reload, then run again for each language.','',
  'SUMMARY'
 ];
 rows.forEach(r=>lines.push(`${r.name}: ${r.status} — ${r.issues.length} issues (${r.missing.length} missing, ${r.untranslated.length} same-as-English, ${r.runtime.length} rendered-English${r.runtimeSkipped?', runtime scan skipped':''})`));
 rows.forEach(r=>{
  lines.push('',`=== ${r.name.toUpperCase()} — ${r.status} ===`);
  if(r.runtimeSkipped)lines.push('Rendered-browser scan skipped because this is not the active app language.');
  if(!r.issues.length){lines.push('No translation or rendered-English issues detected for this language.');return;}
  r.issues.forEach((x,i)=>lines.push(`${i+1}. ${x}`));
 });
 return lines.join('\n');
}
function downloadReport(){
 const choice=document.getElementById('cleanQaLanguage')?.value||currentLang();
 const blob=new Blob([buildReport(choice)],{type:'text/plain;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
 const stamp=new Date().toISOString().replace(/[:.]/g,'-');a.href=url;a.download=`KoW-Runtime-Language-QA-v4.4.0-${choice}-${stamp}.txt`;a.style.display='none';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000);
}
function resultHtml(choice){
 const rows=qaData(choice);
 return rows.map(r=>{
  const runtimeNote=r.runtimeSkipped?'<div class="notice">Runtime scan skipped: switch the app to this language and reload before treating this result as authoritative.</div>':'';
  const detail=r.issues.length?`<details open><summary>${r.issues.length} issue${r.issues.length===1?'':'s'}</summary><div style="white-space:pre-wrap;margin-top:8px">${r.issues.slice(0,200).map(x=>'• '+x).join('\n')}</div></details>`:'No missing keys, same-as-English values or rendered English detected.';
  return `<div style="margin:12px 0"><b>${r.name} — ${r.status}</b>${runtimeNote}<div>${detail}</div></div>`;
 }).join('');
}
function wire(card){
 const run=card.querySelector('#cleanQaRun'),dl=card.querySelector('#cleanQaDownload'),sel=card.querySelector('#cleanQaLanguage');
 if(sel)sel.value=currentLang();
 if(run&&!run.dataset.wired){run.dataset.wired='1';run.addEventListener('click',()=>{const choice=document.getElementById('cleanQaLanguage').value;document.getElementById('cleanQaResult').innerHTML=resultHtml(choice);});}
 if(dl&&!dl.dataset.wired){dl.dataset.wired='1';dl.addEventListener('click',downloadReport);}
}
function render(){
 const settings=document.getElementById('settings');if(!settings)return;
 let card=document.getElementById('cleanLanguageQaCard');if(!card){card=document.createElement('div');card.id='cleanLanguageQaCard';card.className='card wide';card.style.marginTop='12px';settings.appendChild(card);}
 if(card.dataset.qaVersion!==QA_VERSION||!card.querySelector('#cleanQaDownload')){
  card.dataset.qaVersion=QA_VERSION;
  card.innerHTML=`<h2>🧪 Runtime Language QA / Translation Test</h2>
   <p class="notice"><b>Authoritative browser QA.</b> This checks dictionary coverage, verifies that you are on the v4.4.0 TEST deployment, and scans the currently rendered interface for English bleed. Officer names/game data remain outside the translation contract.</p>
   <div class="notice"><b>QA module ${QA_VERSION}</b> · Active language: <b>${currentLang()}</b><br>For comprehensive QA: switch to French, reload and run; then repeat for German and Italian.</div>
   <label for="cleanQaLanguage">Language to test</label>
   <select id="cleanQaLanguage"><option value="en">English</option><option value="fr">Français</option><option value="de">Deutsch</option><option value="it">Italiano</option><option value="all">All Languages (dictionary comparison; runtime only for active language)</option></select>
   <button id="cleanQaRun" class="primary" type="button">▶ Run Runtime Language QA</button>
   <button id="cleanQaDownload" class="primary" type="button" style="margin-top:10px">⬇ Download Runtime QA Report</button>
   <div id="cleanQaResult" class="notice">No runtime language test has been run yet.</div>`;
 }
 wire(card);
}
document.addEventListener('DOMContentLoaded',()=>setTimeout(render,0));window.addEventListener('load',render);if(document.readyState!=='loading')setTimeout(render,0);
window.KOW_CLEAN_QA={QA_VERSION,qaData,buildReport,downloadReport,render,renderedEnglish,buildIdentityIssues};
})();
