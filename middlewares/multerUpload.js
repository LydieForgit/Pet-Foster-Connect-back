import multer from "multer";
import path from "path"; // Importation du module path pour manipuler les chemins de fichiers

const storage = multer.diskStorage({
  // dossier de destination pour les fichiers uploadés
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  // nom de fichier pour les fichiers uploadés
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // Construction du nom de fichier final en combinant le nom du champ, le suffixe unique et l'extension du fichier original
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const fileFilter = (req, file, cb) => {
  // fichiers autorisés
  const allowedTypes = /jpeg|jpg|png/;
  // Vérification si l'extension du fichier correspond aux types autorisés
  const isValidType = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (isValidType) {
    cb(null, true);
  } else {
    cb(new Error("Seules les images au format JPEG ou PNG sont autorisées"));
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de taille : 5MB
});

export { upload };
