import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [headerOpen, setHeaderOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [translation, setTranslation] = useState(""); // Stores translated word
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setHeaderOpen(true);
    }, 500);
  }, []);

  // Fake translation function (Replace this with an API call like Google Translate)
  const handleTranslate = () => {
    if (search.toLowerCase() === "hello") {
      setTranslation("Hola");
    } else if (search.toLowerCase() === "thank you") {
      setTranslation("Gracias");
    } else {
      setTranslation("Translation not found");
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-300 text-gray-900 flex flex-col items-center pt-20">
      
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
            className="text-sm font-semibold text-white hover:text-blue-500 transition"
          >
            Home
          </button>

          <div className="flex space-x-8">
            <button className="text-sm  text-white hover:text-blue-500 transition">Game</button>
            <button className="text-sm text-white hover:text-blue-500 transition">User</button>
          </div>
        </div>
      </motion.div>

      {/* Search Bar */}
      <div className="mt-10 w-full max-w-lg px-6">
        <h2 className="text-xl font-bold text-center mb-4">Translate a Word</h2>
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter a word..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-400 focus:outline-none focus:border-blue-500"
          />
          <button
            onClick={handleTranslate}
            className="px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            Translate
          </button>
        </div>
        {translation && (
          <p className="mt-3 text-lg text-center font-medium">{translation}</p>
        )}
      </div>

      {/* Challenges Section */}
      <div className="w-full max-w-4xl mt-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-6">Choose a Challenge</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Vocabulary Challenge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition"
          >
            <h3 className="text-lg font-semibold text-gray-900">Vocabulary Challenge</h3>
            <p className="text-gray-600 mt-2">Test your knowledge of Spanish words.</p>
          </motion.div>

          {/* Listening Practice */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition"
          >
            <h3 className="text-lg font-semibold text-gray-900">Listening Practice</h3>
            <p className="text-gray-600 mt-2">Improve comprehension with native audio.</p>
          </motion.div>

          {/* Grammar Exercise */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition"
          >
            <h3 className="text-lg font-semibold text-gray-900">Grammar Exercise</h3>
            <p className="text-gray-600 mt-2">Master Spanish grammar rules.</p>
          </motion.div>

          {/* Speaking Challenge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition"
          >
            <h3 className="text-lg font-semibold text-gray-900">Speaking Challenge</h3>
            <p className="text-gray-600 mt-2">Practice your pronunciation.</p>
          </motion.div>

          {/* Flashcards */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition"
          >
            <h3 className="text-lg font-semibold text-gray-900">Flashcards</h3>
            <p className="text-gray-600 mt-2">Memorize key vocabulary.</p>
          </motion.div>

          {/* Spanish Culture */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-lg cursor-pointer hover:shadow-2xl transition"
          >
            <h3 className="text-lg font-semibold text-gray-900">Spanish Culture</h3>
            <p className="text-gray-600 mt-2">Learn about Spanish traditions.</p>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Home;
