/* KoW Companion v4.4.0 TEST — clean language QA extension.
   Scope: v4.4.0 additions only. Existing multilingual baseline is left untouched. */
(function(){
'use strict';
const LANGS=['en','fr','de','it'];
const T={
 en:{title:'🌐 Language QA',target:'Target language',scope:'Test scope',full:'Full app',run:'Run Language Test',download:'Download Language Test Report',none:'No language test has been run yet.',pass:'PASS',fail:'FAIL',v440:'v4.4.0 additions',coverage:'Translation coverage',help:'Help / release notes',version:'Version / TEST identification'},
 fr:{title:'🌐 QA de langue',target:'Langue cible',scope:'Portée du test',full:'Application complète',run:'Exécuter le test de langue',download:'Télécharger le rapport de test de langue',none:'Aucun test de langue n’a encore été exécuté.',pass:'RÉUSSI',fail:'ÉCHEC',v440:'Ajouts v4.4.0',coverage:'Couverture des traductions',help:'Aide / notes de version',version:'Version / identification TEST'},
 de:{title:'🌐 Sprach-QA',target:'Zielsprache',scope:'Testumfang',full:'Gesamte App',run:'Sprachtest ausführen',download:'Sprachtestbericht herunterladen',none:'Es wurde noch kein Sprachtest ausgeführt.',pass:'BESTANDEN',fail:'FEHLER',v440:'v4.4.0-Erweiterungen',coverage:'Übersetzungsabdeckung',help:'Hilfe / Versionshinweise',version:'Version / TEST-Kennzeichnung'},
 it:{title:'🌐 QA lingua',target:'Lingua di destinazione',scope:'Ambito del test',full:'App completa',run:'Esegui test lingua',download:'Scarica rapporto test lingua',none:'Non è stato ancora eseguito alcun test lingua.',pass:'SUPERATO',fail:'ERRORE',v440:'Aggiunte v4.4.0',coverage:'Copertura traduzioni',help:'Aiuto / note di rilascio',version:'Versione / identificazione TEST'}
};
function lang(){const v=(document.getElementById('appLanguage')?.value||localStorage.getItem('kow_language')||document.documentElement.lang||'en').slice(0,2);return LANGS.includes(v)?v:'en';}
function txExact(root){const d=T[lang()];const map={
 '🌐 Language QA':d.title,'Language QA':d.title.replace(/^🌐\s*/,''),'Target language':d.target,'Test scope':d.scope,'Full app':d.full,
 'Run Language Test':d.run,'Download Language Test Report':d.download,'No language test has been run yet.':d.none
};
 const w=document.createTreeWalker(root||document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){if(['SCRIPT','STYLE','NOSCRIPT'].includes(n.parentElement?.tagName))continue;const s=n.nodeValue.trim();if(map[s])n.nodeValue=n.nodeValue.replace(s,map[s]);}
}
function checks(){const l=lang(),help=(window['KOW_HELP_HTML_'+l.toUpperCase()]||'');const release=window.KOW_MULTILINGUAL_RELEASE||{};return [
 {name:T[l].v440,ok:!!document.getElementById('v440PlanningReadinessCard')},
 {name:T[l].coverage,ok:!!T[l]&&Object.keys(T.en).every(k=>typeof T[l][k]==='string'&&T[l][k].trim())},
 {name:T[l].help,ok:help.includes('v4.4.0 TEST')},
 {name:T[l].version,ok:release.version==='4.4.0'&&release.channel==='TEST'}
];}
function renderResult(){const host=document.getElementById('languageTestResult')||document.getElementById('translationAuditResult');if(!host)return;const l=lang(),rows=checks(),ok=rows.every(x=>x.ok);host.innerHTML='<b>'+ (ok?T[l].pass:T[l].fail) +' — v4.4.0 TEST</b><br>'+rows.map(x=>(x.ok?'✓ ':'✗ ')+x.name).join('<br>');host.dataset.v440Qa=ok?'pass':'fail';}
function apply(){txExact(document.body);}
document.addEventListener('DOMContentLoaded',()=>{setTimeout(apply,250);});
document.addEventListener('change',e=>{if(e.target?.id==='appLanguage'){setTimeout(apply,120);setTimeout(apply,320);}},true);
document.addEventListener('click',e=>{if(e.target?.id==='runLanguageTest'||e.target?.id==='runTranslationAudit'){setTimeout(()=>{apply();renderResult();},50);}},true);
window.kowV440LanguageQA={apply,checks,renderResult,T};
})();
