/* v4.6.0 — render full language-specific Help from the active clean-i18n language */
(function(){
'use strict';
let englishHTML='';
let lastLang='';
function lang(){return window.KOW_CLEAN_I18N?.current?.()||document.getElementById('appLanguage')?.value||'en'}
function sourceArticle(html){const box=document.createElement('div');box.innerHTML=html||'';return box.querySelector('#help > article, article.multilingual-full-guide, article.card, article')}
function render(){
 const help=document.getElementById('help'); if(!help)return;
 let article=help.querySelector(':scope > article.card, :scope > article'); if(!article)return;
 if(!englishHTML)englishHTML=article.innerHTML;
 const l=lang();
 if(l===lastLang && article.dataset.fullGuideLanguage===l)return;
 if(l==='en'){
   article.innerHTML=englishHTML;
   article.dataset.fullGuideLanguage='en';
 }else{
   const raw=window.KOW_MULTILINGUAL_HELP?.[l];
   const src=sourceArticle(raw);
   if(!src){article.innerHTML='<h2>❌ Missing translated User Guide</h2>';article.dataset.fullGuideLanguage='missing';return;}
   article.innerHTML=src.innerHTML;
   article.dataset.fullGuideLanguage=l;
   window.KOW_CLEAN_I18N?.translateNode?.(article,l);
 }
 lastLang=l;
}
function install(){render();setTimeout(render,100);setTimeout(render,500)}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
window.addEventListener('load',install);
setInterval(()=>{if(lang()!==lastLang)render()},250);
window.KOW_RENDER_LANGUAGE_HELP=render;
})();
