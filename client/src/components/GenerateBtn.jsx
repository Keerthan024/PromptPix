import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion, useAnimation } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const GenerateBtn = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const controls = useAnimation();

  const onClickHandler = async () => {
    await controls.start({
      scale: 0.95,
      transition: { duration: 0.1 }
    });
    
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
    
    await controls.start({
      scale: 1,
      transition: { duration: 0.3, type: "spring" }
    });
  };

  const floatingStars = {
    initial: { y: 0 },
    animate: (i) => ({
      y: [0, -15, 0],
      transition: {
        delay: i * 0.2,
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    })
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className="py-16 md:py-24 px-6 text-center relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <motion.div 
        className="absolute inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </motion.div>

      {/* Heading with floating stars */}
      <div className="relative inline-block mb-8 md:mb-12">
        <motion.h1 
          className="text-3xl md:text-5xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          See the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Magic</span>
        </motion.h1>
        <motion.p
          className="text-lg text-gray-500"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Transform your ideas into stunning visuals
        </motion.p>
        
        {/* Floating decorative stars */}
        {[...Array(3)].map((_, i) => (
          <motion.img
            key={i}
            src={assets.star_icon}
            alt=""
            className={`absolute w-6 h-6 ${i === 0 ? 'top-0 left-0' : i === 1 ? 'top-0 right-0' : 'bottom-0 left-1/2'}`}
            custom={i}
            variants={floatingStars}
            initial="initial"
            animate="animate"
          />
        ))}
      </div>

      {/* Animated CTA Button */}
      <motion.button
        onClick={onClickHandler}
        className="relative overflow-hidden group px-10 py-4 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-medium text-lg shadow-xl"
        animate={controls}
        whileHover={{ 
          y: -4,
          scale: 1.05,
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2)"
        }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <span className="relative z-10 flex items-center gap-3">
          Generate Images
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { repeat: Infinity, duration: 8, ease: "linear" },
              scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }}
          >
            <img src={assets.star_group} alt="" className="w-6 h-6" />
          </motion.div>
        </span>
        
        {/* Animated gradient overlay */}
        <motion.span
          className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-purple-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 1.5, ease: "linear" }}
        />
        
        {/* Floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/30"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{ 
              y: [0, Math.random() * 40 - 20],
              opacity: [0, 0.8, 0],
              x: [0, Math.random() * 60 - 30]
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 3
            }}
          />
        ))}
      </motion.button>
    </motion.section>
  );
};

export default GenerateBtn;