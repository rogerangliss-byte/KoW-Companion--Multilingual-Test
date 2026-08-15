(function(){
'use strict';

const GUIDE_FILES={en:'USER-GUIDE.md',fr:'USER-GUIDE-fr.md',de:'USER-GUIDE-de.md',it:'USER-GUIDE-it.md'};
let guideRequest=0,guideTimer=null;

function currentLang(){
  const s=document.getElementById('appLanguage');
  const l=String(s?.value||localStorage.getItem('kow_language')||localStorage.getItem('appLanguage')||document.documentElement.lang||'en').slice(0,2).toLowerCase();
  return GUIDE_FILES[l]?l:'en';
}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function inline(s){
  return esc(s)
    .replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>')
    .replace(/`([^`]+)`/g,'<code>$1</code>');
}
function markdownToHtml(md){
  const lines=String(md||'').replace(/\r/g,'').split('\n');
  let out=[],list=null;
  const close=()=>{if(list){out.push(list==='ol'?'</ol>':'</ul>');list=null;}};
  for(const raw of lines){
    const line=raw.trim();
    if(!line){close();continue;}
    let m=line.match(/^(#{1,4})\s+(.+)$/);
    if(m){close();const n=Math.min(4,m[1].length+1);out.push(`<h${n}>${inline(m[2])}</h${n}>`);continue;}
    m=line.match(/^[-*]\s+(.+)$/);
    if(m){if(list!=='ul'){close();list='ul';out.push('<ul>');}out.push(`<li>${inline(m[1])}</li>`);continue;}
    m=line.match(/^\d+\.\s+(.+)$/);
    if(m){if(list!=='ol'){close();list='ol';out.push('<ol>');}out.push(`<li>${inline(m[1])}</li>`);continue;}
    if(/^\|.*\|$/.test(line)){close();out.push(`<p>${inline(line.replace(/^\||\|$/g,'').replace(/\|/g,' · '))}</p>`);continue;}
    close();out.push(`<p>${inline(line)}</p>`);
  }
  close();return out.join('\n');
}
function guideError(l){return {en:'The User Guide could not be loaded.',fr:'Le Guide utilisateur n’a pas pu être chargé.',de:'Das Benutzerhandbuch konnte nicht geladen werden.',it:'Impossibile caricare la Guida utente.'}[l]||'The User Guide could not be loaded.';}
async function renderSelectedGuide(forced){
  const box=document.getElementById('helpLanguageBody');
  if(!box)return;
  const l=GUIDE_FILES[forced]?forced:currentLang(),file=GUIDE_FILES[l],request=++guideRequest;
  try{
    const r=await fetch('./'+file+'?v=440-selected-language-guide',{cache:'no-store'});
    if(!r.ok)throw new Error('HTTP '+r.status);
    const md=await r.text();
    if(request!==guideRequest)return;
    box.innerHTML=markdownToHtml(md);
    box.dataset.guideLanguage=l;
    box.dataset.guideSource=file;
    box.dataset.guideStatus='loaded';
  }catch(e){
    if(request!==guideRequest)return;
    box.innerHTML='<div class="notice"><b>'+esc(guideError(l))+'</b></div>';
    box.dataset.guideLanguage=l;box.dataset.guideSource=file;box.dataset.guideStatus='error';
  }
}
function scheduleGuide(l){
  clearTimeout(guideTimer);
  guideTimer=setTimeout(()=>renderSelectedGuide(l),260);
  setTimeout(()=>renderSelectedGuide(l),650);
}

function collect(root){
  const out=[]; if(!root) return out;
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT); let n;
  while(n=w.nextNode()){
    if(['SCRIPT','STYLE'].includes(n.parentElement?.tagName)) continue;
    const s=(n.nodeValue||'').replace(/\s+/g,' ').trim();
    if(s.length>=3) out.push(s);
  }
  return [...new Set(out)];
}
function currentScopeRoot(){
  const scope=document.getElementById('languageQaScope')?.value||'full';
  if(scope==='home') return document.getElementById('home');
  if(scope==='planner') return document.getElementById('planner');
  if(scope==='releases') return document.getElementById('releases');
  if(scope==='help') return document.getElementById('help');
  return document.querySelector('main')||document.body;
}
function integrity(strings,lang){
  const issues=[];
  const joined=strings.join(' | ');
  if(/v4\.3\.58|v4\.3\.59/.test(joined)) issues.push('Stale documentation/version text detected (v4.3.58/v4.3.59)');
  const rep=joined.match(/([A-Za-zÀ-ÿ])\1{19,}/);
  if(rep) issues.push('Probable corrupted repeated-character text: '+rep[0].slice(0,32)+'…');
  if(/[�]|Ã.|Â./.test(joined)) issues.push('Probable character-encoding corruption detected');
  if(lang!=='en'){
    const bleed=['with saved Officer analysis','using recurring','selection for','filtering for','Combined Season + Type reports','Focused future-session reports','for one or two future Legendary Officers','Inventory-aware readiness','Top 10 compact results','enter and save the resources you currently hold','review the recurring release schedule','run Advanced Multi-Officer Planning'];
    const hits=bleed.filter(x=>joined.toLowerCase().includes(x.toLowerCase()));
    if(hits.length) issues.push('Residual English content: '+hits.slice(0,5).join(' | '));
  }
  return issues;
}
function evaluate(){
  const lang=currentLang();
  const issues=integrity(collect(currentScopeRoot()),lang);
  const guide=document.getElementById('helpLanguageBody');
  if(guide && guide.dataset.guideLanguage && guide.dataset.guideLanguage!==lang)issues.push('User Guide language does not match selected language');
  let box=document.getElementById('v440QaInterpretation');
  const host=document.getElementById('languageQaResults')?.parentElement;
  if(!host) return;
  if(!box){box=document.createElement('div');box.id='v440QaInterpretation';box.className='notice';host.appendChild(box)}
  if(issues.length){
    box.innerHTML='<b>v4.4.0 Content Integrity — WARNING</b><br>'+issues.join('<br>');
    const summary=document.getElementById('languageQaSummary');
    if(summary && /^\s*PASS\b/i.test(summary.textContent||'')) summary.innerHTML='<b>WARNING</b> — Translation keys passed, but content-integrity issues were detected. See details below.';
  }else{
    box.innerHTML='<b>v4.4.0 Content Integrity — PASS</b><br>Selected-language User Guide and content-integrity checks passed in the selected scope.';
  }
}

document.addEventListener('change',e=>{if(e.target?.id==='appLanguage')scheduleGuide(String(e.target.value||'').slice(0,2).toLowerCase());},true);
document.addEventListener('click',e=>{if(e.target?.id==='runLanguageQa') setTimeout(evaluate,900)});
window.addEventListener('DOMContentLoaded',()=>{
  const intro=[...document.querySelectorAll('#languageQaCard p,#settings p')].find(x=>/translation audit against the current v4\.3\.59 interface/i.test(x.textContent||''));
  if(intro) intro.textContent='Run a translation and content-integrity audit against the current v4.4.0 interface. This diagnostic does not change Officer or Inventory data.';
  scheduleGuide(currentLang());
});
window.addEventListener('pageshow',()=>scheduleGuide(currentLang()));
window.kowRenderSelectedUserGuide=renderSelectedGuide;
window.kowV440QaIntegrity=evaluate;
})();
