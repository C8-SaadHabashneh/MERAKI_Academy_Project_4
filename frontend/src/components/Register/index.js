import "./style.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Register = () => {
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [country, setCountry] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();

  const roleHandler = (e) => {
    setRole(e.target.value)
  };

  const registerHandler = () => {
    const user = {firstName, lastName, phoneNumber, dateOfBirth, country, email, password, role};

    axios.post('http://localhost:5000/users/register', user)
      .then((response) => {
        setMessage({ data: response.data.message, status: 'success' });
        navigate("/Login");
      }).catch((error) => {
        setMessage({ data: error.response.data.message, status: 'error' });
      });
  };

  return (
    <Form className="regDiv">
      <Form.Group>
        <Form.Label>Register:</Form.Label><br/>
        <Form.Control type='text' placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} /><br/>
        <Form.Control type='text' placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} /><br/>
        <Form.Control type='tel' placeholder='Phone Number' onChange={(e) => setPhoneNumber(e.target.value)} /><br/>
        <Form.Control type='date' placeholder='Date of Birth' onChange={(e) => setDateOfBirth(e.target.value)} /><br/>
        <Form.Control type='text' placeholder='Country' onChange={(e) => setCountry(e.target.value)} /><br/>
        <Form.Control type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} /><br/>
        <Form.Control type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} /><br/>
        <Form.Control as="select" onChange={roleHandler}>
          <option value="">Select User Type</option>
          <option value="64e3aece53d3e3e6353d476b">User</option>
          <option value="64e3aea753d3e3e6353d4769">Company</option>
        </Form.Control><br/>
      </Form.Group>
      {message && (
        <div className={`${message.status}`}>
          {message.data}
        </div>
      )}<br/>
      <Button className='regBtn' onClick={registerHandler}>Register</Button><br/>
    </Form>
  )
};

export default Register