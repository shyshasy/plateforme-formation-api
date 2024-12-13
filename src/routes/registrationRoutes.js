import express from 'express';
import { createRegistration, deleteRegistration, getAllRegistrations, getRegistrationById, updateRegistration } from '../controllers/registrationsController.js';

const registrationRouter = express.Router();

registrationRouter.post('/registration', createRegistration)
registrationRouter.get('/registration', getAllRegistrations)
registrationRouter.get('/registration/:id', getRegistrationById)
registrationRouter.put('/registration/:id', updateRegistration);
registrationRouter.delete('/registration/:id', deleteRegistration)


export default registrationRouter;