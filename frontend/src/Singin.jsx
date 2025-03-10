import React, { useState, useEffect } from "react";
import { easeIn, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./App.css";
import { AnimatePresence } from "framer-motion";
import Avatar from "./assets/3d-render-avatar-character/9334415.jpg";
import CreateAccount from "./SignInComponents/CreateAccount";
//import { WiCloudy} from "react-icons/wi";
import { HiMiniChatBubbleBottomCenterText } from "react-icons/hi2";




const Signin = () => {
  const [text, setText] = useState("Hola, Have We Met Before?");
  const [isEnglish, setIsEnglish] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
        setIsEnglish((prev) => !prev);
        setText(isEnglish ? "¿Hola, Nos hemos conocido antes?" : "Hola, Have We Met Before?");
    }, 5000); // Change text every 3 seconds

    return () => clearInterval(interval);
  }, [isEnglish]);

  return (
    <div className="flex flex-col items-center justify-center text-white">
    <AvatarPicture />
      <WelcomeTitle />

 {/* Animated TextBubble */}
    <AnimatePresence mode="wait">
            <motion.div
            key={isEnglish ? "english" : "spanish"}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            >
            <TextBubble
                text={isEnglish ? "Hola, Have We Met Before?" : "¿Hola, Nos hemos conocido antes?"}
            />
            </motion.div>
    </AnimatePresence>



      <Buttons 
      onCreateAccount={() => navigate("/create-account")} 
        onSignIn={()=> navigate("/SignIn")}
      />
    </div>
  );
};
const AvatarPicture = () => {





  return (
   <div className="relative">
    <WiCloudy className="absolute text-8xl z-10 right-25 bottom-21"/>
    <HiMiniChatBubbleBottomCenterText className="absolute text-7xl z-10 left-25 bottom-24 rotate-12"/>
    <motion.div 
        initial = {{y:0, opacity: 0}}
        animate ={{y: 0, opacity: 1}}
        transition={{ duration: 1,ease:easeIn}}

    className="rounded-full overflow-hidden w-40 h-40 animate-fade-in relative">
        

      <motion.img className="rounded-lg w-full h-full object-cover" src={Avatar} alt="Avatar" />
    </motion.div>

    </div>
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

const WelcomeTitle = () => {
    const title = "YOUR AWESOME APP"; // Replace with your actual title
    const colorsArray = ["#FF5733", "#33FF57", "#5733FF", "#FFC300", "#FF33A1"];
    const [colorIndex, setColorIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setColorIndex((prevIndex) => (prevIndex + 1) % colorsArray.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.h1
            animate={{ 
                backgroundImage: `linear-gradient(45deg, ${colorsArray[colorIndex]}, #fff)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
            }}
            initial={{ opacity: 0, y: -50 }}
            animate = {{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-6xl font-extrabold absolute top-10 text-center w-full"
        >
            WELCOME TO {title}
        </motion.h1>
    );
};


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
