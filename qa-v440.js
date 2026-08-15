/* KoW Companion v4.4.0 TEST
   Legacy compatibility shim.
   The active multilingual runtime and language-QA integration now live in
   lang/v440-language-qa.js. This file intentionally performs no DOM mutation,
   translation pass, Help rendering or QA evaluation so there is only one
   active v4.4 multilingual runtime in the page. */
(function(){
  'use strict';
  window.KOW_V440_LEGACY_QA_DISABLED=true;
})();
