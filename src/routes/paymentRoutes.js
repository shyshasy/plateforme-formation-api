import express from "express";
// import {
//   createPaymentValidator,
//   deletePaymentValidator,
//   getPaymentByIdValidator,
//   updatePaymentValidator,
// } from "../validators/paymentValidators.js";
import {
  createPayment,
  deletePayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
} from "../controllers/paymentsController.js";

const paymentRouter = express.Router();

paymentRouter.post("/payment",  createPayment);
paymentRouter.get("/payment", getAllPayments);
paymentRouter.get("/payment/:id", getPaymentById);
paymentRouter.put("/payment/:id",  updatePayment);
paymentRouter.delete("/payment/:id",  deletePayment);

export default paymentRouter;
