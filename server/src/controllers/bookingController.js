import Booking from '../models/Booking.js';
import { sendEmail } from '../utils/sendEmail.js';

// ✅ Create Booking and send confirmation email
export const createBooking = async (req, res) => {
  const { name, email, dateTime } = req.body;

  try {
    const booking = new Booking({ name, email, dateTime });
    await booking.save();

    await sendEmail(
      email,
      'Turf Booking Confirmed',
      `<h3>Hi ${name},</h3><p>Your turf is booked for ${new Date(dateTime).toLocaleString()}.</p>`
    );

    res.status(201).json({ message: 'Booking successful', booking });
  } catch (err) {
    res.status(500).json({
      message: 'Booking failed',
      error: err.message,
    });
  }
};

// ✅ Get all bookings for a user by email (query param)
export const getBookingsByEmail = async (req, res) => {
  try {
    const bookings = await Booking.find({ email: req.query.email }).sort({ dateTime: 1 });

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({
      message: 'Could not retrieve bookings',
      error: err.message,
    });
  }
};

// ✅ Cancel a booking by ID
export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({
      message: 'Cancellation failed',
      error: err.message,
    });
  }
};
