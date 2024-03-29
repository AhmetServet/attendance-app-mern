import express from "express";
import { Student } from "../models/studentModel.js";
const router = express.Router();

// Route to create a new student
router.post("/", async (req, res) => {
    try {
        if (!req.body.name || !req.body.surname || !req.body.class)
            return res
                .status(400)
                .send({ message: "name, surname and class are required." });

        const newStudent = {
            name: req.body.name,
            surname: req.body.surname,
            class: req.body.class,
        };

        console.log("student:", newStudent, "data received");

        const student = await Student.create(newStudent);

        return res.status(201).send(student);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route to get all students
router.get("/", async (req, res) => {
    try {
        const students = await Student.find({});

        return res.status(200).json({
            count: students.length,
            data: students,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// Route to get one student by it's id
router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        return res.status(200).json({ student });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// Route to get students by class
router.get("/class/:class", async (req, res) => {
    try {
        const students = await Student.find({ class: req.params.class });

        return res.status(200).json({
            count: students.length,
            data: students,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// Route to update a student by it's id
router.put("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (student) {
            student.name = req.body.name || student.name;
            student.surname = req.body.surname || student.surname;
            student.class = req.body.class || student.class;

            const updatedStudent = await student.save();

            return res
                .status(200)
                .json({ message: "Student updated", student: updatedStudent });
        } else {
            return res.status(404).send({ message: "Student not found" });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

// Route to delete a student by it's id
router.delete("/:id", async (req, res) => {
    try {
        const result = await Student.findByIdAndDelete(req.params.id);

        if (result) {
            return res.status(200).send({ message: "Student removed" });
        } else {
            return res.status(404).send({ message: "Student not found" });
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).send({ message: error.message });
    }
});

export default router;
