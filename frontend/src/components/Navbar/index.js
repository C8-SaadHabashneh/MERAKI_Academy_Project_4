import "./style.css";
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppContext } from "../../context";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

const NavBar = () => {
  const location = useLocation();
  const { token } = useContext(AppContext);

  return (
    <Navbar bg="dark" variant="dark" className="justify-content-between">
      <Navbar.Brand as={Link} to="/">Recruiter Inc</Navbar.Brand>
      <Nav className="ml-auto">
        {location.pathname !== '/AllJobs' && <Nav.Link as={Link} to="/AllJobs">Jobs</Nav.Link>}
        {token && token.role === 'COMPANY' && <Nav.Link as={Link} to="/PostJob">Post Job</Nav.Link>}
        {token ? (
          <>
            <Nav.Link as={Link} to="/Profile">Profile</Nav.Link>
            <Nav.Link onClick={() => {localStorage.removeItem('token'); window.location.reload();}}>Logout</Nav.Link>
          </>
        ) : (
          <>
            <Nav.Link as={Link} to="/Login">Login</Nav.Link>
            <Nav.Link as={Link} to="/Register">Register</Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  )
};

export default NavBar