import { HTTPError } from "../middlewares/errors/httpError.js";

export function controllerWrapper(controller) {
    return async (req, res, next) => {
        try {
            await controller(req, res, next);
        } catch (error) {
            next(new HTTPError(500, error.message));
        }
    }
}