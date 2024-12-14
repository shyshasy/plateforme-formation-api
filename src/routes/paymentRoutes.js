import express from "express";
import {
  createPaymentValidator,
  deletePaymentValidator,
  getPaymentByIdValidator,
  updatePaymentValidator,
} from "../validators/paymentValidators.js";
import {
  createPayment,
  deletePayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
} from "../controllers/paymentsController.js";

const paymentRouter = express.Router();

paymentRouter.post("/payment", createPaymentValidator, createPayment);
paymentRouter.get("/payment", getAllPayments);
paymentRouter.get("/payment/:id", getPaymentByIdValidator, getPaymentById);
paymentRouter.put("/payment/:id", updatePaymentValidator, updatePayment);
paymentRouter.delete("/payment/:id", deletePaymentValidator, deletePayment);

export default paymentRouter;
