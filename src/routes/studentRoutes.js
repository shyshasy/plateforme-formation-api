import express from 'express';
import { createStudent, getAllStudents } from '../controllers/studentsController.js';
import { addStudentValidator } from '../validators/studentsValidators.js';
const studentRouter = express.Router();

studentRouter.post('/student', addStudentValidator, createStudent);
studentRouter.get('/student', getAllStudents)

export default studentRouter;