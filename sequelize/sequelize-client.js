import "dotenv/config";

import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(process.env.PG_URL, {
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
