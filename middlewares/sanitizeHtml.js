import sanitizeHtml from "sanitize-html";

export const bodySanitizer = (req, res, next) => {
  //boucle sur toutes les clés reçues dans le body
  for( const key of Object.keys(req.body)){
    //si c'est une chaine de caractère alors on la nettoie
    if(typeof req.body[key] === "string"){
      req.body[key] = sanitizeHtml(req.body[key]);
    }
  }
  next();
};