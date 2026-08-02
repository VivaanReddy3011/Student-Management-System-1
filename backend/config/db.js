import mongoose from "mongoose";

async function connectDB()
{
    try
    {
        await mongoose.connect("mongodb://127.0.0.1:27017/student-management");
        console.log("MongoDB Connected");
    }
    catch(err)
    {
        console.error("MongoDB Connection Failed:",err);
        process.exit(1);
    }
}

export default connectDB;