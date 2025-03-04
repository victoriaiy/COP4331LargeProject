import React, { useState, useEffect } from "react";
import { easeIn, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Avatar from "./assets/3d-render-avatar-character/9334415.jpg";
import CreateAccount from "./SignInComponents/CreateAccount";


const Signin = () => {
  const [text, setText] = useState("Hola, Have We Met Before?");
  const [isEnglish, setIsEnglish] = useState(true);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
        setIsEnglish((prev) => !prev);
        setText(isEnglish ? "¿Hola, Nos hemos conocido antes?" : "Hola, Have We Met Before?");
    }, 4000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, [isEnglish]);

  return (
    <div className="flex flex-col items-center justify-center text-white">
    <AvatarPicture />
      <WelcomeTitle />
      <TextBubble text={text} />
      <Buttons 
      onCreateAccount={() => navigate("/create-account")} 
        onSignIn={()=> navigate("/SignIn")}
      />
    </div>
  );
};

const AvatarPicture = () => {
  return (
   
    <motion.div 
        initial = {{y:0, opacity: 0}}
        animate ={{y: 0, opacity: 1}}
        transition={{ duration: 1,ease:easeIn}}
        drag='y'

    className="rounded-full overflow-hidden w-40 h-40 animate-fade-in">
      <motion.img className="rounded-lg w-full h-full object-cover" src={Avatar} alt="Avatar" />
    </motion.div>
  );
};

const TextBubble = ({ text }) => {
  return (

     <div className=" text-white font-bold top-5 p-4 rounded-lg animate-fade-in">
     <motion
    initial = {{y: 20, opacity: 0}}
    animate={{y: 0, opacity: 1}}
    transition={{duration: 4, ease: "easeInOut"}}

     >
         <h1 className="text-lg">{text}</h1>
     </motion>
     
    </div>
        
   
  );
};

const WelcomeTitle = () =>{
    const title = "[Insert Title Here]"
    const colorsArray = ["#FF5733", "#33FF57", "#5733FF", "#FFC300", "#FF33A1"];
    const [colorIndex, setColorIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
          setColorIndex((prevIndex) => (prevIndex + 1) % colorsArray.length);
        }, 5000); // Change color every 3 seconds
    
        return () => clearInterval(interval); // Cleanup interval
      }, []);

    return (
        <motion.h1 
        animate= {{color: colorsArray[colorIndex]}}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="text-white font-extrabold absolute top-10">
            WELCOME TO {title}
        </motion.h1>
    )
}


const Buttons = ({onCreateAccount, onSignIn}) =>{

    return(
        
      
        <div className="mt-6 flex gap-4">
        <motion.button 
         whileHover={{ scale: 1.1 }}
         whileTap={{ scale: 0.95 }}
            onClick={onSignIn}
        className="  bg-green-500 text-white font-bold rounded-lg hover:bg-green-700 transition">
          Sí, Sign In
        </motion.button>
        <motion.button 
         onClick={onCreateAccount}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        
        className=" bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition">
          No, Create an Account
        </motion.button>
      </div>
    )
}
export default Signin;
