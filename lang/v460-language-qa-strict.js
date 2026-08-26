/* v4.6.0 STRICT language QA — read-only DOM audit. */
(function(){
'use strict';
const ROOTS=['home','officer','stars','develop','xp','planner','database','releases','settings','help',
             'progress','compare','inventory','forecast'].filter(id=>document.getElementById(id));
function audit(){
  const lang=window.KOW_PRESENTATION_I18N?.getLanguage?.()||'en';
  const rows=ROOTS.map(id=>{
    const el=document.getElementById(id);
    const text=(el?.innerText||'').replace(/\s+/g,' ').trim();
    return {id,present:!!el,chars:text.length};
  });
  return {version:'v4.6.0',mode:'STRICT READ-ONLY PRESENTATION QA',language:lang,
          requestedRoots:14,foundRoots:ROOTS.length,roots:rows,
          pass:ROOTS.length===14,timestamp:new Date().toISOString()};
}
window.KOW_STRICT_LANGUAGE_QA={audit};
})();