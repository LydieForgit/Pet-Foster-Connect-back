import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import router from "./Router.js";
import { upload } from "./middlewares/multerUpload.js";
import { bodySanitizer } from "./middlewares/sanitizeHtml.js";

// Conversion de import.meta.url en __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  origin: "*", // Seule cette URL est autorisée à accéder
  methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE", "PATCH"], // Méthodes HTTP autorisées
  allowedHeaders: ["Content-Type", "Accept", "Authorization"], // En-têtes autorisés
  optionsSuccessStatus: 200, // Réponse
};

app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(bodySanitizer);
app.use(router);

app.post("/upload", upload.single("file"), (req, res, next) => {
  if (!req.file) {
    return res.status(400).json("Aucun fichier n'a été téléchargé");
  }
  res.json("Fichier téléchargé avec succès");
  next();
});

app.listen(port, () => {
  console.log(`Server ready: http://localhost:${port}`);
});

