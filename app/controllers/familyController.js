import { Family } from "../utils/sequelize/models/index.js";
import { HTTPError } from "../middlewares/errors/httpError.js";

export const familyController = {
    getOne : async (req, res, next) => {
        const family = await Family.findByPk(req.params.id, {
            include: ["animals"]
        });
        if(!family){
            return next(new HTTPError(404, "Famille introuvable"));
        }
        return res.status(200).json(family);
    },

    getOneDashboard : async (req, res, next) => {
        const family = await Family.findByPk(req.params.id, {
            include: [ "user", "animals"]
        });
        if(!family){
            return next(new HTTPError(404, "Famille introuvable"));
        }
        return res.status(200).json(family);
    },

    modifyOne : async (req, res, next) => {
        const family = await Family.findByPk(req.params.id, {
            include: [ "user", "animals"]
        });
        if(!family){
            return next(new HTTPError(404, "Famille introuvable"));
        }
        await family.update(req.body);
        await family.user.update(req.body);
        return res.status(200).json(family);
    },

    deleteOne : async (req, res, next) => {
        const family = await Family.findByPk(req.params.id, {
            include: [ "user"]
        });
        if(!family){
            return next(new HTTPError(404, "Famille introuvable"));
        }
        const result = await family.destroy();
        const result2 = await family.user.destroy();
        return res.status(204).end();
    }
}