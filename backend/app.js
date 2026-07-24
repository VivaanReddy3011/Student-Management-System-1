import express from "express";
import cors from "cors";

const app=express();
let nextI=1;

app.use(cors({origin:"http://localhost:5173",}));
app.use(express.json());

const students=[];
const PORT=3000;

app.post("/api/register",(req,res)=>{
    const {name,branch,year}=req.body

    if(!name||!branch||!year)
    {
        return res.status(400).json({
            message:"All fields are required."
        });
    }

    console.log({name,branch,year})
    students.push({id:nextI++,name,branch,year})

    res.status(201).json({
        message:"Student registered successfully",
    });
});

app.get("/api/students",(req,res)=>{
    res.json(students);
});

app.put("/api/students/:id",(req,res)=>{
    const id=Number(req.params.id);

    const {name,branch,year}=req.body;
    if (!name || !branch || !year) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }

    const index=students.findIndex(student=>student.id ===id);

    if(index===-1) {
        return res.status(404).json({
            message: "Student not found."
        });


    }});

app.delete("/api/students/:id",(req,res)=>{
    const id=Number(req.params.id);

    const index=students.findIndex(student=>student.id ===id);

    if(index===-1) {
        return res.status(404).json({
            message: "Student not found."
    })};
    
    students.splice(index, 1);
    return res.json({
            message: "Student Deleted Sucessfully."
        });
});

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});