import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import profilePic from "../src/assets/medival.png"

const reviews = [
    {
      name: "Samantha R.",
      text: "I learned Spanish in just a week! 🇪🇸🔥",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/49.jpg"
    },
    {
      name: "Carlos G.",
      text: "This app made learning a language so easy. Highly recommend! 💯",
      rating: 4.9,
      image: "https://randomuser.me/api/portraits/men/29.jpg"
    },
    {
      name: "Emily T.",
      text: "My confidence in speaking Spanish has skyrocketed! 🎤",
      rating: 4.7,
      image: "https://randomuser.me/api/portraits/women/46.jpg"
    },
    {
      name: "David L.",
      text: "Best language-learning app out there. Period. 🏆",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/47.jpg"
    },
    {
      name: "Ava P.",
      text: "Finally, an app that makes learning fun and effective! 🎉",
      rating: 4.8,
      image: "https://randomuser.me/api/portraits/women/48.jpg"
    },
    {
      name: "Ethan M.",
      text: "Never thought I could learn a language this fast! 🚀",
      rating: 4.6,
      image: "https://randomuser.me/api/portraits/men/49.jpg"
    },
    {
      name: "Sophia J.",
      text: "Interactive, engaging, and super helpful! ⭐⭐⭐⭐⭐",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/50.jpg"
    }
  ];

const getRandomXPosition = () => {
    const screenWidth = window.innerWidth;
    const maxX = screenWidth - 200; // Prevents reviews from going off-screen
    return Math.random() * maxX;
};

const ReviewComponent = () => {
  const [floatingReviews, setFloatingReviews] = useState([]);

  useEffect(() => {
    const addReview = () => {
      const randomReview = reviews[Math.floor(Math.random() * reviews.length)];

      setFloatingReviews((prevReviews) => [
        ...prevReviews,
        {
          id: Date.now(),
          name: randomReview.name,
          text: randomReview.text,
          rating: randomReview.rating,
        image: randomReview.image,

          x: getRandomXPosition()
        }
      ]);
    };

    // Add a new review every 3 seconds
    const interval = setInterval(addReview, 3000);

    return () => clearInterval(interval);
  }, []);

  const removeReview = (id) => {
    setFloatingReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
  };

  return (
    <div className="absolute left-0 bottom-0 w-full h-full">
      {floatingReviews.map((review) => (
        <motion.div
          key={review.id}
          className=" fixed  border-2 border-purple-400 left-0 px-4 py-2 bg-black text-white rounded-lg shadow-lg text-sm"
          initial={{ x: review.x, y: window.innerHeight, opacity: 0 }} // Starts at the bottom
          animate={{ y: window.innerHeight * 0.45, opacity: 1 }} // Stops at 40% of screen height
          exit={{ opacity: 0 }}
          transition={{ duration: 5, ease: "easeInOut" }}
          onAnimationComplete={() => removeReview(review.id)}
        >
          <img
            src={review.image}
            alt={review.name}
            className="w-10 h-10 rounded-full border-2 border-white"
          />
          <div>
            <p>{review.name}</p>
            <p>{review.text}</p>
            <p className="text-yellow-300">⭐ {review.rating}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ReviewComponent;
