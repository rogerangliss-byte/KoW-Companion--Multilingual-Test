# KoW Companion Multilingual v4.3.59 TEST 7

## Language selector stability fix
- Language selector is now the authoritative language control.
- Selector option names remain fixed as English / Français / Deutsch / Italiano.
- The selector itself is excluded from translation rewriting.
- Both `kow_language` and the historical `appLanguage` localStorage keys are synchronised.
- Language choice is reapplied consistently on startup, change and page restore.
- TEST 6 bottom-navigation protection remains in place.
- QA, Settings and Backup & Restore fixes remain.
