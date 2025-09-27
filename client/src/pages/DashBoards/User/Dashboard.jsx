import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../../lib/api';
import { FaUserCircle, FaCalendarCheck, FaChartPie } from 'react-icons/fa';

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: 'easeOut' },
};

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const { data } = await api.get('/user/profile');
        setUser(data.user);
      } catch (err) {
        console.error('Failed to fetch user:', err);
      }
    };
    fetchUser();
  }, []);

  const getInitial = (name) => name ? name[0].toUpperCase() : 'U';

  return (
    <div className="min-h-screen pt-20 bg-[#e6fbe4] text-[#1c1c1c]">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-r from-[#14532d] to-[#22c55e] text-white">
        <div className="container mx-auto px-4">
          <motion.div {...fadeInUp} className="text-center">
            <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
              Welcome, {user?.name || 'Guest'}
            </h1>
            <p className="text-lg max-w-2xl mx-auto opacity-90">
              Manage your turf bookings and personal account settings.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-10">

          {/* Profile Card */}
          <motion.div whileHover={{ scale: 1.05 }} {...fadeInUp}
            className="bg-white rounded-xl shadow-xl p-6 text-center border border-green-200"
          >
            {user?.photo ? (
              <img src={user.photo} alt="User" className="w-16 h-16 rounded-full mx-auto mb-4 object-cover" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-green-500 text-white mx-auto flex items-center justify-center text-2xl mb-4 font-semibold">
                {getInitial(user?.name)}
              </div>
            )}
            <h3 className="text-xl font-semibold">{user?.name}</h3>
            <p className="text-gray-500">{user?.email}</p>
          </motion.div>

          {/* Bookings Card */}
          <motion.div whileHover={{ scale: 1.05 }} {...fadeInUp}
            className="bg-white rounded-xl shadow-xl p-6 text-center border border-green-200"
          >
            <div className="text-4xl mb-4 text-green-600"><FaCalendarCheck /></div>
            <h3 className="text-2xl font-semibold mb-2">Your Bookings</h3>
            <p className="text-gray-600">Track and manage all your turf reservations.</p>
          </motion.div>

          {/* Stats Card */}
          <motion.div whileHover={{ scale: 1.05 }} {...fadeInUp}
            className="bg-white rounded-xl shadow-xl p-6 text-center border border-green-200"
          >
            <div className="text-4xl mb-4 text-green-600"><FaChartPie /></div>
            <h3 className="text-2xl font-semibold mb-2">Summary</h3>
            <p className="text-gray-600">View booking stats and insights here.</p>
          </motion.div>
        </div>
      </section>

      {/* Footer Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="h-1 bg-gradient-to-r from-[#14532d] to-[#22c55e] origin-left"
      ></motion.div>
    </div>
  );
};

export default Dashboard;
