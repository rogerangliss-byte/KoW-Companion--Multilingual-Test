# Officer Portrait QA — v4.3.36 TEST

Portrait handling has been synchronized directly with the working English v4.3.36 LIVE build.

- The officer-portraits folder is copied from the working English LIVE package.
- The portrait filename candidate function is copied from English LIVE.
- Seasonal officers use their existing full Officer name, e.g. `S7 Liora` -> `s7-liora.jpg`.
- Original Officers continue to use plain names, e.g. `Dorothea` -> `dorothea.jpg`.
- The redundant `officer-dorothea.jpg` duplicate was removed; `dorothea.jpg` is canonical.
- A new portrait cache query and service-worker cache key are included to prevent cached failed portrait requests.
- No calculation, MAX Officer, translation, cross-platform, officer database or resource logic was changed.
