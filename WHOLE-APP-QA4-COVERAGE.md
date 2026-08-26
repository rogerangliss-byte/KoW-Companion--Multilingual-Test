# Whole-App Language QA4

QA4 extends QA3 without weakening its existing checks.

Coverage additions:
- Correct Dashboard root (`dashboard`, replacing nonexistent `home`)
- All main application views
- `skillCostInfoModal`
- `quickProgressModal`
- placeholder, title, aria-label and alt attributes
- select option text and input button values
- controlled calls to available dynamic render functions before scanning
- release calendar/forecast refresh paths
- popup literal inventory for alert/confirm/prompt calls
- coverage manifest embedded in the downloaded QA report

A PASS now requires the existing rendered-language checks across the expanded roots. The downloaded report also records which requested surfaces actually existed and which dynamic renderers were invoked.
