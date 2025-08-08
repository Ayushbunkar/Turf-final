// src/pages/TurfAdminDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import TurfCard from "../components/Turfcard/TurfCard";
import TurfForm from "../components/TurfForm/TurfForm";


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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">🏟️ Turf Admin Dashboard</h1>
      <TurfForm onTurfAdded={fetchTurfs} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {turfs.map((turf) => (
          <TurfCard key={turf._id} turf={turf} />
        ))}
      </div>
    </div>
  );
}
