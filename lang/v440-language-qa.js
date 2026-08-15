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
const QA_PANEL={
 en:{heading:'🧪 Language QA / Translation Test',intro:'Run a translation audit against the current v4.4.0 interface. This diagnostic does not change Officer or Inventory data.',language:'Language to test',all:'All Languages',scope:'Test scope',full:'Full app',run:'▶ Run Language Test',download:'⬇ Download Language Test Report',none:'No language test has been run yet.'},
 fr:{heading:'🧪 QA de langue / Test de traduction',intro:'Exécutez un audit de traduction sur l’interface v4.4.0 actuelle. Ce diagnostic ne modifie pas les données des Officiers ni de l’Inventaire.',language:'Langue à tester',all:'Toutes les langues',scope:'Portée du test',full:'Application complète',run:'▶ Exécuter le test de langue',download:'⬇ Télécharger le rapport de test de langue',none:'Aucun test de langue n’a encore été exécuté.'},
 de:{heading:'🧪 Sprach-QA / Übersetzungstest',intro:'Führe eine Übersetzungsprüfung der aktuellen v4.4.0-Oberfläche aus. Diese Diagnose ändert keine Offiziers- oder Inventardaten.',language:'Zu testende Sprache',all:'Alle Sprachen',scope:'Testumfang',full:'Gesamte App',run:'▶ Sprachtest ausführen',download:'⬇ Sprachtestbericht herunterladen',none:'Es wurde noch kein Sprachtest ausgeführt.'},
 it:{heading:'🧪 QA lingua / Test di traduzione',intro:'Esegui un controllo delle traduzioni sull’interfaccia v4.4.0 corrente. Questa diagnostica non modifica i dati degli Ufficiali o dell’Inventario.',language:'Lingua da testare',all:'Tutte le lingue',scope:'Ambito del test',full:'App completa',run:'▶ Esegui test lingua',download:'⬇ Scarica rapporto test lingua',none:'Non è stato ancora eseguito alcun test lingua.'}
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
function sanitiseRepeatedCharacters(root=document.body){
 if(!root)return;
 const process=node=>{
   if(!node||node.nodeType!==Node.TEXT_NODE||!node.parentElement)return;
   if(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA','PRE','CODE'].includes(node.parentElement.tagName))return;
   const raw=node.nodeValue||'';
   let clean=raw;
   /* Legacy v4.3.58 Italian substring translation used Original -> Originale.
      Because "Originale/Originali" still begins with "Original", its MutationObserver
      repeatedly reapplied the replacement and produced Originaleeee....  Normalise the
      rendered Italian word to lower-case so that old case-sensitive rule can no longer
      match it, then apply the generic corruption guard. */
   if(lang()==='it'){
     clean=clean
       .replace(/\bOriginale+i\b/g,'originali')
       .replace(/\bOriginali\b/g,'originali')
       .replace(/\bOriginale+\b/g,'originale')
       .replace(/\bOriginal\b/g,'originale');
   }
   clean=clean.replace(/([A-Za-zÀ-ÿ])\1{7,}/g,'$1');
   if(clean!==raw)node.nodeValue=clean;
 };
 if(root.nodeType===Node.TEXT_NODE){process(root);return;}
 const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;
 while(n=w.nextNode())process(n);
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
 const expText='⬇ '+t.exp;
 if(exp&&exp.textContent!==expText) exp.textContent=expText;
 const res=document.getElementById('restoreAppDataLabel');
 if(res){
   const input=document.getElementById('restoreAppData');
   const resText='⬆ '+t.res;
   const textNodes=[...res.childNodes].filter(node=>node.nodeType===Node.TEXT_NODE);
   const current=textNodes.map(node=>node.nodeValue||'').join('').trim();
   if(current!==resText){
     textNodes.forEach(node=>node.remove());
     res.insertBefore(document.createTextNode(resText),res.firstChild);
   }
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
function translateQaPanel(){
 const card=document.getElementById('languageQaCard');if(!card)return;
 const t=QA_PANEL[lang()]||QA_PANEL.en;
 const h=card.querySelector('h2');if(h)h.textContent=t.heading;
 const intro=card.querySelector('p.muted');if(intro)intro.textContent=t.intro;
 const labels=card.querySelectorAll('label');
 if(labels[0])labels[0].textContent=t.language;
 if(labels[1])labels[1].textContent=t.scope;
 const target=document.getElementById('languageQaTarget');
 if(target?.options?.length)target.options[0].textContent=t.all;
 const scope=document.getElementById('languageQaScope');
 if(scope?.options?.length)scope.options[0].textContent=t.full;
 const run=document.getElementById('runLanguageQa');if(run)run.textContent=t.run;
 const dl=document.getElementById('downloadLanguageQa');if(dl)dl.textContent=t.download;
 const results=document.getElementById('languageQaResults');
 if(results&&(!results.dataset.hasRun||/No language test|Aucun test|Es wurde noch kein|Non è stato ancora/i.test(results.textContent||'')))results.textContent=t.none;
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
 sanitiseRepeatedCharacters(document.body);
 translateTree(document.body);
 sanitiseRepeatedCharacters(document.body);
 translateBackupControls();
 translateQaPanel();
 translateQaLabels();
 sanitiseRepeatedCharacters(document.body);
}
function startObserver(){
 if(observer)observer.disconnect();
 observer=new MutationObserver(muts=>{
   if(busy)return;
   let touched=false,backupTouched=false,qaTouched=false;
   for(const m of muts){
     const target=m.target?.nodeType===3?m.target.parentElement:m.target;
     if(target?.closest?.('#backupActions')) backupTouched=true;
     if(target?.closest?.('#languageQaCard')) qaTouched=true;
     if(m.type==='childList'&&m.addedNodes.length){
       touched=true;
       m.addedNodes.forEach(n=>{
         sanitiseRepeatedCharacters(n);
         if(n.nodeType===1)translateTree(n);else if(n.parentElement)translateTree(n.parentElement);
       });
     }
     if(m.type==='characterData')sanitiseRepeatedCharacters(m.target);
   }
   if(touched||backupTouched)translateBackupControls();
   if(touched||qaTouched)translateQaPanel();
 });
 observer.observe(document.body,{subtree:true,childList:true,characterData:true});
}
document.addEventListener('DOMContentLoaded',()=>{applyAll();startObserver();setTimeout(applyAll,150);setTimeout(applyAll,500);setTimeout(applyAll,900);});
document.addEventListener('change',e=>{if(e.target?.id==='appLanguage'){[40,120,240,360,500,800].forEach(ms=>setTimeout(applyAll,ms));}},true);
document.addEventListener('click',e=>{
 if(e.target?.id==='runLanguageTest'||e.target?.id==='runTranslationAudit'||e.target?.id==='runLanguageQa')setTimeout(()=>{applyAll();renderResult();},120);
 if(e.target?.closest?.('[data-view="help"]'))setTimeout(renderHelp,50);
},true);
window.addEventListener('pageshow',()=>setTimeout(applyAll,50));
window.kowV440LanguageQA={apply:applyAll,checks,renderResult,renderHelp,translateTree,translateBackupControls,translateQaPanel,sanitiseRepeatedCharacters,QA};
})();