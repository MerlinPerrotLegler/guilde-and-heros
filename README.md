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
| `npm run start`| Démarre le serveur production (après build) |
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

4. **Commande de démarrage (Start command)**  
   Dans hPanel, définir la commande de démarrage de l’app Node.js sur :
   ```bash
   npm run start
   ```
   ou directement :
   ```bash
   node .output/server/index.mjs
   ```
   Hostinger fournit en général la variable `PORT` ; Nitro l’utilise automatiquement.

5. **Node.js**  
   Choisir la version Node.js 18+ dans les paramètres d’hébergement.

6. **Base de données**  
   Exécuter **une fois** après le premier déploiement (SSH ou script de déploiement) :
   ```bash
   npm run db:push
   ```
   En local, vous pouvez aussi faire `npm run db:push` avec une `.env` pointant vers la base Hostinger pour initialiser les tables.

### En cas de 503 (Service Unavailable)

1. **Tester si le serveur répond**  
   Après déploiement, ouvre `https://ton-site.com/api/health`.  
   - Si tu as `{"ok":true,"time":"..."}` → le processus Node tourne, le 503 vient du reverse proxy ou du routage (port, domaine, etc.).  
   - Si pas de réponse ou erreur → le processus ne démarre pas ou crash (voir ci‑dessous).

2. **Variables d’environnement en production**  
   En prod, le fichier `.env` **n’est pas chargé** par le serveur. Il faut définir toutes les variables (au minimum `DATABASE_URL`) dans hPanel (section env de l’app Node.js). Sinon l’app peut crasher au démarrage ou au premier appel API.

3. **Port d’écoute**  
   Le serveur utilise `process.env.PORT` (ou 3000 par défaut) et écoute sur `0.0.0.0`. Si Hostinger impose un port précis, définir `PORT` dans les variables d’environnement de l’app.

4. **Répertoire de travail**  
   La commande de démarrage doit être exécutée depuis la racine du projet (là où se trouve le dossier `.output`). Si la config Hostinger lance `node server/index.mjs`, elle doit le faire avec le répertoire de travail = répertoire de sortie du build (souvent la racine du dépôt), pas depuis un sous-dossier.

5. **Logs**  
   Consulter les logs de l’app Node.js dans hPanel : message d’erreur au démarrage, stack trace, etc.

6. **Commande de démarrage**  
   Vérifier qu’il s’agit bien de `npm run start` ou `node .output/server/index.mjs`, et **pas** `npm run dev`.

7. **Tester un autre point d’entrée (Hostinger)**  
   Si la config actuelle (Répertoire de sortie = `.output`, Fichier d’entrée = `server/index.mjs`) donne toujours 503, essayer dans hPanel :
   - **Répertoire de sortie** : `.` (racine du projet)
   - **Fichier d’entrée** : `server.mjs`
   Le fichier `server.mjs` à la racine charge le serveur Nitro depuis `.output/server/index.mjs`. La commande de démarrage devient : `node server.mjs`.

8. **Support Hostinger**  
   Si le 503 persiste, contacter le support en précisant : « Mon app Node.js (Nuxt 3) renvoie 503. Quelle commande exécutez-vous pour lancer le serveur après le build, et depuis quel répertoire ? Où puis-je voir les logs du processus Node ? »

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
