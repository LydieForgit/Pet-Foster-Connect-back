import { Model, DataTypes } from "sequelize";
import { sequelize } from "../sequelize-client.js";

export class Animal extends Model {}

Animal.init({
    name: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    species: {
        type: DataTypes.ENUM("chien", "chat", "lapin", "rongeur", "oiseau", "reptile", "autre"),
        allowNull: false,
    },
    age: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    gender: {
        type: DataTypes.ENUM("mâle", "femelle", "inconnu"),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    picture: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
}, {
        sequelize,
        tableName: "animal",
});