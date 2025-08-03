import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaMapMarkedAlt,
  FaClipboardList,
  FaPlaneDeparture
} from "react-icons/fa";
import video2 from "../assets/videos/video2.mp4";

const Home = () => {
  const { currentUser } = useContext(AuthContext);
  const userName = currentUser?.name || currentUser?.uname || "Traveler";

  const cardData = [
    {
      title: "Plan Itinerary",
      icon: <FaClipboardList size={36} />,
      link: "/itinerary",
      gradient: "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600"
    },
    {
      title: "Checklist",
      icon: <FaPlaneDeparture size={36} />,
      link: "/checklist",
      gradient: "bg-gradient-to-br from-green-400 via-blue-500 to-teal-500"
    },
    {
      title: "Map Search",
      icon: <FaMapMarkedAlt size={36} />,
      link: "/map",
      gradient: "bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500"
    }
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-100 via-blue-50 to-purple-100 overflow-hidden pb-10">
      
      {/* ✈️ Plane Animation */}
      <motion.div
        initial={{ x: "-10vw", opacity: 0 }}
        animate={{ x: "100vw", opacity: 1 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        className="absolute top-10 left-0 z-10 text-blue-700 text-3xl sm:text-4xl"
      >
        <FaPlaneDeparture />
      </motion.div>

      {/* Welcome Heading */}
      <motion.h2
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-3xl sm:text-4xl font-extrabold text-center text-indigo-800 mt-17 mb-3 px-4 sm:px-0"
      >
        Welcome, {userName} 👋
      </motion.h2>

      {/* Cards */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto px-4">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`rounded-2xl shadow-xl text-white transform transition duration-300 hover:shadow-2xl ${card.gradient}`}
          >
            <Link
              to={card.link}
              className="flex flex-col items-center justify-center text-center p-8 space-y-4"
            >
              <div className="bg-white/20 p-4 rounded-full">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold tracking-wide">
                {card.title}
              </h3>
              <p className="text-sm font-medium opacity-90">
                Tap to explore
              </p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* 🎥 Video at Bottom */}
      <div className="relative z-10 mt-8 px-2">
        <div className="mx-auto max-w-full">
          <video
            src={video2}
            autoPlay
            muted
            loop
            controls
            className="w-full aspect-video rounded-xl shadow-lg object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
