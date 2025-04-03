import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useBadge } from "./BadgesMetaData/BadgeContent";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function SettingsPage() {
  const [userId, setUserId] = useState("");
  const [vocabLists, setVocabLists] = useState([]);
  const [learnedWords, setLearnedWords] = useState([]);
  const navigate = useNavigate()
  const {unlockBadge} = useBadge()
  useEffect(() => {
    unlockBadge("openedSettings")
    const id = JSON.parse(localStorage.getItem("userId"));
    setUserId(id);

    if (id) {
      axios.get("https://backup-backend-j6zv.onrender.com/api/getvocablists", {
        userId : userId
      })
        .then((res) => res.json())
        .then((data) => setVocabLists(data.vocabLists || []));

      axios.get("https://backup-backend-j6zv.onrender.com/api/learnedwords", {
        userId : userId
      })
        .then((res) => res.json())
        .then((data) => setLearnedWords(data.learnedWords || []));
    }
   
  }, []);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure you want to delete your account? This cannot be undone.");
    if (!confirmed) return;
  
    console.log("Deleting user:", userId);
  
    try {
      const res = await axios.delete("https://backup-backend-j6zv.onrender.com/api/delete", {
        data: { userId: userId }
      });
  
      if (res.status === 200) {
        alert("Account deleted.");
        localStorage.removeItem("userId");
        window.location.href = "/";
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete account.");
    }
  };

  return (
    <div className="max-w-xl min-w-2xl bg-gray-300 rounded-2xl mx-auto p-6  relative space-y-6">
      <h1 className="text-3xl text-purple-400 font-bold text-center">Settings</h1>
      <button
        className="w-10 h-10 absolute !p-3 left-2 top-2"
        onClick={()=>navigate("/Home")}
      ><FaHome />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white shadow-md rounded-xl p-4"
      >
        <h2 className="text-xl font-semibold mb-2">Vocab Lists</h2>
        {vocabLists.length > 0 ? (
          <ul className="list-disc ml-6 space-y-1">
            {vocabLists.map((list, i) => (
              <li key={i}>{list}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You don't have any vocab lists yet.</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="bg-white shadow-md rounded-xl p-4"
      >
        <h2 className="text-xl font-semibold mb-2">Learned Words</h2>
        {learnedWords.length > 0 ? (
          <ul className="list-disc ml-6 space-y-1">
            {learnedWords.map((word, i) => (
              <li key={i}>{word}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">You haven't learned any words yet.</p>
        )}
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleDeleteAccount}
        className="!bg-red-500 text-white font-semibold px-6 py-2 rounded-xl shadow-md !hover:bg-red-600 transition"
      >
        Delete Account
      </motion.button>
    </div>
  );
}
