import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Razorpay from 'razorpay';

dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Load Razorpay keys
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Razorpay key test endpoint
app.get('/api/payment/razorpay/key', (req, res) => {
  if (!process.env.RAZORPAY_KEY_ID) {
    return res.status(500).json({ error: 'Razorpay key_id not set in env variables' });
  }
  res.json({ key_id: process.env.RAZORPAY_KEY_ID });
});

// Debug logs for env
console.log('✅ RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID ? 'Loaded' : 'Missing');
console.log('✅ RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET ? 'Loaded' : 'Missing');

// Import main routes
let authRoutes, userRoutes, turfRoutes, mapsRoutes, razorpayRoutes, bookingRoutes, contactRoutes;
try {
  authRoutes = (await import('./src/routes/authRoutes.js')).default;
  userRoutes = (await import('./src/routes/userRoutes.js')).default;
  turfRoutes = (await import('./src/routes/turfRoutes.js')).default;
  mapsRoutes = (await import('./src/routes/mapsRoutes.js')).default;
  razorpayRoutes = (await import('./src/payment/razorpayRoutes.js')).default;
} catch (err) {
  console.error('❌ Error importing main routes:', err);
  process.exit(1);
}

// Try optional routes (safe import)
try {
  bookingRoutes = (await import('./src/routes/bookingRoutes.js')).default;
} catch (err) {
  console.warn('⚠️ Booking routes not found. Skipping...');
}
try {
  contactRoutes = (await import('./src/routes/contactRoutes.js')).default;
} catch (err) {
  console.warn('⚠️ Contact routes not found. Skipping...');
}

// MongoDB connection and app start
const startServer = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);

    // Routes
    app.use('/api/auth', authRoutes);
    app.use('/api/user', userRoutes);
    app.use('/api/turfs', turfRoutes); // ✅ Turf API connected
    app.use('/api/maps', mapsRoutes);
    app.use('/api/payment/razorpay', razorpayRoutes);

    if (bookingRoutes) app.use('/api/bookings', bookingRoutes);
    if (contactRoutes) app.use('/api/contact', contactRoutes);

    app.get('/', (req, res) => {
      res.send('🌟 API is running...');
    });

    // Error handler
    app.use((err, req, res, next) => {
      console.error('❌ Server Error:', err);
      res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
    });

    const PORT = process.env.PORT || 4500;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

startServer();
