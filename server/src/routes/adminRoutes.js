// src/routes/adminRoutes.js

import express from 'express';
import {
  registerAdmin, // ✅ Make sure this is imported
  loginAdmin,
  getAllUsers,
  getAllBookings,
} from '../controllers/adminController.js';

import { authenticate } from '../middleware/authenticate.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

// ✅ Add this route
router.post('/register', registerAdmin);

router.post('/login', loginAdmin);

router.get('/users', authenticate, isAdmin, getAllUsers);
router.get('/bookings', authenticate, isAdmin, getAllBookings);

export default router;
