import React from 'react';
import { Link } from 'react-router-dom';
import "./style.css";

const NavBar = () => {
  return (
    <div className='navbar'>
      <div className='logoDiv'>
        <Link to="/" className='logoLink'>Recruiter Inc</Link>
      </div>
      <div className='navbar-menu'>
        <Link to="/AllJobs" className='navbar-item'>Jobs</Link>
        <Link to="/Login" className='navbar-item'>Login</Link>
        <Link to="/Register" className='navbar-item'>Register</Link>
      </div>
    </div>
  )
};

export default NavBar