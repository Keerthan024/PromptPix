import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.8]);

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true);
    }
  };

  // Floating text
  const floatingText = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.8,
        ease: [0.16, 0.77, 0.47, 0.97]
      }
    })
  };


  const imageGrid = [
    { src: assets.sample_img_4, aspect: "aspect-[3/4]", delay: 0.1 },
    { src: assets.sample_img_2, aspect: "aspect-[4/3]", delay: 0.2 },
    { src: assets.sample_img_3, aspect: "aspect-square", delay: 0.3 },
    { src: assets.sample_img_1, aspect: "aspect-[16/9]", delay: 0.4 },
    { src: assets.sample_img_1, aspect: "aspect-[4/5]", delay: 0.5 },
    { src: assets.sample_img_2, aspect: "aspect-[3/2]", delay: 0.6 }
  ];

  return (
    <header className="relative overflow-hidden">
      {/* background */}
      <motion.div 
        className="absolute inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100"
          animate={{
            background: [
              'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
              'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
              'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)',
              'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)'
            ]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/80"
            style={{
              width: Math.random() * 6 + 2,
              height: Math.random() * 6 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 60 - 30],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5
            }}
          />
        ))}
      </motion.div>

      <motion.div 
        className="max-w-7xl mx-auto px-6 py-28 md:py-36 flex flex-col items-center relative"
        style={{ y, opacity }}
      >
        {/* badge */}
        <motion.div
          className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200 shadow-xs mb-10"
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            delay: 0.3,
            duration: 0.8,
            ease: [0.16, 0.77, 0.47, 0.97],
            scale: { type: "spring", stiffness: 300 }
          }}
          whileHover={{ y: -2 }}
        >
          <p className="text-sm font-medium text-gray-700">AI-Powered Creativity</p>
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { repeat: Infinity, duration: 6, ease: "linear" },
              scale: { repeat: Infinity, duration: 3, ease: "easeInOut" }
            }}
          >
            <img src={assets.star_icon} alt="Star icon" className="h-4 w-4" />
          </motion.div>
        </motion.div>

        {/* Main heading */}
        <motion.div className="text-center mb-12 overflow-hidden">
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 max-w-5xl leading-tight mb-8"
            initial="hidden"
            animate="visible"
          >
            {"Transform words into stunning visuals".split(" ").map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={floatingText}
                className="inline-block mr-3"
              >
                {i === 1 ? (
                  <span className="relative inline-block">
                    <motion.span
                      className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.08 + 0.3, duration: 0.8 }}
                    >
                      {word}
                    </motion.span>
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text blur-lg opacity-70"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.5 }}
                      transition={{ delay: i * 0.08 + 0.5, duration: 1 }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ) : word}
              </motion.span>
            ))}
          </motion.h1>
        </motion.div>

        {/* Subheading */}
        <motion.div
          className="relative max-w-2xl mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <motion.p
            className="text-xl text-gray-600 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 1.4, 
              duration: 0.8,
              ease: [0.16, 0.77, 0.47, 0.97]
            }}
          >
            Our AI transforms your text into breathtaking images in seconds. No skills required—just imagination.
          </motion.p>
          <motion.div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.8, duration: 1.2 }}
          />
        </motion.div>

        <motion.div
          className="relative mb-28"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.6, 
            duration: 0.8,
            ease: [0.16, 0.77, 0.47, 0.97]
          }}
        >
          <motion.button
            onClick={onClickHandler}
            className="relative overflow-hidden group px-10 py-5 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 transition-all duration-500 shadow-xl"
            whileHover={{ 
              y: -6,
              scale: 1.02,
              boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.2)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 flex items-center gap-3 text-white font-medium text-xl">
              Start Creating Now
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  rotate: { repeat: Infinity, duration: 8, ease: "linear" },
                  scale: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                }}
              >
                <img src={assets.star_group} alt="" className="h-6 w-6" />
              </motion.div>
            </span>
            

            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 1.5, ease: "linear" }}
            />
            
            {/* Floating micro-interactions */}
            {[...Array(8)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full bg-white/40"
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
        </motion.div>

        {/* Dynamic image */}
        <motion.div
          className="w-full"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 1.8
              }
            }
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5 mb-8">
            <AnimatePresence>
              {imageGrid.map((img, index) => (
                <motion.div
                  key={index}
                  className={`${img.aspect} rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer relative group`}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        ease: [0.16, 0.77, 0.47, 0.97],
                        duration: 0.8,
                        delay: img.delay
                      }
                    }
                  }}
                  whileHover={{ 
                    y: -10,
                    transition: { 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 10 
                    }
                  }}
                >
                  <motion.img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={img.src}
                    alt="AI generated sample"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: img.delay + 0.2, duration: 1 }}
                  />
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5"
                  >
                    <motion.p 
                      className="text-white font-medium text-lg translate-y-5 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      AI Art
                    </motion.p>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          <motion.p
            className="text-sm text-gray-500 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              delay: 2.8, 
              duration: 0.8,
              ease: [0.16, 0.77, 0.47, 0.97]
            }}
          >
            <motion.span
              animate={{ 
                textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 12px rgba(59,130,246,0.2)", "0 0 0px rgba(0,0,0,0)"]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity
              }}
              className="font-medium"
            >
              Powered by Keerthan A
            </motion.span>
          </motion.p>
        </motion.div>
      </motion.div>
    </header>
  );
};

export default Header;