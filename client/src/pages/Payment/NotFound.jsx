import React from "react";
import { Button } from "../ui/Button.jsx";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-xl mt-12 text-center">
      <h2 className="text-4xl font-extrabold mb-4 text-red-700">404 Page Not Found</h2>
      <p className="mb-6 text-gray-600 text-lg">Oops! The page you're looking for doesn't exist or has been moved.</p>
      <Button className="bg-green-600 text-white rounded-xl px-6 py-2" onClick={() => navigate("/turfs")}>Back to Turfs</Button>
    </div>
  );
}
