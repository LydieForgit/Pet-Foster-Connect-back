# Pet-foster-connect

## Mise en place du projet

### Une fois le projet cloné

**Commande pour initialiser le projet et installer les dépendances**
```npm init```

**Création du fichier ```.env``` sur le modèle du fichier ```.env.example```

**Commande pour lancer le projet**
```npm run dev```

## Création et connection à la base de donnée

Les données sont fournies dans un fichier create_db.sql, à importer dans une base de données PostGreSQL.

Créer un nouvel utilisateur et une nouvelle base de données dans PostGreSQL, puis y importer les données du fichier.
```
sudo -i -u postgres psql;
CREATE USER nomDuLutilisateur WITH PASSWORD 'motDePasse';
CREATE DATABASE nomDeLaBase OWNER nomDuLutilisateur;
```
**Quitter le logiciel ```psql```
**Renseigner correctement le fichier ```.env``` avec les renseignements adéquats

