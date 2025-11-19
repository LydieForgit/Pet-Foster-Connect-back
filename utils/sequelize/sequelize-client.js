import "dotenv/config";
import { db } from "../secrets.js";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  username: db.user,
  password: db.password,
  database: db.database,
  host: db.host,
  port: db.port,
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
