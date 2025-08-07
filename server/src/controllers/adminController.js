import Admin from '../models/Admin.js';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// =====================
// Register Admin
// =====================
export const registerAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      return res.status(409).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newAdmin = new Admin({
      username,
      password: hashedPassword,
      role: 'admin',
    });

    await newAdmin.save();

    return res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('[RegisterAdmin] Error:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// =====================
// Login Admin
// =====================
export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return res.status(200).json({
      message: 'Login successful',
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('[LoginAdmin] Error:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// =====================
// Admin: Get All Users
// =====================
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json({ message: 'Users fetched successfully', users });
  } catch (error) {
    console.error('[GetAllUsers] Error:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// =====================
// Admin: Get All Bookings
// =====================
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user turf');
    return res.status(200).json({ message: 'Bookings fetched successfully', bookings });
  } catch (error) {
    console.error('[GetAllBookings] Error:', error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
