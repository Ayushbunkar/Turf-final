import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  Calendar,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TurfAdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/turfadmin", icon: LayoutDashboard },
    { name: "My Turfs", path: "/turfadmin/turfs", icon: MapPin },
    { name: "Bookings", path: "/turfadmin/bookings", icon: Calendar },
    { name: "Settings", path: "/turfadmin/settings", icon: Settings },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-3 fixed top-4 left-4 z-50 bg-gray-800 text-white rounded-lg shadow-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.3 }}
            className="bg-green-900 text-white w-64 h-screen flex flex-col shadow-lg fixed md:relative z-40"
          >
            <div className="px-6 py-6 text-2xl font-bold border-b border-green-700">
              Turf Manager
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {menuItems.map((item, idx) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={idx}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      active
                        ? "bg-green-700 text-white"
                        : "text-green-200 hover:bg-green-700 hover:text-white"
                    }`}
                  >
                    <Icon size={20} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="p-4 border-t border-green-700">
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
                className="flex items-center gap-3 px-4 py-3 w-full text-green-200 hover:bg-green-700 hover:text-white rounded-lg transition-colors"
              >
                <LogOut size={20} /> Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}

// Check this file!
// c:\Users\Rupesh\Desktop\turf time 2\client\src\main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App /> // NOT wrapped in another Router!
  </React.StrictMode>
)

