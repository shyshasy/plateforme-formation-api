import { check, validationResult, param } from "express-validator";
import { StatusCodes } from "http-status-codes";
import prisma from "../config/prisma.js";

// Validator for creating a new registration
export const createRegistrationValidator = [
  check("dateRegister")
    .notEmpty()
    .withMessage("Registration date is required."),
    // .isISO8601()
    // .withMessage("Registration date must be a valid ISO 8601 date."),

  check("startDate")
    .notEmpty()
    .withMessage("Start date is required.")
    .isISO8601()
    .withMessage("Start date must be a valid ISO 8601 date."),


  check("amount")
    .notEmpty()
    .withMessage("Amount is required.")
    .isDecimal({ decimal_digits: "2" })
    .withMessage(
      "Amount must be a valid decimal number with two decimal places.",
    ),


  check("moduleId")
    .not()
    .isEmpty()
    .withMessage("Module ID is required.")
    .bail()
    .custom(async (moduleId) => {
      const module = await prisma.modules.findUnique({
        where: { id: moduleId },
      });
      if (!module) throw new Error("Module not found.");
    }),

  check("studentId")
    .not()
    .isEmpty()
    .withMessage("Student ID is required.")
    .bail()
    .custom(async (studentId) => {
      const student = await prisma.students.findUnique({
        where: { id: studentId },
      });
      if (!student) throw new Error("Student not found.");
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
export const updateRegistrationValidators = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("Registration ID is required.")
    .bail()
    .custom(async (id) => {
      const registration = await prisma.registrations.findUnique({
        where: { id: Number(id) },
      });
      if (!registration) throw new Error("Registration not found.");
      return true;
    }),

  check("dateRegister")
    .optional()
    .isISO8601()
    .withMessage("Registration date must be a valid ISO 8601 date."),

  check("startDate")
    .optional()
    .isISO8601()
    .withMessage("Start date must be a valid ISO 8601 date."),

  check("amount")
    .optional()
    .isDecimal({ decimal_digits: "2" })
    .withMessage(
      "Amount must be a valid decimal number with two decimal places.",
    ),
  check("moduleId")
    .optional()
    .custom(async (moduleId) => {
      const module = await prisma.modules.findUnique({
        where: { id: moduleId },
      });
      if (!module) throw new Error("Module not found.");
    }),

  check("studentId")
    .optional()
    .custom(async (studentId) => {
      const student = await prisma.students.findUnique({
        where: { id: studentId },
      });
      if (!student) throw new Error("Student not found.");
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
export const getRegistrationByIdValidators = [
  param("id")
    .not()
    .isEmpty()
    .withMessage("Registration ID is required.")
    .bail()
    .custom(async (id) => {
      const registration = await prisma.registrations.findUnique({
        where: { id: Number(id) },
      });
      if (!registration) throw new Error("Registration not found.");
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
export const deleteRegistrationValidators = [
  param("id")
    .notEmpty()
    .withMessage("Registration ID is required!")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Registration ID must be a positive integer.")
    .bail()
    .custom(async (id) => {
      const registration = await prisma.registrations.findUnique({
        where: { id: parseInt(id, 10) },
      });
      if (!registration) {
        throw new Error("This registration does not exist!");
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
