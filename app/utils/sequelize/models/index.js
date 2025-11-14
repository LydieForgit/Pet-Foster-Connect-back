import { Animal } from "./Animal.js";
import { Association } from "./Association.js";
import { Family } from "./Family.js";
import { User } from "./User.js";
import { Application } from "./Application.js";


// Animal <-> Association (One-to-Many)
Animal.belongsTo(Association, { 
    as: "association", 
    foreignKey: { 
        name: "association_id",
        allowNull: false
        //Dans une relation One-to-XXXX allowNull doit être défini du côté belongsTo
    },
});
Association.hasMany(Animal, {
    as: "animals",
    foreignKey: "association_id",
});

// Animal <-> Family (One-to-Many)
Animal.belongsTo(Family, {
    as: "foster",
    foreignKey: {
        name: "family_id",
        allowNull: true,
    },
});
Family.hasMany(Animal, {
    as: "animals",
    foreignKey: "family_id",
});

// User <-> Family (One-to-One)
Family.belongsTo(User, {
    as: "user",
    foreignKey: {
        name: "user_id",
        allowNull: false,
    },
});
User.hasOne(Family, {
    as: "family",
    foreignKey: "user_id",
});

// User <-> Association (One-to-One)
Association.belongsTo(User, {
    as: "user",
    foreignKey: {
        name: "user_id",
        allowNull: false,
    },
});
User.hasOne(Association, {
    as: "association",
    foreignKey: "user_id",
});

// Animal <-> Application (Many-to-Many)
Animal.belongsToMany(Family, {
    through: Application,
    as: "submit",  // Alias pour accéder aux familles d'un animal
    foreignKey: "animal_id", // Clé étrangère dans la table Application
});
Family.belongsToMany(Animal, {
    through: Application,
    as: "submit", // Alias pour accéder aux animaux d'une famille
    foreignKey: "family_id", // Clé étrangère dans la table Application
});


export { Animal, Association, Family, User, Application};