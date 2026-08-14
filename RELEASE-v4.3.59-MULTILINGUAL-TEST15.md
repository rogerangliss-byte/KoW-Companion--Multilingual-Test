# KoW Companion Multilingual v4.3.59 TEST 15

## Exact Advanced Planning source-key correction
The actual English HTML paragraph uses:
- `All Officer sessions`
- `Next Officer session`

The translation dictionaries were looking for:
- `All Officer Sessions`
- `Next Officer Session`

Because the translation engine performs exact string matching, the full paragraph translation never matched. Smaller phrase translations then ran instead, producing the mixed English/French, English/German and English/Italian paragraph reported by QA.

TEST 15 changes all three FR/DE/IT dictionary keys to the exact English HTML source string. No QA workaround or timing workaround is used.
