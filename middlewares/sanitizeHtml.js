import sanitizeHtml from "sanitize-html";

const sanitizeObject = (obj) => {
  for (const key in obj) {
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