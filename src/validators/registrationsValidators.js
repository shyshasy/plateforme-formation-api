import { check, validationResult, param } from "express-validator";
import { StatusCodes } from "http-status-codes";

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
    .withMessage("Amount must be a valid decimal number with two decimal places."),

  check("moduleId")
    .isInt({ min: 1 })
    .withMessage("Module ID must be a positive integer."),

  check("studentId")
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
export const updateRegistrationValidators = [
    param("id")
      .isInt({ min: 1 })
      .withMessage("Registration ID must be a positive integer."),
  
    check("dateRegister")
      .optional()
      .isISO8601()
      .withMessage("Registration date must be a valid ISO 8601 date."),
  
    check("startDate")
      .optional()
      .isISO8601()
      .withMessage("Start date must be a valid ISO 8601 date."),
  
    check("endDate")
      .optional()
      .isISO8601()
      .withMessage("End date must be a valid ISO 8601 date."),
  
    check("amount")
      .optional()
      .isDecimal({ decimal_digits: "2" })
      .withMessage("Amount must be a valid decimal number with two decimal places."),
  
    check("moduleId")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Module ID must be a positive integer."),
  
    check("studentId")
      .optional()
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
  export const getRegistrationByIdValidators = [
    param("id")
      .isInt({ min: 1 })
      .withMessage("Registration ID must be a positive integer."),
  
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
  export const deleteRegistrationValidators = [
    param("id")
      .isInt({ min: 1 })
      .withMessage("Registration ID must be a positive integer."),
  
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
  