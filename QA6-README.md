# QA6 Whole-App Scanner

QA6 replaces the stalled whole-app QA attempt.

Key properties:
- Scans one root at a time.
- Hard timeout: 1.2 seconds per root.
- Progress display updates continuously.
- Missing roots and timeouts are FAIL, never PASS.
- Covers Dashboard, Progress, Officer, Inventory, Stars, Development, XP, Planner, Database, Releases, Settings, Help, and two known modals.
- Scans rendered text, placeholder/title/aria-label/alt attributes, select options and button values.
- Invokes available dynamic render functions before scanning.
- Audits alert/confirm/prompt literals.
- Downloadable JSON remains available after completion.
- Main application code and multilingual runtime are unchanged.
