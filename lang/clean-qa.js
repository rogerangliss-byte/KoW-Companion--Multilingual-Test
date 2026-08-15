/* KoW Companion v4.4.0 TEST — read-only multilingual QA, clean6. */
(function(){
'use strict';
const QA_VERSION='clean6';
function dictionaries(){return window.KOW_CLEAN_I18N?.getDictionaries?.()||{en:window.KOW_I18N_EN||{},fr:window.KOW_I18N_FR||{},de:window.KOW_I18N_DE||{},it:window.KOW_I18N_IT||{}};}
function canonical(){
  const en=dictionaries().en||{};
  return Object.keys(en).filter(Boolean).sort((a,b)=>a.localeCompare(b));
}
function missingFor(lang){
  if(lang==='en') return [];
  const d=dictionaries()[lang]||{};
  return canonical().filter(k=>!Object.prototype.hasOwnProperty.call(d,k));
}
function untranslatedFor(lang){
  if(lang==='en') return [];
  const d=dictionaries()[lang]||{};
  return canonical().filter(k=>Object.prototype.hasOwnProperty.call(d,k) && d[k]===k && /[A-Za-z]/.test(k) && !/^(XP|ORV|SRV|MAXED|IN PROGRESS|NOT STARTED|CURRENT|NEXT)$/.test(k));
}
function qaData(choice='all'){
  const langs=choice==='all'?['en','fr','de','it']:[choice];
  const names={en:'English',fr:'French',de:'German',it:'Italian'};
  return langs.map(l=>{
    const missing=missingFor(l);
    const untranslated=untranslatedFor(l);
    const issues=missing.concat(untranslated.map(k=>'[same as English] '+k));
    return {lang:l,name:names[l],status:issues.length?'WARNING':'PASS',missing,untranslated,issues};
  });
}
function buildReport(choice='all'){
  const rows=qaData(choice);
  const now=new Date();
  const lines=[
    'KoW Companion v4.4.0 TEST — Language QA Report',
    'Clean multilingual runtime / authoritative exact-key dictionary audit',
    'QA module: '+QA_VERSION,
    'Source contract: window.KOW_I18N_EN',
    'Generated: '+now.toISOString(),
    '',
    'SUMMARY'
  ];
  rows.forEach(r=>lines.push(`${r.name}: ${r.status} — ${r.issues.length} issues (${r.missing.length} missing, ${r.untranslated.length} same-as-English)`));
  rows.forEach(r=>{
    lines.push('',`=== ${r.name.toUpperCase()} — ${r.status} ===`);
    if(!r.issues.length){lines.push('No missing or same-as-English translation keys detected.');return;}
    if(r.missing.length){
      lines.push(`Missing keys: ${r.missing.length}`,'');
      r.missing.forEach((k,i)=>lines.push(`${i+1}. ${k}`));
    }
    if(r.untranslated.length){
      lines.push('',`Same-as-English values: ${r.untranslated.length}`,'');
      r.untranslated.forEach((k,i)=>lines.push(`${i+1}. ${k}`));
    }
  });
  return lines.join('\n');
}
function downloadReport(){
  const choice=document.getElementById('cleanQaLanguage')?.value||'all';
  const text=buildReport(choice);
  const blob=new Blob([text],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  const stamp=new Date().toISOString().replace(/[:.]/g,'-');
  a.href=url;
  a.download=`KoW-Language-QA-v4.4.0-${choice}-${stamp}.txt`;
  a.style.display='none';
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),2000);
}
function wire(card){
  const run=card.querySelector('#cleanQaRun');
  const dl=card.querySelector('#cleanQaDownload');
  if(run && !run.dataset.wired){
    run.dataset.wired='1';
    run.addEventListener('click',()=>{
      const choice=document.getElementById('cleanQaLanguage').value;
      const rows=qaData(choice).map(r=>{
        const detail=r.issues.length?`<details><summary>${r.issues.length} issues</summary><div style="white-space:pre-wrap;margin-top:8px">${r.issues.slice(0,100).map(x=>'• '+x).join('\n')}</div></details>`:'No missing or same-as-English translation keys detected.';
        return `<div style="margin:10px 0"><b>${r.name} — ${r.status}</b><div>${detail}</div></div>`;
      }).join('');
      document.getElementById('cleanQaResult').innerHTML=rows;
    });
  }
  if(dl && !dl.dataset.wired){
    dl.dataset.wired='1';
    dl.addEventListener('click',downloadReport);
  }
}
function render(){
  const settings=document.getElementById('settings');
  if(!settings) return;
  let card=document.getElementById('cleanLanguageQaCard');
  if(!card){
    card=document.createElement('div');
    card.id='cleanLanguageQaCard';
    card.className='card wide';
    card.style.marginTop='12px';
    settings.appendChild(card);
  }
  if(card.dataset.qaVersion!==QA_VERSION || !card.querySelector('#cleanQaDownload')){
    card.dataset.qaVersion=QA_VERSION;
    card.innerHTML=`
      <h2>🧪 Language QA / Translation Test</h2>
      <p class="notice">Read-only v4.4.0 exact-key translation audit against the authoritative English language dictionary. Officer names, game data and generated numeric values are not treated as translation keys.</p>
      <div class="notice"><b>QA module ${QA_VERSION}</b></div>
      <label for="cleanQaLanguage">Language to test</label>
      <select id="cleanQaLanguage">
        <option value="all">All Languages</option>
        <option value="en">English</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="it">Italiano</option>
      </select>
      <button id="cleanQaRun" class="primary" type="button">▶ Run Full Language QA</button>
      <button id="cleanQaDownload" class="primary" type="button" style="margin-top:10px">⬇ Download Language QA Report</button>
      <div id="cleanQaResult" class="notice">No language test has been run yet.</div>`;
  }
  wire(card);
}
document.addEventListener('DOMContentLoaded',()=>setTimeout(render,0));
window.addEventListener('load',render);
if(document.readyState!=='loading')setTimeout(render,0);
window.KOW_CLEAN_QA={QA_VERSION,qaData,buildReport,downloadReport,render};
})();
