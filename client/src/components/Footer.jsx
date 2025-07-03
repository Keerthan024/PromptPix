import React from 'react';
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const Footer = () => {
  const socialIcons = [
    { icon: assets.facebook_icon, name: "Facebook" },
    { icon: assets.instagram_icon, name: "Instagram" },
    { icon: assets.twitter_icon, name: "Twitter" },
    { icon: assets.linkedin_icon, name: "LinkedIn" }
  ];

  const footerLinks = [
    { title: "Privacy Policy", url: "#" },
    { title: "Terms of Service", url: "#" },
    { title: "Contact Us", url: "#" },
    { title: "Careers", url: "#" }
  ];

  return (
    <motion.footer 
      className="bg-gray-50 border-t border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="space-y-4"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={assets.logo} alt="PromptPix" className="w-40" />
            </motion.div>
            <p className="text-gray-500 text-sm max-w-xs">
              Transforming your imagination into stunning visuals with AI-powered technology.
            </p>
            
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              {socialIcons.map((social, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.4 }}
                >
                  <img 
                    src={social.icon} 
                    alt={social.name} 
                    className="w-5 h-5 object-contain" 
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 gap-8"
          >
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.slice(0, 2).map((link, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a href={link.url} className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                      {link.title}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                {footerLinks.slice(2).map((link, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a href={link.url} className="text-gray-500 hover:text-gray-900 text-sm transition-colors">
                      {link.title}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Newsletter Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              Subscribe to our newsletter
            </h3>
            <p className="text-gray-500 text-sm">
              Get the latest updates and creative inspiration delivered to your inbox.
            </p>
            <form className="mt-4 flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <motion.button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 text-sm font-medium rounded-r-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} PromptPix. All rights reserved.
          </p>
          <div className="flex gap-6">
            <motion.a 
              href="#" 
              className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
              whileHover={{ y: -2 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a 
              href="#" 
              className="text-gray-500 hover:text-gray-900 text-sm transition-colors"
              whileHover={{ y: -2 }}
            >
              Terms of Service
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;