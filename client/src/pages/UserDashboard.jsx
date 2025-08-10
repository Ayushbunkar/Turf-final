import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../components/ui/Sidebar.jsx";
import { Card } from "../components/ui/Card.jsx";
import { Button } from "../components/ui/Button.jsx";
import { motion } from "framer-motion";
import axios from "axios";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart, Bar } from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import { Legend } from "recharts";

export default function UserDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : {};
  });
  const [analytics, setAnalytics] = useState({ trends: [], engagement: [], demographics: [] });
  const [darkMode, setDarkMode] = useState(false);
  const wsRef = useRef(null);

  // Fetch bookings
  useEffect(() => {
    async function fetchBookings() {
      try {
        const res = await axios.get("/api/bookings/user", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setBookings(Array.isArray(res.data) ? res.data : []);
      } catch {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    }
    fetchBookings();
  }, []);

  // Fetch analytics
  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const [trendsRes, engagementRes, demographicsRes] = await Promise.all([
          axios.get("/api/analytics/bookings"),
          axios.get("/api/analytics/engagement"),
          axios.get("/api/analytics/demographics")
        ]);
        setAnalytics({
          trends: Array.isArray(trendsRes.data) ? trendsRes.data : [],
          engagement: Array.isArray(engagementRes.data) ? engagementRes.data : [],
          demographics: Array.isArray(demographicsRes.data) ? demographicsRes.data : []
        });
      } catch {
        setAnalytics({ trends: [], engagement: [], demographics: [] });
      }
    }
    fetchAnalytics();
  }, []);

  // WebSocket for real-time booking updates
  useEffect(() => {
    wsRef.current = new WebSocket("ws://localhost:4500/realtime");
    wsRef.current.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "NEW_BOOKING") {
          setBookings((prev) => [data.booking, ...prev]);
        }
      } catch {}
    };
    return () => wsRef.current.close();
  }, []);

  // KPI cards data
  const kpis = [
    { label: "Total Bookings", value: bookings.length },
    { label: "Revenue (₹)", value: bookings.reduce((sum, b) => sum + b.price, 0) },
    { label: "Upcoming", value: bookings.filter(b => new Date(b.date) > new Date()).length },
    { label: "Active Users", value: 128 } // example static
  ];

  const COLORS = ["#34D399", "#60A5FA", "#FBBF24", "#F87171"];

  return (
    <div className={`${darkMode ? "dark" : ""} flex min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-green-200 dark:from-gray-900 dark:to-gray-800`}>
      <Sidebar user={user} onToggleDark={() => setDarkMode(!darkMode)} />
      <main className="flex-1 p-4 sm:p-8 space-y-6">
        <h1 className="text-3xl font-bold text-green-700 dark:text-green-300">Welcome, {user.name}</h1>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {kpis.map((kpi, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg text-center">
                <div className="text-lg font-semibold text-gray-600 dark:text-gray-300">{kpi.label}</div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-400">{kpi.value}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Line Chart */}
          <Card className="p-4 col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <h2 className="font-semibold mb-4 text-green-700 dark:text-green-300">Bookings & Revenue Trends</h2>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={analytics.trends}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="bookings" stroke="#34D399" />
                <Line type="monotone" dataKey="revenue" stroke="#60A5FA" />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Pie Chart */}
          <Card className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
            <h2 className="font-semibold mb-4 text-green-700 dark:text-green-300">User Demographics</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={analytics.demographics} dataKey="value" nameKey="name" outerRadius={80}>
                  {analytics.demographics.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Legend />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Bar Chart */}
        <Card className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h2 className="font-semibold mb-4 text-green-700 dark:text-green-300">Engagement</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analytics.engagement}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#34D399" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Bookings Table */}
        <Card className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-green-700 dark:text-green-300 mb-4">Your Turf Bookings</h2>
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
                    <tr key={booking._id} className="border-b border-gray-200 dark:border-gray-700">
                      <td className="px-4 py-2">{booking.turfName}</td>
                      <td className="px-4 py-2">{new Date(booking.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{booking.timeSlot}</td>
                      <td className="px-4 py-2">₹{booking.price}</td>
                      <td className="px-4 py-2">
                        <Button variant="outline" className="mr-2">View</Button>
                        <Button className="bg-red-500 text-white">Cancel</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
