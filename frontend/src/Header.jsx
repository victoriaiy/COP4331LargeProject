import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FiSettings } from "react-icons/fi"; // Icon to replace "Home"
import ProfileDropdown from "./ProflieComponents/ProfileDropDown";
import logo from "./assets/AIlogo.png"; // Adjust path as needed

const Header = () => {
    const [headerOpen, setHeaderOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            setHeaderOpen(true);
        }, 500);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="fixed mx-4 mt-2 top-0  w-[calc(100%-2rem)] bg-gray-900/40 backdrop-blur-md rounded-2xl shadow-xl h-16 z-50 flex items-center justify-center"
        >
            <div className="w-full relative max-w-6xl flex justify-between items-center px-4 sm:px-8">
                {/* Profile Icon */}
                <div ref={dropdownRef}>
                    <motion.div
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.15, transition: { ease: "easeInOut" } }}
                        className="cursor-pointer relative"
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                        <CgProfile className="!text-white text-3xl sm:text-4xl" />
                        {dropdownOpen && <ProfileDropdown />}
                    </motion.div>
                    
                </div>

                {/* Centered Logo */}
                <motion.img
                    src={logo}
                    alt="HABLA+ Logo"
                    onClick={()=>navigate("/Home")}
                    className="h-10 sm:h-20 object-contain cursor-pointer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                />

                {/* Right-side Icon */}
                <motion.button
                    onClick={() => navigate("/Setting")}
                    whileHover={{ scale: 1.1 }}
                    className="!text-white-400 text-2xl sm:text-3xl"
                >
                    <FiSettings />
                </motion.button>
            </div>
        </motion.div>
    );
};

export default Header;
