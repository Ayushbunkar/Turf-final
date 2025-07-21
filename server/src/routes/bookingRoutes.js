import express from 'express';
import {
  createBooking,
  getBookingsByEmail,
  cancelBooking,
} from '../controllers/bookingController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authenticate, createBooking);
router.get('/', authenticate, getBookingsByEmail);
router.delete('/:id', authenticate, cancelBooking);

export default router;
