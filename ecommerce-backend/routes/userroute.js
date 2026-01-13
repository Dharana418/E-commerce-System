import { registerUser, loginUser } from "../controllers/usercontroller.js";
import express from "express";

const router = express.Router();

// Register route
router.post("/register", registerUser);
// Login route
router.post("/login", loginUser);


export default router;
