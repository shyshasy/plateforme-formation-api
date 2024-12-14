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
  const { dateRegister, startDate, amount, moduleId, studentId } = req.body;

  // Récupérer la durée du module
  const module = await prisma.modules.findUnique({
    where: { id: moduleId },
  });

  if (!module) {
    return res.status(404).json({ message: "Module not found" });
  }

  // Calculer la date de fin
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + module.duration);

  // Créer l'enregistrement
  const registration = await prisma.registrations.create({
    data: {
      dateRegister: new Date(dateRegister),
      startDate: new Date(startDate),
      endDate: endDate,
      amount: amount,
      moduleId: moduleId,
      studentId: studentId,
    },
  });

  res.status(201).json(registration);
};

export const updateRegistration = async (req, res) => {
  const { id } = req.params;
  const { dateRegister, startDate, amount, moduleId, studentId } = req.body;

  try {
    // Vérifier si le module existe et récupérer sa durée
    const module = await prisma.modules.findUnique({
      where: { id: moduleId },
      select: { duration: true },
    });

    if (!module) {
      return res.status(404).json({ error: "Module not found" });
    }

    // Calculer la date de fin si `startDate` ou `moduleId` sont modifiés
    const calculatedEndDate = startDate
      ? new Date(
          new Date(startDate).getTime() + module.duration * 24 * 60 * 60 * 1000,
        )
      : undefined;

    // Mettre à jour l'enregistrement
    const updatedRegistration = await prisma.registrations.update({
      where: { id: Number(id) },
      data: {
        dateRegister,
        startDate,
        endDate: calculatedEndDate,
        amount,
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
