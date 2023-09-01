import "./App.css";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AppContext } from "./context";
import NavBar from "./components/Navbar";
import Landing from "./components/Landing";
import AllJobs from "./components/AllJobs";
import Login from "./components/Login";
import Register from "./components/Register";
import JobPostInfo from "./components/JobPostInfo";
import Profile from "./components/Profile";
import PostJob from "./components/PostJob";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  return (
    <AppContext.Provider value={{token, setToken}}>
      <div className="App">
        <NavBar />
        <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/AllJobs" element={<AllJobs />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/JobPostInfo/:id" element={<JobPostInfo />}></Route>
        <Route path="/Profile/:userId" element={<Profile />}></Route>
        <Route path="/PostJob" element={<PostJob />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
};

export default App;
