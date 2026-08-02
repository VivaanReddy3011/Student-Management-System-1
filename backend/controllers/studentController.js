
import Student from "../models/student.js";

// GET /api/students
export async function getStudents(req, res) 
{
    try 
    {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

// POST /api/students
export async function registerStudent(req, res){
    try
    {
        const {name,branch,year}=req.body;

        if(!name||!branch||!year){
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const student=await Student.create({
            name,
            branch,
            year
        });

        res.status(201).json({
            message:"Student registered successfully.",
            student
        });
    }   catch(error)
    {
        res.status(500).json({
            message:error.message
        });
    }
}

// PUT /api/students/:id
export async function updateStudent(req,res){
    try
    {
    const {id}=req.params;
    const {name,branch,year}=req.body;

    if(!name||!branch||!year){
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    const updatedStudent = await Student.findByIdAndUpdate(
        id,
        {
            name,
            branch,
            year
        },
        {
            new: true,
            runValidators: true
        }
    );

    if(!updatedStudent){
        return res.status(404).json({
            message: "Student not found."
        });
    }

        res.status(200).json({
            message: "Student updated successfully."
        });

    }catch(error){
        if(error.name==="ValidationError")
        {
            return res.status(400).json({
                message:error.message
            });
        }
        if (error.name === "CastError") {
            return res.status(400).json({
                message: "Invalid student ID."
            });
        }
        res.status(500).json({
            message:error.message
        });
    }
}

// DELETE /api/students/:id
export async function deleteStudent(req, res){
    try{
    const {id} = req.params;

    const deletedStudent =await Student.findByIdAndDelete(id);

    if (!deletedStudent){
        return res.status(404).json({
            message: "Student not found."
        });
    }

    res.status(200).json({
        message: "Student deleted successfully."
    });
    }
    catch(error)
    {
        res.status(500).json({
            message:error.message
        });
    }
}