import "dotenv/config";
import { getSecrets } from "../utils/secrets.js";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  username: process.env.POSTGRES_USER || getSecrets("run/secrets/db_user"),
  password: process.env.POSTGRES_PASSWORD || getSecrets("run/secrets/db_password"),
  database: process.env.POSTGRES_DB,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
    dialect: "postgres",
    define: {
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
});

try{
    await sequelize.authenticate();
    console.log("📚 Sequelize connected");
  } catch (error){
    console.log("❌ Sequelize can't connect to database");
    console.log(error);
  }
