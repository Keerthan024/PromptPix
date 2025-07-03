import React from "react";
import { assets, testimonialsData } from "../assets/assets";
import { motion, useScroll, useTransform } from "framer-motion";

const Testimonials = () => {
  return (
    <motion.section 
      className="relative overflow-hidden py-24 px-6 md:px-12 lg:px-24 bg-gray-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Decorative background elements */}
      <motion.div 
        className="absolute inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </motion.div>

      {/* Section header */}
      <div className="max-w-4xl mx-auto text-center mb-16 relative">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, ease: [0.2, 0.65, 0.3, 0.9] }}
          viewport={{ once: true }}
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 origin-center"
        />
        
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Creatives</span>
        </motion.h1>
        
        <motion.p
          className="text-lg text-gray-500"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        >
          Join thousands of satisfied users creating with our AI
        </motion.p>
      </div>

      {/* Testimonials grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.3
            }
          }
        }}
      >
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 relative overflow-hidden"
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: {
                  ease: [0.2, 0.65, 0.3, 0.9],
                  duration: 0.8
                }
              }
            }}
            whileHover={{ 
              y: -8,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)"
            }}
          >
            {/* Decorative quote icon */}
            <motion.div 
              className="absolute top-4 right-4 text-gray-100 text-7xl font-serif -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: true }}
            >
              "
            </motion.div>

            {/* User info */}
            <div className="flex items-center gap-4 mb-6">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="rounded-full w-14 h-14 object-cover border-2 border-white shadow-sm"
                />
                <motion.div 
                  className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    rotate: { repeat: Infinity, duration: 6, ease: "linear" },
                    scale: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                  }}
                >
                  <img src={assets.rating_star} alt="Star" className="w-3 h-3" />
                </motion.div>
              </motion.div>
              
              <div>
                <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex gap-1 mb-4">
              {Array(testimonial.stars).fill().map((_, i) => (
                <motion.img 
                  key={i}
                  src={assets.rating_star} 
                  alt="Star"
                  className="w-5 h-5"
                  whileHover={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 20, 0]
                  }}
                  transition={{ duration: 0.4 }}
                />
              ))}
            </div>

            {/* Testimonial text */}
            <motion.p
              className="text-gray-600 mb-6 relative z-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              viewport={{ once: true }}
            >
              {testimonial.text}
            </motion.p>

            {/* Decorative element */}
            <motion.div
              className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              viewport={{ once: true }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Stats section */}
      <motion.div 
        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 1
            }
          }
        }}
      >
        {[
          { value: "1K+", label: "Happy Users" },
          { value: "4.9", label: "Average Rating" },
          { value: "1K+", label: "Images Created" },
          { value: "24/7", label: "Support" }
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-100 shadow-sm text-center"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { type: "spring", stiffness: 100 }
              }
            }}
            whileHover={{ y: -5 }}
          >
            <motion.p 
              className="text-3xl font-bold text-gray-900 mb-2"
              animate={{ 
                textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 8px rgba(59,130,246,0.2)", "0 0 0px rgba(0,0,0,0)"]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                delay: i * 0.3
              }}
            >
              {stat.value}
            </motion.p>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Testimonials;