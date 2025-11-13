BEGIN;

DROP TABLE IF EXISTS "application",
"animal",
"association",
"family",
"user";

CREATE TABLE IF NOT EXISTS "user" (
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(64) CHECK ("role" IN ('family', 'association')) NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "family" (
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "firstname" VARCHAR(64) NULL,
    "lastname" VARCHAR(64) NULL,
    "city" VARCHAR(64) NULL,
    "phone" VARCHAR(15) NULL,
    "picture" VARCHAR(255) DEFAULT NULL,
    "household_composition" TEXT NULL,
    "has_other_pets" TEXT NULL,
    "experience" TEXT NULL,
    "user_id" INT NOT NULL REFERENCES "user"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "association" (
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(64) NULL,
    "firstname" VARCHAR(64) NULL,
    "lastname" VARCHAR(64) NULL,
    "department" INT NULL,
    "city" VARCHAR(64) NULL,
    "address" VARCHAR(255) NULL,
    "phone" VARCHAR(15) NULL,
    "picture" VARCHAR(255) DEFAULT NULL,
    "company_register" VARCHAR(32) NULL UNIQUE,
    "speciality" VARCHAR(64)[] NULL,
    "website" VARCHAR(255) NULL,
    "user_id" INT NOT NULL REFERENCES "user"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CHECK (
        speciality IS NULL OR 
        ARRAY['chien', 'chat', 'lapin', 'rongeur', 'oiseau', 'reptile', 'autre']::VARCHAR(64)[] @> speciality
    )
);

CREATE TABLE IF NOT EXISTS "animal" (
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "name" VARCHAR(64) NOT NULL,
    "species" VARCHAR(64) CHECK ("species" IN ('chien', 'chat', 'lapin', 'rongeur', 'oiseau', 'reptile', 'autre')) NOT NULL,
    "age" VARCHAR(32) NOT NULL,
    "gender" VARCHAR(10) CHECK ("gender" IN ('mâle', 'femelle', 'inconnu')) NOT NULL,
    "description" TEXT NOT NULL,
    "picture" VARCHAR(255) DEFAULT NULL,
    "association_id" INT NOT NULL REFERENCES "association"("id"),
    "family_id" INT REFERENCES "family"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS "application" (
    "id" INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    "message" TEXT NOT NULL,
    "status" VARCHAR(15) CHECK ("status" IN ('accepté', 'refusé', 'en attente')) NOT NULL DEFAULT 'en attente',
    "animal_id" INT NOT NULL REFERENCES "animal"("id"),
    "family_id" INT NOT NULL REFERENCES "family"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMIT;