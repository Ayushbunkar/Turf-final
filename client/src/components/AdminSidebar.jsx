import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Settings,
  LogOut,
  MapPin,
} from "lucide-react";

export default function AdminSidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Manage Turfs", path: "/admin/turfs", icon: MapPin },
    { name: "Bookings", path: "/admin/bookings", icon: Calendar },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="bg-[#1E293B] text-white w-64 h-screen flex flex-col shadow-lg">
      {/* Logo */}
      <div className="px-6 py-6 text-2xl font-bold border-b border-gray-700">
        Turf Admin
      </div>

      {/* Menu */}
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
                  ? "bg-[#334155] text-white"
                  : "text-gray-300 hover:bg-[#334155] hover:text-white"
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
        <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-300 hover:bg-[#334155] hover:text-white rounded-lg transition-colors">
          <LogOut size={20} /> Logout
        </button>
      </div>
    </div>
  );
}
