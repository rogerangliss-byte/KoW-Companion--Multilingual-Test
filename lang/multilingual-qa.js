(function(){'use strict';
const $=id=>document.getElementById(id),K='kow-language-v460';
const views=['dashboard','progress','officer','stars','development','xp','planner','database','help','releases','inventory','settings'];
const features=['officerReadinessCard','officerReadinessGrid','inventoryIntelligenceCard','smartDashboardCard','v460UpgradeTargetsCard','futureOfficerForecastCard','releaseCalendar','multiPlannerCard','quickProgressModal'];
const controls=['saveInventory','openUserGuide','officerSelect','starLevel','officerLevel','trainingLevel'];
const guideMinimum={fr:22,de:22,it:22};
const englishBleed=['Officer Readiness Intelligence','Upgrade Targets & Recommendations','Calculate Target Recommendation','Forecast future Officer costs','Current month:','Next scheduled release:','Open Inventory','Open Officer Progress','Save Inventory','Central Inventory','Officer Development','Backup & Restore','User Guide'];
const labels={en:['Full App QA / Functionality Parity','Run ENTIRE APP QA','PASS','FAIL'],fr:['QA complète / Parité fonctionnelle','Lancer le QA de TOUTE L’APP','RÉUSSI','ÉCHEC'],de:['Vollständige App-QA / Funktionsparität','GESAMTE APP prüfen','BESTANDEN','FEHLER'],it:['QA completa / Parità funzionale','Esegui QA INTERA APP','SUPERATO','NON SUPERATO']};
function lang(){return localStorage.getItem(K)||'en'}
function run(){const x=lang(),q=labels[x]||labels.en,o=$('mlQaResults');
 const missingViews=views.filter(id=>!$(id)); const missingFeatures=features.filter(id=>!$(id)); const missingControls=controls.filter(id=>!$(id));
 const guide=$('help'); const guideText=guide?.innerText||''; const guideHeadings=guide?guide.querySelectorAll('h2,h3,h4').length:0;
 const guideOk=x==='en'||(guideText.length>6500&&guideHeadings>=guideMinimum[x]&&!guideText.includes('**'));
 const body=document.body.innerText||''; const bleed=x==='en'?[]:englishBleed.filter(s=>body.includes(s));
 const banner=!!$('multilingualTestBanner')&&($('multilingualTestBanner').innerText||'').includes('NOT LIVE');
 const officerRows=document.querySelectorAll('.inv-officer-badge-row').length; const portraitsExpected=officerRows>=60;
 const navCount=document.querySelectorAll('.bottom-nav button, nav button').length; const navigationOk=navCount>=12;
 const tests=[['All 12 app sections',!missingViews.length,missingViews],['v4.6.0 feature parity',!missingFeatures.length,missingFeatures],['Critical controls',!missingControls.length,missingControls],['Full translated User Guide',guideOk,[`length ${guideText.length}, headings ${guideHeadings}`]],['Rendered English bleed',!bleed.length,bleed],['TEST safety banner',banner,[]],['Officer/Inventory dataset',portraitsExpected,[`${officerRows} Officer rows`]],['12-tab navigation',navigationOk,[`${navCount} navigation buttons`]]];
 const ok=tests.every(t=>t[1]); o.innerHTML='<div class="notice"><b>'+(ok?q[2]:q[3])+' — ENTIRE APP QA</b></div>'+tests.map(t=>'<div><b>'+(t[1]?'✅ ':'❌ ')+t[0]+':</b> '+(t[1]?q[2]:(t[2].join(' · ')||q[3]))+'</div>').join('')+'<div class="notice"><b>Scope:</b> Dashboard, Progress, Officer, Stars, Development, XP, Planner, Database, Help, Releases, Inventory, Settings; v4.6.0 feature cards; critical controls; translated full guide; visible English bleed; TEST banner; Officer dataset; navigation. Functional actions still require the manual QA checklist after this automated structural/render test.</div>';
}
function init(){let s=$('settings');if(!s||$('mlQaCard'))return;let q=labels[lang()]||labels.en,c=document.createElement('article');c.id='mlQaCard';c.className='card wide';c.innerHTML='<h2>🧪 '+q[0]+'</h2><p class="notice">QA3 audits the ENTIRE rendered app plus English Live v4.6.0 feature parity and full translated User Guide coverage. PASS is blocked by missing app sections, core v4.6.0 features, critical controls, guide coverage, visible English bleed or missing TEST safeguards.</p><button id="mlQaRun" class="app-action-primary">'+q[1]+'</button><div id="mlQaResults"></div>';s.appendChild(c);$('mlQaRun').onclick=run}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,700));else setTimeout(init,500)})();