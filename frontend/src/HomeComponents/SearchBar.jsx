import React from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaMicrophone } from "react-icons/fa";



const SearchBar = ({onSearch}) =>{
    const [searchTerm, setSearchTerm] = useState('')

    function handleSearchFunction(event){
        setSearchTerm(event.target.value)
        onSearch(event.target.value)

    };

    const handleSubmit = (event) =>{
        event.preventDefault();
        onSearch(searchTerm)
    }
    return(
        <div className="flex mt-20  rounded-2xl w-150 h-15 relative justify-center bg-white">
            <FaSearch className="m-auto ml-2 mr-2 text-2xl"/>
            <input 
            className="w-full rounded-2x "
            type="text"
            placeholder="Translate Spanish or English"
            onChange={handleSearchFunction}/>
            <FaMicrophone className=" cursor-pointer text-blue-400 absolute right-15 top-5 text-xl"/>
            <button 
            style={{borderRadius: '9999px'}}
            className="absolute flex justify-center items-center text-white !p-0 !bg-blue-400 right-3 top-2 w-10 h-10 rounded-full"
            onClick={handleSubmit}>
                <FaArrowRight className="text-xl text-white p-0 "/>

            </button>

        </div>
        
    )
}

export default SearchBar;