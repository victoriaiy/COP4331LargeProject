import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const Header = () =>{
    const [headerOpen, setHeaderOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
          setHeaderOpen(true);
        }, 500);
      }, []);
    
    return(
        <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-full bg-white shadow-md fixed top-0 left-0 right-0 h-14 flex items-center justify-center"
      >
        <div className="w-full max-w-6xl flex justify-between items-center px-6">
          <button
            onClick={() => navigate("/Home")}
            className="text-sm font-semibold text-white hover:text-blue-500 transition"
          >
            Home
          </button>

          <div className="flex space-x-8">
            <button className="text-sm  text-white hover:text-blue-500 transition">Game</button>
            <button 
            onClick={()=>navigate("/Profile")}
            className="text-sm text-white hover:text-blue-500 transition">Profile</button>
          </div>
        </div>
      </motion.div>


    )
}
export default Header