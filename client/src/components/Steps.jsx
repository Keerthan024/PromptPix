import React from "react";
import { stepsData } from "../assets/assets";
import { motion, useScroll, useTransform } from "framer-motion";

const Steps = () => {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      {/* Decorative background elements */}
      <motion.div 
        className="absolute inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span
            className="inline-block bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-medium text-gray-600 mb-4 border border-gray-200 shadow-xs"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Simple Process
          </motion.span>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">Works</span>
          </motion.h1>
          <motion.p
            className="text-lg text-gray-500 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Transform your ideas into stunning visuals in just a few simple steps
          </motion.p>
        </motion.div>

        {/* Steps timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-8 top-0 h-full w-0.5 bg-gradient-to-b from-transparent via-gray-300 to-transparent md:left-1/2 md:-translate-x-1/2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: [0.16, 0.77, 0.47, 0.97] }}
          />

          <div className="space-y-12 md:space-y-24">
            {stepsData.map((step, index) => (
              <motion.div
                key={index}
                className="relative flex flex-col md:flex-row items-center gap-8"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                {/* Step number */}
                <motion.div
                  className="flex-shrink-0 w-16 h-16 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shadow-sm relative z-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 hover:opacity-100 transition-opacity duration-300"
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { repeat: Infinity, duration: 8, ease: "linear" },
                      scale: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                    }}
                  />
                  <span className="text-2xl font-bold text-gray-700">{index + 1}</span>
                </motion.div>

                {/* Step content */}
                <motion.div 
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-100 shadow-sm flex-1 w-full"
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      className="flex-shrink-0 p-2 bg-blue-50 rounded-lg"
                      whileHover={{ rotate: 15 }}
                    >
                      <img src={step.icon} alt="" className="w-8 h-8" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.p
            className="text-gray-500 mb-6"
            animate={{ 
              textShadow: ["0 0 0px rgba(0,0,0,0)", "0 0 8px rgba(59,130,246,0.2)", "0 0 0px rgba(0,0,0,0)"]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity
            }}
          >
            Ready to create something amazing?
          </motion.p>
          <motion.button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-full font-medium shadow-md hover:shadow-lg transition-all"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started Now
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Steps;