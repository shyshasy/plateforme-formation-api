import express from "express";
import {
  createStudentValidator,
  deleteStudentValidator,
  getStudentByIdValidator,
  updateStudentValidator,
} from "../validators/studentsValidators.js";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from "../controllers/studentsController.js";

const studentRouter = express.Router();

studentRouter.post("/student", createStudentValidator, createStudent);
studentRouter.get("/student", getAllStudents);
studentRouter.get("/student/:id", getStudentByIdValidator, getStudentById);
studentRouter.put("/student/:id", updateStudentValidator, updateStudent);
studentRouter.delete("/student/:id", deleteStudentValidator, deleteStudent);

export default studentRouter;
