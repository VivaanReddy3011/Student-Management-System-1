import express from "express";

import {
    getStudents,
    registerStudent,
    updateStudent,
    deleteStudent
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/", getStudents);

router.post("/", registerStudent);

router.put("/:id", updateStudent);

router.delete("/:id", deleteStudent);

export default router;