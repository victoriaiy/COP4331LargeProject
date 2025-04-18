import { useState, useEffect } from "react";
import Header from "./Header";
import LearnComponentMenu from "./HomeComponentsMenus/LearnComponentMenu";
import GameComponentMenu from "./HomeComponentsMenus/GameComponentMenu";
import ToggleButton from "./HomeComponentsMenus/ToggleButton";
import { motion, AnimatePresence } from "framer-motion";
import { useBadge } from "./BadgesMetaData/BadgeContent";

const Home = () => {
  const [isOn, setIsOn] = useState(false);
  const { unlockBadge } = useBadge();


  useEffect(()=>{

    unlockBadge("firstLogin")
  },[])

  return (
    <div className="relative min-w-screen min-h-screen bg-gradient-to-b from-purple-700 via-gray-800 to-black flex flex-col items-center pt-20">

      {/* Other Components */}
      <Header />
      <AnimatePresence mode="wait">
          {isOn ? (
            <motion.div
              key="game"
              initial={{ x: -100 }}
              animate={{ x: 0 }}
              exit={{  x: 100 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              className=" w-full flex justify-center"
            >
              <GameComponentMenu/>
            </motion.div>
          ) : (
            <motion.div
              key="learn"
              initial={{  x: -100 }}
              animate={{ x: 0 }}
              exit={{ x: 100 }}
              transition={{ duration: 0.1, ease: "easeInOut" }}
              className=" w-full flex justify-center"
            >
            {/*THIS IS THE COMPONENT YOU EDIT ANTHONY */}
              <LearnComponentMenu />
            </motion.div>
          )}
        </AnimatePresence>
      <ToggleButton isOn={isOn} setIsOn={setIsOn} />
    </div>
  );
};

export default Home;

