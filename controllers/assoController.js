import { Association } from "../sequelize/models/index.js";
import { HTTPError } from "../middlewares/errors/httpError.js";

export const assoController = {
    getAll : async (req, res, next) => {
        const associations = await Association.findAll({
        });
        if(!associations){
            return next(new HTTPError(404, "Associations introuvables"));
        }
        return res.status(200).json(associations);
    },

    getOne : async (req, res, next) => {
        const association = await Association.findByPk(req.params.id);
        if(!association){
            return next(new HTTPError(404, "Association introuvable"));
        }
        
        return res.status(200).json(association);
        
    },

    getOneDashboard : async (req, res, next) => {
        const association = await Association.findByPk(req.params.id, {
            include: [ "user"]
        });
        if(!association){
            return next(new HTTPError(404, "Association introuvable"));
        }
        
        return res.status(200).json(association);
        
    },

    modifyOne : async (req, res, next) => {
        const association = await Association.findByPk(req.params.id, {
            include: [ "user"]
        });
        if(!association){
            return next(new HTTPError(404, "Associations introuvables"));
        }
        await association.update(req.body);
        await association.user.update(req.body);
        return res.status(200).json(association);
    },

    deleteOne : async (req, res, next) => {
        const association = await Association.findByPk(req.params.id, {
            include: [ "user"]
        });
        if(!association){
            return next(new HTTPError(404, "Association introuvable"));
        }
        const result = await association.destroy();
        const result2 = await association.user.destroy();
        return res.status(204).end();
    }
}