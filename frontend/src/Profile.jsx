import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const Profile = () => {
    const navigate = useNavigate()
  const [user, setUser] = useState({
    name: "John Doe",
    profilePic: "none",
    aboutMe: "This is a placeholder bio. Update it to make it yours!",
    xp: 1200,
    badges: ["🔥 Streak Master", "🏆 Level 10", "💡 Language Guru", "cool guy", "Getting money", "Try again", "max","max","max","max","max","max"],
  });

  const [editMode, setEditMode] = useState(false);
  const [newAboutMe, setNewAboutMe] = useState(user.aboutMe);

  

  // Handle profile update
  const handleSave = () => {
    setUser((prev) => ({ ...prev, aboutMe: newAboutMe }));
    setEditMode(false);
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Profile Header */}
      <div className="flex flex-col items-center">
        <motion.img
          src={user.profilePic}
          alt="Profile"
          className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md cursor-pointer"
          whileHover={{ scale: 1.1 }}
        />
        <h2 className="mt-4 text-xl font-bold text-gray-800">{user.name}</h2>
        <p className="text-gray-500 text-sm">XP: {user.xp}</p>
      </div>

      {/* About Me Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700">About Me</h3>
        {editMode ? (
          <div className="mt-2">
            <textarea

              className="w-full p-2 border rounded-md bg-gray-300 text-black"
              value={newAboutMe}
              onChange={(e) => setNewAboutMe(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setEditMode(false)}
                className="px-3 py-1 text-gray-600 bg-gray-200 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-3 py-1 text-white bg-blue-500 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <motion.p
            className="mt-2 text-gray-600 bg-gray-100 p-3 rounded-md cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => setEditMode(true)}
          >
            {user.aboutMe}
          </motion.p>
        )}
      </div>

      {/* Badges Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-700">Badges</h3>
        <div className="flex gap-3 mt-2 flex-wrap ">
          {user.badges.map((badge, index) => (
            <motion.span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm shadow-md"
              whileHover={{ scale: 1.1 }}
            >
              {badge}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Edit Profile Button */}
      <motion.button
        onClick={()=>navigate("/Home")}
        className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md shadow-md"
        whileHover={{ scale: 1.05 }}
      >
        Return to Home
      </motion.button>
    </motion.div>
  );
};

export default Profile;
