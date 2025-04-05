import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuizComponent from "./LearnComponents/QuizComponent";
import Header from "./Header";

const LearnWordPage = () => {
  const { category } = useParams(); // fixed typo
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("userId"));
    if (id) setUserId(id);
  }, []);

  if (!userId) return <div className="text-white p-8">🔐 Please sign in first.</div>;

  return (
    <div className="min-h-screen w-full bg-gray-900 flex justify-center items-center">
        <Header/>
      <QuizComponent userId={userId} category={category} />
    </div>
  );
};

export default LearnWordPage;
