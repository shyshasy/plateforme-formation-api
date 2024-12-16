# API de Gestion Plante forme Pour la Formation

## Description

Cette API permet de gérer les etudiants, les modules, les registrations et les payments avec des fonctionnalités CRUD (Create, Read, Update, Delete).Elle est développée avec Express.js et utilise Prisma avec PostgreSQL pour la gestion de la base de données.

## Objectifs

- Développer et tester une API RESTful avec Express.js et Prisma/PostgreSQL.
- Intégrer des outils d'analyse et de formatage de code.
- Déployer l'API

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- Node.js
- PostgreSQL
- Postman (pour tester l'API)

## Technologies Utilisées

- Node.js : Plateforme JavaScript côté serveur.
- Express : Framework web pour Node.js.
- PostgreSQL : Système de gestion de base de données.
- Jasmine : Framework de tests pour JavaScript.
- Postman : Utilisé pour tester l'API.

## Installation

Suivez ces étapes pour configurer le projet sur votre machine locale :

1. Clonez le dépôt sur votre machine locale :

```
git clone https://github.com/NdiayeOusmanaCamara/plateforme-formation-api.git

```

2. Accédez au répertoire du projet :

```
Cd plateforme-formation-api
```

3. Installez les dépendances du projet :

```
npm install
```

## Configuration de la base de données

1. Assurez-vous que postgresql est en cours d'exécution sur votre machine.
2. Créez une base de données pour le projet (par exemple, plateforme_formation).
3. Modifiez le fichier .env-exemple le nommant .env pour y insérer les informations de connexion à la base de données.

Exemple de fichier `.env `:

```
DATABASE_URL="postgresql://user:password@localhost:Port/database"

PORT=4000
LANGUAGE=fr
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=plateforme_formation
NODE_ENV=production
```

## Utilisation

Pour démarrer l'application :

```
npm start
```

L'API sera accessible à `http://localhost:4000`

## les tests unitaires

L'application utilise Jasmine pour les tests unitaires. Pour exécuter les tests, utilisez la commande suivante:

```
npm test
```

Les tests incluent la vérification des fonctionnalités principales telles que la création, la récupération, la mise à jour, et la suppression des students.

## Analyse et formatage de code

L'analyse statique du code s'effectue à l'aide d'ESLint, tandis que le formatage est assuré par Prettier. Ces outils sont configurés pour être intégrés dans votre pipeline de développement afin de garantir un code propre et homogène

### Exécuter l'analyse du code :

```
npm run lint
```

### Exécuter le formatage automatique :

```
npm run format
```

## Documentation et Collection Postman

- Exporter la collection plateforme-formation:`plateform-formation.postman_collection`
- Importer dans Postman et exécuter les requêtes.

## Auteur


[Hama Houllah Mangassouba ](https://https://github.com/Mangassouba)
