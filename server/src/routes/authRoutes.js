// routes/auth.js
import express from "express";
import { signup, login } from "../controllers/authController.js";

const router = express.Router();

// Standard signup for user, admin, turfAdmin (role/secretKey in body)
router.post("/signup", signup);

// Standard login for all roles
router.post("/login", login);

export default router;
