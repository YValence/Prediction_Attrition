# Script de Démonstration - Application HR Attrition Analytics
## Guide Complet en Français (Page par Page)

---

## 📖 Introduction Générale

**Bonjour et bienvenue dans l'application HR Attrition Analytics !**

Cette application est conçue pour aider les départements des ressources humaines à **identifier et prédire** les employés qui risquent de quitter l'entreprise. Grâce à l'intelligence artificielle et à l'analyse des données, nous pouvons prendre des mesures proactives pour améliorer la rétention des talents.

Allons explorer ensemble les 5 pages principales de cette application.

---

## 1️⃣ PAGE D'ACCUEIL - Upload Screen

### 🎯 Objectif
Télécharger les données des employés pour commencer l'analyse.

### 📋 Explication Détaillée

Bienvenue sur la **première page** de l'application !

Ici, nous allons charger nos données d'employés. L'application accepte deux formats :
- **CSV** (Comma Separated Values)
- **XLSX** (Excel)

**Voici ce que vous voyez :**
- Une **zone de téléchargement** avec un message "Glissez-déposez votre fichier ici"
- Un bouton pour **sélectionner un fichier** depuis votre ordinateur
- Une **liste des colonnes requises** que votre fichier doit contenir

**Les colonnes essentielles incluent :**
- Informations personnelles : Age, Sexe, État Civil
- Informations professionnelles : Département, Poste, Années d'ancienneté
- Compensation : Salaire mensuel
- Et 10+ autres variables de travail

**Ce qui se passe en arrière-plan :**
1. Le fichier est validé pour s'assurer qu'il contient toutes les colonnes requises
2. Les données sont chargées dans la session
3. Un aperçu des 5 premières lignes est affiché
4. Les valeurs manquantes sont identifiées

**Quand vous cliquez sur "Continuer" :**
→ Vous accédez à la page d'exploration des données

---

## 2️⃣ PAGE D'EXPLORATION - Explore Screen

### 🎯 Objectif
Explorer et visualiser les caractéristiques de votre main-d'œuvre.

### 📊 Explication Détaillée

Vous êtes maintenant sur la **deuxième page** - le cœur de l'analyse descriptive !

**Les 4 Cartes KPI en Haut :**

1. **Total Employees** (Nombre total d'employés)
   - Affiche le nombre total de personnes dans votre dataset
   - Exemple : 1470 employés
   - Couleur : Bleu (Violet)

2. **Features** (Caractéristiques disponibles)
   - Montre combien de colonnes/variables nous analysons
   - Exemple : 35 caractéristiques différentes
   - Couleur : Vert

3. **Departments** (Nombre de départements)
   - Le nombre unique de départements dans l'entreprise
   - Exemple : 3 départements
   - Couleur : Orange

4. **Job Roles** (Nombre de postes)
   - Le nombre unique de postes/rôles dans l'entreprise
   - Exemple : 9 postes différents
   - Couleur : Rose

**Les 3 Graphiques Interactifs :**

Vous pouvez **cliquer sur les boutons** en haut pour basculer entre les différentes visualisations :

**1️⃣ Age Distribution (Distribution d'âge)**
   - Un **graphique en barres** montrant la répartition par tranches d'âge
   - Tranches : 18-25, 25-35, 35-45, 45-55, 55-65
   - Nous montre la démographie de l'équipe
   - Exemple : La plupart des employés ont entre 30 et 40 ans

**2️⃣ Department (Département)**
   - Un **graphique en barres horizontal** montrant les effectifs par département
   - Exemple : Ventes, IT, Ressources Humaines
   - Aide à identifier les départements les plus importants
   - Exemple : Ventes a 600 employés, IT a 510

**3️⃣ Job Role (Poste/Rôle)**
   - Un **graphique en barres horizontal** avec les 8 postes les plus courants
   - Exemple : Représentant commercial, Analyste technique, Manager
   - Montre la distribution des rôles professionnels
   - Aide à comprendre la structure organisationnelle

**Ce qui se passe techniquement :**
- Chaque graphique est recalculé à partir de vos données
- Les données manquantes sont exclues
- Les statistiques sont mises à jour en temps réel
- Le serveur backend envoie des données pré-traitées pour la visualisation

**Quand vous cliquez sur "Run Predictions" :**
→ Vous accédez à la page de prédiction où le modèle d'IA va analyser

---

## 3️⃣ PAGE DE PRÉDICTION - Prediction Screen

### 🎯 Objectif
Exécuter le modèle de machine learning pour prédire le risque d'attrition.

### 🤖 Explication Détaillée

Vous êtes maintenant sur la **troisième page** - où la magie de l'IA opère !

**Étape 1 : Démarrer la Prédiction**
Initialement, vous verrez :
- Un message : "Ready to Predict Attrition"
- Une explication : "Cliquez ci-dessous pour exécuter le modèle ML sur vos données..."
- Un bouton bleu : "Run Predictions"

**En cliquant sur "Run Predictions", voici ce qui se passe :**

1. **Traitement des données** : Chaque employé est encodé et normalisé
2. **Exécution du modèle** : Un modèle de machine learning (entraîné sur des données historiques) analyse chaque employé
3. **Calcul des probabilités** : Pour chaque personne, on obtient un score d'attrition (0-100%)
4. **Classification du risque** :
   - **Low Risk (Risque Faible)** : < 30% de probabilité de départ
   - **Medium Risk (Risque Moyen)** : 30-60% de probabilité
   - **High Risk (Risque Élevé)** : > 60% de probabilité

**Les 4 Cartes KPI :**

1. **Total Employees** : Nombre total d'employés analysés
   - Exemple : 1470

2. **High Risk** : Nombre d'employés à risque élevé
   - Exemple : 147 employés
   - Pourcentage : 10% de la main-d'œuvre

3. **Medium Risk** : Nombre d'employés à risque moyen
   - Exemple : 294 employés
   - Pourcentage : 20% de la main-d'œuvre

4. **Avg Risk Level** : Probabilité moyenne d'attrition
   - Exemple : 32.5%
   - Indique le risque global de l'entreprise

**Les 2 Graphiques :**

**1️⃣ Risk Distribution (Donut Chart)**
   - Un **diagramme circulaire** montrant la répartition des catégories de risque
   - Les 3 couleurs représentent les 3 niveaux de risque
   - Chaque segment montre le nombre d'employés dans chaque catégorie
   - Exemple : 60% Faible, 20% Moyen, 20% Élevé

**2️⃣ Risk Levels Breakdown (Bar Chart)**
   - Un **graphique en barres** des 3 catégories de risque
   - Chaque barre représente un niveau de risque
   - Les hauteurs montrent le nombre d'employés
   - Plus facile de comparer les catégories

**Le Résumé :**
Un **texte explicatif** qui vous dit :
- "Le modèle a identifié X employés à haut risque..."
- "Y employés montrent un risque modéré..."
- "Suivant : Examinez l'analyse détaillée des risques..."

**Quand vous cliquez sur "View Risk Analysis" :**
→ Vous accédez au tableau des risques avec tous les détails

---

## 4️⃣ PAGE DU TABLEAU DE RISQUE - Risk Table Screen

### 🎯 Objectif
Examiner en détail la liste complète des employés et leurs scores de risque.

### 📊 Explication Détaillée

Vous êtes maintenant sur la **quatrième page** - le **tableau de contrôle principal** des ressources humaines !

**La Barre de Recherche et Filtrage :**
En haut, vous trouverez :
- Une **barre de recherche** pour filtrer par numéro d'employé
- Un **bouton "Attrition"** pour filtrer par prédiction (Oui/Non)
- Des **options de tri** pour organiser les données

**Le Tableau Principal :**

Le tableau affiche une **liste de tous les employés** avec les colonnes suivantes :

| Colonne | Description |
|---------|-------------|
| **Employee ID** | Numéro unique de l'employé |
| **Age** | Âge de la personne |
| **Department** | Département (Ventes, IT, RH) |
| **Job Role** | Poste occupé |
| **Monthly Income** | Salaire mensuel |
| **Risk Level** | 🔴 High / 🟠 Medium / 🟢 Low |
| **Probability** | Score de probabilité d'attrition (0-100%) |

**Code Couleur du Risque :**
- 🔴 **HIGH (Rouge)** : Risque élevé - Action urgente recommandée
- 🟠 **MEDIUM (Orange)** : Risque moyen - Surveillance régulière
- 🟢 **LOW (Vert)** : Risque faible - Engagement standard

**Interactions du Tableau :**
- **Cliquez sur une ligne** pour voir le profil détaillé de l'employé
- **Triez** en cliquant sur les en-têtes de colonne
- **Cherchez** des employés spécifiques
- **Exportez** les données si nécessaire

**Ce qui se passe techniquement :**
- Les données sont chargées depuis le serveur backend
- Chaque score de risque est calculé par le modèle ML
- Le tableau est pagé pour les performances (50 employés par page)
- Les filtres sont appliqués côté client pour une réactivité rapide

**Quand vous cliquez sur un employé :**
→ Vous accédez à la page de détail de l'employé

---

## 5️⃣ PAGE DE DÉTAIL EMPLOYÉ - Employee Detail Screen

### 🎯 Objectif
Examiner en détail le profil d'un employé et recevoir des recommandations d'action.

### 👤 Explication Détaillée

Vous êtes maintenant sur la **cinquième page** - le **profil détaillé** d'un employé !

**En-Tête du Profil :**
Un **grand bandeau** affichant :
- **ID de l'employé** : Numéro unique
- **Département** : Quel département
- **Poste** : Quel rôle occupe la personne
- **Âge, Ancienneté, Salaire** : Informations clés
- **Badge de Risque Coloré** : Affiche le niveau de risque en gros

**Section 1 : Évaluation du Risque d'Attrition**

**Barre de Probabilité :**
- Une **barre de progression** montrant le score d'attrition
- 0% = Pas de risque (vert)
- 50% = Risque modéré (orange)
- 100% = Risque très élevé (rouge)
- Exemple : 72% de chance de départ dans les 12 prochains mois

**Explication du Risque :**
Un texte qui explique en détail :

*Pour un employé à **Haut Risque** :*
> "Cet employé montre un risque d'attrition élevé basé sur plusieurs facteurs : ancienneté courte, charge de travail importante et compensation insuffisante. Les RH doivent prioriser les conversations d'engagement et de rétention."

*Pour un employé à **Risque Moyen** :*
> "Cet employé montre un risque modéré d'attrition. Un suivi et des contrôles d'engagement réguliers sont recommandés..."

*Pour un employé à **Risque Faible** :*
> "Cet employé montre un risque faible d'attrition. Continuez les pratiques d'engagement standard..."

**Section 2 : Classification du Risque**

Une **légende des risques** :
- 🔴 High Risk : 60%+ de probabilité
- 🟠 Medium Risk : 30-60% de probabilité  
- 🟢 Low Risk : <30% de probabilité

Avec une explication : "Cet employé est actuellement classé comme X Risk et nécessite une attention [immédiate/régulière/standard]"

**Section 3 : Facteurs Clés de Risque**

Une **liste numérotée** expliquant POURQUOI le modèle a attribué ce risque :

*Exemples de facteurs pour un Haut Risque :*
1. ❌ Ancienneté faible (< 2 ans) - Les nouveaux employés partent plus souvent
2. ⚠️ Absence de promotion récente (> 2 ans) - Pas de progression
3. ⚠️ Charge horaire élevée (> 45h/semaine) - Burnout potentiel
4. 📊 Salaire inférieur à la médiane - Compensation insuffisante
5. 🚫 Évaluations médiocres des derniers 6 mois - Performance en baisse

**Section 4 : Recommandations d'Action**

Des **boîtes d'action** avec des emojis et des recommandations spécifiques :

*Pour un Employé à **Haut Risque** :*
1. 🚨 **Urgent** : Réunion prioritaire d'engagement
2. 💰 Examiner la compensation et l'augmentation de salaire
3. 📈 Discuter des plans de progression de carrière
4. ⏰ Envisager des arrangements de travail flexibles
5. 🎯 Suivi régulier pendant les 3 prochains mois

*Pour un Employé à **Risque Moyen** :*
1. 📞 Planifier des vérifications périodiques
2. 🎓 Proposer un développement professionnel
3. 🤝 Renforcer les relations d'équipe
4. 📅 Évaluations de satisfaction trimestrielles

*Pour un Employé à **Risque Faible** :*
1. ✅ Maintenir le niveau actuel d'engagement
2. 🎉 Programmes de reconnaissance
3. 📚 Continuer les opportunités de développement

**Section 5 : Insight Clé (Boîte Jaune)**

Un **message de synthèse** qui dit :
> "💡 Le profil de cet employé suggère un risque d'attrition [faible/moyen/élevé]. L'engagement proactif et l'adressage des facteurs clés peuvent améliorer significativement la probabilité de rétention. Les RH doivent faire un suivi dans les 2 prochaines semaines."

**Bouton d'Action :**
- **"Back to Table"** : Retourne à la liste complète des employés

**Ce qui se passe techniquement :**
- Le modèle ML fournit une **probabilité de départ** pour cette personne
- Les **facteurs de risque** sont extraits des décisions du modèle
- Les **recommandations** sont basées sur le niveau de risque
- Les **couleurs** changent dynamiquement selon le score

---

## 🔄 Flux Complet de l'Application

```
[1. UPLOAD] 
    ↓
Télécharger CSV/XLSX
    ↓
[2. EXPLORE]
    ↓
Voir les statistiques de base
(Age, Département, Poste)
    ↓
[3. PREDICT]
    ↓
Exécuter le modèle ML
Obtenir les scores de risque
    ↓
[4. RISK TABLE]
    ↓
Voir tous les employés et leurs risques
Cliquer sur un employé
    ↓
[5. EMPLOYEE DETAIL]
    ↓
Voir le profil complet
Lire les recommandations
    ↓
Retourner au tableau
```

---

## 💡 Cas d'Usage Pratiques

### Cas 1 : Employé à Haut Risque
**Situation** : Marie, Analyste IT, depuis 1 an, salaire 2500€
- Score de risque : **78%**
- Facteurs : Nouvelle, charge de travail élevée, pas de promotion
- **Action** : 
  1. Réunion avec le manager cette semaine
  2. Discuter d'augmentation de salaire
  3. Proposer une formation avancée
  4. Flexible work arrangement

### Cas 2 : Employé à Risque Moyen
**Situation** : Jean, Représentant Ventes, depuis 5 ans, salaire 3200€
- Score de risque : **42%**
- Facteurs : Pas de promotion depuis 2 ans, satisfaction moyenne
- **Action** :
  1. Check-in mensuel avec le manager
  2. Formation en gestion commerciale
  3. Team building activities
  4. Vérifier la satisfaction tous les trimestres

### Cas 3 : Employé à Risque Faible
**Situation** : Sophie, Manager RH, depuis 8 ans, salaire 4000€
- Score de risque : **12%**
- Facteurs : Senior, progressions régulières, compensation compétitive
- **Action** :
  1. Maintenir l'engagement actuel
  2. Inclure dans les initiatives de leadership
  3. Proposer des opportunités de mentoring
  4. Programme de reconnaissance annuel

---

## 🎓 Points Clés à Retenir

1. **Prédiction Proactive** : Identifiez les risques AVANT qu'ils partent

2. **Données Objectives** : Basé sur les données réelles, pas sur l'intuition

3. **Actions Ciblées** : Des recommandations spécifiques selon le niveau de risque

4. **Suivi Régulier** : Monitoring continu des employés à risque

5. **Impact Métier** : Réduire le turnover = Économies + Continuité + Moral

---

## ❓ FAQ

**Q: Le modèle est-il 100% exact ?**
A: Non, aucun modèle n'est parfait. Utilisez-le comme **guide, pas comme certitude**. Les interactions humaines restent essentielles.

**Q: Quelle est la source des données ?**
A: Les données historiques d'attrition passée + variables de travail actuelles.

**Q: Peut-on améliorer les prédictions ?**
A: Oui ! Plus de données = modèles meilleurs. Le système s'améliore avec le temps.

**Q: Qui devrait utiliser cette application ?**
A: Directeurs RH, Managers, Chefs de Département

**Q: Quelle est la fréquence de mise à jour ?**
A: Chaque fois que vous téléchargez de nouvelles données.

---

## 📞 Support et Contact

Pour toute question ou problème technique :
- Consultez la documentation dans le README.md
- Vérifiez les fichiers de configuration
- Assurez-vous que Python 3.8+ et Node.js sont installés

---

**Merci d'avoir utilisé HR Attrition Analytics !**

*Ensemble, construisons une meilleure rétention des talents.* 🚀
