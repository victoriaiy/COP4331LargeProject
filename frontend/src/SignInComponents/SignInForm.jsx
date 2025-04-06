import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { IoIosCreate } from "react-icons/io";
import { FaSpinner, FaCheck, FaTimes } from "react-icons/fa";

const SignInForm = () => {
  const [formData, setFormData] = useState({ 
    username: "",
    password: "" 
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    form: ""
  });

  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({ ...touched, [name]: true });
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let error = "";
    
    switch (fieldName) {
      case "username":
        if (!value.trim()) error = "Username is required";
        break;
      case "password":
        if (!value.trim()) error = "Password is required";
        break;
      default:
        break;
    }
    
    setErrors(prev => ({ ...prev, [fieldName]: error }));
    return !error;
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};
    const newTouched = { ...touched };

    // Validate all fields and mark them as touched
    Object.keys(formData).forEach((field) => {
      newTouched[field] = true;
      if (!validateField(field, formData[field])) {
        isValid = false;
      }
    });

    setTouched(newTouched);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(prev => ({ ...prev, form: "" }));

    // First validate the form - this will mark all fields as touched
    if (!validateForm()) {
      // Add shake animation when validation fails
      document.querySelector('form').animate([
        { transform: 'translateX(0)' },
        { transform: 'translateX(-5px)' },
        { transform: 'translateX(5px)' },
        { transform: 'translateX(0)' }
      ], {
        duration: 300,
        iterations: 2
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post("https://backup-backend-j6zv.onrender.com/api/login", {
        username: formData.username,
        password: formData.password,
      });

      localStorage.setItem("userId", JSON.stringify(response.data.id));
      navigate("/Home");
    } catch (err) {
      setErrors(prev => ({ 
        ...prev, 
        form: err.response?.data?.message || "Login failed. Please try again." 
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const getInputClass = (fieldName) => {
    if (!touched[fieldName]) return "bg-gray-800";
    return errors[fieldName] 
      ? "bg-gray-800 border-2 border-red-500" 
      : "bg-gray-800 border-2 border-green-500";
  };

  return (
    <div className="flex items-center justify-center min-h-screen relative text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full min-w-[450px] p-8 bg-gray-900 rounded-2xl shadow-lg relative"
        style={{ minHeight: '200px' }}
      >
        {errors.form && <p className="text-red-400 text-center mb-4">{errors.form}</p>}
        
        <div 
          onClick={()=>navigate("/create-account")}
          className="w-10 h-10 bg-gray-900 shadow-amber-50 shadow-2xl rounded-full absolute top-0 right-0 -translate-y-4 translate-x-4 cursor-pointer flex justify-center items-center"
        >
          <IoIosCreate className="text-white text-2xl" />
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-8">Sign In</h2>
        
        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Username */}
          <div className="h-18">
            <motion.div className="relative">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500 ${getInputClass("username")}`}
                required
              />
              {touched.username && !errors.username && (
                <FaCheck className="absolute right-3 top-4 text-green-500" />
              )}
              {touched.username && errors.username && (
                <FaTimes className="absolute right-3 top-4 text-red-500" />
              )}
            </motion.div>
            <p className={`text-red-400 text-sm mt-1 transition-all duration-200 ${
              touched.username && errors.username ? 'opacity-100' : 'opacity-0'
            }`}>
              {errors.username}
            </p>
          </div>

          {/* Password */}
          <div className="h-18">
            <motion.div className="relative">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-3 rounded-xl text-white outline-none focus:ring-2 focus:ring-blue-500 ${getInputClass("password")}`}
                required
              />
              {touched.password && !errors.password && (
                <FaCheck className="absolute right-3 top-4 text-green-500" />
              )}
              {touched.password && errors.password && (
                <FaTimes className="absolute right-3 top-4 text-red-500" />
              )}
            </motion.div>
            <p className={`text-red-400 text-sm mt-1 transition-all duration-200 ${
              touched.password && errors.password ? 'opacity-100' : 'opacity-0'
            }`}>
              {errors.password}
            </p>
          </div>

          <a className="underline cursor-pointer text-sm">Forgot Password?</a>

          {/* Submit Button - Purple */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full p-3 mt-6 !bg-purple-600 hover:bg-purple-700 rounded-xl font-bold text-white shadow-md transition flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default SignInForm;