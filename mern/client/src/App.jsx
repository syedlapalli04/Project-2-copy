import { Outlet } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import React, { useState } from "react";
import RecordList from "./components/RecordList";
import Record from "./components/Record"; 



const App = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(""); // State for the filter

  /*
  const updateGenres = (updatedGenres) => {
    setGenres(updatedGenres);
  };
  */
  
  return (
    <div className="w-full p-6">
      <Navbar 
        genres={genres}
        onFilterChange={(genre) => setSelectedGenre(genre)}/>
      {/*<RecordList onGenresUpdate={(updatedGenres) => setGenres(updatedGenres)} />*/}
      <RecordList 
        onGenresUpdate={(updatedGenres) => setGenres(updatedGenres)} 
        selectedGenre={selectedGenre} />
      <Outlet />
    </div>
  );
};

export default App

