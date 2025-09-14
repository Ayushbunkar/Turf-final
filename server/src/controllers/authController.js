import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🟢 User/Admin/TurfAdmin Signup
export const signup = async (req, res) => {
  const { name, email, password, role, secretKey } = req.body;

  try {
    // Check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Role assignment
    let assignedRole = "user";
    if (role === "admin") {
      if (secretKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({ message: "Invalid admin secret key" });
      }
      assignedRole = "admin";
    } else if (role === "turfAdmin") {
      if (secretKey !== process.env.TURFADMIN_SECRET_KEY) {
        return res.status(403).json({ message: "Invalid turfAdmin secret key" });
      }
      assignedRole = "turfAdmin";
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: assignedRole,
    });

    await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      role: assignedRole,
    });
  } catch (err) {
    console.error("Signup Error:", err.message);
    return res.status(500).json({ message: "Signup failed", error: err.message });
  }
};

// 🟢 Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Validate password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: `${user.role} login successful`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    return res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// 🟢 Create Admin (backend-only, header protected)
export const createAdmin = async (req, res) => {
  try {
    const headerKey = req.headers["x-admin-secret"];
    const envKey = process.env.ADMIN_SECRET_KEY;

    if (!headerKey || headerKey !== envKey) {
      return res.status(403).json({ message: "Invalid admin secret key" });
    }

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({ name, email, password: hashedPassword, role: "admin" });
    await admin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 🟢 Create TurfAdmin (backend-only, header protected)
export const createTurfAdmin = async (req, res) => {
  try {
    if (req.headers["x-turfadmin-secret"] !== process.env.TURFADMIN_SECRET_KEY) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "TurfAdmin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const turfAdmin = new User({ name, email, password: hashedPassword, role: "turfAdmin" });
    await turfAdmin.save();

    res.status(201).json({ message: "TurfAdmin created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 🟢 Get Current User (from JWT)
export const getCurrentUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
