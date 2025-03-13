import { motion } from "framer-motion";

const ArcadeTitle = () => {
  return (
    <motion.h1
      className="text-purple-500 text-5xl font-bold cursor-pointer absolute z-10"
      style={{
        textShadow: "0px 0px 10px rgba(128,0,128,0.8)", // Neon glow effect
        fontFamily: "'Orbitron', sans-serif", // Arcade-style font
      }}
      animate={{
        opacity: [1, 0, 1], // Flashing effect
      }}
      transition={{
        duration: 0.8, // Speed of flashing
        repeat: Infinity, // Loops forever
      }}
    >
      START GAME
    </motion.h1>
  );
};

export default ArcadeTitle;
