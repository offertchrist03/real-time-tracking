# tracking-app

# Description de l'app

Cette application est un système de suivi en temps réel des déplacements de personnes. Elle se compose de trois parties principales :

- **Microservice** : Un service Node.js (Express + pg) qui génère périodiquement des coordonnées GPS pour 20 personnes. Chaque nouvelle position est calculée aléatoirement (à une distance comprise entre 0 et 50 mètres par rapport à la précédente) et enregistrée dans une base de données PostgreSQL.

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
   git clone https://github.com/ton-utilisateur/real-time-tracking.git
   cd real-time-tracking

   ```

2. **Backend & Frontend (Next.js + Prisma) :**

   ```Navigue dans le dossier backend/ et installe les dépendances :
   cd backend
   pnpm install
   ```

```Générer le client Prisma à partir du schéma défini dans le fichier prisma/schema.prisma
   npx prisma generate
```

```Configure le fichier .env avec les variables nécessaires
DATABASE_URL
NEXTAUTH_URL
AUTH_SECRET
```

3. **Microservice (Express + pg) :**

   ```Navigue dans le dossier microservice/ et installe les dépendances :
   cd microservice
   pnpm install
   ```

   ```Configure le fichier .env avec les variables nécessaires
   DB_USER
   DB_HOST
   DB_NAME
   DB_PASS
   DB_PORT
   EXPRESS_PORT
   INTERVAL
   ```

4. **Initialiser la base de données :**

   ```Exécute le script SQL situé dans /sql pour créer la table users la table movements :
   psql -U ton_user -d tracking -f sql/init.sql
   ```

```Exécute le script SQL situé dans /sql pour insèrer : 1 admin et les 20 utilisateurs :
  psql -U ton_user -d tracking -f sql/tests.sql
```

### Exécution

1. **Lancer le microservice :**

```bash:
cd microservice
pnpm dev
```

2. **Lancer le backend/ frontend Next.js :**

```bash:
cd backend
pnpm dev

```
