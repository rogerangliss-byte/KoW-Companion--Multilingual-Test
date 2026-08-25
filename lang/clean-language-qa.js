/* v4.6.0 read-only Language QA */
(function(){
'use strict';
const labels={
en:['Language QA / Translation Test','Run Full Language QA','PASS','FAIL','Missing','Still English','v4.6.0 features','Popup translations'],
fr:['QA linguistique / Test de traduction','Lancer le QA complet','RÉUSSI','ÉCHEC','Manquant','Toujours en anglais','Fonctions v4.6.0','Traductions des fenêtres'],
de:['Sprach-QA / Übersetzungstest','Vollständige Sprach-QA starten','BESTANDEN','FEHLER','Fehlend','Noch Englisch','v4.6.0-Funktionen','Pop-up-Übersetzungen'],
it:['QA lingua / Test traduzione','Esegui QA completo lingua','SUPERATO','NON SUPERATO','Mancante','Ancora in inglese','Funzioni v4.6.0','Traduzioni pop-up']};
const names={en:'English',fr:'Français',de:'Deutsch',it:'Italiano'};
const req=['Upgrade Targets & Recommendations','Target Level','Target Stars','Target Training','Calculate Target Recommendation','Global Officer Data:','Data version:','Officers:','Published:','Resource requirement to target','Inventory is read for comparison only; nothing is spent or changed.','Forecast future Officer costs from the established Officer-release sequence.','latest confirmed database release','Forecast only — replace with confirmed costs when released.'];
const pops=['Backup restored successfully. Officer profiles, Officer Badges Held and shared resources have been imported. The app will reload now.','Enter a plan name.','Plan saved.','Saved plan deleted.','Fix validation issues first.','Officer database saved.','CSV validation failed.','CSV imported.','Restore default officer database?','Appearance and backgrounds restored to defaults.','Reset Central Inventory?','S7 Julia progress saved.','S7 Julia is now saved as MAXED.','Reset saved progress for S7 Julia? Shared resources will not be changed.'];
const ignore=/^(ORV|SRV|XP|MAX|TEST|CSV|JSON|KoW|S[2-9]|v?\d+(?:\.\d+)+|\d+|[★⭐\s\d.,:%+\-–—/()]+)$/i;
function cur(){return window.KOW_CLEAN_I18N?.current?.()||'en'}
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function audit(code,keys,dict){
 if(code==='en')return {m:[],s:[],f:[],p:[]};
 let m=[],s=[];
 keys.forEach(k=>{let t=String(k).trim();if(!t||ignore.test(t))return;if(!(k in dict))m.push(k);else if(String(dict[k]).trim()===t)s.push(k)});
 let f=req.filter(k=>!(k in dict)||String(dict[k]).trim()===k),p=[];
 const tr=window.kowPopupTranslate,api=window.KOW_CLEAN_I18N,old=api.current();
 if(typeof tr!=='function')p=['Popup translator not loaded'];
 else{try{api.setLanguage(code);p=pops.filter(x=>String(tr(x)||'').trim()===x.trim())}finally{api.setLanguage(old)}}
 return {m,s,f,p};
}
function det(title,a){return a.length?`<details><summary>${esc(title)} (${a.length})</summary><div style="max-height:220px;overflow:auto;font-size:.78rem">${a.slice(0,150).map(x=>`<div>${esc(x)}</div>`).join('')}</div></details>`:''}
function run(){
 const api=window.KOW_CLEAN_I18N,out=document.getElementById('v460QaResults');if(!api||!out)return;
 const keys=api.getCanonicalKeys(),ds=api.getDictionaries(),L=labels[cur()]||labels.en;
 let h=`<div class="notice">Canonical English keys: <b>${keys.length}</b></div>`;
 ['en','fr','de','it'].forEach(c=>{let a=audit(c,keys,ds[c]||{}),ok=!a.m.length&&!a.s.length&&!a.f.length&&!a.p.length;
 h+=`<div style="margin:10px 0;padding:12px;border:1px solid rgba(255,255,255,.12);border-radius:10px;background:rgba(0,0,0,.25)"><div style="display:flex;justify-content:space-between"><b>${names[c]}</b><strong style="color:${ok?'#9ee493':'#ff9d86'}">${ok?L[2]:L[3]}</strong></div>`;
 if(c!=='en'){h+=`<div>${L[4]}: <b>${a.m.length}</b> · ${L[5]}: <b>${a.s.length}</b> · ${L[6]}: <b>${a.f.length}</b> · ${L[7]}: <b>${a.p.length}</b></div>${det(L[4],a.m)}${det(L[5],a.s)}${det(L[6],a.f)}${det(L[7],a.p)}`}h+='</div>'});
 out.innerHTML=h;
}
function inject(){
 if(document.getElementById('v460QaCard'))return;let s=document.getElementById('settings');if(!s)return;
 let L=labels[cur()]||labels.en,d=document.createElement('div');d.id='v460QaCard';d.className='card wide';d.style.marginTop='12px';
 d.innerHTML=`<h2>🧪 ${L[0]}</h2><p class="notice">v4.6.0 read-only audit: dictionaries, new feature text and browser pop-ups. Saved app data is not changed.</p><button id="v460QaRun" class="app-action-primary" type="button">${L[1]}</button><div id="v460QaResults"></div>`;
 s.appendChild(d);document.getElementById('v460QaRun').addEventListener('click',run);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',inject);else inject();
})();