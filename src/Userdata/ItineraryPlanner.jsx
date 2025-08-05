import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../Context/AuthContext";

const ItineraryPlanner = () => {
  const { currentUser } = useContext(AuthContext);
  const userKey = `itinerary_${currentUser?.uname || currentUser?.name || "guest"}`;

  const [days, setDays] = useState([{ day: 1, activities: [""] }]);

  const addDay = () => {
    setDays([...days, { day: days.length + 1, activities: [""] }]);
  };

  const deleteDay = () => {
    if (days.length > 1) {
      setDays(days.slice(0, -1));
    }
  };

  const addActivity = (index) => {
    const updatedDays = [...days];
    updatedDays[index].activities.push("");
    setDays(updatedDays);
  };

  const deleteActivity = (dayIndex) => {
    const updatedDays = [...days];
    if (updatedDays[dayIndex].activities.length > 1) {
      updatedDays[dayIndex].activities.pop();
      setDays(updatedDays);
    }
  };

  const handleActivityChange = (dayIndex, activityIndex, value) => {
    const updatedDays = [...days];
    updatedDays[dayIndex].activities[activityIndex] = value;
    setDays(updatedDays);
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-slate-800 to-indigo-900 text-white">
      <h1 className="text-4xl font-bold text-center mb-6">Itinerary Planner</h1>

      {days.map((day, index) => (
        <div key={index} className="mb-8 p-4 rounded-xl bg-white bg-opacity-10 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Day {day.day}</h2>

          {day.activities.map((activity, i) => (
  <input
    key={i}
    type="text"
    placeholder={`Activity ${i + 1}`}
    value={activity}
    onChange={(e) => handleActivityChange(index, i, e.target.value)}
    className="block w-full p-2 mb-2 rounded-md text-black border border-black"
  />
))}


          <div className="flex flex-wrap gap-3 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => addActivity(index)}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 shadow-md"
            >
              ➕ Add Activity
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => deleteActivity(index)}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 shadow-md"
            >
              🗑️ Delete Activity
            </motion.button>
          </div>
        </div>
      ))}

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addDay}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-sky-400 shadow-xl"
        >
          ➕ Add Day
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={deleteDay}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-green-600 to-blue-500 shadow-xl"
        >
          🗑️ Delete Day
        </motion.button>
      </div>
    </div>
  );
};

export default ItineraryPlanner;
