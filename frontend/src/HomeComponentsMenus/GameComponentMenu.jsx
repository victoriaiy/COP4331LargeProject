
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import GameVideo from "../assets/GameVideo.mp4"; // Import local video
import ArcadeTitle from "https://drive.google.com/file/d/1FFhGKgKqrP8l2LDybohqrzad8099CWUA/view?usp=sharing";

const GameComponentMenu = () => {
  const [randomTime, setRandomTime] = useState(0);
  const videoRef = useRef(null);

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

      
      <div className="flex flex-col border-10 border-black items-center justify-center h-110 w-200 shadow-2xl max-w-screen max-h-screen mb-10 bg-green-300 rounded-lg">
            <ArcadeTitle/>
            <video
                ref={videoRef}
                className="relative rounded-lg opacity-20 left-0 w-full h-full object-cover "
                src={GameVideo}
                autoPlay
                muted
                loop
                onLoadedMetadata={handleVideoLoad} // Set video to random time when loaded
            />
      </div>


  );
};

export default GameComponentMenu;
