import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaGithub
} from "react-icons/fa";

const socialIcons = [
  { icon: <FaFacebookF />, link: "https://facebook.com", color: "#4267B2" },
  { icon: <FaInstagram />, link: "https://instagram.com", color: "#E1306C" },
  { icon: <FaTwitter />, link: "https://twitter.com", color: "#1DA1F2" },
  { icon: <FaLinkedinIn />, link: "https://linkedin.com", color: "#0077B5" },
  { icon: <FaGithub />, link: "https://github.com", color: "#fff" }
];

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-xl mb-4 font-semibold">Connect with us</h2>
        <div className="flex justify-center gap-6 mb-4">
          {socialIcons.map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.3, color: social.color }}
              transition={{ type: "spring", stiffness: 300 }}
              className="text-2xl text-white hover:text-current"
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Travel Planner. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
