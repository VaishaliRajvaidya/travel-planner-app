import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { NavbarContext } from "../Context/NavbarContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { MenuOpen, toggleMenu, closeMenu } = useContext(NavbarContext);
  const { currentUser, Logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        closeMenu();
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [MenuOpen]);

  const handleLogout = () => {
    Logout();
    closeMenu();
    setShowUserMenu(false);
    navigate("/");
  };

  const LogIn = () => {
    navigate("/LoginPage");
    closeMenu();
  };

  const goToUserHome = () => {
    setShowUserMenu(false);
    navigate("/home");
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className="relative group hover:text-gray-300 transition"
    >
      {children}
      <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center transition-all duration-300 bg-gradient-to-r from-gray-700 to-gray-500 shadow-xl text-white"
    >
      {/* Logo */}
      <h1
        className="text-2xl font-bold tracking-wide cursor-pointer"
        onClick={() => navigate("/")}
      >
        🌍 Trip-x-Buddy
      </h1>

      {/* Hamburger for Mobile */}
      <button
        className="text-3xl focus:outline-none md:hidden hover:text-gray-300 transition duration-200"
        onClick={toggleMenu}
      >
        ☰
      </button>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex space-x-6 text-lg font-medium items-center">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/gallery">Gallery</NavLink>
        <NavLink to="/booking">Booking</NavLink>
        <NavLink to="/our-services">Our Services</NavLink>

        {!currentUser && (
          <button
            onClick={LogIn}
            className=" text-white-700 px-4 py-1 rounded hover:bg-gray-800 hover:text-white transition"
          >
            Login
          </button>
        )}

        {currentUser && (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="bg-white text-indigo-700 px-4 py-1 rounded hover:bg-gray-800 hover:text-white transition"
            >
              Hi, {currentUser.uname}
            </button>
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-40 bg-white text-indigo-800 rounded shadow-lg py-2 z-50"
                >
                  <button
                    onClick={goToUserHome}
                    className="w-full text-left px-4 py-2 hover:bg-indigo-100 transition"
                  >
                    My Home
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-red-100 transition"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {MenuOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute top-16 right-4 sm:right-6 bg-white text-indigo-700 w-[85%] sm:w-60 rounded-xl shadow-2xl py-6 px-5 space-y-4 z-50 md:hidden"
          >
            <Link
              to="/"
              onClick={closeMenu}
              className="block hover:bg-indigo-100 px-3 py-2 rounded transition"
            >
              Home
            </Link>
            <Link
              to="/gallery"
              onClick={closeMenu}
              className="block hover:bg-indigo-100 px-3 py-2 rounded transition"
            >
              Gallery
            </Link>
            <Link
              to="/booking"
              onClick={closeMenu}
              className="block hover:bg-indigo-100 px-3 py-2 rounded transition"
            >
              Booking
            </Link>
            <Link
              to="/our-services"
              onClick={closeMenu}
              className="block hover:bg-indigo-100 px-3 py-2 rounded transition"
            >
              Our Services
            </Link>

            {!currentUser && (
              <button
                onClick={LogIn}
                className="w-full bg-white text-indigo-700 px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                Login
              </button>
            )}

            {currentUser && (
              <>
                <button
                  onClick={goToUserHome}
                  className="w-full text-left px-4 py-2 hover:bg-indigo-100 transition"
                >
                  My Home
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-100 transition"
                >
                  Logout
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
