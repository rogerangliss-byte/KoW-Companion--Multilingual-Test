/* KoW Companion v4.4.0 TEST — read-only multilingual QA, clean5. */
(function(){
'use strict';
const QA_VERSION='clean5';
function dictionaries(){return window.KOW_CLEAN_I18N?.getDictionaries?.()||{en:window.KOW_I18N_EN||{},fr:window.KOW_I18N_FR||{},de:window.KOW_I18N_DE||{},it:window.KOW_I18N_IT||{}};}
function canonical(){return Array.from(window.KOW_CLEAN_I18N?.getCanonicalKeys?.()||[]);}
function missingFor(lang){
  if(lang==='en') return [];
  const d=dictionaries()[lang]||{};
  return canonical().filter(k=>k && !Object.prototype.hasOwnProperty.call(d,k));
}
function qaData(choice='all'){
  const langs=choice==='all'?['en','fr','de','it']:[choice];
  const names={en:'English',fr:'French',de:'German',it:'Italian'};
  return langs.map(l=>{
    const missing=missingFor(l);
    return {lang:l,name:names[l],status:missing.length?'WARNING':'PASS',missing};
  });
}
function buildReport(choice='all'){
  const rows=qaData(choice);
  const now=new Date();
  const lines=[
    'KoW Companion v4.4.0 TEST — Language QA Report',
    'Clean multilingual runtime / exact-key audit',
    'QA module: '+QA_VERSION,
    'Generated: '+now.toISOString(),
    '',
    'SUMMARY'
  ];
  rows.forEach(r=>lines.push(`${r.name}: ${r.status} — ${r.missing.length} missing keys`));
  rows.forEach(r=>{
    lines.push('',`=== ${r.name.toUpperCase()} — ${r.status} ===`);
    if(!r.missing.length){lines.push('No missing keys detected.');return;}
    lines.push(`Missing keys: ${r.missing.length}`,'');
    r.missing.forEach((k,i)=>lines.push(`${i+1}. ${k}`));
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
        const detail=r.missing.length?`<details><summary>${r.missing.length} missing keys</summary><div style="white-space:pre-wrap;margin-top:8px">${r.missing.slice(0,100).map(x=>'• '+x).join('\n')}</div></details>`:'No missing keys detected.';
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
      <p class="notice">Read-only v4.4.0 translation audit. It does not switch language or alter saved Officer/Inventory data.</p>
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
