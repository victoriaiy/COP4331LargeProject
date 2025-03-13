
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import ArcadeTitle from "./StartGame";

const GameComponentMenu = () => {
  const [randomTime, setRandomTime] = useState(0);
  const videoRef = useRef(null);
    const GameVideo = "https://drive.google.com/uc?export=download&id=1FFhGKgKqrP8l2LDybohqrzad8099CWUA"

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
           {/* YouTube Video with Random Start Time */}
            <iframe
                className="relative rounded-lg opacity-20 left-0 w-full h-full object-cover"
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
