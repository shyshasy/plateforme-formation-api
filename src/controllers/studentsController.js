import prisma from "../config/prisma.js";

export const getAllStudents = async (req, res) => {
  try {
    const students = await prisma.students.findMany();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const student = await prisma.students.findUnique({
      where: { id: Number(id) },
    });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createStudent = async (req, res) => {
  const { fullName, phoneNumber, email, address, tutor, status } = req.body;
  try {
    const newStudent = await prisma.students.create({
      data: { fullName, phoneNumber, email, address, tutor, status },
    });
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { fullName, phoneNumber, email, address, tutor, status } = req.body;
  try {
    const updatedStudent = await prisma.students.update({
      where: { id: Number(id) },
      data: { fullName, phoneNumber, email, address, tutor, status },
    });
    res.json(updatedStudent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.students.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
