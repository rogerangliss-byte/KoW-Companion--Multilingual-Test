# KoW Companion v4.4.0 MULTILINGUAL TEST

Test environment for KoW Companion v4.4.0 multilingual validation.

## Languages
English, French, German and Italian.

## Language source structure
The `/lang/` directory is the single authoritative source for multilingual runtime files in v4.4.0. The app loads `lang/en.js`, `lang/fr.js`, `lang/de.js` and `lang/it.js`; shared v4.4.0 multilingual runtime/QA behaviour is handled by the versioned files in the same directory. Obsolete root-level language duplicates have been removed so translation changes cannot drift between two copies.

## v4.4.0 test focus
- Planning Readiness Dashboard.
- Badge, Star and XP readiness for saved planning scenarios.
- Priority Target and Suggested Next Action guidance.
- Open in Planner shortcut.
- Language selector and persistence.
- Full rendered-content Language QA covering Interface, Help / What’s New, README and version consistency.
- v4.4.0 translation coverage for English, French, German and Italian.
- Stable translated Backup & Restore controls across language switching and dynamic rerendering.

## QA acceptance rule
A Full app PASS is only valid when the selected language switches correctly and the rendered Interface, Help / What’s New, README and version consistency all pass. Stale v4.3.x documentation, residual English in tested areas, malformed repeated-character content, empty Help content or a version mismatch must produce FAIL.

## Status
Multilingual TEST only. The build must receive a clean Full app QA result before promotion to Multilingual Live.
