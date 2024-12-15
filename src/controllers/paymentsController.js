import prisma from "../config/prisma.js";

export const getAllPayments = async (req, res) => {
    try {
      const payments = await prisma.payments.findMany({ include: { registration: true, student: true, module: true } });
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const getPaymentById = async (req, res) => {
    const { id } = req.params;
    try {
      const payment = await prisma.payments.findUnique({
        where: { id: Number(id) },
        include: { registration: true, student: true, module: true },
      });
      if (!payment) return res.status(404).json({ message: 'Payment not found' });
      res.json(payment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const createPayment = async (req, res) => {
    const { paymentDate, amount, payer, payerNumber, paymentMode, registrationId, studentId, moduleId } = req.body;

  try {
    const registration = await prisma.registrations.findUnique({
      where: { id: registrationId },
    });

    if (!registration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    if (amount > registration.remainingAmount) {
      return res.status(400).json({ message: "Payment amount exceeds remaining amount." });
    }

    const newRemainingAmount = registration.remainingAmount - amount;

    await prisma.registrations.update({
      where: { id: registrationId },
      data: { remainingAmount: newRemainingAmount },
    });

    const payment = await prisma.payments.create({
      data: {
        paymentDate: new Date(paymentDate),
        amount,
        remainingAmount: newRemainingAmount,
        payer,
        payerNumber,
        paymentMode,
        registrationId,
        studentId,
        moduleId,
      },
    });

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  };
  
  export const updatePayment = async (req, res) => {
    const { id } = req.params;
    const { paymentDate, amount, payer, payerNumber, paymentMode, registrationId } = req.body;
  
    try {
      const existingPayment = await prisma.payments.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!existingPayment) {
        return res.status(404).json({ message: "Payment not found" });
      }
  
      const registration = await prisma.registrations.findUnique({
        where: { id: registrationId },
      });
  
      if (!registration) {
        return res.status(404).json({ message: "Registration not found" });
      }
  
      const adjustedRemainingAmount = registration.remainingAmount + existingPayment.amount;
  
      if (amount > adjustedRemainingAmount) {
        return res
          .status(400)
          .json({ message: "Payment amount exceeds remaining amount after adjustment." });
      }
  
      const newRemainingAmount = adjustedRemainingAmount - amount;
  
      await prisma.registrations.update({
        where: { id: registrationId },
        data: { remainingAmount: newRemainingAmount },
      });
  
      const updatedPayment = await prisma.payments.update({
        where: { id: parseInt(id) },
        data: {
          paymentDate: new Date(paymentDate),
          amount,
          payer,
          payerNumber,
          paymentMode,
          registrationId,
        },
      });
  
      res.status(200).json(updatedPayment);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  export const deletePayment = async (req, res) => {
    const { id } = req.params;
    try {
      await prisma.payments.delete({ where: { id: Number(id) } });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };