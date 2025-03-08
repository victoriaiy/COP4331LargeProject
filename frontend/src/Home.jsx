import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [headerOpen, setHeaderOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setHeaderOpen(true); // Open header after page loads
    }, 500);
  }, []);

  return (
    <div className="min-w-screen min-h-screen bg-gray-400 text-white-300 flex flex-col items-center">
      
      {/* Slim White Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-full bg-white shadow-md fixed top-0 left-0 right-0 h-14 flex items-center justify-center"
      >
        <div className="w-full max-w-6xl flex justify-between items-center px-6">
          <button
            onClick={() => navigate("/Home")}
            className="text-sm font-semibold text-white-300 hover:text-blue-500 transition"
          >
            Home
          </button>

          <div className="flex space-x-8">
            <button className="text-sm text-white-300 hover:text-blue-500 transition">Game</button>
            <button className="text-sm text-white-300 hover:text-blue-500 transition">User</button>
          </div>
        </div>
      </motion.div>

    </div>
  );
};

export default Home;
