import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  Calendar,
  Users,
  BarChart,
  Settings,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Manage Turfs", path: "/admin/turfs", icon: MapPin },
    { name: "Bookings", path: "/admin/bookings", icon: Calendar },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Analytics", path: "/admin/analytics", icon: BarChart },
    { name: "Settings", path: "/admin/settings", icon: Settings },
    { name: "Register Turf Admin", path: "/admin/register-turf-admin", icon: Settings },
  ];

  return (
    <div className="relative">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden p-3 fixed top-4 left-4 z-50 bg-gray-800 text-white rounded-lg shadow-lg"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 text-white w-64 h-screen flex flex-col shadow-lg fixed md:relative z-40"
          >
            {/* Logo */}
            <div className="px-6 py-6 text-2xl font-bold border-b border-gray-700">
              Turf Admin
            </div>

            {/* Menu Items */}
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
                        ? "bg-gray-700 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    <Icon size={20} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-gray-700">
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.href = "/login";
                }}
                className="flex items-center gap-3 px-4 py-3 w-full text-gray-300 hover:bg-gray-700 hover:text-white rounded-lg transition-colors"
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
