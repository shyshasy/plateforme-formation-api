import express from "express";
import {
  createRegistrationValidator,
  deleteRegistrationValidators,
  getRegistrationByIdValidators,
  updateRegistrationValidators,
} from "../validators/registrationsValidators.js";
import {
  createRegistration,
  deleteRegistration,
  getAllRegistrations,
  getRegistrationById,
  updateRegistration,
} from "../controllers/registrationsController.js";

const registrationRouter = express.Router();

registrationRouter.post(
  "/registration",
  createRegistrationValidator,
  createRegistration,
);
registrationRouter.get("/registration", getAllRegistrations);
registrationRouter.get(
  "/registration/:id",
  getRegistrationByIdValidators,
  getRegistrationById,
);
registrationRouter.put(
  "/registration/:id",
  updateRegistrationValidators,
  updateRegistration,
);
registrationRouter.delete(
  "/registration/:id",
  deleteRegistrationValidators,
  deleteRegistration,
);

export default registrationRouter;
