import "./style.css";
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from "../../context";

const NavBar = () => {
  const location = useLocation();
  const { token } = useContext(AppContext);

  return (
    <div className='navbar'>
      <div className='logoDiv'>
        <Link to="/" className='logoLink'>Recruiter Inc</Link>
      </div>
      <div className='navbar-menu'>
      {location.pathname !== '/AllJobs' && <Link to="/AllJobs" className='navbar-item'>Jobs</Link>}
      {token && token.role === 'company' && <Link to="/PostJob" className='navbar-item'>Post Job</Link>}
        {token ? (
          <>
            <Link to="/Profile" className='navbar-item'>Profile</Link>
            <button onClick={() => {localStorage.removeItem('token'); window.location.reload();}} className='navbar-item'>Logout</button>
          </>
        ) : (
          <>
            <Link to="/Login" className='navbar-item'>Login</Link>
            <Link to="/Register" className='navbar-item'>Register</Link>
          </>
        )}
      </div>
    </div>
  )
};

export default NavBar