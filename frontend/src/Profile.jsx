import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import ProfilePicture from "./ProflieComponents/ProfilePicture";
import { useBadge } from "./BadgesMetaData/BadgeContent";

const Profile = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
    username: ".....",
    profilePicture: "none",
    aboutMe: "Loading...",
    xp: ".....",
    badges: ["Explore to earn more Badges"],
  });
  const {unlockBadge} = useBadge()
  const [editMode, setEditMode] = useState(false);
  const [newAboutMe, setNewAboutMe] = useState(user.aboutMe);



 useEffect(() => {
    const id = JSON.parse(localStorage.getItem("userId")); //parsing the user id from local storage
    console.log(id)
    axios
      .post("https://backup-backend-j6zv.onrender.com/api/profile",{
        userId : id
      }) // Replace with actual API endpoint
      .then((res) => setUser(res.data))
      .catch((err) => console.error("Error fetching user data:", err));

    console.log(user)
  }, []);



  // Handle profile update
  const handleSave = () => {
    setUser((prev) => ({ ...prev, aboutMe: newAboutMe }));
    setEditMode(false);
  };

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-10 min-w-150 bg-white shadow-lg rounded-lg p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Profile Header */}
      <div className="flex flex-col items-center">
       <ProfilePicture 
       
        src={user.profilePicture} username={user.username} size={64}
        
        //adding a function the recalls the api when the upload is successful

        onUploadSuccess = {()=>{
          const id = JSON.parse(localStorage.getItem("userId"));

          axios.post("https://backup-backend-j6zv.onrender.com/api/profile", { userId: id })
          .then((res)=> setUser(res.data))
          .catch((err) => console.error("error refresshing the user image", err));
          
          unlockBadge("changedAvatar")

        }}
        
        
        ></ProfilePicture>
        <h2 className="mt-4 text-xl font-bold text-gray-800">{user.username}</h2>
        <p className="text-gray-500 text-sm">Level: {user.level}</p>
        <p className="text-gray-500 text-sm">Login Steak: {user.loginStreak}</p>

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
        {user.badges && user.badges.length > 0 ? (
            user.badges.map((badge, index) => (
              <motion.span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm shadow-md"
                whileHover={{ scale: 1.1 }}
              >
                {badge}
              </motion.span>
            ))
          ) : (
            <motion.span
              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm shadow-md"
              whileHover={{ scale: 1.1 }}
            >
              Explore to earn more badges
            </motion.span>
          )}
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



