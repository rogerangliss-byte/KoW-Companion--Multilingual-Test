# KoW Companion — Guida utente
## Versione 4.6.0 TEST MULTILINGUE — NON LIVE

KoW Companion aiuta a pianificare, monitorare e prevedere lo sviluppo degli Ufficiali in *Kiss of War*. Riunisce progresso Ufficiali, Inventario condiviso, calcoli di potenziamento, pianificazione multi-Ufficiale, previsione delle uscite future e strumenti di backup.

## Flusso consigliato
1. **Inventario** — inserisci e salva tutte le risorse possedute.
2. **Ufficiale** — seleziona un Ufficiale e inserisci il progresso attuale.
3. **Stelle** — conferma progresso e risorse Stella disponibili.
4. **Sviluppo** — inserisci Sblocco, Rami abilità e Addestramento.
5. **XP** — conferma Livello attuale e Libri XP posseduti.
6. **Progressi** — controlla MASSIMIZZATI, IN CORSO e NON INIZIATI.
7. **Pianificatore** — modella potenziamenti per uno o più Ufficiali.
8. **Obiettivi di potenziamento** — confronta la posizione attuale con un obiettivo.
9. **Uscite** — consulta calendario ricorrente e previsioni dei costi futuri.
10. **Backup** — esporta periodicamente un Backup dell’app.

# Novità di v4.6.0
- **Obiettivi di potenziamento e consigli**
- **Dati dinamici degli Ufficiali**
- **Informazioni Dati globali Ufficiali**
- **Previsione costi futuri basata sulla Banca dati**
- Pianificazione migliorata dei futuri Ufficiali
- Persistenza dello stato di lavoro dopo un normale aggiornamento
- Funzioni v4.5.0 di pianificazione, Inventario e backup mantenute

# Obiettivi di potenziamento e consigli
Il sistema calcola senza detrazioni ciò che manca tra la posizione salvata di un Ufficiale e un obiettivo scelto. Gli obiettivi possono includere Livello, Stelle, Addestramento o Ufficiale MAX.

**Ufficiale MAX** significa 5 Stelle, Livello 70, Ufficiale sbloccato, tutti e quattro i Rami abilità a Livello 5 e Addestramento 180. Il calcolo non spende risorse né sottrae nulla dall’Inventario centrale.

# Dati dinamici degli Ufficiali
La v4.6.0 separa i dati pubblicati delle uscite dalla logica principale. Comprendono nome, Stagione, rarità, ruolo/tipo, costo ORV, costo SRV, idoneità preparazione e dati associati. Il dataset pubblicato è verificabile in **Impostazioni → Dati globali Ufficiali**.

Le nuove uscite devono essere aggiunte e validate prima nell’ambiente Test e solo dopo promosse a Live.

# Previsione costi futuri degli Ufficiali
Stima possibili costi ORV e SRV dei futuri Ufficiali Leggendari stagionali.

## Base dinamica della previsione
La v4.6.0 usa come base l’ultima uscita stagionale Leggendaria confermata nella Banca dati Ufficiali.

**Esempio:** al rilascio v4.6.0 l’ultima uscita confermata è **S7 Cacciacarri**, con **600 ORV per Badge e 300 SRV per Stella esclusiva**. Quando viene pubblicata un’uscita confermata più recente, la base avanza automaticamente.

I valori previsti sono solo stime di pianificazione e non costi di gioco confermati.

## Sequenza ricorrente delle uscite
- **Ottobre — Rally / Guarnigione**
- **Gennaio — Fanteria**
- **Aprile — Carri**
- **Luglio — Cacciacarri**

Dopo luglio il ciclo continua nella Stagione successiva con Ottobre Rally / Guarnigione.

## Crescita della previsione
L’ipotesi predefinita è **20% di crescita per uscita**, modificabile. La previsione mostra ORV per Badge, SRV per Stella esclusiva, ORV totali e SRV totali previsti.

# Inventario centrale
Inserisci le risorse condivise una sola volta e premi **Salva Inventario**. I valori salvati vengono usati in tutta l’app.

Ordine approvato:
1. Cassa Badge Ufficiale Leggendario
2. Cassa selezione Badge Ufficiale Leggendario
3. Voucher Preparazione Ufficiale (ORV)
4. Voucher Preparazione Stella (SRV)
5. Badge Universale Ufficiale Leggendario
6. Badge Universale Ufficiale Epico
7. Badge Universale Ufficiale Elite
8. Badge individuali Ufficiali
9. Stelle Elite I / II / III
10. Stelle Epiche I / II / III
11. Stelle Leggendarie I / II / III
12. Libri XP — 100 / 500 / 1.000 / 5.000 / 10.000 / 20.000 / 50.000

**Non esiste un Libro XP da 50**.

# Regole delle Casse Leggendarie
## Cassa Badge Ufficiale Leggendario
Ogni cassa può essere usata come **1 Badge Universale Leggendario oppure 600 ORV**. Non può essere conteggiata in entrambi i modi.

## Cassa selezione Badge Ufficiale Leggendario
Ogni cassa fornisce **1 Badge specifico di un Ufficiale Leggendario** attualmente idoneo. Non si converte in ORV e non diventa Badge Universale.

# Ufficiali Leggendari Originali
Non usano conversioni stagionali ORV/SRV. La loro progressione usa risorse applicabili come Badge individuali e Badge Universali Leggendari. Il Pianificatore non deve assegnare ORV o SRV a un Originale Leggendario.

# Progresso Ufficiale
La sezione Ufficiale memorizza Stelle, Livello, Sblocco, Rami abilità e Addestramento specifici. Le risorse condivise restano nell’Inventario centrale.

## Rami abilità
- **0★** — Ramo 1
- **1★** — Rami 1–2
- **2★** — Rami 1–3
- **3★ o superiore** — tutti e quattro i Rami

Il Livello 1 è gratuito quando un Ramo diventa disponibile.

# Requisiti Badge confermati
- **Leggendario:** 10 Sblocco + 690 Abilità + 900 Addestramento = **1.600 Badge**
- **Epico:** 10 + 440 + 4.500 = **4.950 Badge**
- **Elite:** 10 + 440 + 18.000 = **18.450 Badge**

# Progressi e Confronto
Progressi classifica gli Ufficiali come **MASSIMIZZATO**, **IN CORSO** o **NON INIZIATO**. Le risorse semplicemente detenute nell’Inventario non aumentano la percentuale di sviluppo salvata. I filtri Progressi e Confronto sono indipendenti e le selezioni di lavoro restano dopo un normale aggiornamento.

# Ottimizzatore risorse
Confronta opzioni di sviluppo tra Ufficiali e può evidenziare l’efficienza ORV quando entrambi sono idonei. È solo un’anteprima e non spende risorse.

# Pianificatore potenziamento multi-Ufficiale
Mette più Ufficiali in ordine di priorità e valuta come le risorse condivise coprono i Badge mancanti. Supporta ORV, Badge Universali, Casse, Casse di selezione e strategie delle Casse. La pianificazione non è distruttiva.

# Pianificazione avanzata e futuri Ufficiali
Le sessioni possono modellare Ufficiali salvati, Tutte le sessioni, Prossima sessione, Ottobre Rally/Guarnigione, Gennaio Fanteria, Aprile Carri e Luglio Cacciacarri. Gli Ufficiali **PROIETTATI** sono segnaposto di pianificazione, non Ufficiali confermati.

Risorse stabilite per un Leggendario proiettato completo: **1.600 Badge, 98.000 valore Stelle e 199.646.700 XP**. Per due: **3.200 Badge, 196.000 valore Stelle e 399.293.400 XP**.

# Dashboard preparazione
Valuta scenari salvati rispetto alle risorse disponibili: preparazione Badge, Stelle, XP, preparazione complessiva, obiettivo prioritario e prossima azione suggerita. La risorsa limitante determina la preparazione complessiva.

# Persistenza dello stato di lavoro
Un normale aggiornamento conserva Ufficiale selezionato, pagina corrente, filtri, confronti, righe del Pianificatore, selezioni avanzate, campi scenari futuri e Ufficiale di confronto dell’Ottimizzatore. È separato da profili, piani e Inventario salvati permanentemente.

# Calendario ricorrente delle uscite
La sezione Uscite mostra il ciclo annuale e identifica automaticamente periodo corrente e prossima uscita: **Ottobre Rally/Guarnigione → Gennaio Fanteria → Aprile Carri → Luglio Cacciacarri**, poi si ripete.

# Banca dati Ufficiali
Controlla l’elenco principale e supporta ricerca, filtro Stagione, aggiunta/modifica/eliminazione, esportazione/importazione CSV e ripristino dei valori pubblicati. Le nuove uscite confermate devono essere testate prima di Live e possono avanzare automaticamente la base della previsione.

# Backup e ripristino
Usa **Impostazioni → Esporta Backup app** per creare un backup portatile. Conserva un backup valido prima di modifiche importanti. Dopo il ripristino verifica che i dati restino presenti dopo il ricaricamento.

# Principio importante di pianificazione
KoW Companion separa **dati confermati** e **dati previsti**. I costi confermati nella Banca dati sono informazioni note; i costi futuri sono stime. Quando un Ufficiale viene rilasciato ufficialmente, i valori confermati devono sostituire le ipotesi previste.

---
**Creato da FireStorm (371)**