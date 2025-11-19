export const uploadImageController = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send("Aucune image téléchargée");
    }

    // Vous pouvez accéder au fichier via req.file
    console.log(req.file);

    // Construire l'URL complète de l'image
    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;

    // Envoyer une réponse au client avec le chemin de l'image
    res.status(200).json({
      message: "Image téléchargée avec succès",
      imageUrl: imageUrl,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de l'upload",
      error: err.message,
    });
  }
};
