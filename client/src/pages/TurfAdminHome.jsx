import React from "react";
import TurfAdminSidebar from "../components/TurfAdminSidebar";
import { Outlet } from "react-router-dom";

export default function TurfAdminHome() {
  return (
    <div className="flex">
      <TurfAdminSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Turf Admin Home</h1>
        <p>Welcome to your turf admin dashboard!</p>
        <Outlet />
      </main>
    </div>
  );
}