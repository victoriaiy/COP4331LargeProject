import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Placeholder API call (replace with actual authentication logic)
    console.log("Signing in with:", formData);

    // Navigate to home on successful login
    navigate("/Home");
  };

  return (
    <div className="flex items-center justify-center min-h-screen text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md p-6 bg-gray-900 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-800 text-white border-none outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password */}
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-800 text-white border-none outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full p-3 mt-4 bg-green-600 rounded-xl font-bold text-white shadow-md hover:bg-green-700 transition"
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default SignInForm;
