import { check, validationResult, param } from "express-validator";
import { StatusCodes } from "http-status-codes";
// import prisma from "../config/prisma.js";

export const createPaymentValidator = [
  check("paymentDate")
    .not()
    .isEmpty()
    .withMessage("Payment date is required.")
    .isISO8601()
    .withMessage("Payment date must be a valid date format."),

  check("amount")
    .not()
    .isEmpty()
    .withMessage("Amount is required.")
    .isDecimal({ decimal_digits: "0,2" })
    .withMessage(
      "Amount must be a valid decimal number with up to two decimal places.",
    ),

  check("payer")
    .not()
    .isEmpty()
    .withMessage("Payer name is required.")
    .isLength({ max: 50 })
    .withMessage("Payer name must be up to 50 characters long."),

  check("payerNumber")
    .trim()
    .notEmpty()
    .withMessage("Payer phone number is required.")
    .bail()
    .matches(/^\+?\d{1,15}$/)
    .withMessage("Payer phone number must be valid."),

  check("paymentMode")
    .trim()
    .notEmpty()
    .withMessage("Payment mode is required."),

  // param("registrationId")
  //   .notEmpty()
  //   .withMessage("Registration ID is required.")
  //   .bail()
  //   .custom(async (value) => {
  //     const registration = await prisma.registrations.findUnique({
  //       where: { id: parseInt(value) },
  //     });
  //     if (!registration) {
  //       throw new Error("Registration not found.");
  //     }
  //     return true;
  //   }),

  // param("studentId")
  //   .notEmpty()
  //   .withMessage("Student ID is required.")
  //   .bail()
  //   .custom(async (value) => {
  //     const student = await prisma.students.findUnique({
  //       where: { id: parseInt(value) },
  //     });
  //     if (!student) {
  //       throw new Error("Student not found.");
  //     }
  //     return true;
  //   }),

  // param("moduleId")
  //   .notEmpty()
  //   .withMessage("Module ID is required.")
  //   .bail()
  //   .custom(async (value) => {
  //     const module = await prisma.modules.findUnique({
  //       where: { id: parseInt(value) },
  //     });
  //     if (!module) {
  //       throw new Error("Module not found.");
  //     }
  //     return true;
  //   }),

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

export const updatePaymentValidator = [
  param("id")
    .notEmpty()
    .withMessage("Payment ID is required.")
    .bail()
    .custom(async (value) => {
      const payment = await prisma.payments.findUnique({
        where: { id: parseInt(value) },
      });
      if (!payment) {
        throw new Error("Payment not found.");
      }
      return true;
    }),

  check("paymentDate")
    .optional()
    .isISO8601()
    .withMessage("Payment date must be a valid date."),

  check("amount")
    .optional()
    .isDecimal({ decimal_digits: "2" })
    .withMessage("Amount must be a positive decimal value."),

  check("payer")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Payer name cannot be empty."),

  check("payerNumber")
    .trim()
    .notEmpty()
    .withMessage("Payer phone number is required.")
    .bail()
    .matches(/^\+?\d{1,15}$/)
    .withMessage("Payer phone number must be valid."),

  check("paymentMode")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("Payment mode cannot be empty."),

  param("registrationId")
    .optional()
    .custom(async (value) => {
      const registration = await prisma.registrations.findUnique({
        where: { id: parseInt(value) },
      });
      if (!registration) {
        throw new Error("Registration not found.");
      }
      return true;
    }),

  param("studentId")
    .optional()
    .custom(async (value) => {
      const student = await prisma.students.findUnique({
        where: { id: parseInt(value) },
      });
      if (!student) {
        throw new Error("Student not found.");
      }
      return true;
    }),

  param("moduleId")
    .optional()
    .custom(async (value) => {
      const module = await prisma.modules.findUnique({
        where: { id: parseInt(value) },
      });
      if (!module) {
        throw new Error("Module not found.");
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
export const deletePaymentValidator = [
  param("id")
    .notEmpty()
    .withMessage("Payment ID is required.")
    .bail()
    .custom(async (value) => {
      const payment = await prisma.payments.findUnique({
        where: { id: parseInt(value) },
      });
      if (!payment) {
        throw new Error("Payment not found.");
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
export const getPaymentByIdValidator = [
  param("id")
    .notEmpty()
    .withMessage("Payment ID is required.")
    .bail()
    .isInt({ min: 1 })
    .withMessage("Payment ID must be a positive integer.")
    .bail()
    .custom(async (value) => {
      const payment = await prisma.payments.findUnique({
        where: { id: parseInt(value) },
      });
      if (!payment) {
        throw new Error("Payment not found.");
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
