import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import axios from "axios";

const Register = () => {

  const [message, setMessage] = useState(null);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [country, setCountry] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  // ... rest of your state variables and handlers ...

  const registerHandler = () => {
    const user = {firstName, lastName, phoneNumber, dateOfBirth, country, email, password};

    axios.post('http://localhost:5000/users/register', user)
      .then((response) => {
        setMessage({ data: response.data.message, status: 'success' });
      }).catch((error) => {
        setMessage({ data: error.response.data.message, status: 'error' });
      });
  };

  return (
    <div className="regDiv">
      <span>Register:</span><br/><br/>
      <input type='text' placeholder='First Name' onChange={e => setFirstName(e.target.value)}/><br/>
      <input type='text' placeholder='Last Name' onChange={e => setLastName(e.target.value)}/><br/>
      <input type='tel' placeholder='Phone Number' onChange={e => setPhoneNumber(e.target.value)}/><br/>
      <input type='date' placeholder='Date of Birth' onChange={e => setDateOfBirth(e.target.value)}/><br/>
      <input type='text' placeholder='Country' onChange={e => setCountry(e.target.value)}/><br/>
      <input type='email' placeholder='Email' onChange={e => setEmail(e.target.value)}/><br/>
      <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}/><br/>

      {/* rest of your form fields... */}

      {message && (
        <div className={`${message.status}`}>
          {message.data}
        </div>
      )}<br/>
      <button className='regBtn' onClick={registerHandler}>Register</button><br/>
    </div>
  )
};

export default Register