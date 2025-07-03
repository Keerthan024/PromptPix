import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.nav 
      className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 0.77, 0.47, 0.97] }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/">
              <img 
                src={assets.logo} 
                alt="Logo" 
                className="w-32 md:w-40 transition-all duration-300 hover:opacity-90"
              />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                {/* Credits Button */}
                <motion.button
                  onClick={() => navigate("/buy")}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 rounded-full border border-gray-200 hover:border-blue-300 transition-all"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 8, 
                      ease: "linear",
                      repeatType: "loop"
                    }}
                  >
                    <img className="w-5 h-5" src={assets.credit_star} alt="Credits" />
                  </motion.div>
                  <span className="text-sm font-medium text-gray-700">
                    {credit} Credits
                  </span>
                </motion.button>

                {/* User Menu */}
                <div className="relative">
                  <motion.button
                    className="flex items-center gap-2"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <img
                      src={user.photoURL || assets.profile_icon}
                      className="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm"
                      alt="Profile"
                    />
                    <span className="text-gray-600 font-medium hidden lg:inline">
                      Hi, {user.name.split(" ")[0]}
                    </span>
                  </motion.button>

                  <AnimatePresence>
                    {isMenuOpen && (
                      <motion.div
                        className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="py-1">
                          <motion.button
                            onClick={logout}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            Sign out
                          </motion.button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <>
                <motion.button
                  onClick={() => navigate("/buy")}
                  className="text-gray-600 hover:text-gray-900 font-medium text-sm"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Pricing
                </motion.button>
                <motion.button
                  onClick={() => setShowLogin(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-all"
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Sign In
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white border-t border-gray-200"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {user ? (
                <>
                  <motion.div
                    className="flex items-center gap-3 px-3 py-2 rounded-md"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <img
                      src={user.photoURL || assets.profile_icon}
                      className="w-8 h-8 rounded-full object-cover"
                      alt="Profile"
                    />
                    <span className="text-gray-700 font-medium">
                      {user.name}
                    </span>
                  </motion.div>
                  <motion.button
                    onClick={() => navigate("/buy")}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <img className="w-5 h-5" src={assets.credit_star} alt="Credits" />
                    <span>{credit} Credits</span>
                  </motion.button>
                  <motion.button
                    onClick={logout}
                    className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Sign out
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    onClick={() => navigate("/buy")}
                    className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    Pricing
                  </motion.button>
                  <motion.button
                    onClick={() => setShowLogin(true)}
                    className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600"
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Sign In
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;