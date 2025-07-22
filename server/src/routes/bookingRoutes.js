import express from 'express';
import {
  createBooking,
  getBookingsByEmail,
  cancelBooking,
} from '../controllers/bookingController.js';

const router = express.Router();

router.post('/', createBooking);
router.get('/', getBookingsByEmail);
router.delete('/:id', cancelBooking);

export default router;
