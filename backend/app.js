import express from "express";
import cors from "cors";

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

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});