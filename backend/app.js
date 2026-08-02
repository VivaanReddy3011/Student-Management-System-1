import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";

import studentRoutes from "./routes/studentRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
}));

app.use(express.json());

// Mount Routers
app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);

const PORT = 3000;

async function start()
{
    await connectDB();

    app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
    });
}

start();