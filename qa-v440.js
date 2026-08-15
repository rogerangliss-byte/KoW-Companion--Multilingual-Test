(function(){
'use strict';

const GUIDE_FILES={en:'USER-GUIDE.md',fr:'USER-GUIDE-fr.md',de:'USER-GUIDE-de.md',it:'USER-GUIDE-it.md'};
const DICTS={
  fr:()=>window.KOW_I18N_FR||{},
  de:()=>window.KOW_I18N_DE||{},
  it:()=>window.KOW_I18N_IT||{},
  en:()=>window.KOW_I18N_EN||{}
};
const CANONICAL=/\b(?:ORV|SRV|XP|MAX|TEST|KoW|S[2-9]|FireStorm|JSON|CSV)\b/g;
let guideRequest=0,guideTimer=null,observer=null,translationBusy=false;

function currentLang(){
  const s=document.getElementById('appLanguage');
  const l=String(s?.value||localStorage.getItem('kow_language')||localStorage.getItem('appLanguage')||document.documentElement.lang||'en').slice(0,2).toLowerCase();
  return GUIDE_FILES[l]?l:'en';
}
function dictionary(l=currentLang()){return DICTS[l]?DICTS[l]():{};}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function inline(s){return esc(s).replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>').replace(/`([^`]+)`/g,'<code>$1</code>');}
function markdownToHtml(md){
  const lines=String(md||'').replace(/\r/g,'').split('\n');let out=[],list=null;
  const close=()=>{if(list){out.push(list==='ol'?'</ol>':'</ul>');list=null;}};
  for(const raw of lines){const line=raw.trim();if(!line){close();continue;}let m=line.match(/^(#{1,4})\s+(.+)$/);
    if(m){close();const n=Math.min(4,m[1].length+1);out.push(`<h${n}>${inline(m[2])}</h${n}>`);continue;}
    m=line.match(/^[-*]\s+(.+)$/);if(m){if(list!=='ul'){close();list='ul';out.push('<ul>');}out.push(`<li>${inline(m[1])}</li>`);continue;}
    m=line.match(/^\d+\.\s+(.+)$/);if(m){if(list!=='ol'){close();list='ol';out.push('<ol>');}out.push(`<li>${inline(m[1])}</li>`);continue;}
    close();out.push(`<p>${inline(line)}</p>`);
  }close();return out.join('\n');
}
function guideError(l){return {en:'The User Guide could not be loaded.',fr:'Le Guide utilisateur n’a pas pu être chargé.',de:'Das Benutzerhandbuch konnte nicht geladen werden.',it:'Impossibile caricare la Guida utente.'}[l];}
async function renderSelectedGuide(forced){
  const box=document.getElementById('helpLanguageBody');if(!box)return;
  const l=GUIDE_FILES[forced]?forced:currentLang(),file=GUIDE_FILES[l],request=++guideRequest;
  try{const r=await fetch('./'+file+'?v=440-full-language-gate',{cache:'no-store'});if(!r.ok)throw new Error('HTTP '+r.status);const md=await r.text();if(request!==guideRequest)return;
    box.innerHTML=markdownToHtml(md);box.dataset.guideLanguage=l;box.dataset.guideSource=file;box.dataset.guideStatus='loaded';
  }catch(e){if(request!==guideRequest)return;box.innerHTML='<div class="notice"><b>'+esc(guideError(l))+'</b></div>';box.dataset.guideLanguage=l;box.dataset.guideSource=file;box.dataset.guideStatus='error';}
}
function scheduleGuide(l){clearTimeout(guideTimer);guideTimer=setTimeout(()=>renderSelectedGuide(l),120);setTimeout(()=>renderSelectedGuide(l),420);}

function translateString(value,dict){
  const s=String(value??'');if(!s.trim())return s;
  const exact=dict[s.trim()];if(exact&&exact!==s.trim())return s.replace(s.trim(),exact);
  let out=s;
  const keys=Object.keys(dict).filter(k=>k.length>=10&&dict[k]&&dict[k]!==k).sort((a,b)=>b.length-a.length);
  for(const k of keys){if(out.includes(k))out=out.split(k).join(dict[k]);}
  return out;
}
function applyDictionaryPass(root=document.body){
  const l=currentLang();if(l==='en'||translationBusy||!root)return;
  const dict=dictionary(l);if(!dict||!Object.keys(dict).length)return;
  translationBusy=true;
  try{
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;
    while(n=walker.nextNode()){
      const p=n.parentElement;if(!p||['SCRIPT','STYLE','NOSCRIPT','TEXTAREA'].includes(p.tagName)||p.closest('#helpLanguageBody'))continue;
      const before=n.nodeValue,after=translateString(before,dict);if(after!==before)n.nodeValue=after;
    }
    root.querySelectorAll?.('input[placeholder],input[title],button[title],select[title],[aria-label]').forEach(el=>{
      for(const a of ['placeholder','title','aria-label'])if(el.hasAttribute(a)){const v=el.getAttribute(a),t=translateString(v,dict);if(t!==v)el.setAttribute(a,t);}
    });
  }finally{translationBusy=false;}
}
function scheduleTranslation(){setTimeout(()=>applyDictionaryPass(document.body),20);setTimeout(()=>applyDictionaryPass(document.body),140);setTimeout(()=>applyDictionaryPass(document.body),420);}
function startObserver(){
  if(observer)observer.disconnect();
  observer=new MutationObserver(muts=>{if(translationBusy||currentLang()==='en')return;let needed=false;for(const m of muts){if(m.type==='childList'||m.type==='characterData'){needed=true;break;}}if(needed)requestAnimationFrame(()=>applyDictionaryPass(document.body));});
  observer.observe(document.body,{subtree:true,childList:true,characterData:true});
}

function collect(root){
  const out=[];if(!root)return out;const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;
  while(n=w.nextNode()){if(['SCRIPT','STYLE','NOSCRIPT'].includes(n.parentElement?.tagName))continue;const s=(n.nodeValue||'').replace(/\s+/g,' ').trim();if(s.length>=3)out.push(s);}return [...new Set(out)];
}
function currentScopeRoot(){
  const scope=document.getElementById('languageQaScope')?.value||'full';
  if(scope==='home')return document.getElementById('home');if(scope==='planner')return document.getElementById('planner');if(scope==='releases')return document.getElementById('releases');if(scope==='help')return document.getElementById('help');return document.querySelector('main')||document.body;
}
function definiteBleed(strings,lang){
  if(lang==='en')return [];
  const dict=dictionary(lang),keys=Object.keys(dict).filter(k=>dict[k]&&dict[k]!==k&&k.length>=4);const hits=[];
  for(const s0 of strings){const s=s0.replace(CANONICAL,'').trim();if(!s)continue;
    if(dict[s]&&dict[s]!==s){hits.push(s);continue;}
    const long=keys.filter(k=>k.length>=14&&s.includes(k)).sort((a,b)=>b.length-a.length)[0];if(long)hits.push(long);
    if(hits.length>=20)break;
  }
  return [...new Set(hits)];
}
function integrity(strings,lang){
  const issues=[],joined=strings.join(' | ');
  if(/v4\.3\.(?:36|55|56|57|58|59|60|61|62)\b/.test(joined))issues.push('Stale v4.3 documentation/version text detected');
  const rep=joined.match(/([A-Za-zÀ-ÿ])\1{19,}/);if(rep)issues.push('Probable corrupted repeated-character text detected');
  if(/[�]|Ã.|Â./.test(joined))issues.push('Probable character-encoding corruption detected');
  const bleed=definiteBleed(strings,lang);if(bleed.length)issues.push('Untranslated English detected: '+bleed.slice(0,12).join(' | '));
  return issues;
}
function labels(lang){return {
  en:{title:'v4.4.0 Full Language Gate',pass:'PASS — rendered app and selected User Guide passed the current translation checks.',warn:'WARNING — translation or content-integrity issues remain.'},
  fr:{title:'Contrôle linguistique complet v4.4.0',pass:'RÉUSSI — l’application affichée et le Guide utilisateur sélectionné ont réussi les contrôles actuels.',warn:'ATTENTION — des problèmes de traduction ou d’intégrité subsistent.'},
  de:{title:'Vollständige Sprachprüfung v4.4.0',pass:'BESTANDEN — gerenderte App und ausgewähltes Benutzerhandbuch haben die aktuellen Prüfungen bestanden.',warn:'WARNUNG — Übersetzungs- oder Inhaltsprobleme sind noch vorhanden.'},
  it:{title:'Controllo lingua completo v4.4.0',pass:'SUPERATO — app visualizzata e Guida utente selezionata hanno superato i controlli correnti.',warn:'ATTENZIONE — restano problemi di traduzione o integrità.'}
}[lang]||{};}
function evaluate(){
  applyDictionaryPass(document.body);const lang=currentLang(),issues=integrity(collect(currentScopeRoot()),lang),guide=document.getElementById('helpLanguageBody');
  if(guide){if(guide.dataset.guideStatus==='error')issues.push('User Guide failed to load');if(guide.dataset.guideLanguage&&guide.dataset.guideLanguage!==lang)issues.push('User Guide language does not match selected language');}
  let box=document.getElementById('v440QaInterpretation');const host=document.getElementById('languageQaResults')?.parentElement||document.getElementById('languageQaCard');if(!host)return;
  if(!box){box=document.createElement('div');box.id='v440QaInterpretation';box.className='notice';host.appendChild(box);}const t=labels(lang);
  box.innerHTML='<b>'+esc(t.title)+'</b><br>'+(issues.length?esc(t.warn)+'<br>'+issues.map(esc).join('<br>'):esc(t.pass));box.dataset.result=issues.length?'WARNING':'PASS';
  const summary=document.getElementById('languageQaSummary');if(summary)summary.innerHTML='<b>'+(issues.length?'WARNING':'PASS')+'</b> — '+(issues.length?esc(t.warn):esc(t.pass));
  return {language:lang,result:issues.length?'WARNING':'PASS',issues};
}

document.addEventListener('change',e=>{if(e.target?.id==='appLanguage'){const l=String(e.target.value||'').slice(0,2).toLowerCase();document.documentElement.lang=l;localStorage.setItem('kow_language',l);scheduleGuide(l);scheduleTranslation();}},true);
document.addEventListener('click',e=>{if(e.target?.id==='runLanguageQa'||e.target?.id==='runLanguageTest'||e.target?.id==='runTranslationAudit')setTimeout(evaluate,650);},true);
window.addEventListener('DOMContentLoaded',()=>{document.documentElement.lang=currentLang();scheduleGuide(currentLang());scheduleTranslation();startObserver();});
window.addEventListener('pageshow',()=>{scheduleGuide(currentLang());scheduleTranslation();});
window.kowRenderSelectedUserGuide=renderSelectedGuide;window.kowApplyFullLanguagePass=applyDictionaryPass;window.kowV440QaIntegrity=evaluate;
})();
