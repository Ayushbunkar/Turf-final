import React from "react";
import { Button } from "../ui/Button.jsx";
import { useNavigate } from "react-router-dom";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-xl mt-12 text-center">
      <h2 className="text-3xl font-bold mb-4 text-green-700">Payment Successful!</h2>
      <p className="mb-6 text-green-600">Your booking is confirmed. Thank you for your payment.</p>
      <Button className="bg-green-600 text-white rounded-xl px-6 py-2" onClick={() => navigate("/turfs")}>Back to Turfs</Button>
    </div>
  );
}
