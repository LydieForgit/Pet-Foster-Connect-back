import { HTTPError } from "./errors/httpError.js";

//les paramètres schema et property font référence au schéma et à la propriété(body ou params notamment) qu'on souhaite valider
export const validationHandler = (schema, property) => {
    return (req, res, next) => {
        //schema.validate() renvoie un objet avec plusieurs propriétés,
        //si le schéma n'est pas respecté, il exite une propriété error qu'on récupère via une destructuration
            const { error } = schema.validate(req[property]);
            //s'il le schéma est respecté, il n'y a pas d'erreur, on passe au middleware suivant grâce à next()
            if (!error) {
                return next();
            } else {
        //l'objet error a une propriété details qui est un tableau d'objet dont le premier élement [0] contient la propriété message
        const message = error.details[0].message;
        return next(new HTTPError(400, message));
            }
    }
}