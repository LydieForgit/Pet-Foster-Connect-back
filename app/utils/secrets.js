import fs from "fs";

function getSecret(secretName, envVarName) {
  if (process.env.USE_DOCKER_SECRETS === 'true') {
    const secretPath = `/run/secrets/${secretName}`;
    try {
      return fs.readFileSync(secretPath, 'utf8').trim();
    } catch (error) {
      console.error(`Erreur lecture secret ${secretName}:`, error.message);
      process.exit(1);
    }
  }
    return process.env[envVarName];
}

export const db = {
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.POSTGRES_DB,
  user: getSecret("db_user", "POSTGRES_USER"),
  password: getSecret("db_password", "POSTGRES_PASSWORD"),
};

export const my_jwt = {
  secret: getSecret("jwt_secret", "JWT_SECRET"),
};
