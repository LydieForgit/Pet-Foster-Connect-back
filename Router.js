import { Router } from "express";

import { userController } from "./controllers/userController.js";
import { animalController } from "./controllers/animalController.js";
import { applicationController } from "./controllers/applicationController.js";
import { assoController } from "./controllers/assoController.js";
import { familyController } from "./controllers/familyController.js";
import { controllerWrapper } from "./controllers/controllerWrapper.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { validationHandler } from "./middlewares/validationHandler.js";
import {
  postSchemas,
  patchSchemas,
  idSchema,
  doubleIdSchema,
} from "./middlewares/schemas/validation.js";
import { authenticateJWTWithRole } from "./middlewares/jwtAccess.js";
import { upload } from "./middlewares/multerUpload.js";
import { uploadImageController } from "./controllers/uploadImageController.js";

const router = Router();

router.post(
  "/forgot_password", 
  controllerWrapper(userController.sendPasswordResetEmail));

router.patch(
  "/reset_password", 
  controllerWrapper(userController.resetPassword)
);

router.post(
  "/signin",
  validationHandler(postSchemas.checkSignIn, "body"),
  controllerWrapper(userController.signin)
);

router.post(
  "/signup",
  validationHandler(postSchemas.checkSignUp, "body"),
  controllerWrapper(userController.signup)
);

router.get(
  "/animals",
  controllerWrapper(animalController.GetAllAnimalsWithAssociation)
);

router.get(
  "/lastAnimals",
  controllerWrapper(animalController.GetLatestAnimals)
);

router.get(
  "/animal/:id",
  validationHandler(idSchema, "params"),
  controllerWrapper(animalController.GetOneAnimalWithAssociation)
);

router.patch(
  "/animal/:id",
  authenticateJWTWithRole(["association"]),
  validationHandler(idSchema, "params"),
  validationHandler(patchSchemas.checkPatchDataAnimal, "body"),
  controllerWrapper(animalController.editAnimal)
);

router.delete(
  "/animal/:id",
  authenticateJWTWithRole(["association"]),
  validationHandler(idSchema, "params"),
  controllerWrapper(animalController.deleteAnimal)
);

router.get(
  "/association/:id/animals",
  validationHandler(idSchema, "params"),
  controllerWrapper(animalController.GetAllAnimalsFromOneAssociation)
);

router.post(
  "/association/:id/animal",
  authenticateJWTWithRole(["association"]),
  validationHandler(idSchema, "params"),
  validationHandler(postSchemas.checkDataAnimal, "body"),
  controllerWrapper(animalController.CreateAnimal)
);

router.get(
  "/association/:id/applications",
  authenticateJWTWithRole(["association"]),
  validationHandler(idSchema, "params"),
  controllerWrapper(
    animalController.GetAllAnimalsWithWaitingApplicationsForAssociation
  )
);

router.get(
  "/association/:id/applicationsAnswered",
  authenticateJWTWithRole(["association"]),
  validationHandler(idSchema, "params"),
  controllerWrapper(
    animalController.GetAllAnimalsWithAnsweredApplicationsForAssociation
  )
);

router.get(
  "/family/:id/animals",
  authenticateJWTWithRole(["family", "association"]),
  validationHandler(idSchema, "params"),
  controllerWrapper(animalController.GetAllAnimalsFromOneFamily)
);

router.get(
  "/family/:id/applications",
  authenticateJWTWithRole(["family"]),
  validationHandler(idSchema, "params"),
  controllerWrapper(animalController.GetAllAnimalsWithApplicationsForFamily)
);

router.post(
  "/animal/:id/family/:id2/application",
  authenticateJWTWithRole(["family"]),
  validationHandler(doubleIdSchema, "params"),
  validationHandler(postSchemas.checkDataApplication, "body"),
  controllerWrapper(applicationController.SubmitOneApplication)
);

router.patch(
  "/application/:id",
  authenticateJWTWithRole(["association"]),
  validationHandler(idSchema, "params"),
  validationHandler(patchSchemas.checkPatchDataApplication, "body"),
  controllerWrapper(applicationController.RespondToApplication)
);

router.get(
  "/animal/:id/application/:id2",
  authenticateJWTWithRole(["association"]),
  validationHandler(doubleIdSchema, "params"),
  animalController.GetOneApplicationFromAnimal
);

router.get("/associations", controllerWrapper(assoController.getAll));

router.get(
  "/association/:id",
  validationHandler(idSchema, "params"),
  controllerWrapper(assoController.getOne)
);

router.get(
  "/association/:id/dashboard",
  authenticateJWTWithRole(["association"]),
  validationHandler(idSchema, "params"),
  controllerWrapper(assoController.getOneDashboard)
);

router.patch(
  "/association/:id/dashboard",
  authenticateJWTWithRole(["association"]),
  validationHandler(idSchema, "params"),
  validationHandler(patchSchemas.checkPatchDataAssociation, "body"),
  controllerWrapper(assoController.modifyOne)
);

router.delete(
  "/association/:id/dashboard",
  authenticateJWTWithRole(["association"]),
  validationHandler(idSchema, "params"),
  controllerWrapper(assoController.deleteOne)
);

router.get(
  "/family/:id",
  authenticateJWTWithRole(["association"]),
  validationHandler(idSchema, "params"),
  controllerWrapper(familyController.getOne)
);

router.get(
  "/family/:id/dashboard",
  authenticateJWTWithRole(["family"]),
  validationHandler(idSchema, "params"),
  controllerWrapper(familyController.getOneDashboard)
);

router.patch(
  "/family/:id/dashboard",
  authenticateJWTWithRole(["family"]),
  validationHandler(idSchema, "params"),
  validationHandler(patchSchemas.checkPatchDataFamily, "body"),
  controllerWrapper(familyController.modifyOne)
);

router.delete(
  "/family/:id/dashboard",
  authenticateJWTWithRole(["family"]),
  validationHandler(idSchema, "params"),
  controllerWrapper(familyController.deleteOne)
);

router.post(
  "/upload-image",
  authenticateJWTWithRole(["association", "family"]), 
  upload.single("image"), 
  uploadImageController);

router.use(errorHandler);

export default router;