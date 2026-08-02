import mongoose from "mongoose";
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    branch:{
        type:String,
        required:true,
        trim:true,
        enum:["CSE","ECE","ME","DS"]
    },
    year:{
        type:Number,
        required:true,
        min:1,
        max:4
    }
    },    
    {
        timestamps:true
    }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;