import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const ProfileDropdown = () => {

    const navigate = useNavigate()

    function handSignOut(){
        localStorage.removeItem("userId")
        navigate('/')
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="absolute right-0 mt-3 w-35 bg-white shadow-lg  flex-box  p-2 rounded-md py-2 border border-gray-200 "
        >
            <div className="bg-white absolute top-0 right-3 w-4 h-4 -translate-y-2 - rotate-45"></div>
            <button
                className="block w-30 mt-3 py-2  text-mid"
                onClick={() => {navigate("/Profile")
                }}
            >
                Edit Profile
            </button>
            <button
                className="block w-30 mt-3 py-2 text-white !bg-red-500 text-mid"
                onClick={() => handSignOut()} 
            >
                Sign Out
            </button>
        </motion.div>
    );
};

export default ProfileDropdown;
