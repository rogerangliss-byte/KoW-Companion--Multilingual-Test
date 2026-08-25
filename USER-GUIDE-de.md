# KoW Companion — Benutzerhandbuch
## v4.6.0 — TEST / NICHT LIVE

Dieses Handbuch beschreibt den Multilingual-Test-Build v4.6.0.

## Neu in v4.6.0
### Upgrade-Ziele & Empfehlungen
Legen Sie für den ausgewählten Offizier ein zukünftiges Ziel für Stufe, Sterne und Training fest oder wählen Sie **MAX Offizier**. Die Berechnung vergleicht den gespeicherten Stand mit dem Ziel und zeigt die noch benötigten Ressourcen. Sie ist nicht destruktiv und verbraucht kein Inventar.

### Dynamische Offiziersdaten
Die App liest den veröffentlichten Datensatz `officers.json` und das Manifest `officer-data-version.json`. Unter Einstellungen zeigt **Globale Offiziersdaten** die aktive Datenversion.

### Prognose zukünftiger Offizierskosten
Die Prognose verwendet die neueste bestätigte saisonale legendäre Offiziersveröffentlichung in der Offiziersdatenbank als Basis. In v4.6.0 ist das bestätigte Beispiel **S7 Panzerjäger — 600 ORV pro Abzeichen / 300 SRV pro Exklusivstern**. Eine neuere bestätigte Veröffentlichung wird automatisch zur neuen Basis.

### Mehrsprachige Pop-ups
Browser-Warnungen und Bestätigungen werden in English, Français, Deutsch oder Italiano übersetzt, einschließlich Backup/Wiederherstellung, Offiziersfortschritt, MAX-Bestätigung, Planer, Datenbank, CSV, Darstellung und Inventar.

## Empfohlener Ablauf
1. **Inventar** — alle vorhandenen Ressourcen eingeben und speichern.
2. **Offizier** — Offizier wählen und aktuellen Fortschritt speichern.
3. **Sterne** — Sternfortschritt und Ressourcen prüfen.
4. **Entwicklung** — Freischaltung, Fertigkeitsstränge und Training prüfen.
5. **XP** — aktuelle Stufe und vorhandene XP-Bücher prüfen.
6. **Fortschritt** — MAXED / IN ARBEIT / NICHT BEGONNEN prüfen.
7. **Planer** — aktuelle und zukünftige Upgrade-Entscheidungen als Vorschau prüfen.
8. **Backup** — vor destruktiven Tests oder größeren Änderungen exportieren.

## Arbeitszustands-Persistenz v4.6.0
Eine normale Aktualisierung soll ausgewählten Offizier, aktive Seite, Offiziers-/Fortschritts-/Vergleichsfilter, Vergleichsauswahl, Mehr-Offizier-Planer-Zeilen, erweiterte Planerauswahl, Zukunftsszenarien und Optimierer-Vergleichsoffizier behalten. Dieser Arbeitszustand bleibt von gespeicherten Profilen, Plänen und Inventar getrennt.

## Zentrales Inventar
Gemeinsame Ressourcen einmal eingeben und **Inventar speichern** drücken. Genehmigte Reihenfolge:
1. Legendäre Offiziersabzeichentruhe
2. Legendäre Offiziersabzeichen-Auswahltruhe
3. ORV
4. SRV
5. Universelles legendäres Offiziersabzeichen
6. Universelles episches Offiziersabzeichen
7. Universelles Elite-Offiziersabzeichen
8. Individuelle Offiziersabzeichen in genehmigter Nummernfolge
9. Elite-Sterne I / II / III
10. Epische Sterne I / II / III
11. Legendäre Sterne I / II / III
12. XP-Bücher: 100 / 500 / 1.000 / 5.000 / 10.000 / 20.000 / 50.000

Ein 50-XP-Buch gibt es in diesem Build nicht.

## Regeln für legendäre Truhen
**Legendäre Offiziersabzeichentruhe:** jede Truhe kann entweder als **1 universelles legendäres Abzeichen** oder als **600 ORV** verwendet werden, niemals beides.

**Legendäre Offiziersabzeichen-Auswahltruhe:** jede Truhe gibt **1 bestimmtes legendäres Offiziersabzeichen** für einen aktuell berechtigten Offizier. Sie wird weder zu ORV noch zu einem Universalabzeichen.

**Original-Legendäre:** saisonale ORV-/SRV-Umwandlungen sind nicht zulässig.

## Offiziersfortschritt
**MAX Offizier** setzt 5★, Stufe 70, Freigeschaltet, alle vier Fertigkeitsstränge auf Stufe 5 und Training 180.

Strangfreischaltung: 0★ → Strang 1; 1★ → Stränge 1–2; 2★ → Stränge 1–3; 3★+ → alle vier. Stufe 1 ist beim Freischalten kostenlos.

Bestätigte Summen: **Legendär 1.600**, **Episch 4.950**, **Elite 18.450 Abzeichen**.

## Fortschritt, Vergleich und Optimierer
Fortschritt klassifiziert Offiziere als **MAXED**, **IN ARBEIT** oder **NICHT BEGONNEN**. Gemeinsame Ressourcen erhöhen den gespeicherten Prozentsatz nicht künstlich. Der Ressourcenoptimierer vergleicht zwei Offiziere einschließlich ORV-Effizienz, bleibt aber eine Vorschau und verbraucht nichts.

## Mehr-Offizier-Upgrade-Planer
Erstellen Sie eine Prioritätenliste und prüfen Sie die Abzeichendeckung mit ORV, Universalabzeichen, Truhen und Auswahltruhen. Benannte Pläne können gespeichert werden. Der Planer zieht nichts vom Inventar ab.

## Erweiterte Planung und zukünftige Offiziere
Sitzungen können gespeicherte Offiziere, alle Sitzungen, die nächste Sitzung oder Oktober Rallye/Garnison, Januar Infanterie, April Panzer und Juli Panzerjäger analysieren. **PROJIZIERTE** Offiziere sind nur Planungsplatzhalter und werden nicht in die veröffentlichte Datenbank aufgenommen.

Für einen zukünftigen Legendären: **1 Offizier = 1.600 Abzeichen, 98.000 Sternwert, 199.646.700 XP**. Zukünftige ORV-/SRV-Werte bleiben Prognosen bis zur Veröffentlichung.

## Backup & Wiederherstellung
**Einstellungen → App-Backup exportieren** erstellt ein portables Backup lokaler Daten. Wiederherstellung importiert Profile, individuelle Abzeichen und gemeinsames Inventar und lädt die App neu.

## Sprach-QA
Unter Einstellungen prüft **Sprach-QA / Übersetzungstest** Français, Deutsch und Italiano auf fehlende Übersetzungen, verbliebenen englischen Text, neue v4.6.0-Funktionen und Pop-ups.

---
**Erstellt von FireStorm (371)**
