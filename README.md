# Tracking-APP

# Description de l'app

Cette application est un système de suivi en temps réel des déplacements de personnes. Elle se compose de trois parties principales :

- **Microservice** : Un service Node.js (Express + pg) qui génère périodiquement des coordonnées GPS pour 20 personnes. Chaque nouvelle position est calculée aléatoirement (à une distance comprise entre 0 et 50 mètres par rapport à la précédente et mais suivant la direction adjacentes aux précédentes) et enregistrée dans une base de données PostgreSQL.

- **Backend & Frontend** : Une application Next.js qui gère à la fois l'interface utilisateur et les API RESTful pour récupérer les mouvements enregistrés.  
  **Note :** J'ai utilisé Next.js et Prisma pour le front-end et le back-end.

- **Interface Utilisateur** :
  - Authentification sécurisée (avec NextAuth.js) gérant différents rôles (admin et utilisateur).
  - Visualisation des déplacements sur une carte en temps réel.
  - Utilisation d'OpenStreetMap avec Leaflet.js pour afficher la carte, avec chaque point GPS représenté par un point jaune relié par une ligne rouge.

---

## Fonctionnalités Principales

- **Microservice de Génération de Coordonnées GPS**

  - Liste de 20 personnes, chacune avec une position initiale.
  - Génération périodique de nouvelles coordonnées GPS pour chaque personne, en tenant compte d’un déplacement aléatoire (0 à 50 mètres) avec une direction réaliste.
  - Enregistrement de chaque mouvement (person_id, latitude, longitude, timestamp) dans PostgreSQL via des requêtes SQL directes.

- **Backend et API**

  - Exposition d’API RESTful (via les API Routes de Next.js) pour :
    - Enregistrer les mouvements générés.
    - Récupérer les mouvements (ex. : les 50 derniers mouvements).
  - Stockage des données dans une base de données relationnelle PostgreSQL.

- **Interface Utilisateur (Frontend)**
  - Authentification (avec NextAuth.js) et gestion des rôles (admin peut voir tous les mouvements, user uniquement les siens).
  - Affichage en temps réel des mouvements sur une carte.
  - Utilisation d’OpenStreetMap via Leaflet.js pour la cartographie :
    - Chaque point GPS est affiché par un marqueur jaune.
    - Les points successifs sont reliés par une ligne rouge.

---

## Technologies Utilisées

- **Frontend & Backend** :

  - **Next.js** (React) pour le rendu côté client et les API Routes.
  - **Prisma** (ORM) pour la gestion des données (même si certaines parties utilisent directement SQL, Prisma intervient dans la partie front-end et back-end pour une gestion optimisée des modèles de données).

- **Microservice** :

  - **Node.js** avec **Express** pour la génération des coordonnées.
  - **pg** (avec `pg.Pool`) pour l’interaction avec la base de données PostgreSQL.

- **Base de données** : PostgreSQL.

- **Authentification** : NextAuth.js.

- **Cartographie** :

  - **OpenStreetMap** pour les données cartographiques.
  - **Leaflet.js** (via `react-leaflet`) pour l'affichage de la carte.

- **Styling** : Tailwind CSS pour un design moderne et responsive.

---

## Installation et Exécution

### Prérequis

- Node.js (avec pnpm, npm ou yarn)
- PostgreSQL

### Installation

1. **Cloner le dépôt GitHub :**

```bash
git clone https://github.com/offertchrist03/real-time-tracking.git
cd real-time-tracking

```

2. **Initialiser la base de données :**

Exécute le script SQL situé dans `/sql` pour créer la base de donnee `real_time_tracking` :

```
psql -U <utilisateur_postgres> -f <chemin vers>\sql\db.sql
```

Exécute le script SQL situé dans `/sql` pour créer la table `users` et la table `movements` :

```
psql -U <utilisateur_postgres> -d real_time_tracking -f <chemin vers>\sql\init.sql
```

Exécute le script SQL situé dans `/sql` pour insèrer : 1 admin et les 20 utilisateurs :

```
psql -U <utilisateur_postgres> -d real_time_tracking -f <chemin vers>\sql\tests.sql
```

3. **Backend & Frontend (Next.js + Prisma) :**

Navigue dans le dossier `backend/` et installe les dépendances :

```
cd backend
pnpm install
```

Générer le client Prisma à partir du schéma défini dans le fichier `prisma/schema.prisma`

```
npx prisma generate
```

Configure le fichier `.env` avec les variables nécessaires. exemples :

```
DATABASE_URL=postgresql://<utilisateur_postgres>:<mot_de_passe>@localhost:5432/real_time_tracking
NEXTAUTH_URL=http://localhost:3000
AUTH_SECRET=secret
```

4. **Microservice (Express + pg) :**

Navigue dans le dossier `microservice/` et installe les dépendances :

```
cd microservice
pnpm install
```

Configurez le fichier `.env` avec les variables nécessaires. exemples :

```
DB_USER=<utilisateur_postgres>
DB_HOST=localhost
DB_NAME=real_time_tracking
DB_PASS=<mot_de_passe>
DB_PORT=5432
EXPRESS_PORT=5000
INTERVAL=10000
```

### Exécution

1. **Lancer le microservice :**

executer dans le terminal :

```
cd microservice
pnpm start
```

2. **Lancer le backend/ frontend Next.js :**

executer dans le terminal :

```
cd backend
pnpm dev
```
