import { Model, DataTypes } from "sequelize";
import { sequelize } from "../sequelize-client.js";
import bcrypt from 'bcryptjs';


export class User extends Model {}

User.init({
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique:true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("family", "association"),
        allowNull: false,
    }
}, {
        sequelize,
        tableName: "user",
        hooks : {
            beforeCreate: async (user) => {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')){
                    const salt = await bcrypt.genSalt(10);
                    user.password = await bcrypt.hash(user.password, salt);
                }
            },
        },
});