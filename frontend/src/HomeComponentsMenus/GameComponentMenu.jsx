import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gameMenuImage from "../assets/gameMenuImage.png";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logoForHabla+.png"

const GameComponentMenu = () => {
  const navigate = useNavigate()

  function navigateToGame(){
    window.location.href = "https://infinite-runner-seven.vercel.app/"
  }
 

  return (
    <div 
      onClick={()=>navigateToGame()}
    className="flex relative z-0 flex-col border-8 border-purple-700 items-center h-130 w-300 justify-center  shadow-purple-500/50 shadow-2xl max-w-screen mb-10 rounded-2xl overflow-hidden bg-black">
      {/* Background Image */}
      <img
        className="absolute h-full w-full object-cover opacity-60"
        src={gameMenuImage}
        alt="Menu Background"
      />

      {/* Title */}
      <motion.img

        src={logo}
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        className=" text-white text-6xl md:text-7xl font-extrabold tracking-wide drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]"
      >
      </motion.img>

      {/* Press Start Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: 1.5,
          ease: "easeInOut",
        }}
        className="mt-10 text-purple-300 text-2xl md:text-3xl font-mono tracking-widest"
      >
        CLICK ANYWHERE TO PLAY
      </motion.div>

      {/* Optional glow ring or decoration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute rounded-full border-[2px] border-purple-600 w-[600px] h-[600px] blur-2xl opacity-20"
      />
    </div>
  );
};

export default GameComponentMenu;
