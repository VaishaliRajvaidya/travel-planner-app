import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { motion } from 'framer-motion';
import 'remixicon/fonts/remixicon.css';

// Image Imports
import img1 from '../assets/services/img1.jpg';
import img2 from '../assets/services/img2.jpg';
import img3 from '../assets/services/img3.jpg';
import img4 from '../assets/services/img4.jpg';
import img5 from '../assets/services/img5.jpg';
import img6 from '../assets/services/img6.jpg';
import img7 from '../assets/services/img7.jpg';
import img8 from '../assets/services/img8.jpg';
import img9 from '../assets/services/img9.jpg';

const services = [
  { img: img1, title: 'Flight Booking', icon: 'ri-flight-takeoff-line' },
  { img: img2, title: 'Hotel Reservation', icon: 'ri-hotel-line' },
  { img: img3, title: 'Car Rentals', icon: 'ri-car-line' },
  { img: img4, title: 'Guided Tours', icon: 'ri-map-pin-line' },
  { img: img5, title: 'Visa Assistance', icon: 'ri-passport-line' },
  { img: img6, title: 'Travel Insurance', icon: 'ri-shield-check-line' },
  { img: img7, title: 'Cruise Booking', icon: 'ri-ship-line' },
  { img: img8, title: 'Emergency Support', icon: 'ri-first-aid-kit-line' },
  { img: img9, title: 'Group Travel', icon: 'ri-group-line' },
];

const OurServices = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleServiceClick = (serviceName) => {
    if (currentUser) {
      navigate('/booking', { state: { service: serviceName } });
    } else {
      navigate('/LoginPage');
    }
  };

  return (
    <div className="bg-gradient-to-br from-cyan-700 via-teal-200 to-purple-500 min-h-screen p-6 sm:p-10">
      {/* Heading */}
      <motion.h2
        className="text-4xl sm:text-5xl font-extrabold text-center bg-gray-900 bg-clip-text text-transparent mb-12 drop-shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        Our Services ✈️
      </motion.h2>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {services.map((service, i) => (
          <motion.div
            key={i}
            onClick={() => handleServiceClick(service.title)}
            className="bg-white/40 backdrop-blur-md p-4 rounded-2xl shadow-lg hover:shadow-2xl border border-white/30 hover:border-white/50 transition-transform duration-300 transform hover:scale-105 cursor-pointer"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center text-center">
              <i className={`text-4xl mb-3 text-white-600 ${service.icon}`}></i>
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-indigo-900">{service.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OurServices;
