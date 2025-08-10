import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { Button } from "../components/ui/Button.jsx";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4500/api/auth/login",
        formData,
        { withCredentials: true } // ✅ If you're using cookies for JWT
      );

      // Expecting backend to send: { token, user: { role, email, name } }
      const { token, user } = res.data;

      toast.success(`${user.role} login successful!`);

      // Save token & user info
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirect based on role
      switch (user.role) {
        case "admin":
          navigate("/admin-dashboard");
          break;
        case "turfAdmin":
          navigate("/turfadmin-dashboard");
          break;
        default:
          navigate("/user-dashboard");
          break;
      }
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="px-6 py-8">
            <h2 className="text-2xl font-bold text-center mb-6">
              Login to <span className="text-green-600">TurfTime</span>
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your password"
                />
              </div>
              <Button type="submit" fullWidth>
                Login
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
