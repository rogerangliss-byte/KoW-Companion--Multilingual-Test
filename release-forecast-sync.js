/* KoW Companion v4.6.0 TEST — fully localized data-driven future forecast */
(()=>{
'use strict';
const $=id=>document.getElementById(id);
const lang=()=>window.KOW_CLEAN_I18N?.current?.()||document.getElementById('appLanguage')?.value||'en';
const fmt=n=>Math.max(0,Math.round(Number(n)||0)).toLocaleString();

const TXT={
en:{months:['October','January','April','July'],types:['Rally / Garrison','Infantry','Tanks','Tank Destroyers'],baseTypes:['Rally / Garrison','Infantry','Tanks','Tank Destroyers'],
 note:(label,g,b,sv,es,to,ts,src,bo,bs)=>`<b>${label}</b><br>Planning estimate using ${g}% growth per Officer release from the latest confirmed database release: <b>${src}</b> (${bo} ORV / ${bs} SRV). For ${b} badges and ${sv} Star value (${es} Exclusive Stars), plan for approximately <b>${to} ORV</b> and <b>${ts} SRV</b>. Forecast only — replace with confirmed costs when released.`,
 intro:(src,bo,bs)=>`Forecast future Officer costs from the established Officer-release sequence. The model uses the latest confirmed Officer Database release — <b>${src}</b> (${bo} ORV / ${bs} SRV) — and compounds the selected growth rate for each subsequent release.`},
fr:{months:['Octobre','Janvier','Avril','Juillet'],types:['Ralliement / Garnison','Infanterie','Chars','Chasseurs de chars'],baseTypes:['Ralliement / Garnison','Infanterie','Chars','Chasseurs de chars'],
 note:(label,g,b,sv,es,to,ts,src,bo,bs)=>`<b>${label}</b><br>Estimation de planification avec une hausse de ${g}% par sortie d’Officier à partir de la dernière sortie confirmée de la Base de données : <b>${src}</b> (${bo} ORV / ${bs} SRV). Pour ${b} Badges et ${sv} de valeur d’Étoiles (${es} Étoiles exclusives), prévoyez environ <b>${to} ORV</b> et <b>${ts} SRV</b>. Prévision uniquement — remplacez par les coûts confirmés lors de la sortie.`,
 intro:(src,bo,bs)=>`Prévision des coûts des futurs Officiers selon la séquence de sorties établie. Le modèle utilise la dernière sortie confirmée de la Base de données des Officiers — <b>${src}</b> (${bo} ORV / ${bs} SRV) — puis applique le taux de croissance choisi à chaque sortie suivante.`},
de:{months:['Oktober','Januar','April','Juli'],types:['Rallye / Garnison','Infanterie','Panzer','Panzerjäger'],baseTypes:['Rallye / Garnison','Infanterie','Panzer','Panzerjäger'],
 note:(label,g,b,sv,es,to,ts,src,bo,bs)=>`<b>${label}</b><br>Planungsschätzung mit ${g}% Wachstum je Offiziersveröffentlichung ab der neuesten bestätigten Datenbank-Veröffentlichung: <b>${src}</b> (${bo} ORV / ${bs} SRV). Für ${b} Abzeichen und ${sv} Sternwert (${es} Exklusivsterne) planen Sie ungefähr <b>${to} ORV</b> und <b>${ts} SRV</b> ein. Nur Prognose — bei Veröffentlichung durch bestätigte Kosten ersetzen.`,
 intro:(src,bo,bs)=>`Prognose zukünftiger Offizierskosten anhand der etablierten Veröffentlichungsfolge. Das Modell verwendet die neueste bestätigte Veröffentlichung der Offiziersdatenbank — <b>${src}</b> (${bo} ORV / ${bs} SRV) — und wendet die gewählte Wachstumsrate auf jede folgende Veröffentlichung an.`},
it:{months:['Ottobre','Gennaio','Aprile','Luglio'],types:['Rally / Guarnigione','Fanteria','Carri','Cacciacarri'],baseTypes:['Rally / Guarnigione','Fanteria','Carri','Cacciacarri'],
 note:(label,g,b,sv,es,to,ts,src,bo,bs)=>`<b>${label}</b><br>Stima di pianificazione con crescita del ${g}% per ogni uscita Ufficiale a partire dall’ultima uscita confermata nella Banca dati: <b>${src}</b> (${bo} ORV / ${bs} SRV). Per ${b} Badge e ${sv} di valore Stelle (${es} Stelle esclusive), pianifica circa <b>${to} ORV</b> e <b>${ts} SRV</b>. Solo previsione — sostituire con i costi confermati quando disponibili.`,
 intro:(src,bo,bs)=>`Previsione dei costi dei futuri Ufficiali in base alla sequenza di uscita stabilita. Il modello usa l’ultima uscita confermata nella Banca dati Ufficiali — <b>${src}</b> (${bo} ORV / ${bs} SRV) — e applica il tasso di crescita selezionato a ogni uscita successiva.`}
};
const SLOT={1:'rally',2:'infantry',3:'tank',4:'td'};
function seasonNumber(s){const m=String(s||'').trim().match(/^S(\d+)$/i);return m?Number(m[1]):0}
function releaseSlot(o){const r=String(o?.role||o?.notes||'').toLowerCase();if(r.includes('garrison')||r.includes('rally'))return 1;if(r.includes('infantry'))return 2;if(r.includes('tank destroyer'))return 4;if(r.includes('tank'))return 3;return 0}
function localSource(season,slot){const t=TXT[lang()]||TXT.en;return `S${season} ${t.baseTypes[slot-1]}`}
function latestKnownRelease(){
 if(typeof officers==='undefined'||!Array.isArray(officers))return {season:7,slot:4,orv:600,srv:300};
 const rows=officers.filter(o=>seasonNumber(o.season)>0).filter(o=>String(o.rarity||'Legendary')==='Legendary').map(o=>({o,season:seasonNumber(o.season),slot:releaseSlot(o)})).filter(x=>x.slot>0&&Number(x.o.orv)>0&&Number(x.o.srv)>0);
 if(!rows.length)return {season:7,slot:4,orv:600,srv:300};
 const maxSeason=Math.max(...rows.map(x=>x.season)),seasonRows=rows.filter(x=>x.season===maxSeason),maxSlot=Math.max(...seasonRows.map(x=>x.slot)),latest=seasonRows.filter(x=>x.slot===maxSlot);
 return {season:maxSeason,slot:maxSlot,orv:Math.max(...latest.map(x=>Number(x.o.orv)||0)),srv:Math.max(...latest.map(x=>Number(x.o.srv)||0))};
}
function advance(season,slot,steps){let s=season,sl=slot;for(let i=0;i<steps;i++){sl++;if(sl>4){sl=1;s++}}return {season:s,slot:sl}}
function rebuild(base){
 const sel=$('forecastRelease');if(!sel)return;const old=Math.max(0,sel.selectedIndex),t=TXT[lang()]||TXT.en;sel.innerHTML='';
 for(let d=1;d<=4;d++){const r=advance(base.season,base.slot,d),o=document.createElement('option');o.value=String(d);o.dataset.season=r.season;o.dataset.slot=r.slot;o.textContent=`${t.months[r.slot-1]} — S${r.season} ${t.types[r.slot-1]}`;sel.appendChild(o)}
 sel.selectedIndex=Math.min(old,sel.options.length-1);
}
function update(){
 const sel=$('forecastRelease');if(!sel)return;const base=latestKnownRelease(),t=TXT[lang()]||TXT.en;
 rebuild(base);
 const d=Math.max(1,Number(sel.value)||1),growth=Math.max(0,Number($('forecastGrowth')?.value||20))/100,badges=Math.max(0,Number($('forecastBadges')?.value||0)),sv=Math.max(0,Number($('forecastStarValue')?.value||0));
 const orv=Math.round(base.orv*Math.pow(1+growth,d)),srv=Math.round(base.srv*Math.pow(1+growth,d)),es=Math.ceil(sv/110),to=badges*orv,ts=es*srv;
 if($('forecastOrvPerBadge'))$('forecastOrvPerBadge').textContent=fmt(orv);
 if($('forecastSrvPerStar'))$('forecastSrvPerStar').textContent=fmt(srv);
 if($('forecastTotalOrv'))$('forecastTotalOrv').textContent=fmt(to);
 if($('forecastTotalSrv'))$('forecastTotalSrv').textContent=fmt(ts);
 const label=sel.options[sel.selectedIndex]?.textContent||'',src=localSource(base.season,base.slot);
 if($('forecastNote'))$('forecastNote').innerHTML=t.note(label,String($('forecastGrowth')?.value||20),fmt(badges),fmt(sv),fmt(es),fmt(to),fmt(ts),src,fmt(base.orv),fmt(base.srv));
 const intro=$('futureOfficerForecastCard')?.querySelector('p.muted');if(intro)intro.innerHTML=t.intro(src,fmt(base.orv),fmt(base.srv));
}
function install(){['forecastRelease','forecastGrowth','forecastBadges','forecastStarValue','appLanguage'].forEach(id=>{const e=$(id);if(e&&!e.dataset.kowLocForecast){e.dataset.kowLocForecast='1';e.addEventListener('input',()=>setTimeout(update,0));e.addEventListener('change',()=>setTimeout(update,0))}});update()}
window.kowRefreshDynamicReleaseForecast=update;
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(install,200));else setTimeout(install,0);
window.addEventListener('load',()=>setTimeout(install,600));
})();
