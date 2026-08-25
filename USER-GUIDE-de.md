# KoW Companion — Benutzerhandbuch
## v4.6.0 — TEST / NICHT LIVE

Dieses Handbuch beschreibt den Multilingual-Test-Build v4.6.0.

## Empfohlener Ablauf
1. **Inventar** — alle vorhandenen Ressourcen eingeben und speichern.
2. **Offizier** — Offizier auswählen und aktuellen Fortschritt eingeben/speichern.
3. **Sterne** — Sternfortschritt und Ressourcen prüfen.
4. **Entwicklung** — Freischaltung, Fertigkeitsstränge und Training prüfen.
5. **XP** — aktuelle Offiziersstufe und vorhandene XP-Bücher prüfen.
6. **Fortschritt** — MAXED / IN ARBEIT / NICHT BEGONNEN prüfen.
7. **Planer** — aktuelle und zukünftige Upgrade-Entscheidungen als Vorschau prüfen.
8. **Backup** — vor destruktiven Tests oder größeren Änderungen exportieren.

## Neu in v4.6.0
### Upgrade-Ziele & Empfehlungen
Legen Sie für den ausgewählten Offizier ein zukünftiges Ziel für Stufe, Sterne und Training fest oder wählen Sie **MAX Offizier**. Die Berechnung vergleicht den gespeicherten Stand mit dem gewählten Ziel und zeigt den verbleibenden Ressourcenbedarf. Sie ist nicht destruktiv und verbraucht kein Inventar.

### Dynamische Offiziersdaten
Die App liest den veröffentlichten Datensatz `officers.json` und das Manifest `officer-data-version.json`. Unter Einstellungen zeigt **Globale Offiziersdaten** die aktive Datenversion.

### Prognose zukünftiger Offizierskosten
Die Prognose verwendet die neueste bestätigte saisonale legendäre Offiziersveröffentlichung in der Offiziersdatenbank als Basis. In v4.6.0 ist das bestätigte Beispiel **S7 Panzerjäger — 600 ORV pro Abzeichen / 300 SRV pro Exklusivstern**. Eine neuere bestätigte Veröffentlichung wird automatisch zur neuen Basis.

### Mehrsprachige Pop-ups
Browser-Warnungen und Bestätigungen verwenden die ausgewählte Sprache für Backup/Wiederherstellung, Offiziersfortschritt, MAX-Bestätigung, Planer, Datenbank, CSV, Darstellung und Inventar.

## Arbeitszustands-Persistenz v4.6.0
Eine normale Aktualisierung soll ausgewählten Offizier, aktive Seite, Offiziersfilter, Fortschrittsfilter, Vergleichsfilter/-auswahl, Mehr-Offizier-Planer-Zeilen und Arbeitswerte, erweiterte Planerauswahl, Zukunftsszenarien und Optimierer-Vergleichsoffizier behalten.

Dieser Arbeitszustand bleibt von gespeicherten Offiziersprofilen, Plänen und dem zentralen Inventar getrennt.

## Zentrales Inventar
Gemeinsame Ressourcen einmal eingeben und **Inventar speichern** drücken. Gespeicherte Werte werden in der gesamten App verwendet.

Genehmigte Reihenfolge:
1. Legendäre Offiziersabzeichentruhe
2. Legendäre Offiziersabzeichen-Auswahltruhe
3. Offiziersbereitschaftsgutschein (ORV)
4. Sternbereitschaftsgutschein (SRV)
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
### Legendäre Offiziersabzeichentruhe
Jede Truhe kann entweder als **1 universelles legendäres Abzeichen** oder als **600 ORV** verwendet werden, niemals beides gleichzeitig.

### Legendäre Offiziersabzeichen-Auswahltruhe
Jede Truhe liefert **1 bestimmtes legendäres Offiziersabzeichen** für einen aktuell berechtigten Offizier. Sie wird weder zu ORV noch zu einem Universalabzeichen.

### Original-Legendäre Offiziere
Original-Legendäre können saisonale ORV- oder SRV-Umwandlungen nicht verwenden. Ihre Entwicklung nutzt individuelle Abzeichen, universelle legendäre Abzeichen und andere gültige nicht-saisonale Ressourcen.

## Offiziersfortschritt
Die Offiziersseite speichert Sterne, Stufe, Freischaltung, Fertigkeitsstränge und Training. Das gemeinsame Inventar bleibt global.

**MAX Offizier** setzt 5★, Stufe 70, Freigeschaltet, alle vier Fertigkeitsstränge auf Stufe 5 und Training 180.

## Fertigkeitsstränge
Verfügbarkeit nach Sternstufe:
- 0★ → Strang 1
- 1★ → Stränge 1–2
- 2★ → Stränge 1–3
- 3★+ → alle vier Stränge

Stufe 1 ist kostenlos, sobald ein Strang verfügbar wird.

## Bestätigte Abzeichensummen
- **Legendär:** 10 Freischaltung + 690 Fähigkeiten + 900 Training = **1.600 Abzeichen**.
- **Episch:** 10 Freischaltung + 440 Fähigkeiten + 4.500 Training = **4.950 Abzeichen**.
- **Elite:** 10 Freischaltung + 440 Fähigkeiten + 18.000 Training = **18.450 Abzeichen**.

## Offiziersfortschritt und Vergleich
Fortschritt klassifiziert Offiziere als **MAXED**, **IN ARBEIT** oder **NICHT BEGONNEN**. Gemeinsame Ressourcen erhöhen den gespeicherten Fortschrittsprozentsatz nicht künstlich.

Haupt-Fortschrittsfilter und Vergleichsfilter sind unabhängig. Vergleichsauswahlen sollen eine normale Aktualisierung überstehen.

## Ressourcenoptimierer — Vorschau
Der Ressourcenoptimierer vergleicht den ausgewählten Offizier mit einem zweiten Offizier und kann ORV-Effizienz hervorheben, wenn beide berechtigt sind.

Der Optimierer ist **nur eine Vorschau**. Er verbraucht keine Ressourcen und ändert das gespeicherte Inventar nicht.

## Mehr-Offizier-Upgrade-Planer
Erstellen Sie eine Prioritätenliste von Offizieren und prüfen Sie, wie gemeinsame Ressourcen den verbleibenden Abzeichenbedarf decken könnten.

Der Planer unterstützt:
- benannte Pläne;
- mehrere Offizierszeilen;
- Abzeichenbedarf pro Offizier;
- Prioritäts-/Reihenfolgensteuerung;
- ORV;
- universelle legendäre Abzeichen;
- legendäre Abzeichentruhen;
- legendäre Auswahltruhen;
- Auswahl der Truhenstrategie.

Der Planer ist eine Vorschau und zieht nichts vom Inventar ab.

## Erweiterte Planung und zukünftige Offiziere
Planungssitzungen können gespeicherte Offiziere, alle Sitzungen, die nächste Sitzung oder wiederkehrende Sitzungen wie Oktober Rallye/Garnison, Januar Infanterie, April Panzer und Juli Panzerjäger analysieren.

Zukünftige **PROJIZIERTE** Offiziere sind nur Planungsplatzhalter. Sie werden nicht in die veröffentlichte Datenbank aufgenommen.

Festgelegte Vollausbauwerte:
- **1 Offizier:** 1.600 Abzeichen, 98.000 Sternwert, 199.646.700 XP.
- **2 Offiziere:** 3.200 Abzeichen, 196.000 Sternwert, 399.293.400 XP.

Zukünftige ORV-/SRV-Werte bleiben Prognosen, bis bestätigte Kosten veröffentlicht werden.

## Planungsbereitschafts-Dashboard
Das Dashboard zeigt Abzeichen-, Stern- und XP-Bereitschaft, Gesamtbereitschaft anhand der limitierenden Ressource, ein Prioritätsziel und eine vorgeschlagene nächste Aktion.

## Backup & Wiederherstellung
Unter **Einstellungen → App-Backup exportieren** wird ein portables Backup lokaler Daten erstellt.

Die Wiederherstellung soll Offiziersprofile, individuelle Abzeichen und gemeinsames Inventar importieren und die App anschließend neu laden.

## Sprach-QA
Unter Einstellungen prüft **Sprach-QA / Übersetzungstest** Wörterbücher, tatsächlich gerenderten Inhalt, neue v4.6.0-Funktionen, Pop-ups und die vollständige Abdeckung des Benutzerhandbuchs.

## QA vor Live
Vor der Live-Freigabe prüfen:
- kein Flackern, Pulsieren oder Einfrieren;
- normale Navigation in allen Seiten;
- ausgewählter Offizier und Filter bleiben nach Aktualisierung erhalten;
- Planer und Optimierer bleiben erhalten;
- korrekte Regeln für beide legendären Truhen;
- ORV-/SRV-Beschränkungen für Original-Legendäre;
- genehmigte Inventarreihenfolge;
- kein 50-XP-Buch;
- globales Speichern des Inventars;
- Backup-Export und Wiederherstellung;
- wiederhergestellte Daten überstehen eine Aktualisierung;
- Versionsanzeige v4.6.0;
- TEST / NICHT LIVE-Banner sichtbar.

---
**Erstellt von FireStorm (371)**
