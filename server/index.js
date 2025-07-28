import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Route imports
import authRoutes from './src/routes/authRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import turfRoutes from './src/routes/turfRoutes.js';
import mapsRoutes from './src/routes/mapsRoutes.js';
import razorpayRoutes from './src/payment/razorpayRoutes.js';

// Optional routes - check if these files exist, otherwise comment out
import bookingRoutes from './src/routes/bookingRoutes.js';
import contactRoutes from './src/routes/contactRoutes.js';

dotenv.config();

// Debug: Log Razorpay env variables to verify they are loaded
console.log('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID);
console.log('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET);

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    // Mongoose 7+ doesn't need useNewUrlParser / useUnifiedTopology options
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};
connectDB();

// API Routes
app.use('/api/auth', authRoutes);

// Conditionally use bookingRoutes and contactRoutes only if imported successfully
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

// Global error handler (optional added for robustness)
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
