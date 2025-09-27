// =========================
// Import Core Packages
// =========================
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Razorpay from 'razorpay';

// =========================
// Load Models First
// =========================
import './src/models/userModel.js';
import './src/models/turfModel.js';
import './src/models/bookingModel.js';
import './src/models/Admin.js';

// =========================
// Load Routes
// =========================
import authRoutes from './src/routes/authRoutes.js';
import adminRoutes from './src/routes/adminRoutes.js';
import turfadminRoutes from './src/routes/turfadminRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import bookingRoutes from './src/routes/bookingRoutes.js';
import contactRoutes from './src/routes/contactRoutes.js';
import turfRoutes from './src/routes/turfRoutes.js';
import mapsRoutes from './src/routes/mapsRoutes.js';

dotenv.config();

const app = express();

// =========================
// Middleware
// =========================
app.use(cors({
  origin: 'http://localhost:5173', // change for production
  credentials: true, // allow cookies
}));
app.use(express.json());
app.use(cookieParser());

// Make uploads folder public
app.use('/uploads', express.static('uploads'));

// =========================
// Razorpay Setup
// =========================
export const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// =========================
// Routes
// =========================
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/turfadmin', turfadminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/turfs', turfRoutes);
app.use('/api/maps', mapsRoutes);

// =========================
// 404 Handler
// =========================
app.use((req, res, next) => {
  res.status(404).json({ status: 'fail', message: 'Route not found' });
});

// =========================
// Global Error Handler
// =========================
app.use((err, req, res, next) => {
  console.error('Error:', err);
  const status = err.status || 500;
  res.status(status).json({
    status: 'error',
    message: err.message || 'Internal Server Error'
  });
});

// =========================
// Connect to MongoDB & Start Server
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

export default app;
