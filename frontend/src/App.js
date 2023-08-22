import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AppContext } from "./context";
import NavBar from "./components/Navbar";
import Landing from "./components/Landing";
import AllJobs from "./components/AllJobs";
import Login from "./components/Login";
import Register from "./components/Register";


function App() {
  return (
    <AppContext.Provider value>
      <div className="App">
        <NavBar />
        <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/AllJobs" element={<AllJobs />}></Route>
        <Route path="/users/Login" element={<Login />}></Route>
        <Route path="/users/Register" element={<Register />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;
