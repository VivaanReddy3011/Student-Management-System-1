import express from "express";

import{
    addA,
    checkL,
    show
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register",addA);

router.post("/login",checkL);
router.get("/data",show);

export default router;