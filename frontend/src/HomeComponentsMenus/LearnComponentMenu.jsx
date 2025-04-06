import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const categories = [
  { title: "Greetings", color: "from-green-400 to-emerald-600" },
  { title: "Food", color: "from-yellow-400 to-amber-500" },
  { title: "Travel", color: "from-blue-400 to-indigo-600" },
  { title: "All Words", color: "from-purple-400 to-fuchsia-600" },
  { title: "+ Add Vocab List", color: "from-white to-gray-200", textColor: "text-black" },
];

const LearnComponentMenu = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  const swipe = (newIndex) => {
    setIndex(newIndex);
  };

  const handleCardClick = (category) => {
    if (category === "+ Add Vocab List") {
      navigate("/add-vocab");
    } else {
      const route = category === "All Words" ? "/learn/all" : `/learn/${category.toLowerCase()}`;
      navigate(route);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[32rem] w-300 shadow-2xl mb-10 bg-gray-800 rounded-3xl overflow-hidden border-4 border-gray-700">
      <h1 className="text-3xl font-bold text-white mb-6 mt-4">Learn Mode</h1>

      {/* Swipable Card */}
      <div className="relative w-200 h-[20rem] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={categories[index].title}
            className={`absolute w-full h-full rounded-2xl text-7xl flex items-center justify-center  font-bold cursor-pointer shadow-lg bg-gradient-to-br ${categories[index].color} ${
              categories[index].textColor || "text-white"
            }`}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(event, info) => {
              if (info.offset.x < -50) swipe((index + 1) % categories.length);
              if (info.offset.x > 50) swipe((index - 1 + categories.length) % categories.length);
            }}
            onClick={() => handleCardClick(categories[index].title)}
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
            className="w-3 h-3 rounded-full cursor-pointer"
            style={{
              backgroundColor: i === index ? "#ffffff" : "#666",
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
