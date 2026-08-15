/* KoW Companion v4.4.0 TEST — read-only multilingual QA. */
(function(){
'use strict';
function dictionaries(){return window.KOW_CLEAN_I18N?.getDictionaries?.()||{en:window.KOW_I18N_EN||{},fr:window.KOW_I18N_FR||{},de:window.KOW_I18N_DE||{},it:window.KOW_I18N_IT||{}};}
function canonical(){return Array.from(window.KOW_CLEAN_I18N?.getCanonicalKeys?.()||[]);}
function missingFor(lang){
  if(lang==='en') return [];
  const d=dictionaries()[lang]||{};
  return canonical().filter(k=>k && !Object.prototype.hasOwnProperty.call(d,k));
}
function render(){
  if(document.getElementById('cleanLanguageQaCard')) return;
  const settings=document.getElementById('settings');
  if(!settings) return;
  const card=document.createElement('div');
  card.id='cleanLanguageQaCard';
  card.className='card wide';
  card.style.marginTop='12px';
  card.innerHTML=`
    <h2>🧪 Language QA / Translation Test</h2>
    <p class="notice">Read-only v4.4.0 translation audit. It does not switch language or alter saved Officer/Inventory data.</p>
    <label for="cleanQaLanguage">Language to test</label>
    <select id="cleanQaLanguage">
      <option value="all">All Languages</option>
      <option value="en">English</option>
      <option value="fr">Français</option>
      <option value="de">Deutsch</option>
      <option value="it">Italiano</option>
    </select>
    <button id="cleanQaRun" class="primary" type="button">▶ Run Full Language QA</button>
    <div id="cleanQaResult" class="notice">No language test has been run yet.</div>`;
  settings.appendChild(card);
  document.getElementById('cleanQaRun').addEventListener('click',()=>{
    const choice=document.getElementById('cleanQaLanguage').value;
    const langs=choice==='all'?['en','fr','de','it']:[choice];
    const names={en:'English',fr:'French',de:'German',it:'Italian'};
    const rows=langs.map(l=>{
      const miss=missingFor(l);
      const status=miss.length?'WARNING':'PASS';
      const detail=miss.length?`<details><summary>${miss.length} missing keys</summary><div style="white-space:pre-wrap;margin-top:8px">${miss.slice(0,100).map(x=>'• '+x).join('\n')}</div></details>`:'No missing keys detected.';
      return `<div style="margin:10px 0"><b>${names[l]} — ${status}</b><div>${detail}</div></div>`;
    }).join('');
    document.getElementById('cleanQaResult').innerHTML=rows;
  });
}
document.addEventListener('DOMContentLoaded',()=>setTimeout(render,0));
window.addEventListener('load',render);
if(document.readyState!=='loading')setTimeout(render,0);
})();
