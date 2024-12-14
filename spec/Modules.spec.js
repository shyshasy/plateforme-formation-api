import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

describe("Modules tests", () => {
  let moduleId = 1;

  beforeAll(() => {
    // Mocking the create method for modules
    spyOn(prisma.modules, "create").and.returnValue(
      Promise.resolve({
        id: moduleId,
        name: "JavaScript Basics",
        duration: new Date(),
        price: 100.0,
        status: true,
      }),
    );

    // Mocking the update method for modules
    spyOn(prisma.modules, "update").and.returnValue(
      Promise.resolve({
        id: moduleId,
        name: "Advanced JavaScript",
        duration: new Date(),
        price: 150.0,
        status: true,
      }),
    );

    // Mocking the findMany method for modules
    spyOn(prisma.modules, "findMany").and.returnValue(
      Promise.resolve([
        {
          id: moduleId,
          name: "JavaScript Basics",
          duration: new Date(),
          price: 100.0,
          status: true,
        },
      ]),
    );

    // Mocking the delete method for modules
    spyOn(prisma.modules, "delete").and.returnValue(
      Promise.resolve({ id: moduleId }),
    );
  });

  // Test to create a module
  it("can be created", async () => {
    const module = {
      name: "JavaScript Basics",
      duration: new Date(),
      price: 100.0,
      status: true,
    };

    const result = await prisma.modules.create({
      data: module,
    });

    expect(result).not.toBeNull();
    expect(result.name).toBe(module.name);
    expect(result.price).toBe(module.price);
    expect(result.status).toBe(module.status);
  });

  // Test to update a module
  it("can be updated", async () => {
    const updatedModule = {
      name: "Advanced JavaScript",
      duration: new Date(),
      price: 150.0,
      status: true,
    };

    const result = await prisma.modules.update({
      where: { id: moduleId },
      data: updatedModule,
    });

    expect(result.name).toBe(updatedModule.name);
    expect(result.price).toBe(updatedModule.price);
    expect(result.status).toBe(updatedModule.status);
  });

  // Test to get all modules
  it("can get all modules", async () => {
    const allModules = await prisma.modules.findMany();

    expect(allModules).not.toBeNull();
    expect(allModules.length).toBeGreaterThan(0);
  });

  // Test to delete a module
  it("can be deleted", async () => {
    const result = await prisma.modules.delete({
      where: { id: moduleId },
    });

    expect(result.id).toEqual(moduleId);
  });

  // Test to fail deleting a module that does not exist
  it("fails to delete a module that does not exist", async () => {
    const invalidId = 999999;

    try {
      await prisma.modules.delete({
        where: { id: invalidId },
      });
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
