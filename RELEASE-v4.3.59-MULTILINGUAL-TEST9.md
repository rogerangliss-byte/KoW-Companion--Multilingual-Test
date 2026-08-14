# KoW Companion Multilingual v4.3.59 TEST 9

## Single language selector handler
- Removed competing TEST 8 selector bridge.
- Removed the original direct selector listener from the multilingual runtime.
- Prevented generic refresh logic from reacting to language-selector changes.
- Prevented residual translation layers from rewriting the language selector or its option labels.
- Removed residual translation change handlers that also listened to the language selector.
- Added one authoritative language selector handler.
- Synchronises `kow_language` and `appLanguage`.
- Applies the established multilingual runtime once, then residual v4.3.58 translations once after rendering.
- Preserves the exact English bottom navigation structure in every language.
- Language QA and Backup/Restore fixes remain.
