import React, { useContext, useState } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const BuyCredit = () => {
  const { user, backendUrl, loadCreditData, token, setShowLogin } = useContext(AppContext);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "AI Image Credits",
      description: "Purchase AI generation credits",
      order_id: order.id,
      receipt: order.receipt,
      theme: {
        color: "#6366f1"
      },
      handler: async (response) => {
        try {
          setIsProcessing(true);
          const { data } = await axios.post(
            backendUrl + "/api/user/verify-razor",
            response,
            { headers: { token } }
          );
          if (data.success) {
            await loadCreditData();
            toast.success('Credits added successfully!');
            navigate("/");
          }
        } catch (error) {
          toast.error(error.response?.data?.message || "Payment verification failed");
        } finally {
          setIsProcessing(false);
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const handlePayment = async (planId) => {
    if (!user) {
      setShowLogin(true);
      return;
    }

    try {
      setIsProcessing(true);
      const { data } = await axios.post(
        backendUrl + "/api/user/pay-razor",
        { planId },
        { headers: { token } }
      );

      if (data.success) {
        await initPay(data.order);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment initialization failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block bg-indigo-100 text-indigo-600 px-4 py-1 rounded-full text-sm font-medium mb-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Flexible Pricing
          </motion.span>
          <motion.h1
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Choose Your Plan
          </motion.h1>
          <motion.p
            className="text-lg text-gray-500 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Get more creative freedom with additional AI generation credits
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, staggerChildren: 0.1 }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`relative bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 ${
                selectedPlan === plan.id ? "ring-2 ring-indigo-500 scale-[1.02]" : "hover:shadow-md"
              }`}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <motion.div
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <img src={assets.logo_icon} alt="" className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900">{plan.id}</h3>
                </div>

                <p className="text-gray-500 mb-6">{plan.desc}</p>

                <div className="mb-8">
                  <span className="text-4xl font-bold text-gray-900">₹{plan.price}</span>
                  <span className="text-gray-500"> / {plan.credits} credits</span>
                </div>

                <motion.button
                  className={`w-full py-3 px-6 rounded-lg font-medium ${
                    selectedPlan === plan.id
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  } transition-all`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePayment(plan.id);
                  }}
                  disabled={isProcessing}
                >
                  {isProcessing && selectedPlan === plan.id ? (
                    <div className="flex items-center justify-center gap-2">
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Processing...
                    </div>
                  ) : user ? (
                    "Get Started"
                  ) : (
                    "Sign Up to Purchase"
                  )}
                </motion.button>
              </div>

              {selectedPlan === plan.id && (
                <motion.div
                  className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4 }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <p className="text-gray-500 mb-4">Need help choosing a plan?</p>
          <button className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
            Contact our support team
          </button>
        </motion.div>
      </div>

      {/* Processing Overlay */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white p-8 rounded-xl max-w-md text-center">
              <motion.div
                className="w-16 h-16 mx-auto mb-6 border-4 border-indigo-500 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Processing Your Payment
              </h3>
              <p className="text-gray-500">
                Please wait while we complete your transaction...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default BuyCredit;