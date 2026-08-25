# KoW Companion v4.6.0 — Guide utilisateur français

## ✨ Nouveautés — v4.6.0 MULTILINGUAL TEST — NOT LIVE


### 💾 Persistance native de l’état de travail

Une actualisation normale du navigateur conserve l’interface de travail là où vous l’avez laissée au lieu de réinitialiser les contrôles principaux.

- Officier sélectionné et onglet/page actuel de l’application.
- Filtres Recherche d’Officier, Saison, Rareté et Rôle.
- Filtres de Progressionion MAXIMISÉ / EN COURS / NON COMMENCÉ.
- Filtres de comparaison de Progressionion et Officiers sélectionnés.
- Lignes du Planificateur multi-Officiers, sélections d’Officiers, besoins en Badges et champs de ressources de travail.
- Sélections du Planificateur avancé/session, champs de scénario futur et Officier de comparaison de l’Optimiseur.
Les profils d’Officiers sauvegardés, les plans sauvegardés et l’Inventaire central restent distincts de cet état temporaire de l’interface.


### 📦 Règles correctes des coffres Légendaires

- Coffre de Badges d’Officier légendaire: chaque coffre peut être utilisé comme soit 1 Badge Légendaire universel, soit 600 Bons de préparation d’Officier (ORV) . Il ne peut pas compter pour les deux.
- Coffre de sélection de Badge d’Officier légendaire: chaque coffre donne 1 Badge spécifique d’Officier Légendaire pour un Officier actuellement disponible dans le groupe du Coffre de sélection. Il ne se convertit pas en ORV ni en Badge Légendaire universel.
- Les Officiers Légendaires originaux restent inéligibles aux conversions saisonnières ORV/SRV.

### 🧮 Optimiseur de ressources — Aperçu

Sélectionnez un second Officier dans Comparaisonr avec un Officier pour comparer l’efficacité des Badges, y compris le coût ORV par Badge d’Officier lorsque applicable. L’Optimiseur est uniquement un aperçu et ne dépense ni ne modifie les ressources sauvegardées.


### 👥 Planificateur d’amélioration multi-Officiers

Créez une liste prioritaire d’Officiers et prévisualisez l’allocation possible des ressources de Badges partagées sans modifier l’Inventaire sauvegardé. Le Planificateur prend en charge les plans nommés, plusieurs lignes d’Officiers, les besoins par Officier, les contrôles de priorité/ordre, ORV, Badges Légendaires universels, Coffres de Badges, Coffres de sélection et la stratégie de Coffre sélectionnable.


### 📋 Ordre de l’Inventaire central

L’Inventaire suit désormais la séquence approuvée Ordre dans la liste plutôt que l’ordre des lignes du tableur :

- Coffre de Badges d’Officier légendaire
- Coffre de sélection de Badge d’Officier légendaire
- Bon de préparation d’Officier (ORV)
- Bon de préparation d’Étoile (SRV)
- Legendary Officier Badge
- Epic Officier Badge
- Elite Officier Badge
- Badges individuels d’Officiers dans l’ordre numéroté approuvé
- Elite Étoiles I–III
- Epic Étoiles I–III
- Legendary Étoiles I–III
- Livres XP : 100, 500, 1 000, 5 000, 10 000, 20 000 et 50 000
L’entrée inexistante en jeu Livre XP 50 a été supprimée.


### 📊 Progressionion et Comparaison

Progressionion continue de classer les Officiers comme MAXIMISÉ , EN COURS or NON COMMENCÉ . L’Inventaire partagé n’augmente pas artificiellement le pourcentage de progression sauvegardé d’un Officier. La comparaison utilise la progression réellement sauvegardée.


### 🏅 Totaux confirmés de Badges d’Officier

- Legendary: 10 Déblocage + 690 Compétences + 900 Entraînement = 1 600 Badges pour MAX .
- Epic: 10 Déblocage + 440 Compétences + 4 500 Entraînement = 4 950 Badges pour MAX .
- Elite: 10 Déblocage + 440 Compétences + 18 000 Entraînement = 18 450 Badges pour MAX .

### 🧭 Planification v4.4.0 conservée

Le Tableau de bord de préparation, la préparation Badges/Étoiles/XP, la Cible prioritaire, la Prochaine action suggérée, les sessions futures d’octobre/janvier/avril/juillet, les rapports Saison + Type d’Officier, les ressources Légendaires futures projetées, les prévisions ORV/SRV et les exclusions des Officiers MAX restent disponibles.


### 🔮 Prévision dynamique des coûts des futurs Officiers

La prévision utilise désormais comme référence la dernière sortie saisonnière Légendaire confirmée dans la Base de données des Officiers. Exemple : à la sortie de v4.6.0, la dernière référence confirmée est S7 Chasseurs de chars — 600 ORV par Badge / 300 SRV par Étoile exclusive . Lorsqu’une sortie confirmée plus récente est publiée, la référence avance automatiquement.

Les valeurs ORV/SRV futures sont uniquement des estimations de planification jusqu’à confirmation des coûts réels de sortie.


## 1. Inventaire

Commencez ici. Saisissez les ressources que vous détenez et appuyez sur Sauvegarder l’Inventaire . L’Inventaire est partagé dans toute l’application : vous ne maintenez donc ces totaux qu’à un seul endroit.

L’Inventaire comprend Bons de préparation d’Officier (ORV) , Bons de préparation d’Étoile (SRV) , Badges universels Légendaires/Épiques/Élites, Coffres de Badges d’Officier Légendaire et Coffres de sélection, Étoiles Légendaires/Épiques/Élites, Livres XP et Badges individuels d’Officiers.

Pour les Badges individuels d’Officier, saisissez les quantités pour l’Officier approprié. La quantité de Badges de chaque Officier est enregistrée séparément. Mettez à jour l’Inventaire lorsque vos ressources en jeu changent, puis enregistrez-le avant de planifier les améliorations.


## 2. Officier

Utilisez les filtres Recherche , Saison et Type / Rôle d’Officier pour réduire la liste des Officiers. Select the Officier you want to calculate. A matching portrait is displayed automatically when its file is disponible in the officer-portraits folder.

L’Officier sélectionné détermine le coût d’un Badge d’Officier en Bons de préparation d’Officier (ORV) et le coût d’une Étoile exclusive en Bons de préparation d’Étoile (SRV) .

The Résumé d’amélioration de l’Officier shows the restants Officier Badges, Officier Étoiles and Officier XP for the currently selected Officier.

Original Officiers : Bons de préparation d’Officier (ORV) and Bons de préparation d’Étoile (SRV) canpas be utilisés for Original Officiers.


## 3. Étoiles

Set the Officier's current and target Star level. The Étoiles tab automatically follows the selected Officier rarity: Legendary, Epic or Elite Star I / II / III. Bons de préparation d’Étoile (SRV) are shown only for Legendary Officiers and canpas be utilisés by Epic or Elite Officiers.


## 4. Développement

Saisissez l’état de déblocage, les niveaux des quatre Brins de compétence indépendants et le Niveau d’Entraînement. Développement utilise les ressources pertinentes de l’Inventaire sauvegardé pour calculer ce qui est disponible.

Each Badge légendaire universel is worth 1 Officier Badge for a Legendary Officier.

Each Coffre de sélection de Badge d’Officier légendaire gives 1 Badge spécifique d’Officier Légendaire for an Officier currently disponible in that chest. It does pas convert to ORV. Each Coffre de Badges d’Officier légendaire can instead be utilisés as either 1 Badge légendaire universel or 600 ORV .


## 5. XP

Saisissez le Niveau actuel et cible. Les quantités de Livres XP sauvegardées dans l’Inventaire servent à calculer les XP détenus, requis et le manque restant.


## 6. Planificateur et Optimiseur de ressources

Utilisez le Planificateur après avoir saisi l’Inventaire et la progression Étoiles, Développement et XP. Sélectionnez un objectif tel que Officier MAX, Étoile suivante, Atteindre 5★, Compétences MAX ou Entraînement MAX pour voir besoins, ressources détenues et manques.

The Resource Optimiser vous permet de sélectionner un second Officier dans Comparaisonr avec un Officier . Il compare le coût en Bons de préparation d’Officier (ORV) par Badge d’Officier pour les deux Officiers.

How to interpret the recommendation: lorsque les deux Officiers peuvent utiliser des ORV, l’optimiseur recommande de privilégier les ORV pour l’Officier ayant le coût ORV par Badge le plus faible and favouring shared Badge légendaire universels / Coffre de Badges d’Officier légendaires pour l’Officier ayant le coût ORV par Badge le plus élevé . This protects the more expensive Officier from unnecessary ORV spending.

The optimiser is aperçu uniquement . It does pas automatically spend, allocate or change your saved resources.


## 7. Planificateur d’amélioration multi-Officiers

Le Planificateur multi-Officiers permet de créer une liste prioritaire de plusieurs Officiers, définir les Badges encore nécessaires pour chacun et prévisualiser comment les ORV, Badges Légendaires universels et Coffres partagés pourraient couvrir le plan.

Les plans sont uniquement des aperçus et ne dépensent ni ne modifient l’Inventaire sauvegardé. Les plans nommés peuvent être enregistrés localement et rechargés plus tard.


## 8. Sauvegarder la progression

Officier MAX: use the ⭐ Officier MAX button to set the selected Officier to 5 Étoiles, Level 70, Déblocageed, all 4 Skill Strands at Level 5 and Training Level 180. The Officier profile is saved immediately. Shared inventory is pas spent or changed.

Utilisez Sauvegarder la progression after entering or changing Officier progress information. Progression is stored locally in the browser on the current device. Sauvegarder la progression does pas publish your personal data to other users.


## 9. Base de données

The Base de données Manager controls the Officier master list. Utilisez it to add or edit Officiers and export the database. Export CSV exporte la base de données des Officiers ; cela est différent de Sauvegarder la progression et de la Sauvegarde de l’application.

Pour publier de nouveaux Officiers ou des Officiers modifiés pour tous, mettez à jour les fichiers publiés officers.json and officers.csv files in the GitHub repository.


## 10. Calendrier récurrent des sorties

The Sorties affiche le cycle annuel récurrent des sorties KoW d’août à juillet. Le mois actuel et la prochaine sortie programmée sont automatiquement mis en évidence ; le calendrier ne nécessite donc pas de réinitialisation annuelle.


## 11. Paramètres, sauvegarde et restauration

Paramètres contains the app name, portrait and landscape backgrounds, update controls and Backup & Restore .

Exporter la sauvegarde de l’application creates a JSON backup of KoW Companion data stored locally by the browser. Keep this file somewhere safe. Restaurer la sauvegarde de l’application loads a previously exported JSON backup and reloads the app.

Vérifier les mises à jour compare la version installée à la version publiée. Actualiser vers la dernière version refreshes the KoW Companion application cache without intentionally deleting saved calculator progress.


## Terminologie

ORV = Bon de préparation d’Officier SRV = Bon de préparation d’Étoile Badge légendaire universel = 1 Officier Badge for a Legendary Officier Exclusive Star = 110 Officier Valeur d’Étoiles

