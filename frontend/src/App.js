import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AppContext } from "./context";
import NavBar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <AppContext.Provider value>
        <NavBar />
      </AppContext.Provider>
    </div>
  );
};

export default App;
