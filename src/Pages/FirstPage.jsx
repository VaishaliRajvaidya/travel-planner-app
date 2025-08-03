import React, { useRef, useState } from 'react';
import video1 from '../assets/videos/video1.mp4';
import TransportOpt from './TransportOpt';
import Gallery from './Gallery';
import OurServices from './OurServices';
import { getCoordinates, getNearbyPlaces } from './Utils';
import { motion } from 'framer-motion';
import Footer from './Footer';

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
      ease: 'easeOut',
    },
  }),
};

const FirstPage = () => {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const mapRef = useRef(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!country || !city) return alert('Please enter both country and city');
    setLoading(true);
    setPlaces([]);

    try {
      const location = await getCoordinates(city, country);
      const placesData = await getNearbyPlaces(location);
      setPlaces(placesData);
    } catch (error) {
      console.error(error.message);
      alert('Error fetching location data');
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
          className="absolute top-3left-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-blue-900/40 to-cyan-900/40 z-10" />

        {/* Search Form */}
        <div className="absolute inset-0 z-20 flex items-center justify-center px-4">
          <motion.form
            onSubmit={submitHandler}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-xl flex flex-col md:flex-row flex-wrap gap-4 justify-center items-center w-full max-w-4xl"
          >
            <input
              type="text"
              placeholder="Enter Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full md:w-[200px] h-10 px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <input
              type="text"
              placeholder="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full md:w-[200px] h-10 px-4 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-400"
            />
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

      
        
        <TransportOpt />
       <Gallery />
      <OurServices />
      <Footer />


    </div>
  );
};

export default FirstPage;
