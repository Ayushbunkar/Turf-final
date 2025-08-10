import React from "react";
import { Outlet, useOutlet } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const outlet = useOutlet(); // Check if a nested route is rendered

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <div className="p-6 flex-1">
          {outlet ? (
            <Outlet /> // Nested route content
          ) : (
            <>
              <motion.h1
                className="text-3xl font-bold mb-4"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Admin Panel
              </motion.h1>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: "Total Users", value: 124 },
                  { label: "Total Turfs", value: 18 },
                  { label: "Total Bookings", value: 240 },
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

              {/* Recent Activities */}
              <motion.div
                className="mt-8 bg-white p-6 rounded-xl shadow"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Recent Activities
                </h2>
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
                  {[
                    "User John booked Turf #12",
                    "Admin updated Turf #5",
                    "New Turf added: Green Valley Arena",
                  ].map((activity, idx) => (
                    <motion.li
                      key={activity}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.3 }}
                    >
                      {activity}
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
