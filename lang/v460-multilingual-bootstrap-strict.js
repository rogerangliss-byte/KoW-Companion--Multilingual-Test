/* Strict multilingual bootstrap: presentation layer only, after English app load. */
(function(){
'use strict';
function load(src){return new Promise((ok,bad)=>{const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=bad;document.body.appendChild(s);});}
async function start(){
 for(const src of [
 './lang/v460-en.js?v=strict1','./lang/v460-fr.js?v=strict1','./lang/v460-de.js?v=strict1','./lang/v460-it.js?v=strict1',
 './lang/v460-full-help.js?v=strict1','./lang/v460-presentation-only.js?v=strict1','./lang/v460-language-qa-strict.js?v=strict1'
 ]) await load(src);
}
if(document.readyState==='complete') setTimeout(start,0);
else window.addEventListener('load',()=>setTimeout(start,0),{once:true});
})();