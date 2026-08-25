# KoW Companion — Guide utilisateur
## Version 4.6.0 TEST MULTILINGUE — PAS LIVE

KoW Companion aide à planifier, suivre et prévoir le développement des Officiers dans *Kiss of War*. Il regroupe la progression des Officiers, l’Inventaire partagé, les calculs d’amélioration, la planification multi-Officiers, les prévisions de sorties futures et les outils de sauvegarde.

## Flux recommandé
1. **Inventaire** — saisissez et sauvegardez toutes les ressources détenues.
2. **Officier** — sélectionnez un Officier et saisissez sa progression actuelle.
3. **Étoiles** — confirmez la progression des Étoiles et les ressources disponibles.
4. **Développement** — saisissez le Déblocage, les Brins de compétence et l’Entraînement.
5. **XP** — confirmez le Niveau actuel et les Livres XP détenus.
6. **Progression** — examinez les Officiers MAXIMISÉS, EN COURS et NON COMMENCÉS.
7. **Planificateur** — modélisez les améliorations d’un ou plusieurs Officiers.
8. **Objectifs d’amélioration** — comparez la situation actuelle à une cible choisie.
9. **Sorties** — consultez le calendrier récurrent et les prévisions de coûts futurs.
10. **Sauvegarde** — exportez régulièrement une sauvegarde de l’application.

# Nouveautés de v4.6.0
- **Objectifs d’amélioration et recommandations**
- **Données dynamiques des Officiers**
- **Informations Données globales des Officiers**
- **Prévision des coûts futurs pilotée par la Base de données**
- Planification améliorée des futurs Officiers
- Persistance de l’état de travail après une actualisation normale
- Conservation des fonctions de planification, Inventaire et sauvegarde de v4.5.0

# Objectifs d’amélioration et recommandations
Ce système calcule sans déduction ce qui manque entre la position sauvegardée d’un Officier et une cible choisie. Les cibles peuvent inclure le Niveau, les Étoiles, l’Entraînement ou Officier MAX.

**Officier MAX** signifie 5 Étoiles, Niveau 70, Officier débloqué, quatre Brins de compétence au Niveau 5 et Entraînement 180. Le calcul ne dépense aucune ressource et ne retire rien de l’Inventaire central.

# Données dynamiques des Officiers
La v4.6.0 sépare les données de sorties publiées de la logique principale. Elles comprennent nom, Saison, rareté, rôle/type, coût ORV, coût SRV, éligibilité de préparation et données associées. Le jeu publié peut être vérifié dans **Paramètres → Données globales des Officiers**.

Toute nouvelle sortie doit d’abord être ajoutée et validée dans l’environnement Test avant promotion vers Live.

# Prévision des coûts futurs des Officiers
La prévision estime les coûts ORV et SRV possibles des futurs Officiers Légendaires saisonniers.

## Référence dynamique de prévision
La v4.6.0 utilise comme référence la dernière sortie d’Officier Légendaire saisonnier confirmée dans la Base de données.

**Exemple :** lors de la sortie v4.6.0, la dernière sortie confirmée est **S7 Chasseurs de chars**, à **600 ORV par Badge et 300 SRV par Étoile exclusive**. Lorsqu’une sortie confirmée plus récente est publiée, la référence avance automatiquement.

Les valeurs prévues sont uniquement des estimations de planification et ne doivent jamais être considérées comme des coûts de jeu confirmés.

## Séquence récurrente des sorties
- **Octobre — Ralliement / Garnison**
- **Janvier — Infanterie**
- **Avril — Chars**
- **Juillet — Chasseurs de chars**

Après juillet, le cycle continue avec octobre Ralliement / Garnison de la Saison suivante.

## Croissance de la prévision
L’hypothèse par défaut est **20 % de croissance par sortie**, modifiable. La prévision affiche ORV par Badge, SRV par Étoile exclusive, ORV total et SRV total prévus.

# Inventaire central
Saisissez les ressources partagées une seule fois puis appuyez sur **Sauvegarder l’Inventaire**. Elles sont ensuite utilisées dans toute l’application.

Ordre approuvé :
1. Coffre de Badges d’Officier Légendaire
2. Coffre de sélection de Badges d’Officier Légendaire
3. Bon de préparation d’Officier (ORV)
4. Bon de préparation d’Étoile (SRV)
5. Badge universel d’Officier Légendaire
6. Badge universel d’Officier Épique
7. Badge universel d’Officier Élite
8. Badges individuels d’Officiers
9. Étoiles Élite I / II / III
10. Étoiles Épiques I / II / III
11. Étoiles Légendaires I / II / III
12. Livres XP — 100 / 500 / 1 000 / 5 000 / 10 000 / 20 000 / 50 000

Il n’existe **aucun Livre XP de 50**.

# Règles des coffres Légendaires
## Coffre de Badges d’Officier Légendaire
Chaque coffre peut être utilisé comme **soit 1 Badge Légendaire universel, soit 600 ORV**. Il ne peut jamais être compté par les deux voies.

## Coffre de sélection de Badges d’Officier Légendaire
Chaque coffre fournit **1 Badge spécifique d’Officier Légendaire** pour un Officier actuellement éligible. Il ne se convertit ni en ORV ni en Badge universel.

# Officiers Légendaires originaux
Ils n’utilisent pas les conversions saisonnières ORV/SRV. Leur progression utilise les ressources applicables, notamment Badges individuels et Badges Légendaires universels. Le Planificateur ne doit jamais leur attribuer ORV ou SRV.

# Progression d’Officier
La section Officier stocke les Étoiles, le Niveau, le Déblocage, les Brins de compétence et l’Entraînement propres à l’Officier. Les ressources partagées restent dans l’Inventaire central.

## Brins de compétence
- **0★** — Brin 1
- **1★** — Brins 1–2
- **2★** — Brins 1–3
- **3★ ou plus** — les quatre Brins

Le Niveau 1 est gratuit lorsqu’un Brin devient disponible.

# Besoins confirmés en Badges
- **Légendaire :** 10 Déblocage + 690 Compétences + 900 Entraînement = **1 600 Badges**
- **Épique :** 10 + 440 + 4 500 = **4 950 Badges**
- **Élite :** 10 + 440 + 18 000 = **18 450 Badges**

# Progression et comparaison
Progression classe les Officiers en **MAXIMISÉ**, **EN COURS** ou **NON COMMENCÉ**. Les ressources simplement détenues n’augmentent pas le pourcentage de développement sauvegardé. Les filtres Progression et Comparaison sont indépendants et les sélections de travail sont conservées après une actualisation normale.

# Optimiseur de ressources
L’Optimiseur compare les options de développement entre Officiers et peut mettre en évidence l’efficacité ORV lorsque les deux sont éligibles. Il fonctionne en aperçu uniquement : aucune ressource n’est dépensée.

# Planificateur d’amélioration multi-Officiers
Il place plusieurs Officiers par priorité et évalue la couverture des besoins en Badges par les ressources partagées. Il prend en charge ORV, Badges universels, Coffres, Coffres de sélection et stratégies de coffre. La planification est non destructive.

# Planification avancée et futurs Officiers
Les sessions peuvent modéliser les Officiers sauvegardés, Toutes les sessions, Session suivante, Octobre Ralliement/Garnison, Janvier Infanterie, Avril Chars et Juillet Chasseurs de chars. Les Officiers **PROJETÉS** sont des espaces de planification, pas des Officiers confirmés.

Ressources établies pour un Légendaire projeté complet : **1 600 Badges, 98 000 valeur d’Étoiles et 199 646 700 XP**. Pour deux : **3 200 Badges, 196 000 valeur d’Étoiles et 399 293 400 XP**.

# Tableau de bord de préparation
Il évalue les scénarios sauvegardés selon les ressources disponibles : préparation Badges, Étoiles, XP, préparation globale, cible prioritaire et prochaine action suggérée. La préparation globale est déterminée par la ressource limitante.

# Persistance de l’état de travail
Une actualisation normale conserve notamment l’Officier sélectionné, l’onglet actuel, les filtres, comparaisons, lignes du Planificateur, sélections avancées, champs de scénario futur et Officier de comparaison de l’Optimiseur. Cela reste distinct des profils, plans et Inventaire sauvegardés de façon permanente.

# Calendrier récurrent des sorties
La section Sorties affiche le cycle annuel et identifie automatiquement la période actuelle et la prochaine sortie : **Octobre Ralliement/Garnison → Janvier Infanterie → Avril Chars → Juillet Chasseurs de chars**, puis répétition.

# Base de données des Officiers
Elle contrôle la liste maîtresse et prend en charge recherche, filtre Saison, ajout/modification/suppression, export/import CSV et restauration des valeurs publiées. Une nouvelle sortie confirmée doit être testée avant Live et peut faire avancer automatiquement la référence de prévision.

# Sauvegarde et restauration
Utilisez **Paramètres → Exporter la sauvegarde de l’application**. Conservez une sauvegarde fiable avant les changements importants. Après restauration, vérifiez que les données restent présentes après rechargement.

# Principe important de planification
KoW Companion sépare **données confirmées** et **données prévues**. Les coûts confirmés de la Base de données sont connus ; les coûts futurs sont des estimations. Dès qu’une sortie devient officielle, les valeurs confirmées doivent remplacer les hypothèses.

---
**Créé par FireStorm (371)**