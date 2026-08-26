/* KoW Companion v4.6.0 — STRICT presentation-only localisation.
Functional source of truth: English v4.6.0 LIVE HOTFIX-2.
This file may translate rendered text/attributes only. It must not change application state. */
(function(){
'use strict';
const KEY='kow-language-v460-strict';
const LANGS=['en','fr','de','it'];
const dicts=()=>({en:window.KOW_I18N_EN||{},fr:window.KOW_I18N_FR||{},de:window.KOW_I18N_DE||{},it:window.KOW_I18N_IT||{}});
let active=(localStorage.getItem(KEY)||'en').slice(0,2).toLowerCase();
if(!LANGS.includes(active)) active='en';
const textBase=new WeakMap(), attrBase=new WeakMap();

function dictionary(){ return dicts()[active]||{}; }
function translateString(s){
  if(active==='en') return s;
  const d=dictionary();
  return Object.prototype.hasOwnProperty.call(d,s)?d[s]:s;
}
function translateRoot(root=document.body){
  if(!root) return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
  let n;
  while((n=walker.nextNode())){
    const parent=n.parentElement;
    if(!parent || /^(SCRIPT|STYLE|TEXTAREA|OPTION)$/i.test(parent.tagName)) continue;
    if(!textBase.has(n)) textBase.set(n,n.nodeValue);
    const base=textBase.get(n);
    const lead=(base.match(/^\s*/)||[''])[0], trail=(base.match(/\s*$/)||[''])[0];
    const core=base.trim();
    if(core) n.nodeValue=lead+translateString(core)+trail;
  }
  root.querySelectorAll?.('[placeholder],[title],[aria-label]').forEach(el=>{
    for(const a of ['placeholder','title','aria-label']){
      if(!el.hasAttribute(a)) continue;
      let m=attrBase.get(el); if(!m){m={};attrBase.set(el,m);}
      if(!(a in m)) m[a]=el.getAttribute(a);
      el.setAttribute(a,translateString(m[a]));
    }
  });
}
function apply(lang){
  active=LANGS.includes(lang)?lang:'en';
  localStorage.setItem(KEY,active);
  document.documentElement.lang=active;
  const sel=document.getElementById('appLanguage');
  if(sel) sel.value=active;
  translateRoot(document.body);
  const help=document.querySelector('#help');
  if(help){
    if(active==='en'){
      if(help.dataset.englishHtml) help.innerHTML=help.dataset.englishHtml;
    } else {
      const html=window.KOW_HELP_HTML_V450?.[active];
      if(html) help.innerHTML=html;
    }
  }
}
function addUi(){
  if(!document.getElementById('multilingualTestBanner')){
    const b=document.createElement('div'); b.id='multilingualTestBanner';
    b.textContent='MULTILINGUAL TEST — STABLE ENGLISH TRUTH — QA9 — NOT LIVE';
    b.style.cssText='position:sticky;top:0;z-index:9999;background:#a50000;color:#fff;text-align:center;font-weight:800;padding:8px 12px;border-bottom:2px solid #ff6b6b';
    document.body.insertBefore(b,document.body.firstChild);
  }
  const settings=document.querySelector('#settings article.card');
  if(settings && !document.getElementById('appLanguage')){
    const h=settings.querySelector('h2'), wrap=document.createElement('div');
    wrap.id='languageSelectorCard'; wrap.style.marginBottom='14px';
    wrap.innerHTML='<label for="appLanguage">Language / Langue / Sprache / Lingua</label><select id="appLanguage"><option value="en">English</option><option value="fr">Français</option><option value="de">Deutsch</option><option value="it">Italiano</option></select>';
    h?.insertAdjacentElement('afterend',wrap);
    wrap.querySelector('select').addEventListener('change',e=>apply(e.target.value));
  }
  const help=document.querySelector('#help');
  if(help && !help.dataset.englishHtml) help.dataset.englishHtml=help.innerHTML;
}
window.KOW_PRESENTATION_I18N={apply,translateRoot,getLanguage:()=>active};
window.addEventListener('load',()=>{addUi();apply(active);},{once:true});
})();