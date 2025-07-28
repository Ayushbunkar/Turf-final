import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Import routes safely, wrap optional routes in try-catch to avoid crashing if they don’t exist
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import turfRoutes from './src/routes/turfRoutes.js';
import mapsRoutes from './src/routes/mapsRoutes.js';
import razorpayRoutes from './src/payment/razorpayRoutes.js';

let bookingRoutes;
let contactRoutes;

try {
  bookingRoutes = (await import('./src/routes/bookingRoutes.js')).default;
} catch (err) {
  console.warn('Booking routes not found, skipping...');
}

try {
  contactRoutes = (await import('./src/routes/contactRoutes.js')).default;
} catch (err) {
  console.warn('Contact routes not found, skipping...');
}

// Debug logs to verify environment variables are loaded
console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID ? 'Loaded' : 'Missing');
console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET ? 'Loaded' : 'Missing');

import Razorpay from 'razorpay';

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Test route for Razorpay - useful to confirm keys working
app.get('/api/payment/razorpay/key', (req, res) => {
  if (!process.env.RAZORPAY_KEY_ID) {
    return res.status(500).json({ error: 'Razorpay key_id not set in env variables' });
  }
  res.json({ key_id: process.env.RAZORPAY_KEY_ID });
});

// Connect to MongoDB and start server only after connection is successful
const startServer = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);

    // Register routes
    app.use('/api/auth', authRoutes);
    if (bookingRoutes) app.use('/api/bookings', bookingRoutes);
    if (contactRoutes) app.use('/api/contact', contactRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/turfs', turfRoutes);
    app.use('/api/maps', mapsRoutes);
    app.use('/api/payment/razorpay', razorpayRoutes);

    // Default route
    app.get('/', (req, res) => {
      res.send('🌟 API is running...');
    });

    // Optional: AI chatbot endpoint (if you have it implemented)
    // app.post('/api/chat', chatHandler);

    // Global error handler
    app.use((err, req, res, next) => {
      console.error('❌ Server Error:', err);
      res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
    });

    const PORT = process.env.PORT || 4500;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

startServer();
