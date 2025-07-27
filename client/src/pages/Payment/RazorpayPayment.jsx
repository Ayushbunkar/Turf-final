import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/Button.jsx";

function loadRazorpayScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function RazorpayPayment() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const turfName = params.get("name");
  const price = params.get("price");
  const turfId = params.get("tid");

  const handlePayment = async () => {
    const res = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // Call backend to create order
    const orderRes = await fetch("/api/payment/razorpay/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: price * 100, turfId, turfName }),
    });
    const order = await orderRes.json();

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay key
      amount: order.amount,
      currency: order.currency,
      name: "Turf Booking",
      description: `Booking for ${turfName}`,
      order_id: order.id,
      handler: function (response) {
        // On success, navigate to success page
        navigate("/payment/success");
      },
      prefill: {
        name: "Guest User",
        email: "guest@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#16a34a",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  useEffect(() => {
    // Optionally auto-trigger payment
    // handlePayment();
  }, []);

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-2xl shadow-xl mt-12">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Pay with Razorpay</h2>
      <div className="mb-6">
        <div className="font-semibold">Turf:</div>
        <div>{turfName}</div>
        <div className="font-semibold mt-2">Amount:</div>
        <div className="text-green-600 font-bold text-xl">₹{price}</div>
      </div>
      <Button
        className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white text-lg py-3 rounded-xl"
        onClick={handlePayment}
      >
        Pay with Razorpay
      </Button>
    </div>
  );
}
