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
    console.log(id)
    if (id) {
      axios
        .post("https://backup-backend-j6zv.onrender.com/api/userwords", {
          userId: id
        })
        .then((res) => {
          setLearnedWords(res.data.learnedWords || []);
          setVocabLists(res.data.vocabLists || []);
          console.log(res)
        })
        .catch((err) => {
          console.error(" Failed to fetch user words:", err);
        });
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
        className="w-10 h-10 absolute !bg-black !p-3 left-2 top-2"
        onClick={()=>navigate("/Home")}
      ><FaHome />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white max-h-80 overflow-y-auto shadow-md rounded-xl p-4 "
      >
        <h2 className="text-xl font-semibold text-black mb-2">Vocab Lists</h2>
        {vocabLists.length > 0 ? (
          <ul className="list-disc ml-6  space-y-1">



          {vocabLists.map((list, index) => (
          <li key={list.VocabListId || index}>
            <div className="font-bold  text-black">{list.Category}</div>
            <ul className="ml-4 text-black list-square">
              {list.Words.map((word, idx) => (
                <li className="text-black" key={word.WordId || idx}>
                  {console.log(word.WordId)}
                  <strong>{word.English}</strong> – <em>{word.Spanish}</em>
                </li>))}
                </ul>
            </li>
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
        <h2 className="text-xl text-black font-semibold mb-2">Learned Words</h2>
        {learnedWords.length > 0 ? (
          <ul className="list-disc ml-6 text-black decoration-0 space-y-1">
          {learnedWords.map((word, index) => (
            <li key={word.WordId || index}>
              <strong>{word.English}</strong> – <em>{word.Spanish}</em> ({word.Topic})
            </li>
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
