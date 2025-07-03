import React, { useContext, useState, useRef } from "react";
import { assets } from "../assets/assets";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { saveAs } from 'file-saver';

const Result = () => {
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [progress, setProgress] = useState(0);
  const { generateImage, credit } = useContext(AppContext);
  const inputRef = useRef(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate progress 
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(interval);
          return prev;
        }
        return prev + 10;
      });
    }, 300);

    try {
      const imageUrl = await generateImage(prompt);
      if (imageUrl) {
        setGeneratedImage(imageUrl);
      }
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => setIsGenerating(false), 500);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      saveAs(generatedImage, `ai-art-${Date.now()}.png`);
    }
  };

  const handleNewGeneration = () => {
    setGeneratedImage(null);
    setPrompt("");
    inputRef.current?.focus();
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center px-4 py-12">
      <motion.div 
        className="w-full max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            AI Image Generator
          </h1>
          <p className="text-gray-500">
            {generatedImage 
              ? "Your creation is ready!" 
              : "Transform your ideas into stunning visuals"}
          </p>
        </motion.div>

        {/* Image Display */}
        <div className="relative mb-10 flex justify-center">
          <AnimatePresence mode="wait">
            {isGenerating ? (
              <motion.div
                key="loading"
                className="w-full max-w-md aspect-square bg-gray-100 rounded-2xl flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center space-y-4">
                  <motion.div
                    className="w-16 h-16 mx-auto border-4 border-blue-500 border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <p className="text-gray-700">Generating your image...</p>
                  <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                      initial={{ width: "0%" }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>
              </motion.div>
            ) : generatedImage ? (
              <motion.div
                key="image"
                className="relative group"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <img 
                  src={generatedImage} 
                  alt="AI generated artwork" 
                  className="max-w-full h-auto rounded-2xl shadow-xl border border-gray-100"
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6"
                  initial={{ opacity: 0 }}
                >
                  <p className="text-white font-medium">{prompt}</p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                className="w-full max-w-md aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-200"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-center p-6">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <img src={assets.wand_icon} alt="" className="w-16 h-16 mx-auto mb-4 opacity-60" />
                  </motion.div>
                  <p className="text-gray-500">Your generated image will appear here</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Form */}
        <AnimatePresence mode="wait">
          {!generatedImage ? (
            <motion.form
              key="input-form"
              onSubmit={handleGenerate}
              className="w-full max-w-xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe what you want to generate..."
                  className="w-full px-6 py-4 pr-32 rounded-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all shadow-sm"
                  disabled={isGenerating}
                />
                <motion.button
                  type="submit"
                  disabled={!prompt.trim() || isGenerating}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 rounded-full font-medium ${
                    !prompt.trim() || isGenerating
                      ? "bg-gray-300 text-gray-500"
                      : "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md hover:shadow-lg"
                  } transition-all`}
                  whileHover={!prompt.trim() || isGenerating ? {} : { y: -2, scale: 1.02 }}
                  whileTap={!prompt.trim() || isGenerating ? {} : { scale: 0.98 }}
                >
                  {isGenerating ? (
                    <span className="flex items-center gap-2">
                      <motion.span
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Generating
                    </span>
                  ) : (
                    `Generate (${credit} left)`
                  )}
                </motion.button>
              </div>
              <p className="text-sm text-gray-500 mt-3 text-center">
                Be as descriptive as possible for best results
              </p>
            </motion.form>
          ) : (
            <motion.div
              key="action-buttons"
              className="flex flex-col sm:flex-row gap-4 justify-center mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                onClick={handleNewGeneration}
                className="px-8 py-3 rounded-full border-2 border-gray-900 text-gray-900 font-medium hover:bg-gray-50 transition-all"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Generate Another
              </motion.button>
              <motion.button
                onClick={handleDownload}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-md hover:shadow-lg transition-all"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Download Image
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Result;