import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaSignInAlt } from "react-icons/fa";


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
      const response = await axios.post("https://backup-backend-j6zv.onrender.com/api/signup", // Your backend route
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }
      );

      setSuccessMessage("✅ Account created successfully! Check your email for verification.");
      localStorage.setItem("id", response.id);

      setTimeout(() => navigate("/signin"), 1000); // Redirect after 3 sec
    } catch (err) {
      setError(err.response?.data?.message || "❌ Registration failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md p-6 bg-gray-900 rounded-2xl relative shadow-lg"
      >
      {error && <p className="text-red-400 text-center">{error}</p>}
      {successMessage  && <p className="text-green-400 text-center">{successMessage}</p>}
        <div 
          onClick={()=>navigate("/SignIn")}
        className="w-10 h-10 bg-gray-900 shadow-amber-50 shadow-2xl rounded-full absolute top-0 right-0 -translate-y-4 translate-x-4 cursor-pointer p-2">
          <FaSignInAlt className="text-white text-2xl" />
        </div>
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
            className="w-full p-3 mt-4 !bg-purple-500 rounded-xl font-bold text-white shadow-md hover:bg-blue-700 transition"
          >
            Create Account
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateAccount;
