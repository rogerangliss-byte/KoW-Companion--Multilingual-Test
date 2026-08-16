/* KoW Companion v4.4.0 TEST — clean multilingual runtime, clean7.
   Canonical DOM is English on every page load. Language changes reload the page,
   then one dictionary-backed translation pass is applied.
   Runtime mutations and generated labels are translated as they appear. */
(function(){
'use strict';
const KEY='kow_language_clean_v440';
const LANGS=['en','fr','de','it'];
const LEGACY_KEYS=[
 'kow_language','appLanguage','kowLanguage','kow_lang','kowLang','language','selectedLanguage',
 'kow_language_v4357','kow_language_v440','kow_i18n_language'
];
const dicts=()=>({en:window.KOW_I18N_EN||{},fr:window.KOW_I18N_FR||{},de:window.KOW_I18N_DE||{},it:window.KOW_I18N_IT||{}});
const normalise=v=>LANGS.includes(String(v||'').slice(0,2).toLowerCase())?String(v).slice(0,2).toLowerCase():'en';
const current=()=>normalise(localStorage.getItem(KEY)||'en');
let applying=false;
let queued=false;
function purgeLegacyLanguageState(){
 LEGACY_KEYS.forEach(k=>{try{localStorage.removeItem(k);}catch(_){}});
 try{Object.keys(sessionStorage).filter(k=>/lang|i18n/i.test(k)&&k!==KEY).forEach(k=>sessionStorage.removeItem(k));}catch(_){}
}
function exact(raw,d){
 const s=String(raw??''),t=s.trim(); if(!t)return s;
 if(Object.prototype.hasOwnProperty.call(d,t)&&d[t]!==t)return s.replace(t,d[t]);
 const m=t.match(/^([\u{1F300}-\u{1FAFF}\u2600-\u27BF⬇⬆★⭐📦📊👤🏅📘🎯📋📅⚙️📖🧭🧠🔮]+\s*)(.+)$/u);
 if(m&&Object.prototype.hasOwnProperty.call(d,m[2])&&d[m[2]]!==m[2])return s.replace(t,m[1]+d[m[2]]);
 return s;
}
function translateStructured(raw,d){
 let s=String(raw??'');
 let out=exact(s,d);
 if(out!==s)return out;
 const lead=s.match(/^(\s*)(.*?)(\s*)$/s); if(!lead)return s;
 const pre=lead[1],body=lead[2],post=lead[3];
 const replaceExactPart=part=>{
  const t=part.trim();
  if(!t)return part;
  const v=exact(t,d);
  return v===t?part:part.replace(t,v);
 };
 // Generated labels such as "Saved 10/08/2026, 21:46:42".
 let m=body.match(/^(.+?)(\s+\d[\s\S]*)$/);
 if(m){const a=replaceExactPart(m[1]);if(a!==m[1])return pre+a+m[2]+post;}
 // Generated counters such as "Officer Badges remaining: 0".
 m=body.match(/^(.+?)(:\s*[\d.,%+\-][\s\S]*)$/);
 if(m){const a=replaceExactPart(m[1]);if(a!==m[1])return pre+a+m[2]+post;}
 // Translate exact segments around common UI separators without touching Officer names/game data.
 const parts=body.split(/(\s+[—·]\s+|:\s+)/);
 let changed=false;
 for(let i=0;i<parts.length;i+=2){const v=replaceExactPart(parts[i]);if(v!==parts[i]){parts[i]=v;changed=true;}}
 return changed?pre+parts.join('')+post:s;
}
function processTextNode(n,l,d){
 if(!n||n.nodeType!==Node.TEXT_NODE||!n.parentElement)return;
 if(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA','CODE','PRE'].includes(n.parentElement.tagName))return;
 if(l==='en'||!Object.keys(d).length)return;
 const v=translateStructured(n.nodeValue,d);if(v!==n.nodeValue)n.nodeValue=v;
}
function processAttributes(el,l,d){
 if(!el||el.nodeType!==Node.ELEMENT_NODE)return;
 ['placeholder','title','aria-label'].forEach(a=>{
  if(!el.hasAttribute(a)||l==='en'||!Object.keys(d).length)return;
  const v=el.getAttribute(a),nv=translateStructured(v,d);if(nv!==v)el.setAttribute(a,nv);
 });
}
function translateNode(root=document.body){
 if(!root||applying)return;
 const l=current(),d=dicts()[l]||{};
 applying=true;
 try{
  if(root.nodeType===Node.TEXT_NODE)processTextNode(root,l,d);
  else if(root.nodeType===Node.ELEMENT_NODE||root.nodeType===Node.DOCUMENT_NODE){
   if(root.nodeType===Node.ELEMENT_NODE)processAttributes(root,l,d);
   const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode())processTextNode(n,l,d);
   root.querySelectorAll?.('[placeholder],[title],[aria-label]').forEach(el=>processAttributes(el,l,d));
  }
 }finally{applying=false;}
}
function translateAllSoon(){
 if(queued)return;queued=true;
 queueMicrotask(()=>{queued=false;translateNode(document.body);});
}
function setupSelector(){
 const s=document.getElementById('appLanguage');if(!s)return;
 s.value=current();
 if(s.dataset.cleanI18nWired)return;
 s.dataset.cleanI18nWired='1';
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
function start(){
 apply();
 const obs=new MutationObserver(ms=>{
  if(applying)return;
  let full=false;
  for(const m of ms){
   if(m.type==='characterData'){translateNode(m.target);continue;}
   if(m.type==='attributes'){processAttributes(m.target,current(),dicts()[current()]||{});continue;}
   if(m.addedNodes?.length){m.addedNodes.forEach(n=>translateNode(n));full=true;}
  }
  if(full)translateAllSoon();
 });
 obs.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','title','aria-label']});
 window.addEventListener('load',()=>{setupSelector();translateNode(document.body);});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
else start();
window.KOW_CLEAN_I18N={
 apply,current,translateNode,translateStructured,purgeLegacyLanguageState,
 getCanonicalKeys:()=>Object.keys(dicts().en).sort((a,b)=>a.localeCompare(b)),
 getDictionaries:dicts
};
})();
