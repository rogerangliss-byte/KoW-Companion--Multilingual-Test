# KoW Companion — Benutzerhandbuch
## Version 4.6.0 MEHRSPRACHIGER TEST — NICHT LIVE

KoW Companion unterstützt Planung, Verfolgung und Prognose der Offiziersentwicklung in *Kiss of War*. Die App verbindet Offiziersfortschritt, gemeinsames Inventar, Upgrade-Berechnungen, Mehr-Offizier-Planung, Prognosen zukünftiger Veröffentlichungen und Backup-Werkzeuge.

## Empfohlener Ablauf
1. **Inventar** — alle vorhandenen Ressourcen eingeben und speichern.
2. **Offizier** — Offizier wählen und aktuellen Fortschritt eingeben.
3. **Sterne** — Sternfortschritt und verfügbare Sternressourcen bestätigen.
4. **Entwicklung** — Freischaltung, Fertigkeitsstränge und Training eingeben.
5. **XP** — aktuelle Stufe und vorhandene XP-Bücher bestätigen.
6. **Fortschritt** — MAXIMIERT, IN ARBEIT und NICHT BEGONNEN prüfen.
7. **Planer** — Upgrades für einen oder mehrere Offiziere modellieren.
8. **Upgrade-Ziele** — aktuellen Stand mit einem gewählten Ziel vergleichen.
9. **Veröffentlichungen** — wiederkehrenden Kalender und Zukunftskosten prüfen.
10. **Backup** — regelmäßig ein App-Backup exportieren.

# Neu in v4.6.0
- **Upgrade-Ziele & Empfehlungen**
- **Dynamische Offiziersdaten**
- **Globale Offiziersdaten**
- **Datenbankgesteuerte Prognose zukünftiger Offizierskosten**
- Verbesserte Planung zukünftiger Offiziere
- Arbeitszustand bleibt bei normalem Aktualisieren erhalten
- Planungs-, Inventar- und Backup-Funktionen aus v4.5.0 bleiben erhalten

# Upgrade-Ziele & Empfehlungen
Das System berechnet zerstörungsfrei, was zwischen dem gespeicherten Stand und einem Ziel fehlt. Ziele können Offiziersstufe, Sternstufe, Training oder MAX-Offizier umfassen.

**MAX-Offizier** bedeutet 5 Sterne, Stufe 70, freigeschaltet, alle vier Fertigkeitsstränge auf Stufe 5 und Training 180. Die Berechnung verbraucht nichts aus dem zentralen Inventar.

# Dynamische Offiziersdaten
v4.6.0 trennt veröffentlichte Offiziersdaten von der Hauptlogik. Dazu gehören Name, Saison, Seltenheit, Rolle/Typ, ORV-Kosten, SRV-Kosten, Bereitschaftsberechtigung und zugehörige Daten. Der veröffentlichte Datensatz ist unter **Einstellungen → Globale Offiziersdaten** prüfbar.

Neue Veröffentlichungen müssen zuerst in Test ergänzt und validiert werden, bevor sie nach Live übernommen werden.

# Prognose zukünftiger Offizierskosten
Sie schätzt mögliche ORV- und SRV-Kosten zukünftiger saisonaler legendärer Offiziere.

## Dynamische Prognosebasis
Als Basis dient die neueste bestätigte saisonale legendäre Veröffentlichung in der Offiziersdatenbank.

**Beispiel:** Bei v4.6.0 ist die neueste bestätigte Veröffentlichung **S7 Panzerjäger** mit **600 ORV pro Abzeichen und 300 SRV pro Exklusivstern**. Wird eine neuere bestätigte Veröffentlichung publiziert, rückt die Basis automatisch vor.

Prognosewerte sind nur Planungswerte und keine bestätigten Spielkosten.

## Wiederkehrende Veröffentlichungsfolge
- **Oktober — Rallye / Garnison**
- **Januar — Infanterie**
- **April — Panzer**
- **Juli — Panzerjäger**

Nach Juli folgt in der nächsten Saison wieder Oktober Rallye / Garnison.

## Prognosewachstum
Standardannahme: **20 % Wachstum pro Veröffentlichung**, frei änderbar. Angezeigt werden ORV pro Abzeichen, SRV pro Exklusivstern sowie prognostizierte ORV- und SRV-Gesamtsummen.

# Zentrales Inventar
Gemeinsame Ressourcen einmal eingeben und **Inventar speichern** drücken. Danach werden sie appweit verwendet.

Genehmigte Reihenfolge:
1. Legendäre Offiziersabzeichentruhe
2. Legendäre Offiziersabzeichen-Auswahltruhe
3. Offiziersbereitschaftsgutschein (ORV)
4. Sternbereitschaftsgutschein (SRV)
5. Universelles legendäres Offiziersabzeichen
6. Universelles episches Offiziersabzeichen
7. Universelles Elite-Offiziersabzeichen
8. Individuelle Offiziersabzeichen
9. Elite-Sterne I / II / III
10. Epische Sterne I / II / III
11. Legendäre Sterne I / II / III
12. XP-Bücher — 100 / 500 / 1.000 / 5.000 / 10.000 / 20.000 / 50.000

Es gibt **kein 50-XP-Buch**.

# Regeln für legendäre Truhen
## Legendäre Offiziersabzeichentruhe
Jede Truhe kann **entweder als 1 universelles legendäres Abzeichen oder als 600 ORV** verwendet werden. Nie beides gleichzeitig.

## Legendäre Offiziersabzeichen-Auswahltruhe
Jede Truhe liefert **1 bestimmtes legendäres Offiziersabzeichen** für einen aktuell berechtigten Offizier. Keine Umwandlung in ORV oder Universalabzeichen.

# Originale legendäre Offiziere
Sie verwenden keine saisonale ORV/SRV-Umwandlung. Ihre Entwicklung nutzt passende Ressourcen wie individuelle und universelle legendäre Abzeichen. Der Planer darf ihnen keine ORV oder SRV zuweisen.

# Offiziersfortschritt
Der Offiziersbereich speichert Sterne, Stufe, Freischaltung, Fertigkeitsstränge und Training je Offizier. Gemeinsame Ressourcen bleiben im zentralen Inventar.

## Fertigkeitsstränge
- **0★** — Strang 1
- **1★** — Stränge 1–2
- **2★** — Stränge 1–3
- **3★ oder höher** — alle vier Stränge

Stufe 1 ist kostenlos, sobald ein Strang verfügbar wird.

# Bestätigte Abzeichenanforderungen
- **Legendär:** 10 Freischaltung + 690 Fähigkeiten + 900 Training = **1.600 Abzeichen**
- **Episch:** 10 + 440 + 4.500 = **4.950 Abzeichen**
- **Elite:** 10 + 440 + 18.000 = **18.450 Abzeichen**

# Fortschritt & Vergleich
Fortschritt klassifiziert als **MAXIMIERT**, **IN ARBEIT** oder **NICHT BEGONNEN**. Nur im Inventar gehaltene Ressourcen erhöhen den gespeicherten Entwicklungsprozentsatz nicht. Fortschritts- und Vergleichsfilter arbeiten unabhängig; Arbeitseinstellungen bleiben nach normalem Aktualisieren erhalten.

# Ressourcenoptimierer
Er vergleicht Entwicklungsoptionen und kann ORV-Effizienz hervorheben, wenn beide Offiziere berechtigt sind. Nur Vorschau: keine Ressourcen werden verbraucht.

# Mehr-Offizier-Upgrade-Planer
Mehrere Offiziere werden priorisiert und gemeinsame Ressourcen gegen verbleibende Abzeichenanforderungen geprüft. Unterstützt werden ORV, Universalabzeichen, Truhen, Auswahltruhen und Truhenstrategien. Planung ist nicht destruktiv.

# Erweiterte Planung und zukünftige Offiziere
Sitzungen können gespeicherte Offiziere, Alle Sitzungen, Nächste Sitzung, Oktober Rallye/Garnison, Januar Infanterie, April Panzer und Juli Panzerjäger modellieren. **PROJIZIERTE** Offiziere sind Planungsplatzhalter und nicht bestätigt.

Vollausbau eines projizierten legendären Offiziers: **1.600 Abzeichen, 98.000 Sternwert und 199.646.700 XP**. Für zwei: **3.200 Abzeichen, 196.000 Sternwert und 399.293.400 XP**.

# Bereitschafts-Dashboard
Es bewertet gespeicherte Szenarien anhand verfügbarer Ressourcen: Abzeichen-, Stern- und XP-Bereitschaft, Gesamtbereitschaft, Prioritätsziel und empfohlene nächste Aktion. Die knappste Ressource bestimmt die Gesamtbereitschaft.

# Arbeitszustands-Persistenz
Normales Aktualisieren erhält unter anderem ausgewählten Offizier, aktuelle Seite, Filter, Vergleiche, Planerzeilen, erweiterte Auswahl, Zukunftsszenariofelder und Vergleichsoffizier des Optimierers. Das ist getrennt von dauerhaft gespeicherten Profilen, Plänen und Inventar.

# Wiederkehrender Veröffentlichungskalender
Die Seite Veröffentlichungen zeigt den Jahreszyklus und erkennt aktuelle Periode und nächste Veröffentlichung automatisch: **Oktober Rallye/Garnison → Januar Infanterie → April Panzer → Juli Panzerjäger**, danach Wiederholung.

# Offiziersdatenbank
Sie steuert die Hauptliste und unterstützt Suche, Saisonfilter, Hinzufügen/Bearbeiten/Löschen, CSV-Export/Import und Wiederherstellung veröffentlichter Standarddaten. Neue bestätigte Veröffentlichungen werden vor Live getestet und können die Prognosebasis automatisch vorziehen.

# Backup & Wiederherstellung
Unter **Einstellungen → App-Backup exportieren** ein portables Backup erstellen. Vor größeren Änderungen ein bekannt gutes Backup behalten. Nach Wiederherstellung prüfen, ob die Daten auch nach Neuladen vorhanden sind.

# Wichtiges Planungsprinzip
KoW Companion trennt **bestätigte Daten** von **Prognosedaten**. Bestätigte Datenbankkosten gelten als bekannt; Zukunftskosten sind Schätzungen. Sobald ein Offizier offiziell veröffentlicht ist, ersetzen bestätigte Werte die Prognoseannahmen.

---
**Erstellt von FireStorm (371)**