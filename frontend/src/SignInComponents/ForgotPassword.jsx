import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaSignInAlt } from "react-icons/fa";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFeedback("");

    if (!email.trim().includes("@")) {
      setFeedback("❌ Please enter a valid email address.");
      return;
    }

    try {
      await axios.post("https://habla-plus.xyz/api/resetpasswordemail", { email });
      setFeedback("✅ Reset email sent! Check your inbox.");
    } catch (err) {
      setFeedback(err.response?.data?.error || "❌ Failed to send reset email.");
    }
  };

  return (
    <div className="flex items-center justify-center rounded-2xl bg-gray-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md p-6 bg-gray-800 rounded-2xl shadow-lg relative"
      >
        {/* Back to sign in */}
        <div 
          onClick={() => navigate("/signin")}
          className="w-10 h-10 bg-gray-900 shadow-amber-50 shadow-2xl rounded-full absolute top-0 right-0 -translate-y-4 translate-x-4 cursor-pointer p-2"
        >
          <FaSignInAlt className="text-white text-2xl" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>

        {feedback && (
          <p className={`text-center font-semibold mb-4 ${feedback.includes("❌") ? "text-red-400" : "text-green-400"}`}>
            {feedback}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input
            whileFocus={{ scale: 1.05 }}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-xl bg-gray-700 text-white placeholder-white border-none outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full p-3 mt-4 rounded-xl font-bold text-white shadow-md  transition"
          >
            Send Reset Email
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordForm;
