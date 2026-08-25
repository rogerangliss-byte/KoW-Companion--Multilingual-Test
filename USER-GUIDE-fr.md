# KoW Companion — Guide utilisateur
## v4.6.0 — TEST / PAS LIVE

Ce guide décrit la version Multilingual Test v4.6.0.

## Flux de travail recommandé
1. **Inventaire** — saisissez et enregistrez toutes les ressources détenues.
2. **Officier** — sélectionnez un Officier et saisissez/enregistrez sa progression actuelle.
3. **Étoiles** — vérifiez la progression des Étoiles et les ressources disponibles.
4. **Développement** — vérifiez Déblocage, Brins de compétences et Entraînement.
5. **XP** — vérifiez le niveau actuel et les Livres XP détenus.
6. **Progression** — contrôlez MAXIMUM / EN COURS / NON COMMENCÉ.
7. **Planificateur** — prévisualisez les décisions d’amélioration actuelles et futures.
8. **Sauvegarde** — exportez une sauvegarde avant tout test destructif ou changement important.

## Nouveautés v4.6.0
### Objectifs d’amélioration et recommandations
Définissez un futur objectif de Niveau, d’Étoiles et d’Entraînement pour l’Officier sélectionné, ou choisissez **Officier MAX**. Le calcul compare la progression enregistrée avec l’objectif choisi et affiche les ressources restantes. Il est non destructif et ne dépense pas l’Inventaire.

### Données dynamiques des Officiers
L’application lit le jeu de données publié `officers.json` et le manifeste `officer-data-version.json`. Dans Paramètres, **Données globales des Officiers** permet de vérifier la version active.

### Prévision du coût des futurs Officiers
La prévision utilise comme référence la dernière sortie saisonnière légendaire confirmée dans la Base de données des Officiers. Dans v4.6.0, l’exemple confirmé est **S7 Chasseurs de chars — 600 ORV par Badge / 300 SRV par Étoile exclusive**. Lorsqu’une sortie confirmée plus récente est publiée, elle devient automatiquement la nouvelle référence.

### Fenêtres contextuelles multilingues
Les alertes et confirmations du navigateur utilisent la langue sélectionnée pour Sauvegarde/Restauration, progression d’Officier, confirmation MAX, Planificateur, Base de données, CSV, Apparence et Inventaire.

## Persistance de l’état de travail v4.6.0
Une actualisation normale doit conserver l’Officier sélectionné, l’onglet actif, les filtres Officier, les filtres Progression, les filtres/sélections Comparaison, les lignes et valeurs du Planificateur multi-Officiers, les sélections du Planificateur avancé, les scénarios futurs et l’Officier de comparaison de l’Optimiseur.

Cet état temporaire reste séparé des profils d’Officiers, plans et Inventaire enregistrés.

## Inventaire central
Saisissez les ressources partagées une seule fois puis appuyez sur **Enregistrer l’Inventaire**. Les valeurs enregistrées sont utilisées dans toute l’application.

Ordre approuvé :
1. Coffre de Badges d’Officier légendaire
2. Coffre de sélection de Badges d’Officier légendaire
3. Bon de préparation d’Officier (ORV)
4. Bon de préparation d’Étoile (SRV)
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
### Coffre de Badges d’Officier légendaire
Chaque coffre peut être utilisé soit comme **1 Badge légendaire universel**, soit comme **600 ORV**, jamais les deux simultanément.

### Coffre de sélection de Badges d’Officier légendaire
Chaque coffre fournit **1 Badge spécifique d’Officier légendaire** pour un Officier appartenant au groupe actuellement éligible. Il ne se convertit pas en ORV et ne devient pas un Badge universel.

### Officiers légendaires originaux
Les Officiers légendaires originaux ne peuvent pas utiliser les conversions saisonnières ORV ou SRV. Leur progression utilise leurs Badges individuels, les Badges légendaires universels et les autres ressources non saisonnières valides.

## Progression d’Officier
La page Officier enregistre les Étoiles, le Niveau, le Déblocage, les Brins de compétences et l’Entraînement. L’Inventaire partagé reste global.

**Officier MAX** règle l’Officier sélectionné sur 5★, Niveau 70, Débloqué, les quatre Brins au Niveau 5 et Entraînement 180.

## Brins de compétences
Disponibilité selon le niveau d’Étoiles :
- 0★ → Brin 1
- 1★ → Brins 1–2
- 2★ → Brins 1–3
- 3★+ → les quatre Brins

Le Niveau 1 est gratuit lorsqu’un Brin devient disponible.

## Totaux de Badges confirmés
- **Légendaire :** 10 Déblocage + 690 Compétences + 900 Entraînement = **1 600 Badges**.
- **Épique :** 10 Déblocage + 440 Compétences + 4 500 Entraînement = **4 950 Badges**.
- **Élite :** 10 Déblocage + 440 Compétences + 18 000 Entraînement = **18 450 Badges**.

## Progression des Officiers et Comparaison
Progression classe les Officiers comme **MAXIMUM**, **EN COURS** ou **NON COMMENCÉ**. Les ressources partagées n’augmentent pas artificiellement le pourcentage de progression enregistré.

Les filtres principaux de Progression et les filtres de Comparaison sont indépendants. Les sélections de Comparaison doivent survivre à une actualisation normale.

## Optimiseur de ressources — Aperçu
L’Optimiseur compare l’Officier sélectionné avec un deuxième Officier et peut mettre en évidence l’efficacité ORV lorsqu’ils sont tous deux éligibles.

L’Optimiseur est **uniquement un aperçu**. Il ne dépense aucune ressource et ne modifie pas l’Inventaire enregistré.

## Planificateur d’amélioration multi-Officiers
Créez une liste prioritaire d’Officiers et prévisualisez la couverture de leurs besoins restants en Badges.

Le Planificateur prend en charge :
- les plans nommés ;
- plusieurs lignes d’Officiers ;
- les besoins en Badges par Officier ;
- les commandes de priorité/ordre ;
- ORV ;
- Badges légendaires universels ;
- Coffres de Badges légendaires ;
- Coffres de sélection de Badges légendaires ;
- la stratégie d’utilisation des coffres.

Le Planificateur est un aperçu et ne déduit rien de l’Inventaire.

## Planification avancée et futurs Officiers
Les Sessions de planification peuvent analyser les Officiers enregistrés, toutes les sessions, la prochaine session ou les sessions récurrentes Octobre Ralliement/Garnison, Janvier Infanterie, Avril Chars et Juillet Chasseurs de chars.

Les futurs Officiers **PROJETÉS** sont uniquement des espaces réservés de planification. Ils ne sont pas ajoutés à la Base de données publiée.

Totaux établis pour un futur Légendaire :
- **1 Officier :** 1 600 Badges, 98 000 valeur d’Étoiles, 199 646 700 XP.
- **2 Officiers :** 3 200 Badges, 196 000 valeur d’Étoiles, 399 293 400 XP.

Les futures valeurs ORV/SRV restent des prévisions jusqu’à publication des coûts confirmés.

## Tableau de préparation de planification
Le Tableau de préparation affiche la préparation en Badges, Étoiles et XP, la préparation globale fondée sur la ressource limitante, une Cible prioritaire et une Action suivante suggérée.

## Sauvegarde et restauration
Utilisez **Paramètres → Exporter la sauvegarde de l’application** pour créer une sauvegarde portable des données locales.

La restauration doit réimporter les profils d’Officiers, les Badges individuels et l’Inventaire partagé, puis recharger l’application.

## QA linguistique
Dans Paramètres, **QA linguistique / Test de traduction** contrôle les dictionnaires, le contenu réellement rendu, les nouvelles fonctions v4.6.0, les fenêtres contextuelles et la couverture complète du Guide utilisateur.

## QA avant mise en Live
Avant la promotion Live, vérifiez :
- aucune saccade, pulsation ou gel ;
- navigation normale sur tous les onglets ;
- persistance de l’Officier sélectionné et des filtres ;
- persistance du Planificateur et de l’Optimiseur ;
- règles correctes des deux coffres légendaires ;
- restrictions ORV/SRV des Légendaires originaux ;
- ordre correct de l’Inventaire ;
- absence de Livre XP 50 ;
- sauvegarde globale de l’Inventaire ;
- export et restauration de sauvegarde ;
- données restaurées conservées après actualisation ;
- version affichée v4.6.0 ;
- bannière TEST / PAS LIVE visible.

---
**Créé par FireStorm (371)**
