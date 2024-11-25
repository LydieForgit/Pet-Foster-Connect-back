import { User, Family, Association } from "../sequelize/models/index.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sequelize } from "../sequelize/sequelize-client.js";
import { HTTPError } from "../middlewares/errors/httpError.js";
import "dotenv/config";
import transporter from "../config/nodemailerConfig.js";

const jwtSecret = process.env.JWT_SECRET || "fallbackSecretKey";

export const userController = {
  signin: async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      include: ["association", "family"],
    });
    if (!user) {
      return next(new HTTPError(404, "Utilisateur ou mot de passe incorrect"));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new HTTPError(401, "Utilisateur ou mot de passe incorrect"));
    }

    const generateToken = (user) => {
      let roleId;
      if (user.role === "family" && user.family) {
        roleId = user.family.id; // ID de la famille
      } else if (user.role === "association" && user.association) {
        roleId = user.association.id; // ID de l'association
      } else {
        return next(new HTTPError(404,"Rôle utilisateur non reconnu ou association/famille non définie"));    
      }

      // Générer le JWT avec l'ID, email et rôle
      const token = jwt.sign(
        { id: roleId, email: user.email, role: user.role }, // Payload du JWT
        jwtSecret, // Secret utilisé pour signer le token
        { expiresIn: "1h" } // Durée de validité du token
      );
      return token; // Retourne le JWT
    };

    // Créer le token JWT pour l'utilisateur authentifié
    const sendToken = generateToken(user);

    // Répondre avec le token et les infos utilisateur
    res.status(200).json({ message: "Authentification réussie", sendToken });
},
  signup: async (req, res, next) => {
    const {
      email,
      password,
      role,
      firstname,
      lastname,
      phone,
      name,
      companyRegister,
      department,
      address,
      city,
    } = req.body;
    const transaction = await sequelize.transaction();
    try {
      const newUser = await User.create(
        {
          email,
          password,
          role,
        },
        { transaction }
      );

      if (newUser.role === "family") {
        await Family.create(
          {
            user_id: newUser.id,
            firstname,
            lastname,
            phone,
          },
          { transaction }
        );
      } else if (newUser.role === "association") {
        await Association.create(
          {
            user_id: newUser.id,
            firstname,
            lastname,
            name,
            phone,
            companyRegister,
            department,
            address,
            city,
          },
          { transaction }
        );
      }

      await transaction.commit();

      res
        .status(201)
        .json({ message: "Utilisateur créé avec succès", newUser });
    } catch (error) {
      await transaction.rollback();
      console.log(error);
      
      if (error.name === "SequelizeUniqueConstraintError") {
        return next(new HTTPError(400, "L'email est déjà utilisé"));
      } else {
        return next(
          new HTTPError(500, "Erreur lors de la création de l'utilisateur")
        );
      }
    }
  },

  sendPasswordResetEmail: async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
      if (!user) {
        return next(new HTTPError(404, "Utilisateur introuvable"));
      } 
    // Générer un token de réinitialisation en utilisant jsonwebtoken
    const secret = process.env.JWT_SECRET;
    const resetToken = jwt.sign({ email }, secret, { expiresIn: "1h" });
  
    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "Réinitialisation pet-foster-connect",
      text: `Bienvenue sur Pet Foster Connect. 
      Vous avez demandé à réinitialiser votre mot de passe, cliquez sur ce lien pour le réinitialiser :
      https://pet-foster-connect.website/reset_password/${resetToken}`,
    };
    // Envoi de l'e-mail en utilisant le transporteur nodemailer
    await transporter.sendMail(mailOptions);
    res.status(200).json("E-mail de réinitialisation envoyé"); 
  },
  
  resetPassword: async (req, res, next) => {
      const { token, newPassword } = req.body;
      // Valider le token et récupérer l'utilisateur
      const user = jwt.verify(token, process.env.JWT_SECRET);
        if (!user) {
          return next(new HTTPError(400,"Token invalide"));
        }
      const email = user.email;
      //Hasher le nouveau mot de passe
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      // Mettre à jour le mot de passe dans la base de données 
      await User.update(
        { password: hashedPassword },
        {where: { email: email }});
      res.status(200).json("Mot de passe réinitialisé avec succès");
  }
};
