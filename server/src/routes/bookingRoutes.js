import express from "express";
import {
  createBooking,
  getBookingsByEmail,
  cancelBooking,
  getUserBookings,
} from "../controllers/bookingController.js";

const router = express.Router();

// Get bookings for the logged-in user
router.get("/user", getUserBookings);

// Create new booking
router.post("/", createBooking);

// Get bookings by email (query ?email=...)
router.get("/", getBookingsByEmail);

// Cancel booking by ID
router.delete("/:id", cancelBooking);

export default router;
