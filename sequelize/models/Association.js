import { Model, DataTypes } from "sequelize";
import { sequelize } from "../sequelize-client.js";

export class Association extends Model {}

Association.init({
    name: {
        type: DataTypes.STRING(64),
        allowNull: true,
    },
    firstname: {
        type: DataTypes.STRING(64),
        allowNull: true,
    },
    lastname: {
        type: DataTypes.STRING(64),
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING(64),
        allowNull: true,
    },
    companyRegister: {
        type: DataTypes.STRING(32),
        allowNull: true,
        unique: true
    },
    department: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    speciality: {
        type: DataTypes.ARRAY(DataTypes.STRING), // Définition du champ speciality
        allowNull: true,
        validate: {
          isIn: {
            args: [['chien', 'chat', 'lapin', 'rongeur', 'oiseau', 'reptile', 'autre']], // Validation pour le champ speciality
          },
        },
    },
    website: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: true,
    },
    picture: {
        type: DataTypes.STRING(255),
        allowNull: true,
    }
}, {
        sequelize,
        tableName: "association",
});