import React from "react";

export default function AdminNavbar() {
  return (
    <div className="bg-white p-4 shadow flex justify-between items-center">
      <h2 className="text-lg font-semibold">Welcome, Admin</h2>
      <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
}
