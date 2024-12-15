import prisma from "../config/prisma.js";

export const getAllModules = async (req, res) => {
  try {
    const modules = await prisma.modules.findMany();
    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getModuleById = async (req, res) => {
  const { id } = req.params;
  try {
    const module = await prisma.modules.findUnique({
      where: { id: Number(id) },
    });
    if (!module) return res.status(404).json({ message: "Module not found" });
    res.json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createModule = async (req, res) => {
  const { name, duration, price, status } = req.body; // duration sera un entier
  try {
    const newModule = await prisma.modules.create({
      data: { name, duration: parseInt(duration, 10), price, status },
    });
    res.status(201).json(newModule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateModule = async (req, res) => {
  const { id } = req.params;
  const { name, duration, price, status } = req.body;
  try {
    const updatedModule = await prisma.modules.update({
      where: { id: Number(id) },
      data: { name, duration, price, status },
    });
    res.json(updatedModule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteModule = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.modules.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
