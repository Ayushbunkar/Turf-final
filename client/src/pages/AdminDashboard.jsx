import React from "react";
import AdminSidebar from "../components/AdminSidebar/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar/AdminNavbar";


export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-1">
        <AdminNavbar />
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Example Cards */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold">Total Users</h2>
              <p className="text-2xl font-bold mt-2">124</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold">Total Turfs</h2>
              <p className="text-2xl font-bold mt-2">18</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold">Total Bookings</h2>
              <p className="text-2xl font-bold mt-2">240</p>
            </div>
          </div>

          {/* More sections */}
          <div className="mt-8 bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Activities</h2>
            <ul className="list-disc pl-6 text-gray-700">
              <li>User John booked Turf #12</li>
              <li>Admin updated Turf #5</li>
              <li>New Turf added: Green Valley Arena</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
