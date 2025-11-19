import { Model, DataTypes } from "sequelize";
import { sequelize } from "../sequelize-client.js";

export class Application extends Model {}

Application.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

    message: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("accepté", "en attente", "refusé"),
        allowNull: false,
        defaultValue: 'en attente',
    },
}, {
        sequelize,
        tableName: "application",
        indexes: [
            {
                unique: true,
                fields: ["animal_id", "family_id"],
            }
        ]
});