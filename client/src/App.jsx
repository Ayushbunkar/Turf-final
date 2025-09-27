import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import Dashboard from "./pages/DashBoards/User/Dashboard";
import UserDashboard from "./pages/DashBoards/User/UserDashboard";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import Test from "./pages/test";
import TurfAdminDashboard from "./pages/DashBoards/Admin/TurfAdminDashboard";
import AdminDashboard from "./pages/DashBoards/SuperAdmin/AdminDashboard";
import AdminUsers from "./pages/DashBoards/SuperAdmin/AdminUsers";
import AdminBookings from "./pages/DashBoards/SuperAdmin/AdminBookings";
import TurfAdminHome from "./pages/DashBoards/Admin/TurfAdminHome";
import TurfAdminTurfs from "./pages/DashBoards/Admin/TurfAdminTurfs";
import TurfAdminBookings from "./pages/DashBoards/Admin/TurfAdminBookings";
import AdminAnalytics from "./pages/DashBoards/SuperAdmin/AdminAnalytics";
import AdminSettings from "./pages/DashBoards/SuperAdmin/AdminSettings";
import RegisterTurfAdmin from "./pages/DashBoards/Admin/RegisterTurfAdmin";
import { useAuth } from "./context/AuthContext";

// Protected Route component
function ProtectedRoute({ element, requiredRole, allowedRoles }) {
  const { user, loading } = useAuth();
  
  // Show loading spinner while authentication state is being determined
  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>;
  }
  
  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // Check for specific required role
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" />;
  }
  
  // Check if user role is in allowed roles array
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  
  // User is authenticated and authorized
  return element;
}

function AppRoutes() {
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
            
            {/* Dashboard route that redirects based on user role */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute 
                  element={<Dashboard />}
                  allowedRoles={['user', 'turfadmin', 'admin']} 
                />
              } 
            />
            
            {/* User Dashboard */}
            <Route 
              path="/user-dashboard" 
              element={<ProtectedRoute element={<UserDashboard />} requiredRole="user" />} 
            />
            <Route path="/test" element={<Test />} />

            {/* Admin Dashboard Nested Routes */}
            <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} requiredRole="admin" />}>
              <Route index element={<div>Welcome to Admin Panel</div>} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="bookings" element={<AdminBookings />} />
              <Route path="analytics" element={<AdminAnalytics />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="register-turfadmin" element={<RegisterTurfAdmin />} />
            </Route>

            {/* Turf Admin Dashboard Nested Routes */}
            <Route path="/turfadmin" element={<ProtectedRoute element={<TurfAdminDashboard />} requiredRole="turfadmin" />}>
              <Route index element={<TurfAdminHome />} />
              <Route path="turfs" element={<TurfAdminTurfs />} />
              <Route path="bookings" element={<TurfAdminBookings />} />
              <Route path="settings" element={<div>Settings Page</div>} />
            </Route>

            {/* Must be last */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

function App() { return <AppRoutes />; }

export default App;
