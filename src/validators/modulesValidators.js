import { check, validationResult, param } from "express-validator";
import prisma from "../config/prisma.js";
import { StatusCodes } from "http-status-codes";

// Validator for creating a new module
export const createModuleValidator = [
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required and cannot be only spaces.")
    .bail()
    .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/)
    .withMessage("Name contains invalid characters.")
    .bail()
    .isLength({ min: 2 })
    .withMessage("Name must be at least 2 characters long.")
    .bail(),

  check("duration")
    .not()
    .isEmpty()
    .withMessage("Duration is required.")
    .isInt({ min: 1 })
    .withMessage("Duration must be a positive integer."),

  check("price")
    .trim()
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive integer.")
    .bail(),

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
  },
];
export const updateModuleValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Module ID must be a positive integer."),

  check("name")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Module name cannot be empty.")
    .isLength({ min: 2 })
    .withMessage("Module name must be at least 2 characters long."),

  check("duration")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Duration must be a positive integer."),

  check("price")
    .optional()
    .isDecimal({ decimal_digits: "2" })
    .withMessage(
      "Price must be a valid decimal number with two decimal places.",
    ),

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
export const getModuleByIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("Module ID is required.")
    .isInt({ min: 1 })
    .withMessage("Module ID must be a positive integer.")
    .bail()
    .custom(async (id) => {
      const module = await prisma.modules.findUnique({
        where: { id: Number(id) },
      });
      if (!module) throw new Error("Module not found.");
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
export const deleteModuleValidator = [
  param("id")
    .notEmpty()
    .withMessage("Module ID is required!")
    .isInt({ min: 1 })
    .withMessage("Module ID must be a positive integer.")
    .bail()
    .custom(async (id) => {
      const module = await prisma.modules.findUnique({
        where: { id: Number(id) },
      });
      if (!module) throw new Error("This module does not exist!");
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
