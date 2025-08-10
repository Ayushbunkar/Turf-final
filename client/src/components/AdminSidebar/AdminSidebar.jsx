import React from "react";
import { Link } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <div className="w-64 bg-[#1F2937] text-white flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
      <nav className="flex flex-col gap-4">
        <Link to="/admin" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
        <Link to="/admin/users" className="hover:bg-gray-700 p-2 rounded">Manage Users</Link>
        <Link to="/admin/turfs" className="hover:bg-gray-700 p-2 rounded">Manage Turfs</Link>
        <Link to="/admin/bookings" className="hover:bg-gray-700 p-2 rounded">Manage Bookings</Link>
        <Link to="/" className="hover:bg-gray-700 p-2 rounded text-red-400">Logout</Link>
      </nav>
    </div>
  );
}
