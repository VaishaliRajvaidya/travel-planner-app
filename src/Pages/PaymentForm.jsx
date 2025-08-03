import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Spinner = () => (
  <motion.div
    className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mt-4"
  />
);


const PaymentForm = () => {
  const navigate = useNavigate();  
  const { state } = useLocation();
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    nameOnCard: "",
    expiry: "",
    cvv: "",
  });
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      alert("Payment Successful 🎉");
      setProcessing(false);
      navigate("/");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-blue-200 flex items-center justify-center p-4">
      <form
        onSubmit={handlePayment}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Payment Details</h2>

        <p className="mb-4 text-sm text-gray-600">
          Booking for: <strong>{state?.fullName}</strong> | {state?.transport} on{" "}
          <strong>{state?.journeyDate}</strong>
        </p>

        <label className="block mb-2">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={paymentInfo.cardNumber}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <label className="block mb-2">Name on Card</label>
        <input
          type="text"
          name="nameOnCard"
          value={paymentInfo.nameOnCard}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block mb-2">Expiry</label>
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={paymentInfo.expiry}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2">CVV</label>
            <input
              type="password"
              name="cvv"
              value={paymentInfo.cvv}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
        >
          {processing ? <Spinner /> : "Buy Now"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
