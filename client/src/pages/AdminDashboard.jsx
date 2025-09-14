// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import AdminSidebar from "../components/TurfAdmin/AdminSidebar";
import AdminNavbar from "../components/TurfAdmin/AdminNavbar/AdminNavbar";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, turfs: 0, bookings: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatsAndRecent() {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const [statsRes, recentRes] = await Promise.all([
          fetch("http://localhost:4500/api/admin/stats", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch("http://localhost:4500/api/admin/recent-activities", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const statsData = await statsRes.json();
        const recentData = await recentRes.json();

        setStats({
          users: statsData.userCount || 0,
          turfs: statsData.turfCount || 0,
          bookings: statsData.bookingCount || 0,
        });

        setRecent(recentData.activities || []);
      } catch (err) {
        console.error("Error loading dashboard data", err);
        setStats({ users: 0, turfs: 0, bookings: 0 });
        setRecent([]);
      } finally {
        setLoading(false);
      }
    }

    fetchStatsAndRecent();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <div className="p-6 flex-1 space-y-8">
          {/* Dashboard Cards */}
          {loading ? (
            <p>Loading dashboard...</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {[
                  { label: "Total Users", value: stats.users },
                  { label: "Total Turfs", value: stats.turfs },
                  { label: "Total Bookings", value: stats.bookings },
                ].map((card, idx) => (
                  <motion.div
                    key={card.label}
                    className="bg-white p-6 rounded-xl shadow"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.2, duration: 0.5 }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 8px 32px rgba(34,197,94,0.15)",
                    }}
                  >
                    <h2 className="text-xl font-semibold">{card.label}</h2>
                    <p className="text-2xl font-bold mt-2 text-green-600">
                      {card.value}
                    </p>
                  </motion.div>
                ))}
              </div>

              {/* Management Navigation */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {[
                  { label: "Manage Turfs", path: "/admin/turfs", icon: "🏟️" },
                  { label: "Bookings", path: "/admin/bookings", icon: "📅" },
                  { label: "Analytics", path: "/admin/analytics", icon: "📊" },
                  { label: "Settings", path: "/admin/settings", icon: "⚙️" },
                  { label: "Register Turf Admin", path: "/admin/register-turfadmin", icon: "📝" },
                ].map((nav, idx) => (
                  <motion.div
                    key={nav.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.4 }}
                  >
                    <Link
                      to={nav.path}
                      className="flex flex-col items-center justify-center bg-white rounded-xl shadow p-4 hover:bg-green-50 transition"
                    >
                      <span className="text-3xl mb-2">{nav.icon}</span>
                      <span className="font-medium text-gray-700">{nav.label}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}

          {/* Recent Activities */}
          <motion.div
            className="bg-white p-6 rounded-xl shadow"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            {recent.length === 0 ? (
              <p className="text-gray-500">No recent activities found.</p>
            ) : (
              <motion.ul
                className="list-disc pl-6 text-gray-700"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2 },
                  },
                }}
              >
                {recent.map((activity, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.2 }}
                  >
                    {activity}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </motion.div>

          {/* Nested routes render here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
