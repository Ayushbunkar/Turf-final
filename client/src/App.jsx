import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Turfs from "./pages/Turfs";
import TurfDetail from "./pages/TurfDetail";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import Test from "./pages/test";
import TurfAdminDashboard from "./pages/TurfAdminDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminBookings from "./pages/AdminBookings";
import TurfAdminHome from "./pages/TurfAdminHome";
import TurfAdminTurfs from "./pages/TurfAdminTurfs";
import TurfAdminBookings from "./pages/TurfAdminBookings";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <Toaster position="top-right" reverseOrder={false} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/turfs" element={<Turfs />} />
            <Route path="/turfs/:id" element={<TurfDetail />} />
            <Route path="/booking/:id" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/test" element={<Test />} />

            {/* Admin Dashboard Nested Routes */}
            <Route path="/admin" element={<AdminDashboard />}>
              <Route index element={<div>Welcome to Admin Panel</div>} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="bookings" element={<AdminBookings />} />
            </Route>

            {/* Turf Admin Dashboard Nested Routes */}
            <Route path="/turfadmin" element={<TurfAdminDashboard />}>
              <Route index element={<TurfAdminHome />} />
              <Route path="turfs" element={<TurfAdminTurfs />} />
              <Route path="bookings" element={<TurfAdminBookings />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
