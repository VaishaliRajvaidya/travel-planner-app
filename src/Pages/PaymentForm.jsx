import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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

  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  const handleChange = (e) => {
    setPaymentInfo({ ...paymentInfo, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when typing
  };

  const validate = () => {
    const newErrors = {};
    const { cardNumber, nameOnCard, expiry, cvv } = paymentInfo;

    // Card number: 16 digits
    if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }

    // Name: letters and spaces, at least 3 characters
    if (!/^[a-zA-Z ]{3,}$/.test(nameOnCard.trim())) {
      newErrors.nameOnCard = "Enter a valid name (min 3 characters).";
    }

    // Expiry: MM/YY format and not expired
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
      newErrors.expiry = "Enter expiry in MM/YY format.";
    } else {
      const [month, year] = expiry.split("/").map(Number);
      const currentDate = new Date();
      const expiryDate = new Date(2000 + year, month);
      if (expiryDate <= currentDate) {
        newErrors.expiry = "Card has expired.";
      }
    }

    // CVV: 3 digits
    if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = "CVV must be 3 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (!validate()) return;

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

        {/* Card Number */}
        <label className="block mb-2">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={paymentInfo.cardNumber}
          onChange={handleChange}
          className={`w-full mb-1 p-2 border rounded ${
            errors.cardNumber ? "border-red-500" : ""
          }`}
          maxLength={16}
        />
        {errors.cardNumber && (
          <p className="text-red-600 text-sm mb-2">{errors.cardNumber}</p>
        )}

        {/* Name on Card */}
        <label className="block mb-2">Name on Card</label>
        <input
          type="text"
          name="nameOnCard"
          value={paymentInfo.nameOnCard}
          onChange={handleChange}
          className={`w-full mb-1 p-2 border rounded ${
            errors.nameOnCard ? "border-red-500" : ""
          }`}
        />
        {errors.nameOnCard && (
          <p className="text-red-600 text-sm mb-2">{errors.nameOnCard}</p>
        )}

        {/* Expiry & CVV */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block mb-2">Expiry (MM/YY)</label>
            <input
              type="text"
              name="expiry"
              placeholder="MM/YY"
              value={paymentInfo.expiry}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.expiry ? "border-red-500" : ""
              }`}
            />
            {errors.expiry && (
              <p className="text-red-600 text-sm mt-1">{errors.expiry}</p>
            )}
          </div>

          <div className="flex-1">
            <label className="block mb-2">CVV</label>
            <input
              type="password"
              name="cvv"
              maxLength={3}
              value={paymentInfo.cvv}
              onChange={handleChange}
              className={`w-full p-2 border rounded ${
                errors.cvv ? "border-red-500" : ""
              }`}
            />
            {errors.cvv && (
              <p className="text-red-600 text-sm mt-1">{errors.cvv}</p>
            )}
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
