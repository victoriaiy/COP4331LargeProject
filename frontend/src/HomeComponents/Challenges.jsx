import React from "react";
import { motion } from "framer-motion";


const Challenges = () =>{


    return(
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
    )
}

export default Challenges