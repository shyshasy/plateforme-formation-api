import express from "express";
// import {
//   createStudentValidator,
//   deleteStudentValidator,
//   getStudentByIdValidator,
//   updateStudentValidator,
// } from "../validators/studentsValidators.js";
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from "../controllers/studentsController.js";

const studentRouter = express.Router();

studentRouter.post("/student",  createStudent);
studentRouter.get("/student", getAllStudents);
studentRouter.get("/student/:id",  getStudentById);
studentRouter.put("/student/:id",  updateStudent);
studentRouter.delete("/student/:id",  deleteStudent);

export default studentRouter;
