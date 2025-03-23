import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { title: "Sports", color: "#FF5733" },
  { title: "Everyday Items", color: "#33A1FF" },
  { title: "All Words", color: "#10B981" },
  { title: "Food", color: "#FFC300" },
];

const LearnComponentMenu = () => {
  const [index, setIndex] = useState(0);

  const swipe = (newIndex) => {
    setIndex(newIndex);
  };

  return (
    <div className="flex flex-col items-center justify-center h-130 w-300 shadow-2xl max-w-screen max-h-screen mb-10 bg-gray-500 rounded-lg"
    >
    {/* Background Video */}





    <h1>Learn Mode </h1>
      {/* Swipable Card */}
      <div className="relative w-65 h-30 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={categories[index].title}
            className="absolute w-65 h-30 rounded-lg flex items-center justify-center text-white text-2xl font-bold cursor-pointer"
            style={{ backgroundColor: categories[index].color }}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(event, info) => {
              if (info.offset.x < -50) swipe((index + 1) % categories.length); // Swipe left
              if (info.offset.x > 50) swipe((index - 1 + categories.length) % categories.length); // Swipe right
            }}
          >
            {categories[index].title}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      <div className="mt-6 flex gap-2">
        {categories.map((_, i) => (
          <motion.div
            key={i}
            className="w-4 h-4 rounded-full cursor-pointer"
            style={{
              backgroundColor: i === index ? "#333" : "#ccc",
              transition: "background-color 0.3s",
            }}
            onClick={() => swipe(i)}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </div>
  );
};

export default LearnComponentMenu;
