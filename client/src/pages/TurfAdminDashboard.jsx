// src/pages/TurfAdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import TurfAdminSidebar from "../components/TurfAdmin/TurfAdminSidebar";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";

export default function TurfAdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const { user, token } = useAuth();
  const location = useLocation();
  
  console.log("Current location:", location.pathname);
  console.log("Current user:", user);
  
  // Set up axios defaults with authentication
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      try {
  const res = await api.get("/turfadmin/dashboard");
        setDashboardData(res.data);
      } catch (apiError) {
        console.error("API error:", apiError);
        toast.error("Failed to load dashboard data");
      }
      setIsLoading(false);
    } catch (err) {
      console.error("Error in fetch function:", err);
      toast.error("Failed to load dashboard data");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token]);

  return (
    <div className="flex h-screen bg-gray-100">
      <TurfAdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden ml-0 lg:ml-64">
        {/* Top header */}
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-semibold text-gray-800">
              Turf Admin Dashboard
            </h1>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : (
            <Outlet context={{ refreshData: fetchDashboardData, dashboardData }} />
          )}
        </main>
      </div>
    </div>
  );
}
