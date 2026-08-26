/* KoW Companion v4.6.0 — QA6 whole-app rendered-language scanner */
(function(){
'use strict';

const $ = id => document.getElementById(id);
const wait = ms => new Promise(r => setTimeout(r, ms));

const LANGS = [
  {code:'en',label:'English'},
  {code:'fr',label:'Français'},
  {code:'de',label:'Deutsch'},
  {code:'it',label:'Italiano'}
];

const ROOTS = [
  'dashboard','progress','officer','inventory','stars','development',
  'xp','planner','database','releases','settings','help',
  'skillCostInfoModal','quickProgressModal'
];

const ENWORDS = new Set((
  'the and or to from with without for of in on at by is are was were be been being this that these those '+
  'your you can cannot could should would will current next previous latest saved save load reset restore export import '+
  'download upload select selected choose enter required remaining held available shortfall still more less total value '+
  'level levels target targets training skill skills strand strands officer officers badge badges star stars inventory '+
  'planner planning plan plans database release releases forecast growth month scheduled schedule resource resources '+
  'development progress readiness ready partially fully funded upgrade upgrades action actions recommendation recommendations '+
  'backup guide settings help home dashboard compare comparison status showing highest search season rarity role unlock '+
  'max maxed original universal legendary epic elite chest chests selection book books calculate calculated calculation '+
  'cost costs used spend spent change changed changing available requirement requirements future session scenario scenarios '+
  'priority priorities open close delete copy import export create add remove edit save saved restore reset live test version '+
  'application app browser locally data press button field fields row rows officer badge star value xp held required'
).split(/\s+/));

const TECH = new Set('xp orv srv csv max firestorm kow s2 s3 s4 s5 s6 s7 s8'.split(/\s+/));

function normalizeLang(v){
  v=String(v||'').toLowerCase();
  if(v.startsWith('fr')) return 'fr';
  if(v.startsWith('de')) return 'de';
  if(v.startsWith('it')) return 'it';
  return 'en';
}

function currentLang(){
  try{
    if(window.KOW_CLEAN_I18N?.current) return normalizeLang(window.KOW_CLEAN_I18N.current());
  }catch(e){}
  const sel=$('appLanguage');
  if(sel?.value) return normalizeLang(sel.value);
  return normalizeLang(localStorage.getItem('kow-language-v460')||'en');
}

async function setLang(code){
  try{
    if(window.KOW_CLEAN_I18N?.applyLanguage){
      window.KOW_CLEAN_I18N.applyLanguage(code);
    }else if(window.KOW_CLEAN_I18N?.set){
      window.KOW_CLEAN_I18N.set(code);
    }else{
      const sel=$('appLanguage');
      if(sel){
        sel.value=code;
        sel.dispatchEvent(new Event('change',{bubbles:true}));
      }
    }
  }catch(e){}
  await wait(160);
}

function visible(el){
  if(!el) return false;
  const cs=getComputedStyle(el);
  if(cs.display==='none' || cs.visibility==='hidden') return false;
  return true;
}

function rootExists(id){ return !!$(id); }

function extractVisibleStrings(root){
  const out=[];
  if(!root) return out;

  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{
    acceptNode(node){
      const p=node.parentElement;
      if(!p) return NodeFilter.FILTER_REJECT;
      if(['SCRIPT','STYLE','NOSCRIPT','TEMPLATE'].includes(p.tagName)) return NodeFilter.FILTER_REJECT;
      const t=(node.nodeValue||'').replace(/\s+/g,' ').trim();
      if(!t) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  let n;
  while((n=walker.nextNode())){
    const t=(n.nodeValue||'').replace(/\s+/g,' ').trim();
    if(t) out.push({kind:'text',text:t});
  }

  root.querySelectorAll('[placeholder],[title],[aria-label],[alt]').forEach(el=>{
    ['placeholder','title','aria-label','alt'].forEach(a=>{
      const t=(el.getAttribute(a)||'').replace(/\s+/g,' ').trim();
      if(t) out.push({kind:a,text:t});
    });
  });

  root.querySelectorAll('select option').forEach(o=>{
    const t=(o.textContent||'').replace(/\s+/g,' ').trim();
    if(t) out.push({kind:'option',text:t});
  });

  root.querySelectorAll('input[type="button"],input[type="submit"],input[type="reset"]').forEach(el=>{
    const t=(el.value||'').replace(/\s+/g,' ').trim();
    if(t) out.push({kind:'input-value',text:t});
  });

  return out;
}

function englishScore(text){
  const words=(String(text).toLowerCase().match(/[a-z][a-z'-]*/g)||[]);
  if(words.length<2) return 0;
  let hit=0, tech=0;
  for(const w of words){
    if(TECH.has(w)){ tech++; continue; }
    if(ENWORDS.has(w)) hit++;
  }
  const denom=Math.max(1,words.length-tech);
  return hit/denom;
}

function looksEnglish(text,lang){
  if(lang==='en') return false;
  const t=String(text||'').trim();
  if(t.length<4) return false;
  if(/^[\d\s.,:%()+\-★→/]+$/.test(t)) return false;

  // Catch high-confidence English phrases.
  if(/\b(Next cost|Backup & Restore|User Guide|Export App Backup|Restore App Backup|Calculate Target Recommendation|Upgrade Targets & Recommendations|Ready:|Need \d|Officer Readiness Intelligence|Priority shortfalls|Target Level|Target Stars|Target Training|MAX Officer)\b/i.test(t)) return true;

  const score=englishScore(t);
  const wc=(t.match(/[A-Za-z]+/g)||[]).length;
  return wc>=3 && score>=0.42;
}

function dynamicRenderers(){
  const names=[
    'updateSmartDashboard','renderSavedOfficerProgress','renderProgressCompareChoices',
    'renderSkillStrands','updateSkillRarityNotice','updateSkillCostSummaries',
    'buildUpgradeSummary','renderDb','renderInventory','renderReleaseCalendar',
    'refreshReleaseCalendar','refreshReleaseForecast','renderPlanner',
    'renderAdvancedPlanner','renderPlanningReadiness','renderQuickProgress'
  ];
  const invoked=[];
  for(const name of names){
    try{
      if(typeof window[name]==='function'){
        window[name]();
        invoked.push(name);
      }
    }catch(e){}
  }
  return invoked;
}

function popupLiteralInventory(){
  const src=document.documentElement.innerHTML;
  const out=[];
  const rx=/(?:alert|confirm|prompt)\s*\(\s*([`'"])([\s\S]{3,240}?)\1\s*\)/g;
  let m;
  while((m=rx.exec(src))){
    const t=m[2].replace(/\$\{[^}]+\}/g,'{value}').replace(/\s+/g,' ').trim();
    if(t) out.push(t);
  }
  return [...new Set(out)];
}

function ensureModalVisible(id){
  const el=$(id);
  if(!el) return;
  el.dataset.qa6PrevStyle=el.getAttribute('style')||'';
  el.dataset.qa6PrevHidden=el.hidden?'1':'0';
  el.hidden=false;
  el.style.display='block';
  el.style.visibility='visible';
}

function restoreModal(id){
  const el=$(id);
  if(!el) return;
  if(el.dataset.qa6PrevHidden==='1') el.hidden=true;
  else el.hidden=false;
  if('qa6PrevStyle' in el.dataset) el.setAttribute('style',el.dataset.qa6PrevStyle);
  delete el.dataset.qa6PrevStyle;
  delete el.dataset.qa6PrevHidden;
}

async function scanOneRoot(lang,rootId,progress){
  const result={root:rootId,exists:rootExists(rootId),timed_out:false,english_bleed:[],strings_scanned:0};
  if(!result.exists) return result;

  const isModal=/Modal$/i.test(rootId);
  if(isModal) ensureModalVisible(rootId);

  const task=(async()=>{
    dynamicRenderers();
    await wait(50);
    const root=$(rootId);
    const strings=extractVisibleStrings(root);
    result.strings_scanned=strings.length;
    for(const s of strings){
      if(looksEnglish(s.text,lang)){
        result.english_bleed.push({kind:s.kind,text:s.text});
      }
    }
  })();

  const timeout=new Promise(resolve=>setTimeout(()=>resolve('TIMEOUT'),1200));
  const raced=await Promise.race([task.then(()=> 'DONE'),timeout]);
  if(raced==='TIMEOUT') result.timed_out=true;

  if(isModal) restoreModal(rootId);
  progress();
  return result;
}

function renderPanel(state){
  const host=$('languageQaResults') || $('languageQaStatus') || $('languageQAResults');
  if(!host) return;
  host.innerHTML=state;
}

function updateProgress(langLabel,index,total,rootId){
  const host=$('languageQaStatus') || $('languageQAStatus') || $('languageQaResults');
  if(host){
    host.textContent=`QA6: ${langLabel} — ${rootId} — ${index}/${total}`;
  }
}

function buildReport(results,startedAt){
  return {
    generated_at:new Date().toISOString(),
    app_version:'4.6.0',
    qa_version:'QA6 whole-app rendered-language audit',
    coverage:{
      requested_roots:ROOTS,
      existing_roots:ROOTS.filter(rootExists),
      missing_roots:ROOTS.filter(id=>!rootExists(id)),
      popup_literals:popupLiteralInventory()
    },
    results,
    duration_ms:Date.now()-startedAt
  };
}

function downloadReport(report){
  const blob=new Blob([JSON.stringify(report,null,2)],{type:'application/json'});
  const a=document.createElement('a');
  a.href=URL.createObjectURL(blob);
  a.download=`KoW-Language-QA6-v4.6.0-${new Date().toISOString().replace(/[:.]/g,'-')}.json`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(a.href),1000);
}

function renderSummary(report){
  const target=$('languageQaResults') || $('languageQAResults') || $('languageQaStatus');
  if(!target) return;
  const rows=[];
  for(const L of LANGS){
    const r=report.results[L.label];
    const bleed=r?.rendered_english_bleed||[];
    const timeouts=r?.timeouts||[];
    const status=r?.status||'FAIL';
    rows.push(`<div class="qa-row"><strong>${L.label}</strong><span style="float:right">${status}</span><br><small>English bleed: ${bleed.length} · Timeouts: ${timeouts.length} · Roots scanned: ${r?.roots_scanned||0}</small></div>`);
  }
  const missing=report.coverage.missing_roots.length;
  target.innerHTML=rows.join('')+`<div class="note" style="margin-top:10px">QA6 coverage: ${report.coverage.existing_roots.length}/${report.coverage.requested_roots.length} roots present · Missing roots: ${missing}</div>`;
}

async function runFullQA6(){
  const btn=$('runLanguageQa') || $('runFullRenderedQa') || $('runFullRenderedQA');
  if(btn) btn.disabled=true;
  const startedAt=Date.now();
  const original=currentLang();
  const results={};

  try{
    const total=LANGS.length*ROOTS.length;
    let done=0;

    for(const L of LANGS){
      await setLang(L.code);
      dynamicRenderers();
      await wait(120);

      const langResult={
        status:'PASS',
        dictionary:[],
        rendered_english_bleed:[],
        timeouts:[],
        roots_scanned:0,
        per_root:[]
      };

      for(const rootId of ROOTS){
        const rr=await scanOneRoot(L.code,rootId,()=>{
          done++;
          updateProgress(L.label,done,total,rootId);
        });
        langResult.per_root.push(rr);
        if(rr.exists) langResult.roots_scanned++;
        if(rr.timed_out) langResult.timeouts.push(rootId);
        for(const b of rr.english_bleed){
          langResult.rendered_english_bleed.push(`${rootId}: ${b.text}`);
        }
      }

      // Popup literals are audited as source inventory. For non-English, any literal English phrase is a fail.
      if(L.code!=='en'){
        for(const p of popupLiteralInventory()){
          if(looksEnglish(p,L.code)){
            langResult.rendered_english_bleed.push(`popup-literal: ${p}`);
          }
        }
      }

      if(langResult.rendered_english_bleed.length || langResult.timeouts.length || ROOTS.some(id=>!rootExists(id))){
        langResult.status='FAIL';
      }
      results[L.label]=langResult;
    }

    const report=buildReport(results,startedAt);
    window.KOW_LAST_QA6_REPORT=report;
    renderSummary(report);

    const dl=$('downloadLanguageQaReport') || $('downloadQaReport') || $('downloadQAReport');
    if(dl){
      dl.disabled=false;
      dl.onclick=()=>downloadReport(window.KOW_LAST_QA6_REPORT);
    }

    return report;
  } finally {
    await setLang(original);
    if(btn) btn.disabled=false;
  }
}

function wire(){
  const run=$('runLanguageQa') || $('runFullRenderedQa') || $('runFullRenderedQA');
  if(run){
    run.textContent='Run Whole-App QA6';
    run.onclick=()=>runFullQA6();
  }
  const dl=$('downloadLanguageQaReport') || $('downloadQaReport') || $('downloadQAReport');
  if(dl){
    dl.textContent='↓ Download QA6 Report';
    dl.disabled=!window.KOW_LAST_QA6_REPORT;
    dl.onclick=()=>window.KOW_LAST_QA6_REPORT && downloadReport(window.KOW_LAST_QA6_REPORT);
  }

  // Update heading/description if present.
  const heading=[...document.querySelectorAll('h2,h3')].find(x=>/Language QA|Rendered Translation Test/i.test(x.textContent||''));
  if(heading) heading.textContent='🧪 Language QA6 / Whole-App Render Test';
  const desc=[...document.querySelectorAll('.note,.info,.subtle,p')].find(x=>/Scans visible text|rendered application/i.test(x.textContent||''));
  if(desc) desc.textContent='QA6 scans every application view one at a time, includes dynamic render states, modals, options, attributes and popup literals, and fails closed on missing roots or timeouts.';
}

if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',wire,{once:true});
else wire();

window.KOW_QA6={run:runFullQA6,report:()=>window.KOW_LAST_QA6_REPORT||null};
})();
