# Multilingual Architecture Redesign — v4.7.0

## Scope and protection
- Target: Multilingual Test only.
- Functional baseline: current v4.7.0 English application code in this repository.
- No English Live, Multilingual Live, or English Test repository changes.
- No application version increment is authorised.
- Existing calculators, data, persistence, planners, officer records and workflows remain the functional source of truth.

## Audit findings (12 November 2026)
- The strict bootstrap loaded four v4.6.0-era dictionaries and a presentation-only patch layer.
- The legacy runtime and presentation layer relied on a body-wide MutationObserver, contrary to the repository's presentation-only build rules.
- The most recent QA23 presentation script was syntactically invalid. It has been replaced on this redesign branch; the default branch was separately restored to its last syntax-valid presentation script.
- Dictionary sizes: EN 259 entries, FR 539, DE 508, IT 465. The English dictionary has 259 source keys and all 259 are present in each translated dictionary.
- The non-English dictionaries contain 323 additional fragment/phrase entries beyond the English key set. These are treated only as a compatibility glossary, not as the canonical message catalogue.
- 43 English dictionary keys do not occur verbatim in the current v4.7.0 HTML. Several contain obsolete v4.6-era text, including the former 600 ORV / 300 SRV forecast. These must not be mistaken for current v4.7.0 interface copy.
- A static HTML scan found 634 distinct text fragments before runtime rendering. This is an initial inventory only; dynamic strings, attributes, alerts, modal content and Help require separate QA coverage.

## New runtime foundation
- Added `lang/v470-i18n-core.js` as the central runtime.
- Builds a deterministic keyed message catalogue from the English source dictionary. `KOW_I18N.keyFor(source)` returns a stable hash key and `KOW_I18N.t(key, params, language)` provides keyed lookup and interpolation.
- Retains exact-source lookup as a migration bridge for existing v4.7.0 UI strings.
- Supports parameterised dynamic templates for the known XP, skill summary, fragment, fifth-skill, training and season/infantry messages.
- Uses the additional FR/DE/IT phrase entries only as a compatibility glossary after exact and template lookup.
- Translates text nodes and supported accessibility attributes, preserves original source text for language switching, and restores English correctly.
- Reapplies translations after delegated user events and selected existing render functions. It does not dispatch application events, click controls, or invoke application workflows.
- Does not use MutationObserver.
- Exposes compatibility APIs expected by the existing QA21 diagnostic.

## Current branch changes
- New central runtime: `lang/v470-i18n-core.js`.
- Strict bootstrap now loads the central runtime instead of `v460-presentation-only.js`.
- All language dictionary assets use a fresh cache key.
- `index.html` points to the new bootstrap cache key.
- Service-worker cache namespace refreshed for the isolated Test build.
- No Live repository was changed.

## Static verification completed
- New runtime parses successfully with JavaScript syntax validation.
- All 777 exact EN-to-FR/DE/IT dictionary lookups matched their source dictionary values.
- Six dynamic templates were initially added (seven catalogue templates total); sample checks for XP, skill fragments, skill summary and season infantry passed.
- A mocked DOM test passed French translation, restoration to English, and translation of subsequently replaced dynamic text.
- No MutationObserver constructor is present in the runtime.

## Remaining work before Test acceptance
1. Reconcile the complete v4.7.0 static and dynamic source inventory against the new catalogue; remove obsolete v4.6-only entries and add missing current strings.
2. Complete and validate plural, number and locale formatting behaviour.
3. Verify every rendered root, modal, popup, form attribute, generated planner/release message and Help section in FR/DE/IT.
4. Run QA21 (or a successor with equivalent or stronger coverage) and close every genuine finding. Do not weaken the QA detector to obtain PASS.
5. Verify all existing app workflows and persistence remain unchanged in a real browser.
6. Only after Test acceptance, seek separate explicit approval before any Live promotion.
