import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { motion } from "framer-motion";

const RegisterPage = () => {
  const { uname, setUname, email, password, Register, setPassword, setEmail } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== ConfirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!uname || !email || !password || !ConfirmPassword) {
      alert("Please fill out all fields");
      return;
    }

    Register(uname, email, password);
    setUname("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");

    alert("Registered successfully! Please login.");
    navigate("/LoginPage");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-700 via-blue-900 to-emerald-800 px-4">
      <motion.form
        onSubmit={submitHandler}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register
        </h1>

        <div className="space-y-4">
          <div>
            <label htmlFor="uname" className="block font-semibold text-gray-700">
              Name
            </label>
            <input
              id="uname"
              type="text"
              value={uname}
              onChange={(e) => setUname(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-semibold text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="password" className="block font-semibold text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block font-semibold text-gray-700">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-700 to-teal-600 text-white font-semibold py-2 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            Register
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
};

export default RegisterPage;
