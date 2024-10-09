import { Application } from "../sequelize/models/index.js";
import { HTTPError } from "../middlewares/errors/httpError.js";

export const applicationController = {
    async SubmitOneApplication(req, res, next) {
            const animalId  = req.params.id;
            const familyId  = req.params.id2;
            const {message} = req.body;
            const newApplication = await Application.create({
                message,
                animal_id: animalId,
                family_id: familyId,
            })
            res.status(201).json({ newApplication });
    },

    async RespondToApplication (req, res, next) {
            const applicationId  = req.params.id;
            const application = await Application.findOne({ where: { id: applicationId } });
            if (!application){
                return next(new HTTPError(404, "Pas de candidatures"));  
            };
            await application.update(req.body);
            return res.json(application);
    }

}