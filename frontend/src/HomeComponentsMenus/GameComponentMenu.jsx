
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ArcadeTitle from "./StartGame";
import Static from "../assets/static-glitch.gif";

const GameComponentMenu = () => {
  const [randomTime, setRandomTime] = useState(0);
  const videoRef = useRef(null);       
  const [staticEffect, setStaticEffect] = useState(true) 

  useEffect(()=>{

    setTimeout(()=>setStaticEffect(false), 4000)
  },[])

  useEffect(() => {
    // Get a random time (in seconds) within the video duration range (1 - 10 seconds for example)
    const minTime = 5; // Set the minimum start time (adjust if needed)
    const maxTime = 50; // Set the maximum start time (adjust if needed)
    const randomStartTime = Math.floor(Math.random() * (maxTime - minTime)) + minTime;
    
    setRandomTime(randomStartTime);
  }, []);

  // Set video start time when metadata loads
  const handleVideoLoad = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = randomTime;
      videoRef.current.play();
    }
  };

  return (

      
      <div className="flex  relative flex-col border-10 border-black items-center justify-center h-110 w-200 shadow-2xl max-w-screen max-h-screen mb-10 bg-green-300 rounded-lg">
            <ArcadeTitle/>
           {/* YouTube Video with Random Start Time */}
           <div className="absolute w-full h-full opacity-40 bg-green-300 z-1">

           </div>
           {staticEffect ? <img className=" absolute z-1 w-full h-full " src={Static}></img> : <></>}
            <iframe
                className="relative w-full h-full object-cover"
                src={`https://www.youtube.com/embed/r5FjMBYKo7A?autoplay=1&mute=1&loop=1&start=${randomTime}&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1&fs=0&iv_load_policy=3`}
                title="Game Background Video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
            ></iframe>
      </div>


  );
};

export default GameComponentMenu;
