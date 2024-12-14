import express from "express";
import {
  createModuleValidator,
  updateModuleValidator,
  deleteModuleValidator,
  getModuleByIdValidator,
} from "../validators/modulesValidators.js";
import {
  createModule,
  deleteModule,
  getAllModules,
  getModuleById,
  updateModule,
} from "../controllers/moduleController.js";

const moduleRouter = express.Router();

moduleRouter.post("/module", createModuleValidator, createModule);
moduleRouter.get("/module", getAllModules);
moduleRouter.get("/module/:id", getModuleByIdValidator, getModuleById);
moduleRouter.put("/module/:id", updateModuleValidator, updateModule);
moduleRouter.delete("/module/:id", deleteModuleValidator, deleteModule);

export default moduleRouter;
