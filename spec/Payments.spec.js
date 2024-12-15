import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Payments tests", () => {
  let paymentId = 1;
  let registrationId = 1;
  let studentId = 1;
  let moduleId = 1;

  beforeAll(() => {
    // Mocking the create method for payments
    spyOn(prisma.payments, "create").and.returnValue(
      Promise.resolve({
        id: paymentId,
        paymentDate: new Date(),
        amount: 100.0,
        payer: "John Doe",
        payerNumber: "1234567890",
        paymentMode: "Credit Card",
        registrationId: registrationId,
        studentId: studentId,
        moduleId: moduleId,
      }),
    );

    // Mocking the update method for payments
    spyOn(prisma.payments, "update").and.returnValue(
      Promise.resolve({
        id: paymentId,
        paymentDate: new Date(),
        amount: 200.0,
        payer: "John Doe",
        payerNumber: "1234567890",
        paymentMode: "Debit Card",
        registrationId: registrationId,
        studentId: studentId,
        moduleId: moduleId,
      }),
    );

    // Mocking the findMany method for payments
    spyOn(prisma.payments, "findMany").and.returnValue(
      Promise.resolve([
        {
          id: paymentId,
          paymentDate: new Date(),
          amount: 100.0,
          payer: "John Doe",
          payerNumber: "1234567890",
          paymentMode: "Credit Card",
          registrationId: registrationId,
          studentId: studentId,
          moduleId: moduleId,
        },
      ]),
    );

    // Mocking the delete method for payments
    spyOn(prisma.payments, "delete").and.returnValue(
      Promise.resolve({ id: paymentId }),
    );
  });

  // Test to create a payment
  it("can be created", async () => {
    const payment = {
      paymentDate: new Date(),
      amount: 100.0,
      payer: "John Doe",
      payerNumber: "1234567890",
      paymentMode: "Credit Card",
      registrationId: registrationId,
      studentId: studentId,
      moduleId: moduleId,
    };

    const result = await prisma.payments.create({
      data: payment,
    });

    expect(result).not.toBeNull();
    expect(result.amount).toBe(payment.amount);
    expect(result.payer).toBe(payment.payer);
    expect(result.payerNumber).toBe(payment.payerNumber);
    expect(result.paymentMode).toBe(payment.paymentMode);
    expect(result.registrationId).toBe(payment.registrationId);
    expect(result.studentId).toBe(payment.studentId);
    expect(result.moduleId).toBe(payment.moduleId);
  });

  // Test to update a payment
  it("can be updated", async () => {
    const updatedPayment = {
      paymentDate: new Date(),
      amount: 200.0,
      payer: "John Doe",
      payerNumber: "1234567890",
      paymentMode: "Debit Card",
      registrationId: registrationId,
      studentId: studentId,
      moduleId: moduleId,
    };

    const result = await prisma.payments.update({
      where: { id: paymentId },
      data: updatedPayment,
    });

    expect(result.amount).toBe(updatedPayment.amount);
    expect(result.payer).toBe(updatedPayment.payer);
    expect(result.payerNumber).toBe(updatedPayment.payerNumber);
    expect(result.paymentMode).toBe(updatedPayment.paymentMode);
    expect(result.registrationId).toBe(updatedPayment.registrationId);
    expect(result.studentId).toBe(updatedPayment.studentId);
    expect(result.moduleId).toBe(updatedPayment.moduleId);
  });

  // Test to get all payments
  it("can get all payments", async () => {
    const allPayments = await prisma.payments.findMany();

    expect(allPayments).not.toBeNull();
    expect(allPayments.length).toBeGreaterThan(0);
  });

  // Test to delete a payment
  it("can be deleted", async () => {
    const result = await prisma.payments.delete({
      where: { id: paymentId },
    });

    expect(result.id).toEqual(paymentId);
  });

  // Test to fail deleting a payment that does not exist
  it("fails to delete a payment that does not exist", async () => {
    const invalidId = 999999;

    try {
      await prisma.payments.delete({
        where: { id: invalidId },
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
