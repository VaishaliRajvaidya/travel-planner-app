import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import 'remixicon/fonts/remixicon.css';

const TransportOpt = () => {
  const [selected, setSelected] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const Options = [
    { icon: 'ri-car-line', label: 'Car', color: 'from-blue-300 to-teal-400' },
    { icon: 'ri-bus-line', label: 'Bus', color: 'from-teal-400 to-emerald-400' },
    { icon: 'ri-train-line', label: 'Train', color: 'from-cyan-400 to-sky-400' },
    { icon: 'ri-flight-takeoff-line', label: 'Airplane', color: 'from-blue-400 to-cyan-400' },
    { icon: 'ri-ship-line', label: 'Ship', color: 'from-teal-300 to-blue-400' },
    { icon: 'ri-motorbike-line', label: 'Bike', color: 'from-emerald-400 to-teal-500' },
    { icon: 'ri-walk-line', label: 'Walk', color: 'from-sky-300 to-blue-300' },
    { icon: 'ri-taxi-line', label: 'Taxi', color: 'from-cyan-300 to-blue-400' },
  ];

  const handleSelect = (label) => {
    if (!currentUser) {
      navigate('/LoginPage');
    } else {
      setSelected(label);
    }
  };

  const handleContinue = () => {
    if (currentUser) {
      navigate('/booking', { state: { transport: selected } });
    } else {
      navigate('/LoginPage');
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-green-200 via-teal-500 to-blue-700 flex flex-col items-center px-4">
      <motion.h1
        className="text-4xl sm:text-5xl font-extrabold text-black-600 text-center mt-12"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Choose Your Mode of Transport
      </motion.h1>

      <motion.p
        className="text-center text-gray-900 text-lg mt-2 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Pick your travel companion to begin your journey 🚗✈️🚢
      </motion.p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl w-full mb-8 ">
        {Options.map((option, index) => (
          <motion.div
            key={option.label}
            onClick={() => handleSelect(option.label)}
            className={`relative border border-black/30 rounded-3xl p-6 cursor-pointer 
              transition-transform duration-300 backdrop-blur-xl shadow-xl text-white
              ${selected === option.label ? 'ring-4 ring-teal-600 scale-105' : 'hover:scale-105'}
            `}
            style={{
              backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`,
            }}
            whileHover={{ scale: 1.08 }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <div className={`bg-gradient-to-br ${option.color} p-6 rounded-full mb-4 shadow-lg`}>
              <i className={`${option.icon} text-3xl text-white`}></i>
            </div>
            <span className="text-lg font-semibold text-gray-900">{option.label}</span>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected && currentUser && (
          <motion.button
            onClick={handleContinue}
            className="bg-gradient-to-r from-teal-500 to-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Continue with {selected}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransportOpt;
