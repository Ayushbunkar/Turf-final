import Admin from '../models/turfAdmin.js';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerAdmin = async (req, res) => {
  const { name, email, password, turfName, phoneNumber } = req.body;

  if (!name || !email || !password || !turfName || !phoneNumber) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      role: 'admin',
      turfName,
      phoneNumber
    });

    await newAdmin.save();

    return res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('[RegisterAdmin] Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const admin = await Admin.findOne({ email });
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

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: 'Login successful',
      admin: {
        id: admin._id,
        email: admin.email,
        role: admin.role,
        turfName: admin.turfName,
        phoneNumber: admin.phoneNumber
      }
    });
  } catch (error) {
    console.error('[LoginAdmin] Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    return res.status(200).json({ message: 'Users fetched successfully', users });
  } catch (error) {
    console.error('[GetAllUsers] Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user turf');
    return res.status(200).json({ message: 'Bookings fetched successfully', bookings });
  } catch (error) {
    console.error('[GetAllBookings] Error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
