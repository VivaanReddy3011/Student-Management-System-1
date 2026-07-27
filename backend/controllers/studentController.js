import {
    getAllStudents,
    addStudent,
    updateStudentById,
    deleteStudentById
} from "../data/students.js";

// GET /api/students
export function getStudents(req, res) {
    res.status(200).json(getAllStudents());
}

// POST /api/students
export function registerStudent(req, res) {
    const {name,branch,year}=req.body;

    if(!name||!branch||!year) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    const student=addStudent(req.body);

    res.status(201).json({
        message:"Student registered successfully."
    });
}

// PUT /api/students/:id
export function updateStudent(req, res){
    const id=Number(req.params.id);
    const {name,branch,year}=req.body;

    if(Number.isNaN(id)){
        return res.status(400).json({
            message: "Invalid student ID."
        });
    }

    if(!name||!branch||!year){
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    const updatedStudent=updateStudentById(id,req.body);

    if (!updatedStudent){
        return res.status(404).json({
            message: "Student not found."
        });
    }

    res.status(200).json({
        message: "Student updated successfully."
    });
}

// DELETE /api/students/:id
export function deleteStudent(req, res){
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
        return res.status(400).json({
            message: "Invalid student ID."
        });
    }

    const deleted=deleteStudentById(id);

    if (!deleted){
        return res.status(404).json({
            message: "Student not found."
        });
    }

    res.status(200).json({
        message: "Student deleted successfully."
    });
}