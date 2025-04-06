import { useState } from "react";
import axios from "axios";
import { useBadge } from "../BadgesMetaData/BadgeContent";

const AddVocabListForm = ({ userId }) => {
  const [category, setCategory] = useState("");
  const [words, setWords] = useState([{ English: "", Spanish: "" }]);
  const [message, setMessage] = useState("");
  const {unlockBadge} = useBadge()

  const handleChange = (index, field, value) => {
    const updated = [...words];
    updated[index][field] = value;
    setWords(updated);
  };

  const autoTranslate = async (index) => {
    const word = words[index].English;
    if (!word) return;

    try {
      const res = await axios.get(`https://www.dictionaryapi.com/api/v3/references/spanish/json/${word}?key=000d3f03-8825-4457-84d6-3cdf8b8ac550`);
      const guess = res.data?.[0]?.shortdef?.[0];

      const updated = [...words];
      updated[index].Spanish = guess || "N/A";
      setWords(updated);
    } catch (err) {
      console.error("Translation failed:", err);
    }
  };

  const addWord = () => {
    setWords([...words, { English: "", Spanish: "" }]);
  };

  const removeWord = (index) => {
    const updated = [...words];
    updated.splice(index, 1);
    setWords(updated);
  };



  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!category.trim()) {
      setMessage("❌ You must name the vocab list.");
      return;
    }

    const formattedWords = words
      .filter(w => w.English.trim() && w.Spanish.trim())
      .map(w => ({
        English: w.English,
        Spanish: w.Spanish,
        Topic: category
      }));

    try {
      await axios.post("https://backup-backend-j6zv.onrender.com/api/addvocablist", {
        userId,
        category,
        words: formattedWords,
      });
      unlockBadge("addedVocab");
      setMessage("✅ Vocab list created!");
      setCategory("");
      setWords([{ English: "", Spanish: "" }]);
    } catch (err) {
      setMessage(err.response?.data?.error || "❌ Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex justify-center bg-gray-900 text-black ">
      <div className="w-full max-w-3xl bg-white rounded-2xl overflow-y-auto max-h-[80vh] p-4  mt-20">
        <h2 className="text-3xl font-bold text-center mb-6">Create Your Vocab List</h2>

        {message && <p className="text-center mb-4 text-lg">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Vocab List Title */}
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter Vocab List Name (e.g., Greetings)"
            className="w-full p-3 rounded-lg text-black border-black border-3 placeholder-black"
          />

          {/* Words Section */}
          <div className="space-y-4">
            {words.map((word, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
                {/* English */}
                <input
                  type="text"
                  placeholder="English word"
                  value={word.English}
                  onChange={(e) => handleChange(index, "English", e.target.value)}
                  onBlur={() => autoTranslate(index)}
                  className="p-3 rounded-lg border-green-400 border-2 text-black placeholder-black"
                />

                {/* Spanish (auto-filled) */}
                <input
                  type="text"
                  placeholder="Spanish (auto-filled)"
                  value={word.Spanish}
                  onChange={(e) => handleChange(index, "Spanish", e.target.value)}
                  className="p-3 rounded-lg !border-pink-200 border-2 text-black placeholder-black"
                />

                <button
                  type="button"
                  onClick={() => removeWord(index)}
                  className="text-sm !text-red-400 !hover:text-red-600"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Add Word Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={addWord}
              className="!bg-blue-600 !hover:bg-blue-700 transition px-4 py-2 rounded-lg font-semibold"
            >
              + Add Word
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="block w-full mt-6 !bg-green-600 !hover:bg-green-700 py-3 rounded-lg font-bold text-xl"
          >
            Save Vocab List
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddVocabListForm;
