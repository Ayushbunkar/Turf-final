import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../components/ui/Sidebar.jsx";
import Navbar from "../components/layout/Navbar.jsx";
import { Card } from "../components/ui/Card.jsx";
import { Button } from "../components/ui/Button.jsx";
import { motion } from "framer-motion";
import api from '../lib/api';
import { Calendar, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function UserDashboard() {
  const [activeTab, setActiveTab] = useState("bookings");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const wsRef = useRef(null);

  // Fetch bookings
  useEffect(() => {
    async function fetchBookings() {
      setLoading(true);
      try {
        // Configure axios with the token
        if (token) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        // Fetch the bookings
        const res = await api.get('/bookings/user');
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings", err);
  setBookings([]);
  toast.error("Could not load your bookings");
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, [token]);

  // WebSocket for real-time booking updates (disabled, backend not implemented)
  // useEffect(() => {
  //   wsRef.current = new WebSocket("ws://localhost:4500/realtime");
  //   wsRef.current.onmessage = (event) => {
  //     try {
  //       const data = JSON.parse(event.data);
  //       if (data.type === "NEW_BOOKING") {
  //         setBookings((prev) => [data.booking, ...prev]);
  //       }
  //     } catch {}
  //   };
  //   return () => wsRef.current.close();
  // }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Please log in to view your dashboard</div>
      </div>
    );
  }

  return (
    <div
      className={`${
        darkMode ? "dark" : ""
      } min-h-screen  bg-gradient-to-br from-green-50 via-green-100 to-green-200 dark:from-gray-900 dark:to-gray-800`}
    >
      <Navbar user={user} onToggleDark={() => setDarkMode(!darkMode)} />
      <div className="flex">
        <Sidebar user={user} onToggleDark={() => setDarkMode(!darkMode)} />
        <main className="flex-1 p-4 mt-20 sm:p-8 space-y-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto mb-8"
          >
            <Card className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center">
              <div className="w-16 h-16 rounded-full bg-green-500 text-white mx-auto flex items-center justify-center text-2xl mb-4 font-semibold">
                {user.name ? user.name[0].toUpperCase() : "U"}
              </div>
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-gray-500">{user.email}</p>
            </Card>
          </motion.div>

          {/* User Stats Cards */}
          <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* {userStats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.2 }}
              >
                <Card className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center">
                  <div className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                  <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                    {stat.value}
                  </div>
                </Card>
              </motion.div>
            ))} */}

            {/* Bookings Table */}
            <Card className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg mt-8">
              <h2 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-4">
                Your Turf Bookings
              </h2>
              {loading ? (
                <div className="text-green-600">Loading bookings...</div>
              ) : bookings.length === 0 ? (
                <div className="text-green-600">No bookings found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-green-200 dark:bg-green-700">
                        <th className="px-4 py-2">Turf</th>
                        <th className="px-4 py-2">Date</th>
                        <th className="px-4 py-2">Time Slot</th>
                        <th className="px-4 py-2">Price</th>
                        <th className="px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr
                          key={booking._id}
                          className="border-b border-gray-200 dark:border-gray-700"
                        >
                          <td className="px-4 py-2">{booking.turfName}</td>
                          <td className="px-4 py-2">
                            {new Date(booking.date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2">{booking.timeSlot}</td>
                          <td className="px-4 py-2">₹{booking.price}</td>
                          <td className="px-4 py-2">
                            <Button variant="outline" className="mr-2">
                              View
                            </Button>
                            <Button className="bg-red-500 text-white">
                              Cancel
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("bookings")}
                className={`${
                  activeTab === "bookings"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`${
                  activeTab === "profile"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Profile
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          {activeTab === "bookings" && (
            <>
              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
                </div>
              ) : bookings.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {bookings.map((booking) => (
                    <div
                      key={booking._id}
                      className="bg-white rounded-lg shadow overflow-hidden"
                    >
                      <div className="p-5">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {booking.turf?.name || "Unknown Turf"}
                          </h3>
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              booking.status === "confirmed"
                                ? "bg-blue-100 text-blue-800"
                                : booking.status === "completed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </div>

                        <div className="mt-4 space-y-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="mr-2 h-4 w-4" />
                            {new Date(booking.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="mr-2 h-4 w-4" />
                            {booking.timeSlot}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="mr-2 h-4 w-4" />
                            {booking.turf?.location || "Unknown location"}
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                          <div className="font-medium text-gray-900">
                            ₹{booking.amount}
                          </div>
                          <div className="flex space-x-2">
                            {booking.status === "pending" && (
                              <button
                                onClick={() => {
                                  /* Handle cancel booking */
                                  toast.success("Booking cancelled");
                                }}
                                className="px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-50 rounded-md"
                              >
                                Cancel
                              </button>
                            )}
                            <Link
                              to={`/turfs/${booking.turf?._id}`}
                              className="px-3 py-1 text-xs font-medium text-blue-600 hover:bg-blue-50 rounded-md"
                            >
                              View Turf
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="mt-2 text-lg font-medium text-gray-900">
                    No bookings yet
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    You haven't made any bookings yet.
                  </p>
                  <div className="mt-6">
                    <Link
                      to="/turfs"
                      className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                      Browse Turfs
                    </Link>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === "profile" && (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Profile Information
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Your personal details and preferences
                </p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.name}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.email}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Account type
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {user.role}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Actions</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <button
                        onClick={() => {
                          /* Handle change password */
                          toast.success("Feature coming soon!");
                        }}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md mr-3"
                      >
                        Change Password
                      </button>
                      <button
                        onClick={() => {
                          /* Handle edit profile */
                          toast.success("Feature coming soon!");
                        }}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md"
                      >
                        Edit Profile
                      </button>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
