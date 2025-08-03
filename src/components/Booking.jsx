import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const transportOptions = ["Flight", "Train", "Bus"];

const Spinner = () => (
  <motion.div
    className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mt-4"
  />
);

const BookingPage = () => {
  const [form, setForm] = useState({
    transport: "Flight",
    fullName: "",
    dob: "",
    journeyDate: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
          className="w-full mb-4 p-2 border rounded"
        >
          {transportOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>

        <label className="block mb-2">Full Name</label>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <label className="block mb-2">Date of Birth</label>
        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded"
        />

        <label className="block mb-2">Date of Journey</label>
        <input
          type="date"
          name="journeyDate"
          value={form.journeyDate}
          onChange={handleChange}
          required
          className="w-full mb-4 p-2 border rounded"
        />

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
