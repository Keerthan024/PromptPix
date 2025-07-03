import React from "react";
import { assets } from "../assets/assets";
import { motion, useScroll, useTransform } from "framer-motion";

const Description = () => {
  return (
    <section className="relative overflow-hidden py-24 px-6 md:px-12 lg:px-24 bg-white">
      {/* Decorative background elements */}
      <motion.div 
        className="absolute inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-blue-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0.2, y: 80 }}
        transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-7xl mx-auto"
      >
        {/* Section header with animated decoration */}
        <div className="text-center mb-16 relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] }}
            viewport={{ once: true }}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 origin-center"
          />
          
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">AI Images</span>
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-500"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            viewport={{ once: true }}
          >
            Turn your imagination into stunning visuals
          </motion.p>
        </div>

        {/* Content with parallax image effect */}
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            className="relative lg:w-1/2"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
            viewport={{ once: true }}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <motion.img
                src={assets.sample_img_1}
                alt="AI generated sample"
                className="w-full h-auto object-cover rounded-2xl"
                initial={{ scale: 1.1 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.2, ease: [0.2, 0.65, 0.3, 0.9] }}
                viewport={{ once: true }}
              />
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30 flex items-end p-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.p 
                  className="text-white font-medium text-lg"
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  "Abstract futuristic cityscape"
                </motion.p>
              </motion.div>
            </div>
            
            {/* Floating decorative elements */}
            <motion.div 
              className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 rounded-xl -z-10"
              initial={{ opacity: 0, y: 20, rotate: -15 }}
              whileInView={{ opacity: 0.3, y: 0, rotate: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              viewport={{ once: true }}
            />
            <motion.div 
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-purple-100 rounded-xl -z-10"
              initial={{ opacity: 0, y: 20, rotate: 15 }}
              whileInView={{ opacity: 0.3, y: 0, rotate: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              viewport={{ once: true }}
            />
          </motion.div>

          {/* Text content with staggered animations */}
          <motion.div 
            className="lg:w-1/2"
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
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-6"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              transition={{ 
                duration: 0.8,
                ease: [0.2, 0.65, 0.3, 0.9]
              }}
            >
              AI-Powered <span className="text-blue-500">Text-to-Image</span> Generation
            </motion.h2>
            
            <motion.div className="space-y-5">
              {[
                "Easily bring your ideas to life with our free AI image generator. Whether you need stunning visuals or unique imagery, our tool transforms your text into eye-catching images with just a few clicks.",
                "Simply type in a text prompt, and our cutting-edge AI will generate high-quality images in seconds. From product visuals to character designs and portraits, even concepts that don't yet exist can be visualized effortlessly.",
                "Powered by advanced AI technology, the creative possibilities are limitless! Imagine it, describe it, and watch it come to life instantly with unprecedented quality and detail."
              ].map((text, i) => (
                <motion.p
                  key={i}
                  className="text-gray-600 leading-relaxed"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  transition={{ 
                    duration: 0.6,
                    ease: [0.2, 0.65, 0.3, 0.9]
                  }}
                >
                  {text}
                </motion.p>
              ))}
            </motion.div>

            {/* Animated stats */}
            <motion.div 
              className="mt-10 grid grid-cols-2 gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 1
                  }
                }
              }}
            >
              {[
                { value: "10M+", label: "Images generated" },
                { value: "99%", label: "Satisfaction rate" },
                { value: "2s", label: "Average generation" },
                { value: "4.9/5", label: "User rating" }
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-100 shadow-sm"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: { type: "spring", stiffness: 100 }
                    }
                  }}
                  whileHover={{ y: -5 }}
                >
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Description;