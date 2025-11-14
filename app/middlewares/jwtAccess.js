import jwt from "jsonwebtoken";
import { HTTPError } from "./errors/httpError.js";
import { my_jwt } from "../utils/secrets.js";
import "dotenv/config";

// const jwtSecret = process.env.JWT_SECRET || getSecrets("run/secrets/jwt_secret");

export const authenticateJWTWithRole = (roles = []) => {
  return (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (token) {
        // jwtSecret doit être défini
        jwt.verify(token, my_jwt.secret, (err, user) => {
            if (err) {
                return next(new HTTPError(403, "Accès non autorisé")); // Token invalide (Interdit)
            }
            // Vérification des rôles
            const userRole = user.role; // Récupère le rôle de l'utilisateur à partir du token
            if (!roles.includes(userRole)) {
                return next(new HTTPError(403, "Accès non autorisé")); // Accès refusé pour les rôles insuffisants
            }
            // Ajouter les informations utilisateur à la requête
            req.user = user;  // Ajout du payload complet du JWT à la requête
            next();
        });
    } else {
        res.sendStatus(401); // Non autorisé (Token non fourni)
    }
  };
};
