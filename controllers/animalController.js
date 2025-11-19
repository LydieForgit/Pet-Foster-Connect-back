import { Animal } from "../utils/sequelize/models/index.js";
import { HTTPError } from "../middlewares/errors/httpError.js";

export const animalController = {
    async GetAllAnimalsWithAssociation(req, res, next) {
        const animals = await Animal.findAll({
            order : [['association_id', 'ASC']],
            include : ["association"],
            where: {family_id: null}
        });
        if(animals.length === 0){
            return res.status(200).json("Aucun animal à placer dans cette association");
        }
        res.status(200).json(animals);
    },

    async GetAllAnimalsWithWaitingApplicationsForAssociation(req, res, next) {
        const associationId = req.params.id;
        const animals = await Animal.findAll({  
            where : { 
                association_id : associationId 
            },
            include : [{
                association: "submit",
                through: { 
                    where: { status: "en attente" }
                },
                required: true,
            }],
        });
        // if(animals.length === 0){
        //     return res.status(200).json("Pas de candidatures en attente");
        // }
        res.status(200).json(animals);
    },

    async GetOneApplicationFromAnimal(req, res, next) {
        const animalId = req.params.id;
        const applicationId = req.params.id2;
        const application = await Animal.findOne({
            where: {
                id: animalId
            },
            include: [{
                    association: "submit",  
                    through: {
                        attributes: ['id', 'message', 'status'], 
                        where: { id: applicationId }
                    },
                }]
        });
        if(!application){
            return next(new HTTPError(404, "Candidature introuvable"));
        }
        res.status(200).json(application);
    },
    
    async GetAllAnimalsWithAnsweredApplicationsForAssociation(req, res, next) {
        const associationId = req.params.id;
        const animals = await Animal.findAll({  
            where : { 
                association_id : associationId 
            },
            include : [{
                association: "submit",
                through: { 
                    where: { 
                        status: ["accepté", "refusé"] 
                    }
                },
                required: true,
            }],
        });
        // if(animals.length === 0){
        //     return res.status(200).json("Cette rubrique est vide");
        // }
        res.status(200).json(animals);
    },

    async GetAllAnimalsWithApplicationsForFamily(req, res, next) {
        const familyId = req.params.id;
        const animals = await Animal.findAll({
            include: [{
                association: "submit",
                where: { id: familyId },
            }]
        });
        // if(animals.length === 0){
        //     return res.status(200).json("Pas encore de candidatures");
        // }
        res.status(200).json(animals);
    },

    async GetLatestAnimals(req, res, next) {
        const animals = await Animal.findAll({
            order : [['id', 'DESC']],
            limit: 3,
            include : ["association"],
        })
        if(animals.length === 0){
            return next(new HTTPError(404, "Aucun animal à placer en famille d'accueil"));
        }
        res.status(200).json(animals);
    },


    async GetOneAnimalWithAssociation(req, res, next) {
        const animalId  = req.params.id;
        const animal = await Animal.findOne({
            where : {
                id: animalId
            },
            include: ["association"]
        });
        if (!animal){
            return next(new HTTPError(404, "Animal introuvable"));
        }
        res.status(200).json(animal);
    },

    async GetAllAnimalsFromOneFamily(req, res, next) {
        const familyId  = req.params.id;
        const animals = await Animal.findAll({
            where : { 
                family_id : familyId 
            }
        });
        if (animals.length === 0) {
            return next(new HTTPError(404).json("Cette famille n'a pas d'animaux."));
        }
        res.status(200).json(animals);
    },

    async GetAllAnimalsFromOneAssociation(req, res, next) {
        const associationId  = req.params.id;
        const animals = await Animal.findAll({
            where : { 
                association_id : associationId 
            }
        });
        // if(animals.length === 0){
        //     return res.status(200).json("Cette association n'a pas encore d'animaux");
        // }
        res.status(200).json(animals);
    },

    async CreateAnimal(req, res, next) {
        const associationId  = req.params.id;
        const {name, species, age, gender, description, picture} = req.body;
        const newAnimal = await Animal.create({
            name,
            species,
            age,
            gender,
            description,
            picture,
            association_id : associationId
        })
        res.status(201).json({ message: 'Animal créé avec succès', newAnimal });
    },

    async editAnimal (req, res, next) {
        const animalId  = req.params.id;
        const animal = await Animal.findOne({ where: { id: animalId } });
        if(!animal){
            return next(new HTTPError(404, "Animal introuvable"));
        }
        await animal.update(req.body);
        return res.json(animal);
    },

    async deleteAnimal(req, res, next) {
        const animalId = req.params.id;
        const animal = await Animal.findByPk(animalId);
        if(!animal){
            return next(new HTTPError(404, "Animal introuvable"));
        }
        const result = await animal.destroy();
        return res.status(204).end();
    },

};