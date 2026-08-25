# KoW Companion — Guida utente
## v4.6.0 — TEST / NON LIVE

Questa guida descrive la build Multilingual Test v4.6.0.

## Novità v4.6.0
### Obiettivi di potenziamento e consigli
Imposta un obiettivo futuro di Livello, Stelle e Addestramento per l’Ufficiale selezionato oppure scegli **Ufficiale MAX**. Il calcolo confronta il progresso salvato con l’obiettivo e mostra le risorse ancora necessarie. È non distruttivo e non consuma l’Inventario.

### Dati dinamici degli Ufficiali
L’app legge il dataset pubblicato `officers.json` e il manifesto `officer-data-version.json`. In Impostazioni, **Dati globali Ufficiali** mostra la versione dati attiva.

### Previsione dei costi dei futuri Ufficiali
La previsione usa come base l’ultima uscita stagionale Leggendaria confermata nella Banca dati Ufficiali. In v4.6.0 l’esempio confermato è **S7 Cacciacarri — 600 ORV per Badge / 300 SRV per Stella esclusiva**. Una nuova uscita confermata più recente diventa automaticamente la nuova base.

### Pop-up multilingue
Gli avvisi e le conferme del browser sono tradotti in English, Français, Deutsch o Italiano, compresi Backup/Ripristino, progresso Ufficiale, conferma MAX, Pianificatore, Banca dati, CSV, Aspetto e Inventario.

## Flusso consigliato
1. **Inventario** — inserisci e salva tutte le risorse possedute.
2. **Ufficiale** — seleziona un Ufficiale e salva il progresso corrente.
3. **Stelle** — verifica progresso e risorse Stelle.
4. **Sviluppo** — verifica Sblocco, Rami abilità e Addestramento.
5. **XP** — verifica livello corrente e Libri XP posseduti.
6. **Progressi** — controlla MAXED / IN CORSO / NON INIZIATO.
7. **Pianificatore** — visualizza in anteprima decisioni di potenziamento attuali e future.
8. **Backup** — esporta un backup prima di test distruttivi o modifiche importanti.

## Persistenza dello stato di lavoro v4.6.0
Un normale aggiornamento deve mantenere Ufficiale selezionato, pagina attiva, filtri Ufficiale/Progressi/Confronto, selezioni di confronto, righe del Pianificatore multi-Ufficiale, selezioni del Pianificatore avanzato, scenari futuri e Ufficiale di confronto dell’Ottimizzatore. Questo stato di lavoro resta separato da profili, piani e Inventario salvati.

## Inventario centrale
Inserisci una volta le risorse condivise e premi **Salva Inventario**. Ordine approvato:
1. Cassa Badge Ufficiale Leggendario
2. Cassa di selezione Badge Ufficiale Leggendario
3. ORV
4. SRV
5. Badge Ufficiale Leggendario Universale
6. Badge Ufficiale Epico Universale
7. Badge Ufficiale Elite Universale
8. Badge individuali degli Ufficiali nell’ordine numerato approvato
9. Stelle Elite I / II / III
10. Stelle Epiche I / II / III
11. Stelle Leggendarie I / II / III
12. Libri XP: 100 / 500 / 1.000 / 5.000 / 10.000 / 20.000 / 50.000

Non esiste un Libro XP 50 in questa build.

## Regole delle casse leggendarie
**Cassa Badge Ufficiale Leggendario:** ogni cassa può essere usata come **1 Badge Leggendario Universale** oppure come **600 ORV**, mai entrambi.

**Cassa di selezione Badge Ufficiale Leggendario:** ogni cassa fornisce **1 Badge specifico di Ufficiale Leggendario** per un Ufficiale attualmente idoneo. Non si converte in ORV e non diventa un Badge Universale.

**Ufficiali Leggendari Originali:** non possono usare le conversioni stagionali ORV/SRV.

## Progresso Ufficiale
**Ufficiale MAX** imposta 5★, Livello 70, Sbloccato, tutti e quattro i Rami abilità a Livello 5 e Addestramento 180.

Sblocco Rami: 0★ → Ramo 1; 1★ → Rami 1–2; 2★ → Rami 1–3; 3★+ → tutti e quattro. Il Livello 1 è gratuito quando un Ramo diventa disponibile.

Totali confermati: **Leggendario 1.600**, **Epico 4.950**, **Elite 18.450 Badge**.

## Progressi, Confronto e Ottimizzatore
Progressi classifica gli Ufficiali come **MAXED**, **IN CORSO** o **NON INIZIATO**. Le risorse condivise non aumentano artificialmente la percentuale salvata. L’Ottimizzatore confronta due Ufficiali, inclusa l’efficienza ORV, ma resta solo un’anteprima e non consuma risorse.

## Pianificatore multi-Ufficiale
Crea una lista di priorità e visualizza la copertura dei Badge con ORV, Badge Universali, Casse e Casse di selezione. I piani possono essere nominati e salvati. Il Pianificatore non sottrae nulla dall’Inventario.

## Pianificazione avanzata e futuri Ufficiali
Le sessioni possono analizzare Ufficiali salvati, tutte le sessioni, la prossima sessione oppure Ottobre Rally/Guarnigione, Gennaio Fanteria, Aprile Carri e Luglio Cacciacarri. Gli Ufficiali **PROIETTATI** sono solo segnaposto di pianificazione e non vengono aggiunti alla banca dati pubblicata.

Per un futuro Leggendario: **1 Ufficiale = 1.600 Badge, 98.000 valore Stelle, 199.646.700 XP**. I futuri valori ORV/SRV restano previsioni fino alla pubblicazione.

## Backup e ripristino
**Impostazioni → Esporta Backup App** crea un backup portatile dei dati locali. Il ripristino reimporta profili, Badge individuali e Inventario condiviso, quindi ricarica l’app.

## QA lingua
In Impostazioni, **QA lingua / Test traduzione** controlla Français, Deutsch e Italiano per traduzioni mancanti, testo ancora in inglese, nuove funzioni v4.6.0 e pop-up.

---
**Creato da FireStorm (371)**
