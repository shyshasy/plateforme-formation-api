import { check, param, validationResult } from "express-validator";
import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";


export const createStudentValidator = [
  check("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required.")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Full name must be at least 2 characters long.")
    .bail(),

  check("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required.")
    .bail()
    .matches(/^\+?\d{1,15}$/)
    .withMessage("Phone number must be valid."),

  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .bail()
    .isEmail()
    .withMessage("Invalid email format."),

  check("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required."),

  check("tutor")
    .trim()
    .notEmpty()
    .withMessage("Tutor name is required."),

  check("status")
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
  }
];
export const updateStudentValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Student ID must be a positive integer."),

  check("fullName")
    .optional()
    .trim()
    .isLength({ min: 2 })
    .withMessage("Full name must be at least 2 characters long."),

  check("phoneNumber")
    .optional()
    .trim()
    .matches(/^\+?\d{1,15}$/)
    .withMessage("Phone number must be valid."),

  check("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Invalid email format."),

  check("address")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Address cannot be empty."),

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
  }
];
export const getStudentByIdValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Student ID must be a positive integer."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  }
];
export const deleteStudentValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Student ID must be a positive integer."),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }
    next();
  }
];
