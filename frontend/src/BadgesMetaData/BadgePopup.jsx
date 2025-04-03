
import {motion, AnimatePresence} from "framer-motion"

const BadgePopup = ({ badge, onClose }) => {
    if (!badge) return null;
  
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-purple-700 text-white p-4 rounded-xl shadow-xl z-50"
      >
        🎖️ <strong>{badge.name}</strong> unlocked!<br />
        <span className="text-sm">{badge.description}</span>
      </motion.div>
    );
  };
  
  export default BadgePopup