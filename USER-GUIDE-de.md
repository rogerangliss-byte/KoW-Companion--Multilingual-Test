# KoW Companion v4.6.0 — Deutsches Benutzerhandbuch

## ✨ Neu in v4.6.0 MULTILINGUAL TEST — NOT LIVE


### 💾 Native Speicherung des Arbeitszustands

Eine normale Browser-Aktualisierung behält die Arbeitsoberfläche an der aktuellen Stelle, statt wichtige Steuerelemente auf Standardwerte zurückzusetzen.

- Selected Offizier and current app tab/page.
- Offizier Search, Season, Rarity and Role filters.
- Filter für Offizierfortschritt: MAXED / IN BEARBEITUNG / NICHT BEGONNEN.
- Vergleich Offizier Fortschritt filters and selected Offiziers.
- Multi-Offizier Planer rows, Offizier selections, badge requirements and working resource fields.
- Advanced Planer/session selections, future scenario fields and Resource Optimiser comparison Offizier.
Gespeicherte Offiziersprofile, Pläne und das zentrale Inventar bleiben von diesem temporären Arbeitszustand getrennt.


### 📦 Korrekte Regeln für legendäre Truhen

- Legendary Offizier Badge Chest: each chest can be verwendet as either 1 Universal Legendary Badge or 600 Offizier Readiness Vouchers (ORV) . It cannot count as both.
- Legendäre Offiziersabzeichen-Auswahltruhe: each chest gives 1 specific Legendary Offizier Badge für einen Offizier, der derzeit im Auswahltruhen-Pool verfügbar ist. Sie not convert to ORV or a Universal Legendary Badge.
- Original Legendary Offiziers remain ineligible for ORV/SRV seasonal conversion routes.

### 🧮 Ressourcenoptimierer — Vorschau

Wählen Sie einen zweiten Offizier unter Vergleich with Offizier um die Abzeicheneffizienz einschließlich der ORV-Kosten pro Offiziersabzeichen zu vergleichen. Der Optimierer ist nur eine Vorschau und verbraucht oder verändert keine gespeicherten Ressourcen.


### 👥 Mehr-Offizier-Upgrade-Planer

Create a priority list of Offiziers and preview how shared badge resources could be allocated without changing normal saved Inventar. The Planer supports named plans, multiple Offizier rows, per-Offizier badge requirements, priority/order controls, ORV, Universal Legendary Badges, Badge Chests, Selection Chests and selectable Badge Chest strategy.


### 📋 Reihenfolge des zentralen Inventars

Das Inventar folgt nun der genehmigten Order in List sequence rather than spreadsheet row order:

- Legendary Offizier Badge Chest
- Legendäre Offiziersabzeichen-Auswahltruhe
- Offizier Readiness Voucher (ORV)
- Star Readiness Voucher (SRV)
- Legendary Offizier Badge
- Epic Offizier Badge
- Elite Offizier Badge
- Individuelle Offiziersabzeichen in the approved numbered order
- Elite Sterne I–III
- Epic Sterne I–III
- Legendary Sterne I–III
- XP Books: 100, 500, 1,000, 5,000, 10,000, 20,000 and 50,000
The non-game 50 XP Book entry has been removed.


### 📊 Fortschritt und Vergleich

Offizier Fortschritt continues to classify Offiziers as MAXED , IN PROGRESS or NOT STARTED . Shared Inventar does not artificially increase an Offizier's saved progress percentage. Vergleich Offizier Fortschritt uses actual saved Offizier progress.


### 🏅 Bestätigte Gesamtzahlen für Offiziersabzeichen

- Legendary: 10 unlock + 690 Skills + 900 Training = 1,600 Abzeichen to MAX .
- Epic: 10 unlock + 440 Skills + 4,500 Training = 4,950 Abzeichen to MAX .
- Elite: 10 unlock + 440 Skills + 18,000 Training = 18,450 Abzeichen to MAX .

### 🧭 Planung aus v4.4.0 beibehalten

Planning Readiness Dashboard, Badge/Star/XP readiness, Priority Ziel, Suggested Next Action, future Oktober/Januar/April/Juli sessions, Season + Offizier Type reports, projected future Legendary resources, ORV/SRV forecasting and MAXED-Offizier exclusions remain verfügbar.


### 🔮 Dynamische Prognose zukünftiger Offizierskosten

The forecast now uses the latest confirmed Legendary seasonal Offizier release in the Offizier Datenbank as its baseline. Example: bei Veröffentlichung von v4.6.0 ist die neueste bestätigte Basis S7 Panzerjäger — 600 ORV pro Abzeichen / 300 SRV pro Exklusivstern . When a newer confirmed release is published, the baseline automatically advances.

Future ORV/SRV figures are planning estimates only bis die tatsächlichen Veröffentlichungskosten bestätigt sind.


## 1. Inventar

Beginnen Sie hier. Geben Sie Ihre aktuell vorhandenen Ressourcen ein und drücken Sie Save Inventar . Das Inventar wird in der gesamten App gemeinsam genutzt, daher müssen diese Ressourcensummen nur an einer Stelle gepflegt werden.

Inventar includes Offizier Readiness Vouchers (ORV) , Star Readiness Vouchers (SRV) , universelle legendäre/epische/Elite-Abzeichen, legendäre Offiziersabzeichentruhen und Auswahltruhen, legendäre/epische/Elite-Sterne, XP-Bücher und individuelle Offiziersabzeichen.

For individual Offizier Badges, enter quantities against the appropriate Offizier. Each Offizier's badge quantity is stored separately. Update Inventar whenever your in-game resources change, then save it before planning upgrades.


## 2. Offizier

Use Search , Season and Offizier Type / Role filters to narrow the Offizier list. Select the Offizier you want to calculate. A matching portrait is displayed automatically when its file is verfügbar in the officer-portraits folder.

Der ausgewählte Offizier bestimmt die Kosten eines Offiziersabzeichens in Offizier Readiness Vouchers (ORV) und die Kosten eines Exklusivsterns in Star Readiness Vouchers (SRV) .

The Offizier-Upgrade-Zusammenfassung shows the verbleibend Offizier Badges, Offizier Sterne and Offizier XP for the currently selected Offizier.

Original Offiziere : Offizier Readiness Vouchers (ORV) and Star Readiness Vouchers (SRV) cannot be verwendet for Original Offiziers.


## 3. Sterne

Legen Sie die aktuelle und die Ziel-Sternstufe des Offiziers fest. Der Sterne-Tab folgt automatisch der Seltenheit des ausgewählten Offiziers: Legendär, Episch oder Elite Stern I / II / III. Star Readiness Vouchers (SRV) are shown only for Legendary Offiziers and cannot be verwendet by Epic or Elite Offiziers.


## 4. Entwicklung

Geben Sie den Freischaltstatus, die vier unabhängigen Fertigkeitsstrang-Stufen und die Trainingsstufe ein. Entwicklung verwendet die relevanten gespeicherten Inventarressourcen bei der Berechnung dessen, was für den ausgewählten Offizier verfügbar ist.

Each Universal Legendary Badge is worth 1 Offizier Badge for a Legendary Offizier.

Each Legendäre Offiziersabzeichen-Auswahltruhe gives 1 specific Legendary Offizier Badge für einen Offizier, der derzeit in dieser Truhe verfügbar ist. Sie wird nicht in ORV umgewandelt. Jede Legendary Offizier Badge Chest can instead be verwendet as either 1 Universal Legendary Badge or 600 ORV .


## 5. XP

Geben Sie aktuelle und Zielstufe ein. Gespeicherte XP-Bücher werden zur Berechnung vorhandener, benötigter und fehlender XP verwendet.


## 6. Planer und Ressourcenoptimierer

Use Planer after entering Inventar and the Offizier's Sterne, Entwicklung and XP progress. Select a goal such as Max Offizier, Nächster Stern, 5★ erreichen, Max Skills or Max Training to see requirements, resources vorhanden and Fehlbestands.

The Resource Optimiser ermöglicht die Auswahl eines zweiten Offiziers in Vergleich with Offizier . Er vergleicht die Kosten in Offiziersbereitschaftsgutscheinen (ORV) pro Offiziersabzeichen für die beiden Offiziere.

How to interpret the recommendation: wenn beide Offiziere ORV verwenden können, empfiehlt der Optimierer, ORV beim Offizier mit dem niedrigeren ORV-Kosten pro Abzeichen and favouring shared Universelle legendäre Abzeichen / Legendäre Offiziersabzeichentruhen beim Offizier mit dem höheren ORV-Kosten pro Abzeichen . This protects the more expensive Offizier from unnecessary ORV spending.

The optimiser is nur Vorschau . It does not automatically spend, allocate or change your saved resources.


## 7. Mehr-Offizier-Upgrade-Planer

Der Mehr-Offizier-Planer ermöglicht das Erstellen einer Prioritätenliste mehrerer Offiziere, das Festlegen der noch benötigten Offiziersabzeichen und eine Vorschau darauf, wie gemeinsame ORV, universelle legendäre Abzeichen und legendäre Offiziersabzeichentruhen den Plan abdecken könnten.

Pläne sind nur Vorschauen und verändern das gespeicherte Inventar nicht. Benannte Pläne können lokal gespeichert und später geladen werden.


## 8. Fortschritt speichern

Offizier MAX: Verwenden Sie die Schaltfläche ⭐ Offizier MAX, um den ausgewählten Offizier auf 5 Sterne, Stufe 70, freigeschaltet, alle 4 Fertigkeitsstränge auf Stufe 5 und Trainingsstufe 180 zu setzen. Das Offiziersprofil wird sofort gespeichert. Gemeinsames Inventar wird nicht verbraucht oder verändert.

Use Fortschritt speichern after entering or changing Offizier progress information. Fortschritt is stored locally in the browser on the current device. Fortschritt speichern does not publish your personal data to other users.


## 9. Datenbank

Der Datenbankmanager verwaltet die Offiziers-Stammliste. Verwenden Sie ihn zum Hinzufügen oder Bearbeiten von Offizieren und zum Exportieren der Datenbank. Export CSV exportiert die Offiziersdatenbank; dies unterscheidet sich von Fortschritt speichern und App-Sicherung.

Um neue oder bearbeitete Offiziere für alle zu veröffentlichen, aktualisieren Sie die veröffentlichten officers.json and officers.csv files in the GitHub repository.


## 10. Wiederkehrender Veröffentlichungskalender

The Veröffentlichungen zeigt den wiederkehrenden jährlichen KoW-Veröffentlichungszyklus von August bis Juli. Der aktuelle Monat und die nächste geplante Veröffentlichung werden automatisch hervorgehoben; ein jährlicher Reset ist daher nicht erforderlich.


## 11. Einstellungen, Backup & Wiederherstellung

Einstellungen contains the app name, portrait and landscape backgrounds, update controls and Sicherung und Wiederherstellung .

App-Backup exportieren creates a JSON backup of KoW Companion data stored locally by the browser. Keep this file somewhere safe. App-Backup wiederherstellen loads a previously exported JSON backup and reloads the app.

Nach Updates suchen vergleicht die installierte Version mit der veröffentlichten Version. Neueste Version laden refreshes the KoW Companion application cache without intentionally deleting saved calculator progress.


## Begriffe

ORV = Offizier Readiness Voucher SRV = Star Readiness Voucher Universal Legendary Badge = 1 Offizier Badge for a Legendary Offizier Exclusive Star = 110 Offizier Sternwert

