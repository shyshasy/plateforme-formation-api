import prisma from "../config/prisma.js";

export const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await prisma.registrations.findMany({
      include: { module: true, student: true },
    });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRegistrationById = async (req, res) => {
  const { id } = req.params;
  try {
    const registration = await prisma.registrations.findUnique({
      where: { id: Number(id) },
      include: { module: true, student: true },
    });
    if (!registration)
      return res.status(404).json({ message: "Registration not found" });
    res.json(registration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createRegistration = async (req, res) => {
  const { dateRegister, startDate, moduleId, studentId } = req.body;

  try {
    // Vérifier si le module existe
    const module = await prisma.modules.findUnique({
      where: { id: moduleId },
    });

    const amount = module.price

    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    // Calculer la date de fin en fonction de la durée du module
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + module.duration);

    // Créer l'inscription, avec le montant restant égal au montant total
    const registration = await prisma.registrations.create({
      data: {
        dateRegister: new Date(dateRegister),
        startDate: new Date(startDate),
        endDate: endDate,
        amount: parseFloat(amount),
        remainingAmount: parseFloat(amount),  // Le montant restant initialement égal au montant total
        moduleId: moduleId,
        studentId: studentId,
      },
    });

    res.status(201).json(registration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateRegistration = async (req, res) => {
  const { id } = req.params;
  const { dateRegister, startDate, amount, moduleId, studentId } = req.body;

  try {
  
    const module = await prisma.modules.findUnique({
      where: { id: moduleId },
      select: { duration: true, price: true },
    });

    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }

    const calculatedEndDate = startDate
      ? new Date(
          new Date(startDate).getTime() + module.duration * 24 * 60 * 60 * 1000,
        )
      : undefined;

    const modulePrice = Number(module.price);
    const additionalAmount = Number(amount);

    const totalAmount = modulePrice + additionalAmount;

    const updatedRegistration = await prisma.registrations.update({
      where: { id: Number(id) },
      data: {
        dateRegister: dateRegister ? new Date(dateRegister) : undefined,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: calculatedEndDate,
        amount: totalAmount, 
        moduleId,
        studentId,
      },
    });

    res.json(updatedRegistration);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteRegistration = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.registrations.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
