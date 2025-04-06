import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { badgeList } from "./badges";
import BadgePopup from "./BadgePopup";

const BadgeContext = createContext();

export const BadgeProvider = ({ children }) => {
  const [unlockedBadges, setUnlockedBadges] = useState([]);
  const [recentlyUnlockedBadge, setRecentlyUnlockedBadge] = useState(null);

  const userId = localStorage.getItem("userId")?.replace(/"/g, "");

  useEffect(() => {
    // Fetch badges on load
    const fetchBadges = async () => {
      try {
        const res = await axios.post("https://backup-backend-j6zv.onrender.com/api/userwords", { userId });
        const userBadges = res.data?.badges || res.data?.Badges || [];
        setUnlockedBadges(userBadges);
      } catch (err) {
        console.error("Failed to fetch badges:", err);
      }
    };

    if (userId) fetchBadges();
  }, [userId]);

  const unlockBadge = async (id) => {
    if (unlockedBadges.includes(id)) return;

    try {
      const res = await axios.post("https://backup-backend-j6zv.onrender.com/api/unlockbadge", {
        userId,
        badgeId: id,
      });

      if (res.status === 200) {
        const updated = [...unlockedBadges, id];
        setUnlockedBadges(updated);
        setRecentlyUnlockedBadge(badgeList[id]);
      }
    } catch (err) {
      console.error("Badge unlock failed:", err);
    }
  };

  useEffect(() => {
    if (recentlyUnlockedBadge) {
      const timer = setTimeout(() => setRecentlyUnlockedBadge(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [recentlyUnlockedBadge]);

  return (
    <BadgeContext.Provider value={{ unlockBadge, unlockedBadges }}>
      {children}
      {recentlyUnlockedBadge && <BadgePopup badge={recentlyUnlockedBadge} />}
    </BadgeContext.Provider>
  );
};

export const useBadge = () => useContext(BadgeContext);
