import { check, param, validationResult } from "express-validator";
import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";

export const createStudentValidator = [
  check("fullName")
    .trim()
    .notEmpty()
    .withMessage("full name is required and cannot be only spaces.")
    .bail()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
    .withMessage("Full name contains invalid characters.")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Full name must be at least 2 characters long.")
    .bail(),

  check("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required and cannot be only spaces.")
    .bail()
    .matches(/^[0-9]+$/)
    .withMessage("Phone number contains invalid characters.")
    .bail()
    .isLength({ min: 8, max: 15 })
    .withMessage("Phone number must be between 8 and 15 characters.")
    .bail()
    .custom(async (value) => {
      const existingStudent = await prisma.students.findUnique({
        where: { phoneNumber: value },
      });
      if (existingStudent) {
        throw new Error("This phone number is already in use.");
      }
      return true;
    }),
  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Email is required!")
    .bail()
    .isEmail()
    .withMessage("Please provide a valid email.")
    .bail()
    .custom(async (value) => {
      const result = await prisma.students.findUnique({
        where: { email: value },
      });
      if (result) {
        throw new Error("A student with this email already exists!");
      }
      return true;
    }),

  check("address")
    .trim()
    .optional()
    .isLength({ min: 3 })
    .withMessage("Address must be at least 5 characters long.")
    .bail(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },

  check("tutor").trim().notEmpty().withMessage("Tutor name is required."),
  check("status").not().isEmpty().withMessage("Status is required."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];
export const updateStudentValidator = [
  param("id")
    .trim()
    .notEmpty()
    .withMessage("ID is required.")
    .bail()
    .custom(async (value) => {
      const student = await prisma.students.findUnique({
        where: { id: parseInt(value) },
      });
      if (!student) {
        throw new Error("Student does not exist.");
      }
      return true;
    }),
  check("fullName")
    .trim()
    .notEmpty()
    .withMessage("full name is required and cannot be only spaces.")
    .bail()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
    .withMessage("Full name contains invalid characters.")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Full name must be at least 2 characters long.")
    .bail(),

  check("phoneNumber")
    .trim()
    .optional()
    .matches(/^[0-9]+$/)
    .withMessage("Phone number contains invalid characters.")
    .bail()
    .isLength({ min: 8, max: 15 })
    .withMessage("Phone number must be between 8 and 15 characters.")
    .bail()
    .custom(async (value, { req }) => {
      const existingStudent = await prisma.students.findUnique({
        where: { phoneNumber: value },
      });
      if (existingStudent && existingStudent.id !== parseInt(req.params.id)) {
        throw new Error("This phone number is already in use.");
      }
      return true;
    }),

  check("email")
    .trim()
    .optional()
    .isEmail()
    .withMessage("Please provide a valid email."),

  check("address")
    .trim()
    .optional()
    .isLength({ min: 3 })
    .withMessage("Address must be at least 5 characters long.")
    .bail(),

  check("tutor")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Tutor name cannot be empty."),

  check("status")
    .optional()
    .isBoolean()
    .withMessage("Status must be a valid boolean value (true/false)."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];
export const getStudentByIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("ID is required.")
    .bail()
    .custom(async (value) => {
      const student = await prisma.students.findUnique({
        where: { id: parseInt(value) },
      });
      if (!student) {
        throw new Error("Student does not exist.");
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];
export const deleteStudentValidator = [
  param("id")
    .notEmpty()
    .withMessage("ID is required.")
    .bail()
    .custom(async (value) => {
      const student = await prisma.students.findUnique({
        where: { id: parseInt(value) },
      });
      if (!student) {
        throw new Error("Student does not exist.");
      }
      return true;
    }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  },
];
