/* KoW Companion v4.6.0 QA2 — rendered-language audit */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const LABEL={en:'English',fr:'Français',de:'Deutsch',it:'Italiano'};
const UI={
en:{title:'Language QA / Rendered Translation Test',run:'Run Full Rendered QA',pass:'PASS',fail:'FAIL',dict:'Dictionary',render:'Rendered English bleed',guide:'Full User Guide',popup:'Pop-ups'},
fr:{title:'QA linguistique / Test rendu',run:'Lancer le QA rendu complet',pass:'RÉUSSI',fail:'ÉCHEC',dict:'Dictionnaire',render:'Anglais visible détecté',guide:'Guide utilisateur complet',popup:'Fenêtres contextuelles'},
de:{title:'Sprach-QA / Render-Test',run:'Vollständige Render-QA starten',pass:'BESTANDEN',fail:'FEHLER',dict:'Wörterbuch',render:'Sichtbarer englischer Text',guide:'Vollständiges Benutzerhandbuch',popup:'Pop-ups'},
it:{title:'QA lingua / Test visualizzato',run:'Esegui QA completo visualizzato',pass:'SUPERATO',fail:'NON SUPERATO',dict:'Dizionario',render:'Testo inglese visibile',guide:'Guida utente completa',popup:'Pop-up'}};
const FEATURE=['Upgrade Targets & Recommendations','Target Level','Target Stars','Target Training','Calculate Target Recommendation','Global Officer Data:','Data version:','Officers:','Published:'];
const POPS=['Plan saved.','Officer database saved.','CSV imported.','Restore default officer database?','Reset Central Inventory?','S7 Julia progress saved.','S7 Julia is now saved as MAXED.'];
const ENGLISH_PHRASES=[
'Planning estimate using','growth per Officer release','latest confirmed database release','For 1,600 badges','Star value','Exclusive Stars','plan for approximately','Forecast only','replace with confirmed costs',
'Current month:','Next scheduled release:','No scheduled release','New Dogs','New Ships','Guns:','Jets:','Officers: Tanks','Officers: Tank Destroyers','Officers: Infantry',
'Open the in-app User Guide','Export all locally saved','No backup created yet','Backup & Restore','Check for Updates','Refresh Latest Version',
'Upgrade Targets & Recommendations','Calculate Target Recommendation','Global Officer Data','Resource requirement to target'
];
const GUIDE_REQUIRED={
fr:['Flux de travail recommandé','Nouveautés v4.6.0','Persistance de l’état de travail v4.6.0','Inventaire central','Règles des coffres légendaires','Progression d’Officier','Brins de compétences','Totaux de Badges confirmés','Progression des Officiers et Comparaison','Optimiseur de ressources','Planificateur d’amélioration multi-Officiers','Planification avancée et futurs Officiers','Tableau de préparation de planification','Sauvegarde et restauration','QA linguistique','QA avant mise en Live'],
de:['Empfohlener Ablauf','Neu in v4.6.0','Arbeitszustands-Persistenz v4.6.0','Zentrales Inventar','Regeln für legendäre Truhen','Offiziersfortschritt','Fertigkeitsstränge','Bestätigte Abzeichensummen','Offiziersfortschritt und Vergleich','Ressourcenoptimierer','Mehr-Offizier-Upgrade-Planer','Erweiterte Planung und zukünftige Offiziere','Planungsbereitschafts-Dashboard','Backup & Wiederherstellung','Sprach-QA','QA vor Live'],
it:['Flusso consigliato','Novità v4.6.0','Persistenza dello stato di lavoro v4.6.0','Inventario centrale','Regole delle casse leggendarie','Progresso Ufficiale','Rami abilità','Totali Badge confermati','Progressi Ufficiali e Confronto','Ottimizzatore risorse','Pianificatore potenziamento multi-Ufficiale','Pianificazione avanzata e futuri Ufficiali','Dashboard preparazione pianificazione','Backup e ripristino','QA lingua','QA prima del Live']
};
function cur(){return window.KOW_CLEAN_I18N?.current?.()||'en'}
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function wait(ms){return new Promise(r=>setTimeout(r,ms))}
function details(title,a){return a.length?`<details><summary>${esc(title)} (${a.length})</summary><div style="max-height:260px;overflow:auto;font-size:.78rem">${a.map(x=>`<div>${esc(x)}</div>`).join('')}</div></details>`:''}
function dictCheck(code){
 if(code==='en')return [];
 const ds=window.KOW_CLEAN_I18N.getDictionaries(),d=ds[code]||{};
 return FEATURE.filter(k=>!(k in d)||String(d[k]).trim()===k);
}
function popupCheck(code){
 if(code==='en')return [];
 const api=window.KOW_CLEAN_I18N,tr=window.kowPopupTranslate,old=api.current(),bad=[];
 try{api.setLanguage(code);POPS.forEach(s=>{if(typeof tr!=='function'||String(tr(s)||'').trim()===s)bad.push(s)})}finally{api.setLanguage(old)}
 return bad;
}
function guideCheck(code){
 if(code==='en')return [];
 const txt=document.querySelector('#help > article.card')?.textContent||'';
 return (GUIDE_REQUIRED[code]||[]).filter(x=>!txt.includes(x));
}
function renderedBleed(){
 const roots=['officer','inventory','stars','development','xp','planner','database','releases','settings','help'];
 let txt=roots.map(id=>$(id)?.textContent||'').join('\n');
 // QA card is deliberately multilingual but contains technical English labels; exclude it.
 txt=txt.replace($('v460QaCard')?.textContent||'','');
 return ENGLISH_PHRASES.filter(p=>txt.includes(p));
}
async function auditLanguage(code){
 const api=window.KOW_CLEAN_I18N;api.setLanguage(code);await wait(120);
 window.kowRefreshDynamicReleaseForecast?.();window.kowRenderLocalizedReleaseCalendar?.();await wait(120);
 return {d:dictCheck(code),p:popupCheck(code),g:guideCheck(code),r:code==='en'?[]:renderedBleed()};
}
async function run(){
 const out=$('v460QaResults');if(!out)return;const api=window.KOW_CLEAN_I18N,original=api.current(),ui=UI[original]||UI.en;
 out.innerHTML='<div class="notice">Running rendered QA…</div>';
 let h='';
 try{
   for(const code of ['en','fr','de','it']){
     const a=await auditLanguage(code),ok=!a.d.length&&!a.p.length&&!a.g.length&&!a.r.length;
     h+=`<div style="margin:10px 0;padding:12px;border:1px solid rgba(255,255,255,.12);border-radius:10px;background:rgba(0,0,0,.25)"><div style="display:flex;justify-content:space-between"><b>${LABEL[code]}</b><strong style="color:${ok?'#9ee493':'#ff9d86'}">${ok?ui.pass:ui.fail}</strong></div>`;
     if(code!=='en')h+=`<div>${ui.dict}: <b>${a.d.length}</b> · ${ui.render}: <b>${a.r.length}</b> · ${ui.guide}: <b>${a.g.length}</b> · ${ui.popup}: <b>${a.p.length}</b></div>${details(ui.dict,a.d)}${details(ui.render,a.r)}${details(ui.guide,a.g)}${details(ui.popup,a.p)}`;
     h+='</div>';
   }
 }finally{api.setLanguage(original);await wait(80);window.kowRefreshDynamicReleaseForecast?.();window.kowRenderLocalizedReleaseCalendar?.()}
 out.innerHTML=h+'<div class="notice"><b>QA2:</b> PASS now requires dictionary coverage, rendered-page English-bleed checks, complete in-app User Guide section coverage and popup localization.</div>';
}
function inject(){
 const old=$('v460QaCard');if(old)old.remove();
 const s=$('settings');if(!s)return;const ui=UI[cur()]||UI.en,d=document.createElement('div');d.id='v460QaCard';d.className='card wide';d.style.marginTop='12px';
 d.innerHTML=`<h2>🧪 ${ui.title}</h2><p class="notice">QA2 scans the actual rendered application, not just dictionary keys. It also verifies full User Guide section coverage.</p><button id="v460QaRun" class="app-action-primary" type="button">${ui.run}</button><div id="v460QaResults"></div>`;
 s.appendChild(d);$('v460QaRun').addEventListener('click',run);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(inject,350));else setTimeout(inject,150);
})();


/* v4.6.0 QA2 — Download QA Report restoration */
(function(){
'use strict';
let lastReport=null;

function currentLang(){
  try{return window.KOW_CLEAN_I18N?.current?.()||document.getElementById('appLanguage')?.value||'en'}catch(e){return 'en'}
}
function nowIso(){return new Date().toISOString()}
function parseResults(){
  const root=document.getElementById('v460QaResults');
  const report={
    generated_at:nowIso(),
    app_version:'4.6.0',
    qa_version:'QA2 rendered translation test',
    selected_language:currentLang(),
    url:location.href,
    results:{}
  };
  if(!root){report.error='QA results container not found';return report}
  const blocks=[...root.children].filter(el=>el.querySelector('b,strong')||el.textContent.trim());
  const langs=['English','Français','Deutsch','Italiano'];
  for(const lang of langs){
    const block=blocks.find(el=>el.textContent.trim().startsWith(lang));
    if(!block)continue;
    const raw=block.innerText||block.textContent||'';
    const status=/\bPASS\b|RÉUSSI|BESTANDEN|SUPERATO/.test(raw)?'PASS':(/\bFAIL\b|ÉCHEC|FEHLER|NON SUPERATO/.test(raw)?'FAIL':'UNKNOWN');
    const num=(label)=>{
      const m=raw.match(new RegExp(label.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\s*:?\\s*(\\d+)','i'));
      return m?Number(m[1]):null;
    };
    const details={};
    const detailNodes=[...block.querySelectorAll('details')];
    for(const d of detailNodes){
      const s=d.querySelector('summary')?.textContent?.trim()||'Details';
      details[s]=[...d.querySelectorAll('div')].map(x=>x.textContent.trim()).filter(Boolean);
    }
    // Also capture expanded/plain failure lines in older QA2 rendering.
    const lines=raw.split(/\r?\n/).map(x=>x.trim()).filter(Boolean);
    report.results[lang]={
      status,
      dictionary:num('Dictionary'),
      rendered_english_bleed:num('Rendered English bleed'),
      full_user_guide:num('Full User Guide'),
      popups:num('Pop-ups'),
      lines,
      details
    };
  }
  report.test_banner=!!document.getElementById('multilingualTestBanner') || /MULTILINGUAL TEST|TEST.*NOT LIVE/i.test(document.body.innerText||'');
  report.cname_expected='multilingualtest.firestorm-companion.uk';
  return report;
}
function downloadReport(){
  lastReport=parseResults();
  const stamp=nowIso().replace(/[:.]/g,'-');
  const blob=new Blob([JSON.stringify(lastReport,null,2)],{type:'application/json;charset=utf-8'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=`KoW-Language-QA-v4.6.0-${stamp}.json`;
  document.body.appendChild(a);
  a.click();
  setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500);
}
function install(){
  const run=document.getElementById('v460QaRun');
  if(!run)return;
  if(document.getElementById('v460QaDownload'))return;
  const btn=document.createElement('button');
  btn.id='v460QaDownload';
  btn.type='button';
  btn.className=run.className||'app-action-secondary';
  btn.textContent='⬇ Download QA Report';
  btn.style.marginLeft='8px';
  btn.addEventListener('click',downloadReport);
  run.insertAdjacentElement('afterend',btn);

  // Refresh cached report after every QA run.
  run.addEventListener('click',()=>setTimeout(()=>{lastReport=parseResults()},1200));
}
window.kowDownloadLanguageQaReport=downloadReport;
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(install,500));
else setTimeout(install,300);
window.addEventListener('load',()=>setTimeout(install,900));
})();
