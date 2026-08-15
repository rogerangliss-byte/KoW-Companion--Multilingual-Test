/* KoW Companion v4.4.0 TEST — clean multilingual runtime.
   Canonical DOM is English on every page load. Language changes reload the page,
   then one exact-key translation pass is applied. No substring translation.
   IMPORTANT: v4.4.0 uses its own language key only. Legacy language keys are
   removed so older translation engines cannot wake up and recursively mutate text. */
(function(){
'use strict';
const KEY='kow_language_clean_v440';
const LANGS=['en','fr','de','it'];
const LEGACY_KEYS=[
 'kow_language','appLanguage','kowLanguage','kow_lang','kowLang','language','selectedLanguage',
 'kow_language_v4357','kow_language_v440','kow_i18n_language'
];
const canonical=new Set();
const dicts=()=>({en:window.KOW_I18N_EN||{},fr:window.KOW_I18N_FR||{},de:window.KOW_I18N_DE||{},it:window.KOW_I18N_IT||{}});
const normalise=v=>LANGS.includes(String(v||'').slice(0,2).toLowerCase())?String(v).slice(0,2).toLowerCase():'en';
const current=()=>normalise(localStorage.getItem(KEY)||'en');
let applying=false;
function purgeLegacyLanguageState(){
 LEGACY_KEYS.forEach(k=>{try{localStorage.removeItem(k);}catch(_){}});
 try{
  Object.keys(sessionStorage).filter(k=>/lang|i18n/i.test(k) && k!==KEY).forEach(k=>sessionStorage.removeItem(k));
 }catch(_){}
}
function keyFromRaw(raw){
 const t=String(raw??'').trim(); if(!t)return '';
 const m=t.match(/^([\u{1F300}-\u{1FAFF}\u2600-\u27BF⬇⬆★⭐📦📊👤🏅📘🎯📋📅⚙️📖🧭🧠🔮]+\s*)(.+)$/u);
 return (m?m[2]:t).trim();
}
function capture(raw){
 const k=keyFromRaw(raw);
 if(k && /[A-Za-zÀ-ÿ]/.test(k))canonical.add(k);
 return k;
}
function exact(raw,d){
 const s=String(raw??''), t=s.trim(); if(!t)return s;
 if(Object.prototype.hasOwnProperty.call(d,t) && d[t]!==t)return s.replace(t,d[t]);
 const m=t.match(/^([\u{1F300}-\u{1FAFF}\u2600-\u27BF⬇⬆★⭐📦📊👤🏅📘🎯📋📅⚙️📖🧭🧠🔮]+\s*)(.+)$/u);
 if(m && Object.prototype.hasOwnProperty.call(d,m[2]) && d[m[2]]!==m[2])return s.replace(t,m[1]+d[m[2]]);
 return s;
}
function translateNode(root=document.body){
 if(!root)return;
 const l=current(),d=dicts()[l]||{};
 if(applying)return;
 applying=true;
 try{
  const process=n=>{
   if(!n||n.nodeType!==Node.TEXT_NODE||!n.parentElement)return;
   if(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA','CODE','PRE'].includes(n.parentElement.tagName))return;
   capture(n.nodeValue);
   if(l==='en'||!Object.keys(d).length)return;
   const v=exact(n.nodeValue,d); if(v!==n.nodeValue)n.nodeValue=v;
  };
  if(root.nodeType===Node.TEXT_NODE)process(root);
  else{
   const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode())process(n);
   root.querySelectorAll?.('[placeholder],[title],[aria-label]').forEach(el=>{
    ['placeholder','title','aria-label'].forEach(a=>{
     if(!el.hasAttribute(a))return;
     const v=el.getAttribute(a); capture(v);
     if(l==='en'||!Object.keys(d).length)return;
     const nv=exact(v,d);if(nv!==v)el.setAttribute(a,nv);
    });
   });
  }
 }finally{applying=false;}
}
function setupSelector(){
 const s=document.getElementById('appLanguage'); if(!s)return;
 s.value=current();
 s.addEventListener('change',()=>{
  const l=normalise(s.value);
  purgeLegacyLanguageState();
  localStorage.setItem(KEY,l);
  location.reload();
 });
}
function apply(){
 purgeLegacyLanguageState();
 document.documentElement.lang=current();
 setupSelector();
 translateNode(document.body);
}
document.addEventListener('DOMContentLoaded',()=>{
 apply();
 const obs=new MutationObserver(ms=>{
  if(applying)return;
  ms.forEach(m=>m.addedNodes.forEach(n=>translateNode(n)));
 });
 obs.observe(document.body,{subtree:true,childList:true});
});
window.KOW_CLEAN_I18N={
 apply,current,translateNode,purgeLegacyLanguageState,
 // QA audits the declared English translation surface only. Runtime values,
 // Officer names, saved user data and the QA panel itself are intentionally
 // excluded so the missing-key count is stable and cannot self-inflate.
 getCanonicalKeys:()=>Object.keys(dicts().en).sort((a,b)=>a.localeCompare(b)),
 getDictionaries:dicts
};
})();
