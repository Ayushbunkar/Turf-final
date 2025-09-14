import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { 
  Wallet, 
  Users, 
  CalendarCheck, 
  Flag, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight 
} from "lucide-react";
// Updated relative path to sidebar component in components/TurfAdmin
import TurfAdminSidebar from "../components/TurfAdmin/TurfAdminSidebar";
import api from "../lib/api";
import { Outlet } from "react-router-dom";

export default function TurfAdminHome() {
  const { dashboardData, refreshData } = useOutletContext() || {};
  const [stats, setStats] = useState({
    turfCount: 0,
    bookingCount: 0,
    revenue: 0,
    userCount: 0,
    turfGrowth: 0,
    bookingGrowth: 0,
    revenueGrowth: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      try {
  const res = await api.get("/turfadmin/stats");
        setStats(res.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching stats:", err);
        // Mock data
        setStats({
          turfCount: 3,
          bookingCount: 24,
          revenue: 12000,
          userCount: 50,
          turfGrowth: 33.3,
          bookingGrowth: 12.5,
          revenueGrowth: 15.2
        });
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  const recentBookings = dashboardData?.recentBookings || [];

  return (
    <div className="flex">
      <TurfAdminSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Turf Admin Home</h1>
        <p>Welcome to your turf admin dashboard!</p>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="mt-1 text-sm text-gray-500">
              Welcome to your turf management dashboard
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Turfs Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <Flag className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Turfs
                      </dt>
                      <dd>
                        <div className="text-lg font-semibold text-gray-900">
                          {stats.turfCount}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    stats.turfGrowth >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {stats.turfGrowth >= 0 ? (
                      <ArrowUpRight className="inline h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="inline h-3 w-3 mr-1" />
                    )}
                    {Math.abs(stats.turfGrowth)}%
                  </span>
                  <span className="ml-2 text-gray-500">from last month</span>
                </div>
              </div>
            </div>

            {/* Bookings Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                    <CalendarCheck className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Bookings
                      </dt>
                      <dd>
                        <div className="text-lg font-semibold text-gray-900">
                          {stats.bookingCount}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    stats.bookingGrowth >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {stats.bookingGrowth >= 0 ? (
                      <ArrowUpRight className="inline h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="inline h-3 w-3 mr-1" />
                    )}
                    {Math.abs(stats.bookingGrowth)}%
                  </span>
                  <span className="ml-2 text-gray-500">from last month</span>
                </div>
              </div>
            </div>

            {/* Revenue Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                    <Wallet className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Revenue
                      </dt>
                      <dd>
                        <div className="text-lg font-semibold text-gray-900">
                          ₹{stats.revenue.toLocaleString()}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    stats.revenueGrowth >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {stats.revenueGrowth >= 0 ? (
                      <ArrowUpRight className="inline h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="inline h-3 w-3 mr-1" />
                    )}
                    {Math.abs(stats.revenueGrowth)}%
                  </span>
                  <span className="ml-2 text-gray-500">from last month</span>
                </div>
              </div>
            </div>

            {/* Users Card */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 rounded-md p-3">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Total Users
                      </dt>
                      <dd>
                        <div className="text-lg font-semibold text-gray-900">
                          {stats.userCount}
                        </div>
                      </dd>
                    </dl>
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100">
                    <TrendingUp className="inline h-3 w-3 mr-1" />
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Recent Bookings</h2>
            <div className="mt-4 bg-white shadow overflow-hidden sm:rounded-lg">
              {recentBookings.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {recentBookings.map((booking) => (
                    <li key={booking._id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <span className="text-green-700 font-medium">
                              {booking.user?.name?.charAt(0) || "U"}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {booking.user?.name || "Unknown User"}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.turf?.name || "Unknown Turf"} - {new Date(booking.date).toLocaleDateString()} ({booking.timeSlot})
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className="mr-4 text-sm font-semibold text-gray-900">
                            ₹{booking.amount}
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            booking.status === "confirmed" 
                              ? "bg-blue-100 text-blue-800"
                              : booking.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : booking.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  No recent bookings found
                </div>
              )}
              {recentBookings.length > 0 && (
                <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                  <div className="text-sm">
                    <a href="/turfadmin/bookings" className="font-medium text-green-600 hover:text-green-500">
                      View all bookings<span aria-hidden="true"> &rarr;</span>
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Outlet />
      </main>
    </div>
  );
}