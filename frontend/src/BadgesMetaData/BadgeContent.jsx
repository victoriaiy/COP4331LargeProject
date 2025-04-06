import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import { badgeList } from "./badges"; // your badge metadata
import BadgePopup from "./BadgePopup"; // the popup UI

const BadgeContext = createContext();

export const BadgeProvider = ({ children }) => {
  const [unlockedBadges, setUnlockedBadges] = useState(() => {
    const stored = localStorage.getItem("badges");
    return stored ? JSON.parse(stored) : [];
  });

  const [recentlyUnlockedBadge, setRecentlyUnlockedBadge] = useState(null);

  const unlockBadge = (id) => {
    if (unlockedBadges.includes(id)) return;
    const updated = [...unlockedBadges, id];
    setUnlockedBadges(updated);
    localStorage.setItem("badges", JSON.stringify(updated));
    setRecentlyUnlockedBadge(badgeList[id]);
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
      {recentlyUnlockedBadge && (
        <BadgePopup badge={recentlyUnlockedBadge} />
      )}
    </BadgeContext.Provider>
  );
};

export const useBadge = () => useContext(BadgeContext);
