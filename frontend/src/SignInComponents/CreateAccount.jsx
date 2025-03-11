import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(""); // For handling errors
  const [successMessage, setSuccessMessage] = useState(""); // For showing success
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   const  handleSubmit =  async (e) => {
    e.preventDefault();
    setError(""); // Clear errors
    setSuccessMessage("");

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      setError("❌ Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/auth/register", // Your backend route
        {
          name: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      setSuccessMessage("✅ Account created successfully! Check your email for verification.");
      setTimeout(() => navigate("/signin"), 3000); // Redirect after 3 sec
    } catch (err) {
      setError(err.response?.data?.message || "❌ Registration failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md p-6 bg-gray-900 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-800 text-white border-none outline-none focus:ring-2 focus:ring-blue-500"
          />

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

          {/* Confirm Password */}
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-gray-800 text-white border-none outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full p-3 mt-4 bg-blue-600 rounded-xl font-bold text-white shadow-md hover:bg-blue-700 transition"
          >
            Create Account
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateAccount;
