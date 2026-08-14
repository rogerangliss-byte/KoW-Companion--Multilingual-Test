# KoW Companion Multilingual v4.3.59 TEST 4

## Clean rebuild
- Rebuilt again from the English v4.3.59 LIVE master, not from TEST 2 or TEST 3.
- Exactly one Settings section.
- Exactly one App Language selector.
- Exact English Settings content retained, including Backup & Restore.
- Multilingual Language selector added once.
- TEST-only Language QA added once.
- Existing French/German/Italian translation runtime retained.
- Restore App Backup now preserves a valid current language when importing a backup that contains no valid multilingual language key.
- No backup file can alter the HTML/CSS/nav design because only localStorage data is restored.
