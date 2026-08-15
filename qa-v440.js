(function(){
'use strict';
function collect(root){
  const out=[]; if(!root) return out;
  const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT); let n;
  while(n=w.nextNode()){
    if(['SCRIPT','STYLE'].includes(n.parentElement?.tagName)) continue;
    const s=(n.nodeValue||'').replace(/\s+/g,' ').trim();
    if(s.length>=3) out.push(s);
  }
  return [...new Set(out)];
}
function currentScopeRoot(){
  const scope=document.getElementById('languageQaScope')?.value||'full';
  if(scope==='home') return document.getElementById('home');
  if(scope==='planner') return document.getElementById('planner');
  if(scope==='releases') return document.getElementById('releases');
  if(scope==='help') return document.getElementById('help');
  return document.querySelector('main')||document.body;
}
function integrity(strings,lang){
  const issues=[];
  const joined=strings.join(' | ');
  if(/v4\.3\.58|v4\.3\.59/.test(joined)) issues.push('Stale documentation/version text detected (v4.3.58/v4.3.59)');
  const rep=joined.match(/([A-Za-zÀ-ÿ])\1{19,}/);
  if(rep) issues.push('Probable corrupted repeated-character text: '+rep[0].slice(0,32)+'…');
  if(/[�]|Ã.|Â./.test(joined)) issues.push('Probable character-encoding corruption detected');
  if(lang!=='en'){
    const bleed=['with saved Officer analysis','using recurring','selection for','filtering for','Combined Season + Type reports','Focused future-session reports','for one or two future Legendary Officers','Inventory-aware readiness','Top 10 compact results','enter and save the resources you currently hold','review the recurring release schedule','run Advanced Multi-Officer Planning'];
    const hits=bleed.filter(x=>joined.toLowerCase().includes(x.toLowerCase()));
    if(hits.length) issues.push('Residual English content: '+hits.slice(0,5).join(' | '));
  }
  return issues;
}
function evaluate(){
  const lang=document.getElementById('appLanguage')?.value||document.documentElement.lang?.slice(0,2)||'en';
  const issues=integrity(collect(currentScopeRoot()),lang);
  let box=document.getElementById('v440QaInterpretation');
  const host=document.getElementById('languageQaResults')?.parentElement;
  if(!host) return;
  if(!box){box=document.createElement('div');box.id='v440QaInterpretation';box.className='notice';host.appendChild(box)}
  if(issues.length){
    box.innerHTML='<b>v4.4.0 Content Integrity — WARNING</b><br>'+issues.join('<br>');
    const summary=document.getElementById('languageQaSummary');
    if(summary && /^\s*PASS\b/i.test(summary.textContent||'')) summary.innerHTML='<b>WARNING</b> — Translation keys passed, but content-integrity issues were detected. See details below.';
  }else{
    box.innerHTML='<b>v4.4.0 Content Integrity — PASS</b><br>No stale version text, obvious corruption, or known residual-English documentation patterns detected in the selected scope.';
  }
}
document.addEventListener('click',e=>{if(e.target?.id==='runLanguageQa') setTimeout(evaluate,900)});
window.addEventListener('DOMContentLoaded',()=>{
  const intro=[...document.querySelectorAll('#languageQaCard p,#settings p')].find(x=>/translation audit against the current v4\.3\.59 interface/i.test(x.textContent||''));
  if(intro) intro.textContent='Run a translation and content-integrity audit against the current v4.4.0 interface. This diagnostic does not change Officer or Inventory data.';
});
window.kowV440QaIntegrity=evaluate;
})();
