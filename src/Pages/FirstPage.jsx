import React, { useRef, useState } from "react";
import video1 from "../assets/videos/video1.mp4";
import TransportOpt from "./TransportOpt";
import Gallery from "./Gallery";
import OurServices from "./OurServices";
import { motion } from "framer-motion";
import Footer from "./Footer";
import { getCoordinates, getTouristPlaces, getCountrySuggestions,getCitySuggestions} from "../utils/Utils";


const Spinner = () => (
  <div className="flex justify-center items-center h-40">
    <div className="w-10 h-10 border-4 border-white border-t-blue-600 rounded-full animate-spin"></div>
  </div>
);

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: "easeOut",
    },
  }),
};

const FirstPage = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  // suggestions
  const [countrySuggestions, setCountrySuggestions] = useState([]);
  const [citySuggestions, setCitySuggestions] = useState([]);

  const handleCountryChange = async (e) => {
    setCountry(e.target.value);
    const suggestions = await getCountrySuggestions(e.target.value);
    setCountrySuggestions(suggestions);
  };

  const handleCityChange = async (e) => {
    setCity(e.target.value);
    const suggestions = await getCitySuggestions(e.target.value, country);
    setCitySuggestions(suggestions);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!country || !city) return alert("Please enter both country and city");

    setLoading(true);
    setPlaces([]);

    try {
      const { lon, lat } = await getCoordinates(country, city);
      const fetchedPlaces = await getTouristPlaces(lon, lat);
      setPlaces(fetchedPlaces);
    } catch (error) {
      console.error(error);
      alert("Error fetching location data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full overflow-hidden bg-gradient-to-br from-teal-700 via-emerald-200 to-blue-500">
      {/* Hero Banner */}
      <div className="relative h-[500px] w-full mt-16">
        <video
          src={video1}
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-blue-900/40 to-cyan-900/40 z-10" />

        {/* Search Form */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
          <motion.form
            onSubmit={submitHandler}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-xl flex flex-col md:flex-row flex-wrap gap-4 justify-center items-center w-full max-w-4xl relative"
          >
            {/* Country Input */}
{/* Country Input */}
<div className="relative w-full sm:w-1/4">
  <input
    type="text"
    placeholder="Enter Country"
    value={country}
    onChange={handleCountryChange}
    className="w-full p-3 rounded-xl shadow-md border border-indigo-300 focus:outline-none"
  />
  {countrySuggestions.length > 0 && (
    <ul className="absolute bg-white shadow-lg rounded-xl mt-1 w-full z-10">
      {countrySuggestions.map((c, index) => (
        <li
          key={index}
          onClick={() => {
            setCountry(c);
            setCountrySuggestions([]);
          }}
          className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
        >
          {c}
        </li>
      ))}
    </ul>
  )}
</div>

{/* City Input */}
<div className="relative w-full sm:w-1/4">
  <input
    type="text"
    placeholder="Enter City"
    value={city}
    onChange={handleCityChange}
    className="w-full p-3 rounded-xl shadow-md border border-indigo-300 focus:outline-none"
  />
  {citySuggestions.length > 0 && (
    <ul className="absolute bg-white shadow-lg rounded-xl mt-1 w-full z-10">
      {citySuggestions.map((c, index) => (
        <li
          key={index}
          onClick={() => {
            setCity(c);
            setCitySuggestions([]);
          }}
          className="px-4 py-2 hover:bg-indigo-100 cursor-pointer"
        >
          {c}
        </li>
      ))}
    </ul>
  )}
</div>

            {/* Search Button */}
            <button
              type="submit"
              className="p-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full hover:scale-105 hover:from-green-600 hover:to-emerald-600 transition-all shadow-md"
            >
              <i className="ri-search-line text-xl" />
            </button>
          </motion.form>
        </div>
      </div>

      {/* Spinner */}
      {loading && <Spinner />}

      {/* Tourist Places List */}
      {!loading && places.length > 0 && (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          className="p-6 max-w-5xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Popular Tourist Places in {city}, {country}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {places.map((place, idx) => (
              <motion.li
                key={idx}
                variants={sectionVariants}
                custom={idx}
                className="bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-lg hover:scale-105 transition-transform"
              >
                <h3 className="font-semibold text-lg text-gray-800">
                  {place.properties.name || "Unknown Place"}
                </h3>
                <p className="text-sm text-gray-600">
                  {place.properties.address_line2 ||
                    place.properties.city ||
                    ""}
                </p>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Other Sections */}
      <TransportOpt />
      <Gallery />
      <OurServices />
      <Footer />
    </div>
  );
};

export default FirstPage;
