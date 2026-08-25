# KoW Companion — Guide utilisateur
## v4.6.0 — TEST / PAS LIVE

Ce guide décrit la version Multilingual Test v4.6.0.

## Nouveautés v4.6.0
### Objectifs d’amélioration et recommandations
Définissez un futur objectif de Niveau, d’Étoiles et d’Entraînement pour l’Officier sélectionné, ou choisissez **Officier MAX**. Le calcul compare la progression enregistrée à l’objectif choisi et affiche les ressources restantes. Il est non destructif et ne dépense pas l’Inventaire.

### Données dynamiques des Officiers
L’application lit le jeu de données publié `officers.json` et le manifeste `officer-data-version.json`. Les Paramètres affichent **Données globales des Officiers** afin de vérifier la version active des données.

### Prévision du coût des futurs Officiers
La prévision utilise comme référence la dernière sortie saisonnière légendaire confirmée dans la Base de données des Officiers. Dans v4.6.0, l’exemple confirmé est **S7 Chasseurs de chars — 600 ORV par Badge / 300 SRV par Étoile exclusive**. Lorsqu’une sortie confirmée plus récente est publiée, elle devient automatiquement la nouvelle référence.

### Fenêtres contextuelles multilingues
Les alertes et confirmations du navigateur sont traduites en English, Français, Deutsch ou Italiano, notamment pour Sauvegarde/Restauration, progression d’Officier, confirmation MAX, Planificateur, Base de données, CSV, Apparence et Inventaire.

## Flux recommandé
1. **Inventaire** — saisissez et enregistrez toutes les ressources détenues.
2. **Officier** — sélectionnez un Officier et enregistrez sa progression actuelle.
3. **Étoiles** — vérifiez la progression et les ressources d’Étoiles.
4. **Développement** — vérifiez Déblocage, Brins de compétences et Entraînement.
5. **XP** — vérifiez le niveau actuel et les Livres XP détenus.
6. **Progression** — contrôlez MAXIMUM / EN COURS / NON COMMENCÉ.
7. **Planificateur** — prévisualisez les décisions d’amélioration actuelles et futures.
8. **Sauvegarde** — exportez une sauvegarde avant les tests destructifs ou changements importants.

## Persistance de l’état de travail v4.6.0
Une actualisation normale doit conserver l’Officier sélectionné, l’onglet actif, les filtres Officier/Progression/Comparaison, les sélections de comparaison, les lignes du Planificateur multi-Officiers, les sélections du Planificateur avancé, les scénarios futurs et l’Officier de comparaison de l’Optimiseur. Cet état temporaire reste séparé des profils, plans et Inventaire enregistrés.

## Inventaire central
Saisissez les ressources partagées une seule fois puis appuyez sur **Enregistrer l’Inventaire**. Ordre approuvé :
1. Coffre de Badges d’Officier légendaire
2. Coffre de sélection de Badges d’Officier légendaire
3. ORV
4. SRV
5. Badge d’Officier légendaire universel
6. Badge d’Officier épique universel
7. Badge d’Officier élite universel
8. Badges individuels des Officiers dans l’ordre numéroté approuvé
9. Étoiles élites I / II / III
10. Étoiles épiques I / II / III
11. Étoiles légendaires I / II / III
12. Livres XP : 100 / 500 / 1 000 / 5 000 / 10 000 / 20 000 / 50 000

Il n’existe pas de Livre XP 50 dans cette version.

## Règles des coffres légendaires
**Coffre de Badges d’Officier légendaire :** chaque coffre peut être utilisé soit comme **1 Badge légendaire universel**, soit comme **600 ORV**, jamais les deux.

**Coffre de sélection de Badges d’Officier légendaire :** chaque coffre donne **1 Badge spécifique d’Officier légendaire** pour un Officier actuellement éligible. Il ne devient ni ORV ni Badge universel.

**Officiers légendaires originaux :** ils ne peuvent pas utiliser les conversions saisonnières ORV/SRV.

## Progression d’Officier
**Officier MAX** règle 5★, Niveau 70, Débloqué, les quatre Brins au Niveau 5 et Entraînement 180.

Déblocage des Brins : 0★ → Brin 1 ; 1★ → Brins 1–2 ; 2★ → Brins 1–3 ; 3★+ → les quatre. Le Niveau 1 est gratuit à l’ouverture d’un Brin.

Totaux confirmés : **Légendaire 1 600**, **Épique 4 950**, **Élite 18 450 Badges**.

## Progression, Comparaison et Optimiseur
Progression classe les Officiers en **MAXIMUM**, **EN COURS** ou **NON COMMENCÉ**. Les ressources partagées n’augmentent pas artificiellement le pourcentage enregistré. L’Optimiseur compare deux Officiers, notamment l’efficacité ORV, mais reste un outil d’aperçu : aucune ressource n’est dépensée.

## Planificateur multi-Officiers
Créez une liste prioritaire et prévisualisez la couverture des Badges avec ORV, Badges universels, Coffres et Coffres de sélection. Les plans peuvent être nommés et enregistrés. Le Planificateur ne déduit pas l’Inventaire.

## Planification avancée et futurs Officiers
Les sessions peuvent couvrir les Officiers enregistrés, toutes les sessions, la prochaine session ou Octobre Ralliement/Garnison, Janvier Infanterie, Avril Chars et Juillet Chasseurs de chars. Les Officiers **PROJETÉS** sont des espaces réservés de planification et ne sont pas ajoutés à la base publiée.

Pour un futur Légendaire : **1 Officier = 1 600 Badges, 98 000 valeur d’Étoiles, 199 646 700 XP**. Les valeurs ORV/SRV futures restent des prévisions jusqu’à publication.

## Sauvegarde et restauration
**Paramètres → Exporter la sauvegarde de l’application** crée une sauvegarde portable des données locales. La restauration réimporte les profils, Badges individuels et Inventaire partagé puis recharge l’application.

## QA linguistique
Dans Paramètres, **QA linguistique / Test de traduction** contrôle Français, Deutsch et Italiano pour les traductions manquantes, le texte restant en anglais, les nouvelles fonctions v4.6.0 et les fenêtres contextuelles.

---
**Créé par FireStorm (371)**
