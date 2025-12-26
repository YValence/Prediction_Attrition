# Attrition Analytics & Prediction System

## Description
Système de prédiction de l'attrition des employés utilisant le machine learning pour aider les responsables RH à identifier les employés à risque de départ et prendre des décisions éclairées.

## Contexte du Projet
Dans un environnement économique compétitif, le turnover des employés représente un enjeu stratégique majeur. Ce projet utilise la data science et le machine learning pour anticiper les départs d'employés et réduire les coûts liés au recrutement et à la formation.

## Source des Données
- **Dataset** : WA_Fn-UseC_-HR-Employee-Attrition (Kaggle)
- **Observations** : 1 470 employés
- **Variable cible** : Attrition (Oui / Non)
- **Types de données** : démographiques, professionnelles, satisfaction, performance

## Realisation

### Data Engineer
- Nettoyage et préparation des données
- Feature engineering
- Scaling des variables numériques

### Data Analyst
- Analyse exploratoire des données (EDA)
- Étude des distributions et corrélations
- Identification des facteurs d'attrition

### Machine Learning Engineer
- Entraînement du modèle de classification
- Évaluation et optimisation
- Sérialisation du modèle (.pkl)

### Full-Stack & ML Integration Engineer
- Architecture de l'application
- Développement Backend (FastAPI)
- Développement Frontend (React)
- Intégration du modèle ML
- Visualisations interactives

## Technologies Utilisées

### Data Science & ML
- Python
- Pandas, NumPy
- Scikit-learn (Régression Logistique)
- Feature Engineering & Scaling

### Application Web
- **Backend** : FastAPI
- **Frontend** : React
- **Fonctionnalités** :
  - Chargement de fichiers CSV/Excel
  - Exploration visuelle des données
  - Prédiction du risque d'attrition
  - Indicateurs de risque (faible, moyen, élevé)

## Installation et Utilisation

### Prérequis
```bash
Python 3.8+
Node.js 14+
```

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## Fonctionnalités
- Upload de fichiers de données RH (CSV/XLSX)
- Analyse exploratoire interactive
- Prédiction du risque de départ
- Visualisations et tableaux de bord
- Identification des employés à risque

## Objectifs Atteints
- Exploitation de données réelles (Kaggle)
- Pipeline complet de data science
- Modèle ML performant et fiable
- Application web opérationnelle
- Outil d'aide à la décision pour les RH

## Licence
Ce projet est réalisé dans un cadre académique et professionnel.

---
*Projet réalisé dans le cadre d'une formation en Data Science*
