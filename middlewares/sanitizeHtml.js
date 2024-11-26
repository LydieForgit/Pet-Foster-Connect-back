import sanitizeHtml from "sanitize-html";

const sanitizeObject = (obj) => {
    //boucle sur toutes les clés de l'objet en paramètre
  for (const key in obj) {
    //si c'est une chaine de caractère alors on la nettoie
    if (typeof obj[key] === "string") {
      obj[key] = sanitizeHtml(obj[key]);
      //si la valeur d'une des clés est un objet ou un tableau non null on rappelle la fonction recursivement
    } else if (typeof obj[key] === "object" && obj[key] !== null) {
      sanitizeObject(obj[key]);
    }
  }
};

export const bodySanitizer = (req, res, next) => {
  sanitizeObject(req.body);
  next();
};