import { Model, DataTypes } from "sequelize";
import { sequelize } from "../sequelize-client.js";

export class Family extends Model {}

Family.init({
    firstname: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING(64),
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    picture: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    householdComposition: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    hasOtherPets: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    experience: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
        sequelize,
        tableName: "family",
});