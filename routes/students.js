const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();
const dataPath = path.join(__dirname, "../data/students.json");


const readStudents = () => {
  if (!fs.existsSync(dataPath)) return [];
  try {
    const data = fs.readFileSync(dataPath);
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading students.json:", err);
    return [];
  }
};


const writeStudents = (students) => {
  fs.writeFileSync(dataPath, JSON.stringify(students, null, 2));
};


router.post("/", (req, res) => {
  const { name, age, course, year, status } = req.body;

  if (!name || !course || !year) {
    return res.status(400).json({ error: "Name, course, and year are required" });
  }
  if (isNaN(age) || age <= 0) {
    return res.status(400).json({ error: "Age must be a number greater than 0" });
  }

  const newStudent = {
    id: uuidv4(),
    name,
    age,
    course,
    year,
    status: status || "active",
  };

  const students = readStudents();
  students.push(newStudent);
  writeStudents(students);

  res.status(201).json(newStudent);
});

router.get("/", (req, res) => {
  const students = readStudents();
  res.json(students);
});

module.exports = router;
