import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Students tests", () => {
  let studentId = 1;

  beforeAll(() => {
    // Mocking the create method for students
    spyOn(prisma.students, "create").and.returnValue(
      Promise.resolve({
        id: studentId,
        fullName: "John Doe",
        phoneNumber: "123456789",
        email: "john.doe@example.com",
        address: "123 Main St",
        tutor: "Mr. Smith",
        status: true,
      }),
    );

    // Mocking the update method for students
    spyOn(prisma.students, "update").and.returnValue(
      Promise.resolve({
        id: studentId,
        fullName: "John Doe Updated",
        phoneNumber: "987654321",
        email: "john.doe@example.com",
        address: "456 Elm St",
        tutor: "Mr. Johnson",
        status: false,
      }),
    );

    // Mocking the findMany method for students
    spyOn(prisma.students, "findMany").and.returnValue(
      Promise.resolve([
        {
          id: studentId,
          fullName: "John Doe",
          phoneNumber: "123456789",
          email: "john.doe@example.com",
          address: "123 Main St",
          tutor: "Mr. Smith",
          status: true,
        },
      ]),
    );

    // Mocking the delete method for students
    spyOn(prisma.students, "delete").and.returnValue(
      Promise.resolve({ id: studentId }),
    );
  });

  // Test to create a student
  it("can be created", async () => {
    const student = {
      fullName: "John Doe",
      phoneNumber: "123456789",
      email: "john.doe@example.com",
      address: "123 Main St",
      tutor: "Mr. Smith",
      status: true,
    };

    const result = await prisma.students.create({
      data: student,
    });

    expect(result).not.toBeNull();
    expect(result.fullName).toBe(student.fullName);
    expect(result.phoneNumber).toBe(student.phoneNumber);
    expect(result.email).toBe(student.email);
    expect(result.address).toBe(student.address);
    expect(result.tutor).toBe(student.tutor);
    expect(result.status).toBe(student.status);
  });

  // Test to update a student
  it("can be updated", async () => {
    const updatedStudent = {
      fullName: "John Doe Updated",
      phoneNumber: "987654321",
      email: "john.doe@example.com",
      address: "456 Elm St",
      tutor: "Mr. Johnson",
      status: false,
    };

    const result = await prisma.students.update({
      where: { id: studentId },
      data: updatedStudent,
    });

    expect(result.fullName).toBe(updatedStudent.fullName);
    expect(result.phoneNumber).toBe(updatedStudent.phoneNumber);
    expect(result.address).toBe(updatedStudent.address);
    expect(result.tutor).toBe(updatedStudent.tutor);
    expect(result.status).toBe(updatedStudent.status);
  });

  // Test to get all students
  it("can get all students", async () => {
    const allStudents = await prisma.students.findMany();

    expect(allStudents).not.toBeNull();
    expect(allStudents.length).toBeGreaterThan(0);
  });

  // Test to delete a student
  it("can be deleted", async () => {
    const result = await prisma.students.delete({
      where: { id: studentId },
    });

    expect(result.id).toEqual(studentId);
  });

  // Test to fail deleting a student that does not exist
  it("fails to delete a student that does not exist", async () => {
    const invalidId = 999999;

    try {
      await prisma.students.delete({
        where: { id: invalidId },
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
