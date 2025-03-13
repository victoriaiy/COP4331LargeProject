import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";


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
          <motion.div
            initial = {{scale: 1}}
            whileHover={{
              scale: 1.2,
              transition: {ease: "easeInOut"}
            }}
            
          >
          <CgProfile className="cursor-pointer text-black text-5xl"
            onClick={()=>navigate("/Profile")}

          />
          </motion.div>

        </div>
      </motion.div>


    )
}
export default Header