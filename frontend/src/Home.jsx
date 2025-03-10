import { useState, useEffect } from "react";
import SearchBar from "./HomeComponents/SearchBar";
import Challenges from "./HomeComponents/Challenges";
import Header from "./Header";

const Home = () => {
  const [search, setSearch] = useState("");


  
  

  return (
    <div className="min-w-screen min-h-screen bg-gray-300 text-gray-900 flex flex-col items-center pt-20">
      
      {/* Slim White Header */}
      <Header/>
      {/* Search Bar */}
      <SearchBar/>

      {/* Challenges Section */}
      <Challenges/>
    </div>
  );
};

export default Home;
