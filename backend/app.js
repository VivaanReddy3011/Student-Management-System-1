import express from "express";
import cors from "cors";

const app=express();

app.use(cors({origin:"http://localhost:5173",}));
app.use(express.json());

const students=[];
const accounts=[];
const PORT=3000;
let nextI=1;


app.post("/api/loginUser",(req,res)=>{
    const {user,pass}=req.body;

    if(!user||!pass)
    {
        return res.status(400).json({
            message:"All fields are required."
        });
    }

    const index=accounts.findIndex((ind)=>ind.user===user)

    if(index===-1 || pass!==accounts[index].pass)
    {
        return res.status(400).json({
            message:"Incorrect Username or Password ."
        });
    }

    res.status(200).json({
        message:"Login Successful",
    });
});

app.post("/api/registerUser",(req,res)=>{
    const {email,user,pass}=req.body
 
    if(!email||!user||!pass)
    {
        return res.status(400).json({
            message:"All fields are required."
        });
    }

    const index=accounts.findIndex((ind)=>ind.email===email);
    if(index!==-1)
    {
        return res.status(400).json({
            message:"Account already exist."
        });
    }

    accounts.push({email,user,pass});
    res.status(200).json({
        message:"Registered Successfully",
    });
});

app.get("/api/accounts",(req,res)=>{
    return res.json(accounts);
})


app.post("/api/register",(req,res)=>{
    const {name,branch,year}=req.body
 
    if(!name||!branch||!year)
    {
        return res.status(400).json({
            message:"All fields are required."
        });
    }

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
        });}

        const stud=students[index];
        stud.name=name;
        stud.branch=branch;
        stud.year=year;

        return res.status(200).json({
            message: "Student Details Updated."
        });

    });

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