import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const transportOptions = [
  "Flight",
  "Train",
  "Bus",
  "Ship",
  "Bike",
  "Taxi",
  "Walk",
];

const Spinner = () => (
  <motion.div
    className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"
  />
);

const BookingPage = () => {
  const [form, setForm] = useState({
    transport: "",
    fullName: "",
    dob: "",
    journeyDate: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.transport) newErrors.transport = "Please select a transport option.";
    if (!form.fullName.trim() || form.fullName.length < 3)
      newErrors.fullName = "Full Name must be at least 3 characters.";
    if (!form.dob) {
      newErrors.dob = "Date of Birth is required.";
    } else if (new Date(form.dob) >= new Date()) {
      newErrors.dob = "DOB must be in the past.";
    }

    if (!form.journeyDate) {
      newErrors.journeyDate = "Journey Date is required.";
    } else if (new Date(form.journeyDate) < new Date().setHours(0, 0, 0, 0)) {
      newErrors.journeyDate = "Journey date must be today or later.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      navigate("/payment", { state: form });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Book Your Journey</h2>

        <label className="block mb-2">Means of Transport</label>
        <select
          name="transport"
          value={form.transport}
          onChange={handleChange}
          className={`w-full mb-1 p-2 border rounded ${errors.transport ? "border-red-500" : ""}`}
        >
          <option value="" disabled>
            Select your means of transport
          </option>
          {transportOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {errors.transport && <p className="text-red-600 text-sm mb-2">{errors.transport}</p>}

        <label className="block mb-2">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          className={`w-full mb-1 p-2 border rounded ${errors.fullName ? "border-red-500" : ""}`}
        />
        {errors.fullName && <p className="text-red-600 text-sm mb-2">{errors.fullName}</p>}

        <label className="block mb-2">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          className={`w-full mb-1 p-2 border rounded ${errors.dob ? "border-red-500" : ""}`}
        />
        {errors.dob && <p className="text-red-600 text-sm mb-2">{errors.dob}</p>}

        <label className="block mb-2">Date of Journey</label>
        <input
          type="date"
          name="journeyDate"
          value={form.journeyDate}
          onChange={handleChange}
          className={`w-full mb-1 p-2 border rounded ${errors.journeyDate ? "border-red-500" : ""}`}
        />
        {errors.journeyDate && <p className="text-red-600 text-sm mb-4">{errors.journeyDate}</p>}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? <Spinner /> : "Book Now"}
        </button>
      </form>
    </div>
  );
};

export default BookingPage;
