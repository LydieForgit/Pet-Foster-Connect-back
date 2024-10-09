import joi from "joi";


export const postSchemas = {
//schéma pour valider qu'un user est connecté
userConnected: joi.object({
    email: joi.string().alphanum().max(255).required(),
    //password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    access_token: joi.string().required(),
    role: joi.string().valid("family", "association").required(),
}),

//schéma pour valider la connection d'un user
checkSignIn: joi.object({
    email: joi.string().email().max(255).required()
    .messages({
        //"type de l'erreur généré par joi": "message personnalisé"
        "string.email": "Le format de l'email doit être valide",
        "any.required": "L'email est requis",
        "string.empty": "Veuillez saisir une adresse mail"}),
    password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required()
}),

//schéma pour valider l'inscription d'un user
checkSignUp: joi.object({
    email: joi.string().email().max(255).required()
    .messages({
        "string.email": "Le format de l'email doit être valide",
        "any.required": "L'email est requis",
        "string.empty": "Veuillez saisir une adresse mail"}),
    password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{7,30}$")).required()
    .messages({
        "string.pattern.base": "Le mot de passe doit contenir au moins 7 caractères",
        "any.required": "Le numéro de téléphone est requis",
        "string.empty": "Veuillez saisir un mot de passe"}),
    //repeat_password: joi.ref('password'),
    role: joi.string().valid("family", "association").required()
    .messages({
        "any.only": "Veuillez sélectionner famille ou association"}),
    firstname: joi.string().max(64).required()
    .messages({
        "any.required": "Le prénom est requis",
        "string.empty": "Veuillez saisir votre prénom"}),
    lastname: joi.string().max(64).required()
    .messages({
        "any.required": "Le nom de famille est requis",
        "string.empty": "Veuillez saisir votre nom de famille"}),
    phone: joi.string().max(15).pattern(new RegExp("^[0-9]{10}$")).required()
    .messages({
        "string.pattern.base": "Le numéro de téléphone doit contenir 10 chiffres",
        "any.required": "Le numéro de téléphone est requis",
        "string.empty": "Veuillez saisir votre numéro de téléphone"}),
    city: joi.string().max(64),
    address: joi.string().max(255),
    department: joi.number().integer()
        .when("role", {is: "association", then: joi.required(), otherwise: joi.optional()})
        .messages({
            "any.required": "Le departement est requis",
            "string.empty": "Veuillez choisir votre département"}),
    name: joi.string().max(64)
        .when("role", {is: "association", then: joi.required(), otherwise: joi.optional()})
        .messages({
            "any.required": "Le nom de l'association est requis",
            "string.empty": "Veuillez saisir le nom de l'association"}),
    companyRegister: joi.string().max(32)
        .when("role", {is: "association", then: joi.required(), otherwise: joi.optional()})
        .messages({
            "any.required": "Le numéro RNA/SIREN de l'association est requis",
            "string.empty": "Veuillez saisir le numéro RNA/SIREN de l'association"}),
    picture: joi.string().max(255),
}),        

//schéma pour valider l'ajout d'un animal
checkDataAnimal: joi.object({
    name: joi.string().max(64).required()
    .messages({
        "any.required": "Le nom de l'animal est requis",
        "string.empty": "Veuillez saisir un nom"}),
    species: joi.string().valid("chien", "chat", "lapin", "rongeur", "oiseau", "reptile", "autre").required()
    .messages({
        "any.required": "Une espèce est requise",
        "any.only": "Veuillez sélectionner une espèce dans la liste"}),
    age: joi.string().max(64).required()
    .messages({
        "any.required": "L'âge de l'animal est requis",
        "string.empty": "Veuillez saisir un âge"}),
    gender: joi.string().valid("mâle", "femelle","inconnu").required()
    .messages({
        "any.required": "Un genre est requis",
        "any.only": "Veuillez sélectionner un genre dans la liste"}),
    description: joi.string().max(255).required()
    .messages({
        "any.required": "Une description est requise",
        "string.empty": "Veuillez saisir une description"}),
    picture: joi.string().max(255),
    association_id: joi.number().integer().required(),
    family_id: joi.number().integer().allow(null),
}),

//schéma pour valider la création d'une candidature
checkDataApplication: joi.object({    
    animal_id: joi.number().integer().required(),
    family_id: joi.number().integer().required(),
    message: joi.string().max(255).required()
    .messages({
        "any.required": "Un message est requis",
        "string.empty": "Veuillez saisir un message"}),
    status: joi.string().valid("accepté", "en attente", "refusé").required()
    .messages({
        "any.required": "Un statut est requis",
        "any.only": "Veuillez sélectionner un statut dans la liste"}),
}),
}

export const patchSchemas = {
    //la méthode fork permet de cloner un schéma et de le modifier
    checkPatchDataAnimal: postSchemas.checkDataAnimal
    .fork(Object.keys(postSchemas.checkDataAnimal.describe().keys), (newData) => newData.optional()),

    checkPatchDataAssociation: postSchemas.checkSignUp
    .fork(Object.keys(postSchemas.checkSignUp.describe().keys), (newData) => newData.optional())
    .keys({
        address: joi.string().max(255),
        department: joi.number().integer(),
        city: joi.string().max(64),
        speciality: joi.array()
        .items(joi.string().valid('chien', 'chat', 'lapin', 'rongeur', 'oiseau', 'reptile', 'autre')),
        website: joi.string().max(255)
    }),

    checkPatchDataFamily: postSchemas.checkSignUp
    .fork(Object.keys(postSchemas.checkSignUp.describe().keys), (newData) => newData.optional())
    .keys({
        householdComposition: joi.string().max(255),
        hasOtherPets: joi.string().max(255),
        experience: joi.string().max(255),
    }),

    checkPatchDataApplication: postSchemas.checkDataApplication
    .fork(Object.keys(postSchemas.checkDataApplication.describe().keys), (newData) => newData.optional())
}

export const idSchema = joi.object({
    id: joi.number().integer().required(),
  });

export const doubleIdSchema = joi.object({
    id: joi.number().integer().required(),
    id2: joi.number().integer().required(),
});