/* KoW Companion v4.4.0 TEST — clean multilingual runtime, clean8.
   Canonical DOM is English on every page load. Language changes reload the page.
   Exact translations are preferred; safe boundary phrase replacement covers generated
   runtime sentences. The Help view is replaced with the current localised v4.4.0 guide. */
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
let phraseCache={lang:'',keys:[]};
function purgeLegacyLanguageState(){
 LEGACY_KEYS.forEach(k=>{try{localStorage.removeItem(k);}catch(_){}});
 try{Object.keys(sessionStorage).filter(k=>/lang|i18n/i.test(k)&&k!==KEY).forEach(k=>sessionStorage.removeItem(k));}catch(_){}
}
function exact(raw,d){
 const s=String(raw??''),t=s.trim(); if(!t)return s;
 if(Object.prototype.hasOwnProperty.call(d,t)&&d[t]!==t)return s.replace(t,d[t]);
 const m=t.match(/^([\u{1F300}-\u{1FAFF}\u2600-\u27BF⬇⬆★⭐📦📊👤🏅📘🎯📋📅⚙️📖🧭🧠🔮✏️❓ℹ️✅🎚🧩🎨💾🔎🔧🛠]+\s*)(.+)$/u);
 if(m&&Object.prototype.hasOwnProperty.call(d,m[2])&&d[m[2]]!==m[2])return s.replace(t,m[1]+d[m[2]]);
 return s;
}
function phraseKeys(lang,d){
 if(phraseCache.lang===lang)return phraseCache.keys;
 const keys=Object.keys(d).filter(k=>{
  if(!k||d[k]===k||k.length<4)return false;
  if(/^S\d\b/.test(k)||/^\d/.test(k))return false;
  return /[A-Za-z]/.test(k);
 }).sort((a,b)=>b.length-a.length);
 phraseCache={lang,keys};return keys;
}
function phraseTranslate(raw,lang,d){
 let out=String(raw??'');
 if(lang==='en'||!out.trim())return out;
 for(const k of phraseKeys(lang,d)){
  if(!out.includes(k))continue;
  const esc=k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  let re;
  try{re=new RegExp(`(^|[^A-Za-zÀ-ÿ0-9])${esc}(?=$|[^A-Za-zÀ-ÿ0-9])`,'gu');}catch{continue;}
  out=out.replace(re,(m,prefix)=>prefix+d[k]);
 }
 return out;
}
function translateStructured(raw,d,lang=current()){
 let s=String(raw??'');
 let out=exact(s,d);
 if(out!==s)return out;
 const lead=s.match(/^(\s*)(.*?)(\s*)$/s); if(!lead)return s;
 const pre=lead[1],body=lead[2],post=lead[3];
 const replaceExactPart=part=>{
  const t=part.trim(); if(!t)return part;
  const v=exact(t,d); return v===t?part:part.replace(t,v);
 };
 let m=body.match(/^(.+?)(\s+\d[\s\S]*)$/);
 if(m){const a=replaceExactPart(m[1]);if(a!==m[1])return pre+a+m[2]+post;}
 m=body.match(/^(.+?)(:\s*[\d.,%+\-][\s\S]*)$/);
 if(m){const a=replaceExactPart(m[1]);if(a!==m[1])return pre+a+m[2]+post;}
 const parts=body.split(/(\s+[—·]\s+|:\s+)/);
 let changed=false;
 for(let i=0;i<parts.length;i+=2){const v=replaceExactPart(parts[i]);if(v!==parts[i]){parts[i]=v;changed=true;}}
 if(changed)return pre+parts.join('')+post;
 // Last resort for generated prose: replace only dictionary-backed English phrases
 // on word boundaries. This is idempotent and leaves Officer names/game data intact.
 out=phraseTranslate(body,lang,d);
 return out!==body?pre+out+post:s;
}
function processTextNode(n,l,d){
 if(!n||n.nodeType!==Node.TEXT_NODE||!n.parentElement)return;
 if(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA','CODE','PRE'].includes(n.parentElement.tagName))return;
 if(l==='en'||!Object.keys(d).length)return;
 const v=translateStructured(n.nodeValue,d,l);if(v!==n.nodeValue)n.nodeValue=v;
}
function processAttributes(el,l,d){
 if(!el||el.nodeType!==Node.ELEMENT_NODE)return;
 ['placeholder','title','aria-label'].forEach(a=>{
  if(!el.hasAttribute(a)||l==='en'||!Object.keys(d).length)return;
  const v=el.getAttribute(a),nv=translateStructured(v,d,l);if(nv!==v)el.setAttribute(a,nv);
 });
}
function applyLocalizedHelp(l=current(),d=dicts()[l]||{}){
 if(l==='en')return;
 const html=window.KOW_HELP_HTML_V440?.[l];
 const article=document.querySelector('#help > article.card');
 if(!html||!article||article.dataset.v440LocalizedHelp===l)return;
 const title=exact('❓ Help & Instructions',d);
 article.innerHTML=`<h2>${title}</h2>${html}`;
 article.dataset.v440LocalizedHelp=l;
}
function translateNode(root=document.body){
 if(!root||applying)return;
 const l=current(),d=dicts()[l]||{};
 applying=true;
 try{
  if(root===document.body||root.nodeType===Node.DOCUMENT_NODE)applyLocalizedHelp(l,d);
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
 applyLocalizedHelp();
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
 window.addEventListener('load',()=>{setupSelector();applyLocalizedHelp();translateNode(document.body);});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
else start();
window.KOW_CLEAN_I18N={
 apply,current,translateNode,translateStructured,phraseTranslate,applyLocalizedHelp,purgeLegacyLanguageState,
 getCanonicalKeys:()=>Object.keys(dicts().en).sort((a,b)=>a.localeCompare(b)),
 getDictionaries:dicts
};
})();
