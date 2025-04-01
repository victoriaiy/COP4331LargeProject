import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { IoIosCreate } from "react-icons/io";


const SignInForm = () => {
  const [formData, setFormData] = useState({ username: "",password: ""});
  const [error, setError] = useState("");
  //navigate to home if success
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state

    try {
      const response = await axios.post("https://backup-backend-j6zv.onrender.com/api/login", {
        username: formData.username,
        password: formData.password,
      });

      //set the storage that 
      localStorage.setItem("userId", JSON.stringify(response.data.id));
      // Redirect to Home after successful login
      navigate("/Home");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md p-6 bg-gray-900 rounded-2xl shadow-lg relative"
      >
        {error && <p className="text-red-400 text-center">{error}</p>}
        <div 
          onClick={()=>navigate("/create-account")}
        className="w-10 h-10 bg-gray-900 shadow-amber-50 shadow-2xl rounded-full absolute top-0 right-0 -translate-y-4 translate-x-4 cursor-pointer flex justify-center items-center ">
          <IoIosCreate className="text-white text-2xl" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 rounded-xl  !bg-gray-800 !text-white border-none outline-none focus:ring-2 focus:ring-blue-500"
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
          <a className="!underline pointer ">Forgot Password?</a>
          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full p-3 mt-4 !bg-purple-500 rounded-xl font-bold text-white shadow-md hover:bg-green-700 transition"
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default SignInForm;
