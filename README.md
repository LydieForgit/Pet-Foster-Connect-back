# Pet-foster-connect

## Description 📝

Pet Foster Connect est une API REST développée avec **Node.js**, **Express**, et une base de données **PostgreSQL**.
Elle a pour objectif de gérer les données liées à une plateforme de mise en relation entre familles d’accueil et animaux à adopter.

Le projet est conteneurisé avec **Docker** afin de simplifier le lancement, l’environnement de développement, ainsi que la gestion de la base de données.

## Stack utilisée 🚀

| Technologie             | Rôle                                  |
| ----------------------- | ------------------------------------- |
| Node.js                 | Runtime JavaScript côté serveur       |
| Express.js              | Framework backend                     |
| PostgreSQL              | Base de données relationnelle         |
| Sequelize               | ORM pour Node.js                      |
| Docker & Docker Compose | Conteneurisation                      |
| dotenv                  | Gestion des variables d’environnement |

## Structure du projet

```
.
├── config/
├── controllers/
├── middlewares/
├── utils/
├── database/                      # Scripts SQL d'initialisation
│   ├── create_tables.sql
│   └── populate_tables.sql
├── secrets/                      # Utilisation des secrets avec Docker
│   ├── db_user.txt
│   ├── db_password.txt
│   └── jwt_secret.txt
├── .dockerignore
├── .env                          # Variable d'environnement en local
├── .env.example
├── .gitignore
├── docker-compose.yaml
├── Dockerfile
├── index.js
├── package.json
├── Router.js
└── README.md
```

### Sécurité et Secrets 🔐

- Les variables sensibles sont gérées via .env en local
- En environnement Docker, les secrets sont fournis via le dossier ```./secrets/``` et montés dans ```/run/secrets```

Attention: le ```.env``` et le dossier ```./secrets/``` doivent figurer dans le ```.gitignore```

## Mise en place du projet

Cloner le projet sur votre machine

```bash
git clone <copier coller lien SSH>
```

Puis se déplacer dans le dossier

```bash
cd <nom du projet>
```

### ⚙️ Lancement et configuration local

1️⃣ Copier le fichier d'exemple, puis remplir les valeurs nécessaires

```bash
cp .env.exemple .env
```

2️⃣ Installer les dépendances

```bash
npm install
```

3️⃣ Création de la bdd

- Créer un nouvel utilisateur et une nouvelle base de données dans PostGreSQL

```bash
sudo -i -u postgres psql;
CREATE USER nomDeLutilisateur WITH PASSWORD 'motDePasse';
CREATE DATABASE nomDeLaBase OWNER nomDuLutilisateur;
```

- Lancer le script de création de base de données

```bash
npm run db:create
```

4️⃣ Lancer l’API en local

```bash
npm run dev
```

### 🐳 Lancement avec Docker

Pré-requis :

- Docker Desktop ou Engine
- Docker Compose

- le fichier .env

1️⃣ Créer les secrets docker

Dans un dossier ```./secrets/```, créer les fichiers suivants

```bash
secrets/
│── db_user.txt        → contient uniquement le username
│── db_password.txt    → contient uniquement le mot de passe
└── jwt_secret.txt     → contient uniquement le secret JWT
```

2️⃣ Construire et lancer les services

```bash
docker compose up -d
```

3️⃣ Arrêter les conteneurs

```bash
docker compose down
```

### 🧪 Tests de l’API

Une fois l’API démarrée, elle est accessible sur

```arduino
http://localhost:3000/
```

Liste des endpoints:

| Méthodes          | Endpoints                                 |
| ------------------| ------------------------------------------|
| POST              | /signin                                   |
| POST              | /signup                                   |
| GET               | /animals                                  |
| GET               | /lastanimals                              |
| GET               | /animal/:id                               |
| PATCH             | /animal/:id                               |
| DELETE            | /animal/:id                               |
| GET               | /association/:id/animals                  |
| POST              | /association/:id/animal                   |
| GET               | /association/:id/applications             |
| GET               | /association/:id/applicationsAnswered     |
| GET               | /family/:id/animals                       |
| GET               | /family/:id/applications                  |
| POST              | /animal/:id/family/:id2/application       |
| PATCH             | /application/:id                          |
| GET               | /animal/:id/application/:id2              |
| GET               | /associations                             |
| GET               | /associations/:id                         |
| GET               | /associations/:id/dashboard               |
| PATCH             | /applications/:id/dashboard               |
| DELETE            | /applications/:id/dashboard               |
| GET               | /family/:id                               |
| GET               | /family/:id/dashboard                     |
| PATCH             | /family/:id/dashboard                     |
| DELETE            | /family/:id/dashboard                     |
| POST              | /forgot_password                          |
| PATCH             | /reset_password                           |
| POST              | /upload-image                             |

## 📌 Points d'amélioration prévus

- Mise en place de l’environnement production
- Ajout d’un reverse proxy (Nginx)
- Ajout de tests unitaires & d’intégration (Jest / Supertest)
- CI/CD (GitHub Actions)
- Documentation Swagger
- Déploiement sur un cluster (minikube)
- Helm chart pour Kubernetes

## 📄 Licence

Projet réalisé à titre d'apprentissage et librement réutilisable.
Licence : MIT
