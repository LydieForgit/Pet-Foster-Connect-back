import { Model, DataTypes } from "sequelize";
import { sequelize } from "../sequelize-client.js";

export class Association extends Model {}

Association.init({
    name: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    firstname: {
        type: DataTypes.STRING(64),
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING(64),
        allowNull: false,
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
        allowNull: false,
        unique: true
    },
    department: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        allowNull: false,
    },
    picture: {
        type: DataTypes.STRING(255),
        allowNull: true,
    }
}, {
        sequelize,
        tableName: "association",
});