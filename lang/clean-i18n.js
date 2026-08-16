/* KoW Companion v4.4.0 TEST — clean multilingual runtime, clean9.
   Robust active-language runtime: exact dictionary translation, safe generated-text
   replacement, localised Help injection, mutation coverage and repeated startup passes. */
(function(){
'use strict';
const KEY='kow_language_clean_v440';
const LANGS=['en','fr','de','it'];
const LEGACY_KEYS=['kow_language','appLanguage','kowLanguage','kow_lang','kowLang','language','selectedLanguage','kow_language_v4357','kow_language_v440','kow_i18n_language'];
const dicts=()=>({en:window.KOW_I18N_EN||{},fr:window.KOW_I18N_FR||{},de:window.KOW_I18N_DE||{},it:window.KOW_I18N_IT||{}});
const normalise=v=>LANGS.includes(String(v||'').slice(0,2).toLowerCase())?String(v).slice(0,2).toLowerCase():'en';
function safeGet(k){try{return localStorage.getItem(k)}catch(_){return null}}
function safeSet(k,v){try{localStorage.setItem(k,v)}catch(_){}}
function current(){
 const stored=safeGet(KEY);
 if(stored)return normalise(stored);
 const sel=document.getElementById('appLanguage');
 return normalise(sel?.value||'en');
}
let applying=false,queued=false,phraseCache={lang:'',keys:[]};
function purgeLegacyLanguageState(){
 LEGACY_KEYS.forEach(k=>{try{localStorage.removeItem(k)}catch(_){}});
 try{Object.keys(sessionStorage).filter(k=>k!==KEY&&/lang|i18n/i.test(k)).forEach(k=>sessionStorage.removeItem(k));}catch(_){}
}
function exact(raw,d){
 const s=String(raw??''),t=s.trim();if(!t)return s;
 if(Object.prototype.hasOwnProperty.call(d,t)&&d[t]!==t)return s.replace(t,d[t]);
 const m=t.match(/^([^A-Za-zÀ-ÿ0-9]*)(.+)$/u);
 if(m&&m[1]&&Object.prototype.hasOwnProperty.call(d,m[2])&&d[m[2]]!==m[2])return s.replace(t,m[1]+d[m[2]]);
 return s;
}
function phraseKeys(lang,d){
 if(phraseCache.lang===lang)return phraseCache.keys;
 const keys=Object.keys(d).filter(k=>k&&d[k]!==k&&k.length>=4&&/[A-Za-z]/.test(k)&&!/^S\d\b/.test(k)).sort((a,b)=>b.length-a.length);
 phraseCache={lang,keys};return keys;
}
function phraseTranslate(raw,lang,d){
 let out=String(raw??'');if(lang==='en'||!out.trim())return out;
 for(const k of phraseKeys(lang,d)){
  if(!out.includes(k))continue;
  const esc=k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
  try{out=out.replace(new RegExp(`(^|[^A-Za-zÀ-ÿ0-9])${esc}(?=$|[^A-Za-zÀ-ÿ0-9])`,'gu'),(m,p)=>p+d[k]);}catch(_){}
 }
 return out;
}
function translateStructured(raw,d,lang=current()){
 const s=String(raw??'');
 let out=exact(s,d);if(out!==s)return out;
 const lead=s.match(/^(\s*)(.*?)(\s*)$/s);if(!lead)return s;
 const pre=lead[1],body=lead[2],post=lead[3];
 const part=x=>{const t=x.trim();if(!t)return x;const v=exact(t,d);return v===t?x:x.replace(t,v)};
 let m=body.match(/^(.+?)(\s+\d[\s\S]*)$/);if(m){const a=part(m[1]);if(a!==m[1])return pre+a+m[2]+post}
 m=body.match(/^(.+?)(:\s*[\d.,%+\-][\s\S]*)$/);if(m){const a=part(m[1]);if(a!==m[1])return pre+a+m[2]+post}
 const pieces=body.split(/(\s+[—·]\s+|:\s+)/);let changed=false;
 for(let i=0;i<pieces.length;i+=2){const v=part(pieces[i]);if(v!==pieces[i]){pieces[i]=v;changed=true}}
 if(changed)return pre+pieces.join('')+post;
 out=phraseTranslate(body,lang,d);return out!==body?pre+out+post:s;
}
function processTextNode(n,l,d){
 if(!n||n.nodeType!==3||!n.parentElement)return;
 if(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA','CODE','PRE'].includes(n.parentElement.tagName))return;
 if(l==='en'||!Object.keys(d).length)return;
 const v=translateStructured(n.nodeValue,d,l);if(v!==n.nodeValue)n.nodeValue=v;
}
function processAttributes(el,l,d){
 if(!el||el.nodeType!==1)return;
 ['placeholder','title','aria-label'].forEach(a=>{if(!el.hasAttribute(a)||l==='en')return;const v=el.getAttribute(a),nv=translateStructured(v,d,l);if(nv!==v)el.setAttribute(a,nv)});
}
function applyLocalizedHelp(l=current(),d=dicts()[l]||{}){
 if(l==='en')return;
 const html=window.KOW_HELP_HTML_V440?.[l],article=document.querySelector('#help > article.card');
 if(!html||!article||article.dataset.v440LocalizedHelp===l)return;
 article.innerHTML=`<h2>${exact('❓ Help & Instructions',d)}</h2>${html}`;article.dataset.v440LocalizedHelp=l;
}
function translateNode(root=document.body,l=current()){
 if(!root||applying)return;
 const d=dicts()[l]||{};if(l!=='en'&&!Object.keys(d).length)return;
 applying=true;
 try{
  if(root===document.body||root.nodeType===9)applyLocalizedHelp(l,d);
  if(root.nodeType===3)processTextNode(root,l,d);
  else if(root.nodeType===1||root.nodeType===9){
   if(root.nodeType===1)processAttributes(root,l,d);
   const w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;while((n=w.nextNode()))processTextNode(n,l,d);
   root.querySelectorAll?.('[placeholder],[title],[aria-label]').forEach(el=>processAttributes(el,l,d));
  }
 }finally{applying=false}
}
function forceApply(){
 const l=current();document.documentElement.lang=l;
 const s=document.getElementById('appLanguage');if(s&&s.value!==l)s.value=l;
 applyLocalizedHelp(l,dicts()[l]||{});translateNode(document.body,l);
}
function translateAllSoon(){if(queued)return;queued=true;queueMicrotask(()=>{queued=false;forceApply()})}
function setupSelector(){
 const s=document.getElementById('appLanguage');if(!s)return;
 const l=current();s.value=l;
 if(s.dataset.cleanI18nWired)return;s.dataset.cleanI18nWired='1';
 s.addEventListener('change',()=>{
  const next=normalise(s.value);purgeLegacyLanguageState();safeSet(KEY,next);document.documentElement.lang=next;
  translateNode(document.body,next);
  setTimeout(()=>location.reload(),80);
 });
}
function apply(){purgeLegacyLanguageState();setupSelector();forceApply()}
function start(){
 apply();
 const obs=new MutationObserver(ms=>{
  if(applying)return;
  let full=false;
  for(const m of ms){
   if(m.type==='characterData'){translateNode(m.target);continue}
   if(m.type==='attributes'){processAttributes(m.target,current(),dicts()[current()]||{});continue}
   if(m.addedNodes?.length){m.addedNodes.forEach(n=>translateNode(n));full=true}
  }
  if(full)translateAllSoon();
 });
 obs.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','title','aria-label']});
 [0,100,350,800,1500,3000].forEach(ms=>setTimeout(()=>{setupSelector();forceApply()},ms));
 window.addEventListener('load',()=>{setupSelector();forceApply();setTimeout(forceApply,500)});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
window.KOW_CLEAN_I18N={apply,current,translateNode,translateStructured,phraseTranslate,applyLocalizedHelp,purgeLegacyLanguageState,forceApply,getCanonicalKeys:()=>Object.keys(dicts().en).sort((a,b)=>a.localeCompare(b)),getDictionaries:dicts};
})();
