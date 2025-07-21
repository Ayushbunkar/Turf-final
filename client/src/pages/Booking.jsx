import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Booking = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateTime, setDateTime] = useState(new Date());

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4500/api/bookings', {
        name,
        email,
        dateTime,
      });
      alert('Booking successful! Confirmation sent.');
      setName('');
      setEmail('');
      setDateTime(new Date());
    } catch (err) {
      console.error(err);
      alert('Error booking turf');
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-white">
      {/* Hero */}
      <section className="py-16 bg-green-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Book Your Turf</h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">Select your preferred date and time slot.</p>
          </motion.div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto bg-gray-100 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-green-700">Booking Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-3 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <DatePicker
                selected={dateTime}
                onChange={(date) => setDateTime(date)}
                showTimeSelect
                dateFormat="Pp"
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded"
              >
                Book Now
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Booking;
