/* KoW Companion v4.6.0 — multilingual additions for new features and popup text. */
(function(){
'use strict';
const add=(obj,map)=>{if(!obj)return;Object.assign(obj,map);};

add(window.KOW_I18N_EN,{
  "Upgrade Targets & Recommendations":"Upgrade Targets & Recommendations",
  "Set a future target for the selected Officer. This calculation is non-destructive and does not spend Inventory.":"Set a future target for the selected Officer. This calculation is non-destructive and does not spend Inventory.",
  "Target Level":"Target Level","Target Stars":"Target Stars","Target Training":"Target Training","Target":"Target",
  "Custom target":"Custom target","MAX Officer":"MAX Officer","Calculate Target Recommendation":"Calculate Target Recommendation",
  "Ready:":"Ready:","select an Officer and calculate a target.":"select an Officer and calculate a target.",
  "Global Officer Data:":"Global Officer Data:","checking published dataset…":"checking published dataset…",
  "Data version:":"Data version:","Officers:":"Officers:","Published:":"Published:",
  "loaded":"loaded","bundled/local fallback in use":"bundled/local fallback in use",
  "Published Officer manifest could not be read.":"Published Officer manifest could not be read.",
  "Resource requirement to target":"Resource requirement to target","required":"required","held":"held","available":"available",
  "shortfall":"shortfall","ORV cost per Officer Badge:":"ORV cost per Officer Badge:",
  "Additional ORV equivalent for badge shortfall:":"Additional ORV equivalent for badge shortfall:",
  "Exclusive Stars needed:":"Exclusive Stars needed:","Additional SRV equivalent:":"Additional SRV equivalent:",
  "Inventory is read for comparison only; nothing is spent or changed.":"Inventory is read for comparison only; nothing is spent or changed.",
  "Current:":"Current:","Recommendation:":"Recommendation:","Target already achieved.":"Target already achieved.",
  "No Officer progress or Inventory has been changed.":"No Officer progress or Inventory has been changed.",
  "Forecast future Officer costs from the established Officer-release sequence.":"Forecast future Officer costs from the established Officer-release sequence.",
  "latest confirmed database release":"latest confirmed database release",
  "Forecast only — replace with confirmed costs when released.":"Forecast only — replace with confirmed costs when released.",
  "All Sessions":"All Sessions"
});
add(window.KOW_I18N_FR,{
  "Upgrade Targets & Recommendations":"Objectifs d’amélioration et recommandations",
  "Set a future target for the selected Officer. This calculation is non-destructive and does not spend Inventory.":"Définissez un objectif futur pour l’Officier sélectionné. Ce calcul est non destructif et ne dépense pas l’Inventaire.",
  "Target Level":"Niveau cible","Target Stars":"Étoiles cibles","Target Training":"Entraînement cible","Target":"Objectif",
  "Custom target":"Objectif personnalisé","MAX Officer":"Officier MAX","Calculate Target Recommendation":"Calculer la recommandation",
  "Ready:":"Prêt :","select an Officer and calculate a target.":"sélectionnez un Officier et calculez un objectif.",
  "Global Officer Data:":"Données globales des Officiers :","checking published dataset…":"vérification des données publiées…",
  "Data version:":"Version des données :","Officers:":"Officiers :","Published:":"Publié :",
  "loaded":"chargé","bundled/local fallback in use":"données intégrées/locales utilisées",
  "Published Officer manifest could not be read.":"Le manifeste publié des Officiers n’a pas pu être lu.",
  "Resource requirement to target":"Ressources nécessaires pour l’objectif","required":"requis","held":"détenu","available":"disponible",
  "shortfall":"manquant","ORV cost per Officer Badge:":"Coût ORV par Badge d’Officier :",
  "Additional ORV equivalent for badge shortfall:":"Équivalent ORV supplémentaire pour les Badges manquants :",
  "Exclusive Stars needed:":"Étoiles exclusives nécessaires :","Additional SRV equivalent:":"Équivalent SRV supplémentaire :",
  "Inventory is read for comparison only; nothing is spent or changed.":"L’Inventaire est consulté uniquement pour comparaison ; rien n’est dépensé ni modifié.",
  "Current:":"Actuel :","Recommendation:":"Recommandation :","Target already achieved.":"Objectif déjà atteint.",
  "No Officer progress or Inventory has been changed.":"Aucune progression d’Officier ni aucun Inventaire n’a été modifié.",
  "Forecast future Officer costs from the established Officer-release sequence.":"Prévision des coûts futurs des Officiers selon la séquence de sortie établie.",
  "latest confirmed database release":"dernière sortie confirmée de la base de données",
  "Forecast only — replace with confirmed costs when released.":"Prévision uniquement — remplacez par les coûts confirmés lors de la sortie.",
  "All Sessions":"Toutes les sessions"
});
add(window.KOW_I18N_DE,{
  "Upgrade Targets & Recommendations":"Upgrade-Ziele & Empfehlungen",
  "Set a future target for the selected Officer. This calculation is non-destructive and does not spend Inventory.":"Legen Sie ein zukünftiges Ziel für den ausgewählten Offizier fest. Diese Berechnung ist nicht destruktiv und verbraucht kein Inventar.",
  "Target Level":"Zielstufe","Target Stars":"Zielsterne","Target Training":"Zieltraining","Target":"Ziel",
  "Custom target":"Benutzerdefiniertes Ziel","MAX Officer":"MAX Offizier","Calculate Target Recommendation":"Zielempfehlung berechnen",
  "Ready:":"Bereit:","select an Officer and calculate a target.":"Wählen Sie einen Offizier und berechnen Sie ein Ziel.",
  "Global Officer Data:":"Globale Offiziersdaten:","checking published dataset…":"veröffentlichte Daten werden geprüft…",
  "Data version:":"Datenversion:","Officers:":"Offiziere:","Published:":"Veröffentlicht:",
  "loaded":"geladen","bundled/local fallback in use":"integrierte/lokale Daten werden verwendet",
  "Published Officer manifest could not be read.":"Das veröffentlichte Offiziersmanifest konnte nicht gelesen werden.",
  "Resource requirement to target":"Ressourcenbedarf bis zum Ziel","required":"benötigt","held":"vorhanden","available":"verfügbar",
  "shortfall":"Fehlbestand","ORV cost per Officer Badge:":"ORV-Kosten pro Offiziersabzeichen:",
  "Additional ORV equivalent for badge shortfall:":"Zusätzliches ORV-Äquivalent für fehlende Abzeichen:",
  "Exclusive Stars needed:":"Benötigte Exklusivsterne:","Additional SRV equivalent:":"Zusätzliches SRV-Äquivalent:",
  "Inventory is read for comparison only; nothing is spent or changed.":"Das Inventar wird nur zum Vergleich gelesen; nichts wird verbraucht oder geändert.",
  "Current:":"Aktuell:","Recommendation:":"Empfehlung:","Target already achieved.":"Ziel bereits erreicht.",
  "No Officer progress or Inventory has been changed.":"Weder Offiziersfortschritt noch Inventar wurden geändert.",
  "Forecast future Officer costs from the established Officer-release sequence.":"Prognostiziert zukünftige Offizierskosten anhand der etablierten Veröffentlichungsfolge.",
  "latest confirmed database release":"neueste bestätigte Datenbank-Veröffentlichung",
  "Forecast only — replace with confirmed costs when released.":"Nur Prognose — bei Veröffentlichung durch bestätigte Kosten ersetzen.",
  "All Sessions":"Alle Sitzungen"
});
add(window.KOW_I18N_IT,{
  "Upgrade Targets & Recommendations":"Obiettivi di potenziamento e consigli",
  "Set a future target for the selected Officer. This calculation is non-destructive and does not spend Inventory.":"Imposta un obiettivo futuro per l’Ufficiale selezionato. Il calcolo non è distruttivo e non consuma l’Inventario.",
  "Target Level":"Livello obiettivo","Target Stars":"Stelle obiettivo","Target Training":"Addestramento obiettivo","Target":"Obiettivo",
  "Custom target":"Obiettivo personalizzato","MAX Officer":"Ufficiale MAX","Calculate Target Recommendation":"Calcola consiglio obiettivo",
  "Ready:":"Pronto:","select an Officer and calculate a target.":"seleziona un Ufficiale e calcola un obiettivo.",
  "Global Officer Data:":"Dati globali Ufficiali:","checking published dataset…":"verifica dei dati pubblicati…",
  "Data version:":"Versione dati:","Officers:":"Ufficiali:","Published:":"Pubblicato:",
  "loaded":"caricato","bundled/local fallback in use":"uso dei dati integrati/locali",
  "Published Officer manifest could not be read.":"Impossibile leggere il manifesto pubblicato degli Ufficiali.",
  "Resource requirement to target":"Risorse necessarie per l’obiettivo","required":"richiesto","held":"posseduto","available":"disponibile",
  "shortfall":"mancante","ORV cost per Officer Badge:":"Costo ORV per Badge Ufficiale:",
  "Additional ORV equivalent for badge shortfall:":"Equivalente ORV aggiuntivo per i Badge mancanti:",
  "Exclusive Stars needed:":"Stelle esclusive necessarie:","Additional SRV equivalent:":"Equivalente SRV aggiuntivo:",
  "Inventory is read for comparison only; nothing is spent or changed.":"L’Inventario viene letto solo per confronto; nulla viene consumato o modificato.",
  "Current:":"Attuale:","Recommendation:":"Consiglio:","Target already achieved.":"Obiettivo già raggiunto.",
  "No Officer progress or Inventory has been changed.":"Nessun progresso Ufficiale o Inventario è stato modificato.",
  "Forecast future Officer costs from the established Officer-release sequence.":"Prevede i costi futuri degli Ufficiali in base alla sequenza di uscita stabilita.",
  "latest confirmed database release":"ultima uscita confermata nella banca dati",
  "Forecast only — replace with confirmed costs when released.":"Solo previsione — sostituire con i costi confermati quando disponibili.",
  "All Sessions":"Tutte le sessioni"
});
})();
