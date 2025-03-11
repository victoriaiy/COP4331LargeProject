import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../Header";

const VocabChallengeComponent = () => {
  const vocabList = [
    { spanish: "Perro", english: "Dog" },
    { spanish: "Gato", english: "Cat" },
    { spanish: "Casa", english: "House" },
    { spanish: "Comida", english: "Food" },
    { spanish: "Rojo", english: "Red" },
    { spanish: "Azul", english: "Blue" },
    { spanish: "Escuela", english: "School" },
    { spanish: "Libro", english: "Book" },
    { spanish: "Feliz", english: "Happy" },
    { spanish: "Triste", english: "Sad" },
  ];

  const [currentWord, setCurrentWord] = useState(null);
  const [options, setOptions] = useState([]);
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const maxGuesses = 20;

  useEffect(() => {
    pickNewWord();
  }, []);

  const pickNewWord = () => {
    const randomWord = vocabList[Math.floor(Math.random() * vocabList.length)];
    const correctAnswer = randomWord.english;
    const wrongAnswers = vocabList
      .filter((w) => w.english !== correctAnswer)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map((w) => w.english);

    setCurrentWord(randomWord);
    setOptions([...wrongAnswers, correctAnswer].sort(() => 0.5 - Math.random()));
  };

  const handleChoice = (choice) => {
    if (choice === currentWord.english) {
      alert("✅ Correct! Great job!");
      pickNewWord();
    } else {
      setWrongGuesses((prev) => prev + 1);
      if (wrongGuesses + 1 >= maxGuesses) {
        alert("❌ Game Over! You reached the max number of wrong guesses!");
        resetGame();
      }
    }
  };

  const resetGame = () => {
    setWrongGuesses(0);
    pickNewWord();
  };

  return (
    <div className="flex flex-col  w-screen items-center justify-center min-h-screen bg-gray-100 p-5">
     <Header/>
      <motion.div
        className="mb-5 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-blue-600">Vocabulary Challenge</h1>
        <p className="text-gray-600 mt-2">Guess the correct English word for the Spanish word!</p>
      </motion.div>

      {currentWord && (
        <motion.div
          className="bg-white shadow-md rounded-lg p-5 text-center w-96"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-800">{currentWord.spanish}</h2>
        </motion.div>
      )}

      <div className="mt-5 grid grid-cols-2 gap-3">
        {options.map((option, index) => (
          <motion.button
            key={index}
            onClick={() => handleChoice(option)}
            className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md shadow-md hover:bg-blue-600 transition-all"
            whileHover={{ scale: 1.05 }}
          >
            {option}
          </motion.button>
        ))}
      </div>

      <div className="mt-5">
        <p className="text-gray-700">❌ Wrong Guesses: {wrongGuesses}/{maxGuesses}</p>
        <button
          onClick={resetGame}
          className="mt-3 px-4 py-2 bg-red-500 text-white font-bold rounded-md shadow-md hover:bg-red-600 transition-all"
        >
          Restart Game
        </button>
      </div>
    </div>
  );
};

export default VocabChallengeComponent;
