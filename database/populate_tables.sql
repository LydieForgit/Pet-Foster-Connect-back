-- SQLBook: Code
BEGIN;

-- Insérer des utilisateurs
INSERT INTO "user" ("email", "password", "role") VALUES
('jeanbon@gmail.com', 'jeanbon', 'family'),
('annegneau@gmail.com', 'annegneau', 'family'),
('assodeschats@gmail.com', 'viveleschats', 'association'),
('assodeschiens@gmail.com', 'viveleschiens', 'association');

-- Insérer des familles
INSERT INTO "family" ("firstname", "lastname", "city", "phone", "household_composition", "has_other_pets", "experience", "picture", "user_id") VALUES
('Jean', 'Bon', 'Bayonne', '0699999999', 'Un couple sans enfants', 'Nous avons un chat', 'Nous n''avons pas d''expérience en tant que famille d''accueil.', 'https://im.qccdn.fr/node/guide-d-achat-jambon-blanc-3979/thumbnail_1000x600px-119710.jpg', 1),
('Anne', 'Gneau', 'Orange', '0688888888', 'Un couple avec 2 enfants', 'Nous avons un chien', 'Nous avons accueilli 2 chiens', 'https://st.depositphotos.com/1000686/3738/i/450/depositphotos_37383675-stock-photo-portrait-of-a-young-beautiful.jpg', 2);

-- Insérer des associations
INSERT INTO "association" ("name", "firstname", "lastname", "department", "city", "address", "phone", "company_register", "speciality", "website", "picture","user_id") VALUES
('Asso des chats', 'Mark', 'Repère', 84, 'Orange', '11 rue des Oranges', '0611223344', '123456789', ARRAY['chat'], 'https://fr.wikipedia.org/wiki/Chat', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTct4QnA6zwU4tyn9vq_ADJ8Ey6RfIWK-6V6g&s', 3),
('Asso des chiens', 'Cerise', 'Bigarreau', 61, 'Cerise', '20 rue des Cerises', '0699887766', '987654321', ARRAY['chien'], 'https://fr.wikipedia.org/wiki/Chien','https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Cerise_bigarreau_Napol%C3%A9on.jpg/220px-Cerise_bigarreau_Napol%C3%A9on.jpg', 4);

-- Insérer des animaux
INSERT INTO "animal" ("name", "species", "age", "gender", "description", "picture", "association_id", "family_id") VALUES
('Mr Pizza', 'chien', '5 ans et 6 mois', 'mâle', 'Blablablablabla', 'https://media.istockphoto.com/id/1088702690/fr/photo/chien-avec-une-pointe-de-pizza.jpg?s=1024x1024&w=is&k=20&c=bcSXtFPLpclYraSQ6VQJQMH2IkFQrc8ayOT0rquql50=', 2, NULL),
('Moustache', 'chat', '10 ans environ', 'mâle', 'Miaoumiaoumiaou', 'https://www.demotivateur.fr/images-buzz/111490/Capture%20d%E2%80%99e%CC%81cran%202022-01-05%20a%CC%80%2011-compressed.jpg', 1, NULL),
('Madame', 'chien', 'inconnu', 'femelle', 'Ouafouafouaf', 'https://c8.alamy.com/compfr/jbf37n/chien-femelle-bulldog-anglais-portant-robe-rose-et-perruque-de-cochon-isole-sur-fond-blanc-jbf37n.jpg', 2, NULL),
('Supergirl', 'chat', '2 ans', 'femelle', 'Supermiaou', 'https://img.freepik.com/photos-premium/chat-costume-super-heros-costume-superman_36682-644.jpg', 1, NULL);

-- Insérer des applications
INSERT INTO "application" ("message", "status", "animal_id", "family_id") VALUES
('Bonjour, je veux le chien', 'en attente', 1, 1);

COMMIT;