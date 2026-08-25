# KoW Companion — Guida utente
## v4.6.0 — TEST / NON LIVE

Questa guida descrive la build Multilingual Test v4.6.0.

## Flusso consigliato
1. **Inventario** — inserisci e salva tutte le risorse possedute.
2. **Ufficiale** — seleziona un Ufficiale e inserisci/salva il progresso corrente.
3. **Stelle** — verifica il progresso Stelle e le risorse disponibili.
4. **Sviluppo** — verifica Sblocco, Rami abilità e Addestramento.
5. **XP** — verifica il livello corrente e i Libri XP posseduti.
6. **Progressi** — controlla MAXED / IN CORSO / NON INIZIATO.
7. **Pianificatore** — visualizza in anteprima le decisioni di potenziamento attuali e future.
8. **Backup** — esporta un backup prima di test distruttivi o modifiche importanti.

## Novità v4.6.0
### Obiettivi di potenziamento e consigli
Imposta un obiettivo futuro di Livello, Stelle e Addestramento per l’Ufficiale selezionato oppure scegli **Ufficiale MAX**. Il calcolo confronta il progresso salvato con l’obiettivo scelto e mostra le risorse ancora necessarie. È non distruttivo e non consuma l’Inventario.

### Dati dinamici degli Ufficiali
L’app legge il dataset pubblicato `officers.json` e il manifesto `officer-data-version.json`. In Impostazioni, **Dati globali Ufficiali** mostra la versione dati attiva.

### Previsione dei costi dei futuri Ufficiali
La previsione usa come base l’ultima uscita stagionale Leggendaria confermata nella Banca dati Ufficiali. In v4.6.0 l’esempio confermato è **S7 Cacciacarri — 600 ORV per Badge / 300 SRV per Stella esclusiva**. Una nuova uscita confermata più recente diventa automaticamente la nuova base.

### Pop-up multilingue
Gli avvisi e le conferme del browser usano la lingua selezionata per Backup/Ripristino, progresso Ufficiale, conferma MAX, Pianificatore, Banca dati, CSV, Aspetto e Inventario.

## Persistenza dello stato di lavoro v4.6.0
Un normale aggiornamento deve mantenere Ufficiale selezionato, pagina attiva, filtri Ufficiale, filtri Progressi, filtri/selezioni Confronto, righe e valori del Pianificatore multi-Ufficiale, selezioni del Pianificatore avanzato, scenari futuri e Ufficiale di confronto dell’Ottimizzatore.

Questo stato di lavoro rimane separato da profili Ufficiale, piani e Inventario salvati.

## Inventario centrale
Inserisci una volta le risorse condivise e premi **Salva Inventario**. I valori salvati vengono utilizzati in tutta l’app.

Ordine approvato:
1. Cassa Badge Ufficiale Leggendario
2. Cassa di selezione Badge Ufficiale Leggendario
3. Buono preparazione Ufficiale (ORV)
4. Buono preparazione Stella (SRV)
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
### Cassa Badge Ufficiale Leggendario
Ogni cassa può essere usata come **1 Badge Leggendario Universale** oppure come **600 ORV**, mai entrambi contemporaneamente.

### Cassa di selezione Badge Ufficiale Leggendario
Ogni cassa fornisce **1 Badge specifico di Ufficiale Leggendario** per un Ufficiale attualmente idoneo. Non si converte in ORV e non diventa un Badge Universale.

### Ufficiali Leggendari Originali
Gli Ufficiali Leggendari Originali non possono usare le conversioni stagionali ORV o SRV. La loro progressione usa Badge individuali, Badge Leggendari Universali e altre risorse non stagionali valide.

## Progresso Ufficiale
La pagina Ufficiale salva Stelle, Livello, Sblocco, Rami abilità e Addestramento. L’Inventario condiviso rimane globale.

**Ufficiale MAX** imposta 5★, Livello 70, Sbloccato, tutti e quattro i Rami abilità al Livello 5 e Addestramento 180.

## Rami abilità
Disponibilità in base alle Stelle:
- 0★ → Ramo 1
- 1★ → Rami 1–2
- 2★ → Rami 1–3
- 3★+ → tutti e quattro

Il Livello 1 è gratuito quando un Ramo diventa disponibile.

## Totali Badge confermati
- **Leggendario:** 10 Sblocco + 690 Abilità + 900 Addestramento = **1.600 Badge**.
- **Epico:** 10 Sblocco + 440 Abilità + 4.500 Addestramento = **4.950 Badge**.
- **Elite:** 10 Sblocco + 440 Abilità + 18.000 Addestramento = **18.450 Badge**.

## Progressi Ufficiali e Confronto
Progressi classifica gli Ufficiali come **MAXED**, **IN CORSO** o **NON INIZIATO**. Le risorse condivise non aumentano artificialmente la percentuale di progresso salvata.

I filtri principali di Progressi e i filtri di Confronto sono indipendenti. Le selezioni di Confronto devono sopravvivere a un normale aggiornamento.

## Ottimizzatore risorse — Anteprima
L’Ottimizzatore confronta l’Ufficiale selezionato con un secondo Ufficiale e può evidenziare l’efficienza ORV quando entrambi sono idonei.

L’Ottimizzatore è **solo un’anteprima**. Non consuma risorse e non modifica l’Inventario salvato.

## Pianificatore potenziamento multi-Ufficiale
Crea una lista prioritaria di Ufficiali e visualizza come le risorse condivise possono coprire i Badge ancora necessari.

Il Pianificatore supporta:
- piani con nome;
- più righe Ufficiale;
- Badge necessari per Ufficiale;
- controlli di priorità/ordine;
- ORV;
- Badge Leggendari Universali;
- Casse Badge Leggendarie;
- Casse di selezione Leggendarie;
- strategia di utilizzo delle casse.

Il Pianificatore è un’anteprima e non sottrae nulla dall’Inventario.

## Pianificazione avanzata e futuri Ufficiali
Le Sessioni di pianificazione possono analizzare Ufficiali salvati, tutte le sessioni, la prossima sessione oppure sessioni ricorrenti come Ottobre Rally/Guarnigione, Gennaio Fanteria, Aprile Carri e Luglio Cacciacarri.

Gli Ufficiali futuri **PROIETTATI** sono solo segnaposto di pianificazione. Non vengono aggiunti alla Banca dati pubblicata.

Totali stabiliti per un futuro Leggendario:
- **1 Ufficiale:** 1.600 Badge, 98.000 valore Stelle, 199.646.700 XP.
- **2 Ufficiali:** 3.200 Badge, 196.000 valore Stelle, 399.293.400 XP.

I futuri valori ORV/SRV restano previsioni finché i costi confermati non vengono pubblicati.

## Dashboard preparazione pianificazione
Il Dashboard mostra preparazione Badge, Stelle e XP, preparazione complessiva in base alla risorsa limitante, un Obiettivo prioritario e una Prossima azione suggerita.

## Backup e ripristino
Usa **Impostazioni → Esporta Backup App** per creare un backup portatile dei dati locali.

Il ripristino deve reimportare profili Ufficiale, Badge individuali e Inventario condiviso, quindi ricaricare l’app.

## QA lingua
In Impostazioni, **QA lingua / Test traduzione** controlla dizionari, contenuto realmente visualizzato, nuove funzioni v4.6.0, pop-up e copertura completa della Guida utente.

## QA prima del Live
Prima della promozione Live verifica:
- nessuno sfarfallio, pulsazione o blocco;
- navigazione normale in tutte le pagine;
- Ufficiale selezionato e filtri persistono dopo aggiornamento;
- Pianificatore e Ottimizzatore persistono;
- regole corrette per entrambe le casse leggendarie;
- restrizioni ORV/SRV per gli Originali Leggendari;
- ordine approvato dell’Inventario;
- nessun Libro XP 50;
- Salva Inventario funziona globalmente;
- esportazione e ripristino Backup funzionano;
- i dati ripristinati persistono dopo aggiornamento;
- versione visualizzata v4.6.0;
- banner TEST / NON LIVE visibile.

---
**Creato da FireStorm (371)**
