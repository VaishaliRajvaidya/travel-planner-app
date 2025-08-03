import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";

const ItineraryPlanner = () => {
  const { currentUser } = useContext(AuthContext);
  const userKey = `itinerary_${currentUser?.uname || currentUser?.name || "guest"}`;

  const [days, setDays] = useState([{ day: 1, activities: [""] }]);

  useEffect(() => {
    const saved = localStorage.getItem(userKey);
    if (saved) setDays(JSON.parse(saved));
  }, [userKey]);

  useEffect(() => {
    localStorage.setItem(userKey, JSON.stringify(days));
  }, [days, userKey]);

  const addDay = () => {
    setDays([...days, { day: days.length + 1, activities: [""] }]);
  };

  const updateActivity = (dayIndex, actIndex, value) => {
    const newDays = [...days];
    newDays[dayIndex].activities[actIndex] = value;
    setDays(newDays);
  };

  const addActivity = (dayIndex) => {
    const newDays = [...days];
    newDays[dayIndex].activities.push("");
    setDays(newDays);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-100 py-10 px-4 sm:px-6 lg:px-24">
      <motion.h1
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl sm:text-5xl font-extrabold text-center mb-12 text-blue-800 tracking-tight"
      >
        🗓️ Itinerary Planner
      </motion.h1>

      <div className="space-y-10">
        {days.map((day, dayIndex) => (
          <motion.div
            key={dayIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: dayIndex * 0.1, duration: 0.5 }}
            className="bg-white/60 backdrop-blur-md border border-blue-100 rounded-2xl shadow-lg p-6 sm:p-8 transition hover:shadow-2xl"
          >
            <motion.h2
              className="text-xl sm:text-2xl font-semibold text-blue-700 mb-4"
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Day {day.day}
            </motion.h2>

            <div className="space-y-4">
              {day.activities.map((activity, actIndex) => (
                <motion.input
                  key={actIndex}
                  value={activity}
                  onChange={(e) =>
                    updateActivity(dayIndex, actIndex, e.target.value)
                  }
                  placeholder={`Activity ${actIndex + 1}`}
                  className="w-full px-4 py-2 bg-white bg-opacity-90 border border-blue-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 * actIndex }}
                />
              ))}
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
              className="origin-left h-[3px] mt-5 mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 rounded-full"
            />

            <motion.button
              onClick={() => addActivity(dayIndex)}
              whileHover={{ scale: 1.05 }}
              className="text-sm text-cyan-700 font-medium hover:underline hover:text-cyan-900 transition"
            >
              + Add Activity
            </motion.button>
          </motion.div>
        ))}

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addDay}
          className="block mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-7 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-2xl transition"
        >
          + Add Day
        </motion.button>
      </div>
    </div>
  );
};

export default ItineraryPlanner;
