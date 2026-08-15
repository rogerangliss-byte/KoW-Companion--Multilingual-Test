/* KoW Companion v4.4.0 TEST — canonical multilingual runtime + QA integration.
   One active v4.4 language runtime: translates dynamic UI text from the maintained
   dictionaries and renders Help / What's New from v440-release-sync.js. */
(function(){
'use strict';
const LANGS=['en','fr','de','it'];
const QA={
 en:{title:'🌐 Language QA',target:'Target language',scope:'Test scope',full:'Full app',run:'Run Language Test',download:'Download Language Test Report',none:'No language test has been run yet.',pass:'PASS',fail:'FAIL',v440:'v4.4.0 additions',coverage:'Translation coverage',help:'Help / release notes',version:'Version / TEST identification'},
 fr:{title:'🌐 QA de langue',target:'Langue cible',scope:'Portée du test',full:'Application complète',run:'Exécuter le test de langue',download:'Télécharger le rapport de test de langue',none:'Aucun test de langue n’a encore été exécuté.',pass:'RÉUSSI',fail:'ÉCHEC',v440:'Ajouts v4.4.0',coverage:'Couverture des traductions',help:'Aide / notes de version',version:'Version / identification TEST'},
 de:{title:'🌐 Sprach-QA',target:'Zielsprache',scope:'Testumfang',full:'Gesamte App',run:'Sprachtest ausführen',download:'Sprachtestbericht herunterladen',none:'Es wurde noch kein Sprachtest ausgeführt.',pass:'BESTANDEN',fail:'FEHLER',v440:'v4.4.0-Erweiterungen',coverage:'Übersetzungsabdeckung',help:'Hilfe / Versionshinweise',version:'Version / TEST-Kennzeichnung'},
 it:{title:'🌐 QA lingua',target:'Lingua di destinazione',scope:'Ambito del test',full:'App completa',run:'Esegui test lingua',download:'Scarica rapporto test lingua',none:'Non è stato ancora eseguito alcun test lingua.',pass:'SUPERATO',fail:'ERRORE',v440:'Aggiunte v4.4.0',coverage:'Copertura traduzioni',help:'Aiuto / note di rilascio',version:'Versione / identificazione TEST'}
};
const BACKUP={
 en:{exp:'Export App Backup',res:'Restore App Backup'},
 fr:{exp:'Exporter la sauvegarde de l’application',res:'Restaurer la sauvegarde de l’application'},
 de:{exp:'App-Sicherung exportieren',res:'App-Sicherung wiederherstellen'},
 it:{exp:'Esporta backup app',res:'Ripristina backup app'}
};
let busy=false,observer=null;
function lang(){
 const raw=(document.getElementById('appLanguage')?.value||localStorage.getItem('kow_language')||localStorage.getItem('appLanguage')||document.documentElement.lang||'en').slice(0,2).toLowerCase();
 return LANGS.includes(raw)?raw:'en';
}
function dict(l=lang()){
 return ({en:window.KOW_I18N_EN,fr:window.KOW_I18N_FR,de:window.KOW_I18N_DE,it:window.KOW_I18N_IT}[l])||{};
}
function helpHtml(l=lang()){return window['KOW_HELP_HTML_'+l.toUpperCase()]||'';}
function translateText(text,d){
 const raw=String(text||''),trim=raw.trim();
 if(!trim)return raw;
 if(d[trim]&&d[trim]!==trim)return raw.replace(trim,d[trim]);
 const m=trim.match(/^([⬇⬆↧↥]\s*)(.+)$/);
 if(m&&d[m[2]]&&d[m[2]]!==m[2])return raw.replace(trim,m[1]+d[m[2]]);
 return raw;
}
function translateTree(root=document.body){
 if(!root||busy||lang()==='en')return;
 const d=dict(); if(!Object.keys(d).length)return;
 busy=true;
 try{
   const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;
   while(n=w.nextNode()){
     const p=n.parentElement;if(!p||['SCRIPT','STYLE','NOSCRIPT','TEXTAREA'].includes(p.tagName)||p.closest('#helpLanguageBody'))continue;
     const t=translateText(n.nodeValue,d);if(t!==n.nodeValue)n.nodeValue=t;
   }
   root.querySelectorAll?.('[placeholder],[title],[aria-label]').forEach(el=>{
     for(const a of ['placeholder','title','aria-label'])if(el.hasAttribute(a)){const v=el.getAttribute(a),t=translateText(v,d);if(t!==v)el.setAttribute(a,t);}
   });
 }finally{busy=false;}
}
function translateBackupControls(){
 const l=lang(),t=BACKUP[l]||BACKUP.en;
 const exp=document.getElementById('backupAppData');
 if(exp) exp.textContent='⬇ '+t.exp;
 const res=document.getElementById('restoreAppDataLabel');
 if(res){
   const input=document.getElementById('restoreAppData');
   for(const node of [...res.childNodes]) if(node.nodeType===Node.TEXT_NODE) node.remove();
   res.insertBefore(document.createTextNode('⬆ '+t.res),res.firstChild);
   if(input&&!res.contains(input))res.appendChild(input);
 }
}
function renderHelp(){
 const box=document.getElementById('helpLanguageBody');if(!box)return;
 const l=lang(),html=helpHtml(l);if(!html)return;
 if(box.dataset.v440CanonicalLanguage===l&&box.innerHTML===html)return;
 box.innerHTML=html;
 box.dataset.v440CanonicalLanguage=l;
 box.dataset.guideLanguage=l;
 box.dataset.guideStatus='loaded';
 box.dataset.guideSource='v440-release-sync';
}
function translateQaLabels(){
 const l=lang(),d=QA[l],map={
  '🌐 Language QA':d.title,'Language QA':d.title.replace(/^🌐\s*/,''),'Target language':d.target,'Test scope':d.scope,'Full app':d.full,
  'Run Language Test':d.run,'Download Language Test Report':d.download,'No language test has been run yet.':d.none
 };
 const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
 while(n=w.nextNode()){if(['SCRIPT','STYLE','NOSCRIPT'].includes(n.parentElement?.tagName))continue;const s=n.nodeValue.trim();if(map[s])n.nodeValue=n.nodeValue.replace(s,map[s]);}
}
function checks(){
 const l=lang(),help=helpHtml(l),release=window.KOW_MULTILINGUAL_RELEASE||{},d=dict(l);
 return [
  {name:QA[l].v440,ok:!!document.getElementById('v440PlanningReadinessCard')},
  {name:QA[l].coverage,ok:l==='en'||Object.keys(d).length>0},
  {name:QA[l].help,ok:help.includes('v4.4.0 TEST')},
  {name:QA[l].version,ok:release.version==='4.4.0'&&release.channel==='TEST'}
 ];
}
function renderResult(){
 const host=document.getElementById('languageTestResult')||document.getElementById('translationAuditResult');if(!host)return;
 const l=lang(),rows=checks(),ok=rows.every(x=>x.ok);
 host.innerHTML='<b>'+(ok?QA[l].pass:QA[l].fail)+' — v4.4.0 TEST</b><br>'+rows.map(x=>(x.ok?'✓ ':'✗ ')+x.name).join('<br>');
 host.dataset.v440Qa=ok?'pass':'fail';
}
function applyAll(){
 document.documentElement.lang=lang();
 renderHelp();
 translateTree(document.body);
 translateBackupControls();
 translateQaLabels();
}
function startObserver(){
 if(observer)observer.disconnect();
 observer=new MutationObserver(muts=>{
   if(busy)return;
   let touched=false;
   for(const m of muts){
     if(m.type==='childList'&&m.addedNodes.length){
       touched=true;
       m.addedNodes.forEach(n=>{if(n.nodeType===1)translateTree(n);else if(n.parentElement)translateTree(n.parentElement);});
     }
   }
   if(touched)translateBackupControls();
 });
 observer.observe(document.body,{subtree:true,childList:true});
}
document.addEventListener('DOMContentLoaded',()=>{applyAll();startObserver();setTimeout(applyAll,150);setTimeout(applyAll,500);});
document.addEventListener('change',e=>{if(e.target?.id==='appLanguage'){setTimeout(applyAll,40);setTimeout(applyAll,200);}},true);
document.addEventListener('click',e=>{
 if(e.target?.id==='runLanguageTest'||e.target?.id==='runTranslationAudit'||e.target?.id==='runLanguageQa')setTimeout(()=>{applyAll();renderResult();},120);
 if(e.target?.closest?.('[data-view="help"]'))setTimeout(renderHelp,50);
},true);
window.addEventListener('pageshow',()=>setTimeout(applyAll,50));
window.kowV440LanguageQA={apply:applyAll,checks,renderResult,renderHelp,translateTree,translateBackupControls,QA};
})();
