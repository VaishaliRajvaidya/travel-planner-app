// MapPage.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../Pages/Navbar";
import { getCoordinates } from "../Pages/Utils";

const MapPage = () => {
  const [location, setLocation] = useState("India");
  const [mapSrc, setMapSrc] = useState(
    `https://www.google.com/maps/embed/v1/place?q=India&key=${import.meta.env.VITE_MAP_EMBED_API_KEY}`
  );

  const handleSearch = async () => {
    try {
      const coords = await getCoordinates(location, "");
      setMapSrc(
        `https://www.google.com/maps/embed/v1/view?key=${import.meta.env.VITE_MAP_EMBED_API_KEY}&center=${coords.lat},${coords.lng}&zoom=12`
      );
    } catch (error) {
      alert("Failed to load location. Check console for details.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-100">
      <Navbar />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-10"
      >
        <h1 className="text-4xl font-bold text-green-700 mt-15 mb-4">
          Explore Your Destination 🗺️
        </h1>
        <p className="text-gray-600">
          Search a location to view it on the map with a marker.
        </p>
      </motion.div>

      {/* Location Search */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-2 mb-6 px-4">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          className="border border-green-400 px-4 py-2 rounded-lg w-full md:w-96  mt-10 outline-none transition focus:ring-2 focus:ring-green-300"
        />
        <button
          onClick={handleSearch}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
        >
          Search
        </button>
      </div>

      {/* Animated Underline */}
      <motion.div
        className="w-2/3 md:w-1/2 mx-auto h-[3px] rounded-full bg-gradient-to-r from-green-400 to-green-600 mb-6"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ transformOrigin: "center" }}
      />

      {/* Embedded Map */}
      <div className="flex justify-center">
        <iframe
          title="Google Map"
          width="100%"
          height="500"
          loading="lazy"
          className="rounded-xl shadow-lg w-[90%] md:w-[80%] transition-all"
          allowFullScreen
          src={mapSrc}
        ></iframe>
      </div>
    </div>
  );
};

export default MapPage;
