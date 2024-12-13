import express from 'express';
import { createStudent, getAllStudents } from '../controllers/studentsController.js';

const studentRouter = express.Router();

studentRouter.post('/student', createStudent)
studentRouter.get('/student', getAllStudents)

export default studentRouter;