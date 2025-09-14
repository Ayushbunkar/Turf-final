import express from "express";
import {
  signup,
  login,
  createAdmin,
  createTurfAdmin,
  getCurrentUser,
} from "../controllers/authController.js";

const router = express.Router();

// Public signup: only for users (role= user)
router.post("/signup", (req, res, next) => {
  req.body.role = "user";
  next();
}, signup);

// Backend-only admin creation
router.post("/create-admin", createAdmin);

// Backend-only turfAdmin creation
router.post("/create-turfadmin", createTurfAdmin);

// Standard login for all roles
router.post("/login", login);

// Get current user info
router.get("/me", getCurrentUser);

export default router;
