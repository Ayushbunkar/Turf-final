import React, { useState } from "react";
import { Button } from "../ui/Button.jsx";

export default function PaymentGateway({ bookingDetails, onPaymentSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = async () => {
    setLoading(true);
    setError("");
    // Simulate payment API call
    try {
      // TODO: Integrate with backend payment API (e.g., Stripe, Razorpay)
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onPaymentSuccess();
    } catch (err) {
      setError("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-xl mt-12">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Complete Your Payment</h2>
      <div className="mb-6">
        <div className="font-semibold">Turf:</div>
        <div>{bookingDetails.turfName}</div>
        <div className="font-semibold mt-2">Date:</div>
        <div>{bookingDetails.date.toLocaleDateString()}</div>
        <div className="font-semibold mt-2">Time Slot:</div>
        <div>{bookingDetails.timeSlot}</div>
        <div className="font-semibold mt-2">Amount:</div>
        <div className="text-green-600 font-bold text-xl">₹{bookingDetails.price}</div>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <Button
        className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white text-lg py-3 rounded-xl"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </div>
  );
}
