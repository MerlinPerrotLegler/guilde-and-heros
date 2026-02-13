# Boilerplate Nuxt.js 3 + MySQL (Hostinger)

Projet Nuxt.js 3 prêt pour un déploiement sur l’hébergement managé Hostinger (Business/Cloud avec Node.js).

## Stack

- **Framework** : Nuxt.js 3
- **ORM** : Prisma + MySQL
- **CSS** : Tailwind CSS 4
- **Runtime** : Node.js
- **Package manager** : npm

## Prérequis

- Node.js 18+ (recommandé : LTS)
- MySQL (local ou Hostinger)
- npm

## Installation

```bash
npm install
```

## Configuration de la base de données

1. Copier le fichier d’exemple des variables d’environnement :

   ```bash
   cp .env.example .env
   ```

2. Éditer `.env` et renseigner l’URL MySQL :

   ```
   DATABASE_URL=mysql://USER:PASSWORD@localhost:3306/DATABASE_NAME
   ```

   Sur Hostinger, utilisez les identifiants MySQL de votre base (hPanel → Bases de données).

## Initialisation de la base

- **Sans migrations** (schéma direct) :

  ```bash
  npm run db:push
  ```

- **Avec migrations** (historique des changements) :

  ```bash
  npm run db:migrate
  ```

- **Données de démo** (optionnel) :

  ```bash
  npm run db:seed
  ```

## Lancement en développement

```bash
npm run dev
```

L’app est disponible sur [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

| Script         | Description                          |
|----------------|--------------------------------------|
| `npm run dev`  | Serveur de développement             |
| `npm run build`| Génère Prisma + build Nuxt           |
| `npm run preview` | Prévisualisation du build          |
| `npm run db:push`  | Applique le schéma Prisma à la DB |
| `npm run db:migrate` | Migrations Prisma (dev)         |
| `npm run db:seed`   | Exécute le seed                    |
| `npm run db:studio` | Interface Prisma Studio          |

## Déploiement sur Hostinger

1. **Repo GitHub**  
   Poussez le projet sur GitHub et connectez-le dans hPanel (déploiement / Git).

2. **Variables d’environnement**  
   Dans hPanel, configurez au minimum :
   - `DATABASE_URL` : `mysql://user:password@localhost:3306/databasename`  
   Utilisez l’utilisateur et la base MySQL créés dans hPanel.

3. **Commandes de build**  
   - Build : `npm run build`  
   Le script exécute `prisma generate` puis `nuxt build`.  
   - Le résultat est dans `.output/`, servi par Hostinger.

4. **Node.js**  
   Choisir la version Node.js 18+ dans les paramètres d’hébergement.

5. **Base de données**  
   Exécuter au moins une fois les migrations ou `db:push` (en SSH si disponible, ou via un script de déploiement). En local, vous pouvez faire `npm run db:push` avec une `.env` pointant vers la base Hostinger pour initialiser les tables.

## Structure du projet

```
├── prisma/
│   └── schema.prisma
├── server/
│   ├── api/           # Routes API (ex. CRUD users)
│   ├── middleware/
│   └── utils/
│       └── prisma.ts
├── composables/
├── components/
├── layouts/
├── pages/
├── public/
├── assets/
│   └── css/
├── .env.example
├── nuxt.config.ts
├── package.json
└── README.md
```

## Contraintes

- **MySQL uniquement** : pas de PostgreSQL ni MongoDB sur l’offre managée concernée.
- **Pas de Docker** : hébergement managé, pas de conteneurs.
- **Secrets** : ne jamais mettre les identifiants en dur ; toujours utiliser `process.env` ou `useRuntimeConfig()`.
- **Build** : le script `build` inclut `prisma generate` pour que le client Prisma soit disponible en production.
- **Preset Nitro** : `node-server` pour la compatibilité avec Hostinger.
