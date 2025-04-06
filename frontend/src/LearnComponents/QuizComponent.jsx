import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useBadge } from "../BadgesMetaData/BadgeContent";


const QuizComponent = ({ userId, category }) => {
  const [questions, setQuestions] = useState([]);
  const [learnedWords, setLearnedWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [stats, setStats] = useState({});
  const [showLearnedPopup, setShowLearnedPopup] = useState(false);
  const [learnedWordName, setLearnedWordName] = useState("");
  const {unlockBadge} = useBadge()

    console.log(category)
  useEffect(() => {
    axios.post("https://backup-backend-j6zv.onrender.com/api/userwords", { userId }).then((res) => {
      const allLists = res.data.vocabLists || [];
      const learned = res.data.learnedWords || [];

      // Combine all vocab list words for "All Words"
      let combinedWords = [];

      if (category.toLowerCase() === "all") {
        combinedWords = allLists.flatMap((list) => list.Words || []);
      } else {
        const list = allLists.find((l) => l.Category.toLowerCase() === category.toLowerCase());
        combinedWords = list ? list.Words : [];
      }

      const notLearned = combinedWords.filter(
        (word) => !learned.some((lw) => lw.WordId === word.WordId)
      );

      setLearnedWords(learned);
      setQuestions(shuffle(notLearned));
    });
  }, [category, userId]);

  const currentWord = questions[currentIndex];

  const generateOptions = () => {
    if (!currentWord) return [];

    const all = [...questions].filter((w) => w.WordId !== currentWord.WordId);
    const randoms = shuffle(all).slice(0, 3);
    const options = shuffle([currentWord, ...randoms]);
    return options;
  };

  const handleAnswer = (selected) => {
    const wordId = currentWord.WordId;
    const isCorrect = selected === currentWord.English;

    setFeedback(
      isCorrect ? "✅ Correct!" : `❌ Incorrect. The correct answer is: ${currentWord.English}`
    );

    setStats((prev) => {
      const prevStat = prev[wordId] || { correct: 0, incorrect: 0 };
      const updated = {
        ...prev,
        [wordId]: {
          correct: prevStat.correct + (isCorrect ? 1 : 0),
          incorrect: prevStat.incorrect + (!isCorrect ? 1 : 0),
        },
      };

      // Learned word logic
      if (updated[wordId].correct >= 3 && updated[wordId].incorrect <= 2) {
        axios.post("https://backup-backend-j6zv.onrender.com/api/addlearnedword", {
          userId,
          word: currentWord,
        });
        unlockBadge("learnWord");
        axios.post("https://backup-backend-j6zv.onrender.com/api/trackwordstats", {
          userId,
          wordId,
          correct: updated[wordId].correct,
          incorrect: updated[wordId].incorrect,
        });

        setLearnedWordName(currentWord.Spanish);
        setShowLearnedPopup(true);
        setTimeout(() => setShowLearnedPopup(false), 2500);
      }

      return updated;
    });

    setTimeout(() => {
      setFeedback("");
      setCurrentIndex((prev) => (prev + 1) % questions.length);
    }, 1200);
  };

  return (
    <div className="relative min-w-screen min-h-screen flex flex-col justify-center items-center p-8 bg-gray-950 text-white">
      <div className="max-w-xl w-full bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700">
        {currentWord ? (
          <>
            <h2 className="text-2xl text-center font-bold mb-6">
              Translate:{" "}
              <span className="text-yellow-300">{currentWord.Spanish}</span>
            </h2>

            <div className="grid grid-cols-2 gap-4">
              {generateOptions().map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(opt.English)}
                  className="bg-purple-600 hover:bg-green-500 text-white font-semibold py-3 rounded-xl shadow-md"
                >
                  {opt.English}
                </motion.button>
              ))}
            </div>

            {feedback && (
              <p className="mt-6 text-center font-semibold text-lg">{feedback}</p>
            )}
          </>
        ) : (
          <p className="text-center text-lg">🎉 You've completed all available questions!</p>
        )}
      </div>

      {/* Notification for Learned Word */}
      <AnimatePresence>
        {showLearnedPopup && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="absolute top-30 right-6 px-5 py-3 bg-green-600 text-white rounded-xl shadow-lg"
          >
            ✅ Word <strong>{learnedWordName}</strong> marked as learned!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Shuffle helper
function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export default QuizComponent;
