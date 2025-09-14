// Ensure all models are registered before using controllers
import './src/models/userModel.js';
import './src/models/turfModel.js';
import './src/models/bookingModel.js';
// index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Razorpay from 'razorpay';
import cookieParser from 'cookie-parser'; // ✅ Add this
import Admin from './src/models/Admin.js'; // or '../models/adminModel.js'

dotenv.config();

const app = express();

// =========================
// Middleware
// =========================
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // ✅ Required for cookies
}));
app.use(express.json());
app.use(cookieParser()); // ✅ Enable reading cookies

// =========================
// Razorpay Setup
// =========================
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// =========================

import authRoutes from './src/routes/authRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import turfadminRoutes from './src/routes/turfadminRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import bookingRoutes from './src/routes/bookingRoutes.js';
import contactRoutes from './src/routes/contactRoutes.js';
import turfRoutes from './src/routes/turfRoutes.js';
import mapsRoutes from './src/routes/mapsRoutes.js';

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/turfadmin', turfadminRoutes);
app.use('/api/user', userRoutes); // profile endpoints
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/turfs', turfRoutes);
app.use('/api/maps', mapsRoutes);

// =========================
// Connect MongoDB and Start Server
// =========================
const PORT = process.env.PORT || 4500;
mongoose.connect(process.env.MONGO_URI)
  .then(conn => {
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error starting server:', err.message);
    process.exit(1);
  });



const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Add any other fields you need
});



export default Admin;
