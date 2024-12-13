import express from 'express';
import { createModule, deleteModule, getAllModules, getModuleById, updateModule } from '../controllers/moduleController.js';

const moduleRouter = express.Router();

moduleRouter.post('/module', createModule)
moduleRouter.get('/module', getAllModules)
moduleRouter.get('/module/:id', getModuleById)
moduleRouter.put('/module/:id', updateModule);
moduleRouter.delete('/module/:id', deleteModule)


export default moduleRouter;