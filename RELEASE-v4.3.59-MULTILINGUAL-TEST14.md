# KoW Companion Multilingual v4.3.59 TEST 14

## Root-cause Advanced Planning translation fix
- Found the actual defect: the French, German and Italian translation dictionaries used partially translated/mixed-language strings as the lookup KEY for the Advanced Planning paragraph.
- Replaced all three malformed keys with the exact English source paragraph used by the interface.
- Existing full French, German and Italian translated VALUES are retained.
- Removed the TEST 12/13 compensating render/timing hooks.
- QA now scans the normally rendered interface again.
- Working language selector, bottom navigation, Settings and Backup/Restore are unchanged.
