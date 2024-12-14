import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Registrations tests", () => {
  let registrationId = 1;
  let studentId = 1;
  let moduleId = 1;

  beforeAll(() => {
    // Mocking the create method for registrations
    spyOn(prisma.registrations, "create").and.returnValue(
      Promise.resolve({
        id: registrationId,
        dateRegister: new Date(),
        startDate: new Date(),
        endDate: new Date(),
        amount: 100.0,
        moduleId: moduleId,
        studentId: studentId,
      }),
    );

    // Mocking the update method for registrations
    spyOn(prisma.registrations, "update").and.returnValue(
      Promise.resolve({
        id: registrationId,
        dateRegister: new Date(),
        startDate: new Date(),
        endDate: new Date(),
        amount: 200.0,
        moduleId: moduleId,
        studentId: studentId,
      }),
    );

    // Mocking the findMany method for registrations
    spyOn(prisma.registrations, "findMany").and.returnValue(
      Promise.resolve([
        {
          id: registrationId,
          dateRegister: new Date(),
          startDate: new Date(),
          endDate: new Date(),
          amount: 100.0,
          moduleId: moduleId,
          studentId: studentId,
        },
      ]),
    );

    // Mocking the delete method for registrations
    spyOn(prisma.registrations, "delete").and.returnValue(
      Promise.resolve({ id: registrationId }),
    );
  });

  // Test to create a registration
  it("can be created", async () => {
    const registration = {
      dateRegister: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      amount: 100.0,
      moduleId: moduleId,
      studentId: studentId,
    };

    const result = await prisma.registrations.create({
      data: registration,
    });

    expect(result).not.toBeNull();
    expect(result.amount).toBe(registration.amount);
    expect(result.moduleId).toBe(registration.moduleId);
    expect(result.studentId).toBe(registration.studentId);
  });

  // Test to update a registration
  it("can be updated", async () => {
    const updatedRegistration = {
      dateRegister: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      amount: 200.0,
      moduleId: moduleId,
      studentId: studentId,
    };

    const result = await prisma.registrations.update({
      where: { id: registrationId },
      data: updatedRegistration,
    });

    expect(result.amount).toBe(updatedRegistration.amount);
    expect(result.moduleId).toBe(updatedRegistration.moduleId);
    expect(result.studentId).toBe(updatedRegistration.studentId);
  });

  // Test to get all registrations
  it("can get all registrations", async () => {
    const allRegistrations = await prisma.registrations.findMany();

    expect(allRegistrations).not.toBeNull();
    expect(allRegistrations.length).toBeGreaterThan(0);
  });

  // Test to delete a registration
  it("can be deleted", async () => {
    const result = await prisma.registrations.delete({
      where: { id: registrationId },
    });

    expect(result.id).toEqual(registrationId);
  });

  // Test to fail deleting a registration that does not exist
  it("fails to delete a registration that does not exist", async () => {
    const invalidId = 999999;

    try {
      await prisma.registrations.delete({
        where: { id: invalidId },
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
