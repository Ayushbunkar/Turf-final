// routes/auth.js
import express from "express";
import { signup, login } from "../controllers/authController.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Public signup: only for users
router.post("/signup", (req, res, next) => {
	req.body.role = "user";
	next();
}, signup);

// Backend-only admin creation (protected by header)
router.post("/create-admin", async (req, res) => {
  try {
    // Check secret key in header (case-sensitive, no spaces)
    const headerKey = req.headers["x-admin-secret"];
    const envKey = process.env.ADMIN_SECRET_KEY;
    if (!headerKey || headerKey !== envKey) {
      return res.status(403).json({ message: "Invalid admin secret key" });
    }

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if admin already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    // Hash password and create admin
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({
      name,
      email,
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();
    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// Backend-only turfAdmin creation (protected by header)
router.post("/create-turfadmin", (req, res, next) => {
	if (req.headers["x-turfadmin-secret"] !== process.env.TURFADMIN_SECRET_KEY) {
		return res.status(403).json({ message: "Forbidden" });
	}
	req.body.role = "turfAdmin";
	next();
}, signup);

// Standard login for all roles
router.post("/login", login);

export default router;
