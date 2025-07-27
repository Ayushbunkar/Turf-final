import React from "react";
import { Route, Routes } from "react-router-dom";
import RazorpayPayment from "../pages/Payment/RazorpayPayment.jsx";
import PaymentSuccess from "../pages/Payment/PaymentSuccess.jsx";
import NotFound from "../pages/Payment/NotFound.jsx";

export default function PaymentRoutes() {
  return (
    <Routes>
      <Route path="/payment" element={<RazorpayPayment />} />
      <Route path="/payment/success" element={<PaymentSuccess />} />
      {/* Add routes for other payment methods if needed */}
      {/* <Route path="/payment/cash" element={<CashPayment />} /> */}
      {/* <Route path="/payment/upi" element={<UPIPayment />} /> */}
      {/* <Route path="/payment/card" element={<CardPayment />} /> */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
