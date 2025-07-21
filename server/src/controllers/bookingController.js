import Booking from '../models/Booking.js';
import { sendEmail } from '../utils/sendEmail.js';

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

    res.status(200).json({ message: 'Booking successful' });
  } catch (err) {
    res.status(500).json({ message: 'Booking failed', error: err.message });
  }
};

export const getBookingsByEmail = async (req, res) => {
  try {
    const user = await Booking.find({ email: req.query.email }).sort({ dateTime: 1 });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Could not retrieve bookings', error: err.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Cancellation failed', error: err.message });
  }
};
