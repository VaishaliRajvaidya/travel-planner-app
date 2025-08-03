// Gallery.jsx
import React from 'react';
import { motion } from 'framer-motion';

// Import images properly
import img1 from '../assets/galleryImages/img1.jpg';
import img2 from '../assets/galleryImages/img2.jpg';
import img3 from '../assets/galleryImages/img3.jpg';
import img4 from '../assets/galleryImages/img4.jpg';
import img5 from '../assets/galleryImages/img5.jpg';
import img6 from '../assets/galleryImages/img6.jpg';
import img7 from '../assets/galleryImages/img7.jpg';
import img8 from '../assets/galleryImages/img8.jpg';
import img9 from '../assets/galleryImages/img9.jpg';
import img10 from '../assets/galleryImages/img10.jpg';

// Use the imported images in the array
const galleryImages = [
  img1, img2, img3, img4, img5,
  img6, img7, img8, img9, img10,
];

const Gallery = () => {
  return (
    <div className="bg-gradient-to-r from-blue-900 via-teal-300 to-cyan-400 px-4 sm:px-8 pt-10 pb-16">
      
      <motion.h2
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-black-800 mb-10 drop-shadow-lg"
        initial={{ y: -40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        Travel Memories Gallery ✨
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {galleryImages.map((img, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl bg-white/20 backdrop-blur-md"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
          >
            <div className="relative group">
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                className="w-full h-64 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-lg font-semibold">
                View Memory
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
