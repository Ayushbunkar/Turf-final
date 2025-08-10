// server/controllers/authController.js
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// ✅ POST /api/auth/signup
export const signup = async (req, res) => {
  const { name, email, password, role, secretKey } = req.body; // role and secretKey from frontend

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' }); // 409 Conflict
    }

    // Secret key logic for admin/turfAdmin
    let assignedRole = 'user';
    if (role === 'admin') {
      if (secretKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(403).json({ message: 'Invalid admin secret key' });
      }
      assignedRole = 'admin';
    } else if (role === 'turfAdmin') {
      if (secretKey !== process.env.TURFADMIN_SECRET_KEY) {
        return res.status(403).json({ message: 'Invalid turfAdmin secret key' });
      }
      assignedRole = 'turfAdmin';
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user with assigned role
    const newUser = new User({ name, email, password: hashedPassword, role: assignedRole });
    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully', role: assignedRole });
  } catch (err) {
    console.error('Signup Error:', err.message);
    return res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};

// ✅ POST /api/auth/login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: 'Invalid email or password' }); // 401 Unauthorized
    }

    // Generate JWT token with role
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: `${user.role} login successful`,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role // return role to frontend
      }
    });
  } catch (err) {
    console.error('Login Error:', err.message);
    return res.status(500).json({ message: 'Login failed', error: err.message });
  }
};
