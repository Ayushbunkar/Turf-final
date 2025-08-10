// src/pages/TurfAdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import TurfCard from "../components/TurfCard/TurfCard.jsx";
import TurfForm from "../components/TurfForm/TurfForm";
import TurfAdminSidebar from "../components/TurfAdminSidebar";
import { Outlet } from "react-router-dom";

export default function TurfAdminDashboard() {
  const [turfs, setTurfs] = useState([]);

  const fetchTurfs = async () => {
    try {
      const res = await axios.get("http://localhost:4500/api/turfs");
      setTurfs(res.data);
    } catch (err) {
      console.error("Error fetching turfs", err);
    }
  };

  useEffect(() => {
    fetchTurfs();
  }, []);

  return (
    <div className="flex">
      <TurfAdminSidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
