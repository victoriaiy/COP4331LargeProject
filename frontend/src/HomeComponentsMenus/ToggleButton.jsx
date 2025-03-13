import React from "react";
import { useState } from "react";
import {motion} from "framer-motion"
import { IoBookSharp } from "react-icons/io5";
import { FaGamepad } from "react-icons/fa6";


const ToggleButton = ({isOn, setIsOn}) =>{


    function handleToggleButton(){
        setIsOn(!isOn)
    }

    return(
        <motion.div className=" w-70 h-30 bg-gray-300 rounded-full flex items-center p-2 cursor-pointer"
         animate={{ backgroundColor: isOn ? "#DAB1DA" : "#666666" }} // Green when ON, Gray when OFF
         transition={{ duration: 0.3 }}
         onClick={()=>handleToggleButton()}>
            <motion.div

                className="w-24 h-24 bg-white rounded-full shadow-lg p-6 "
                layout

                animate={{ x: isOn ? 160 : 10}} // Moves right when ON, left when OFF
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
            
            {!isOn ? <IoBookSharp className="relative text-black text-5xl"/>: <FaGamepad className="text-5xl text-black"></FaGamepad>}

            </motion.div>
        </motion.div>
    )
}

export default ToggleButton;