import React, {useState} from "react";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [message, setMessage] = useState(null);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const loginHandler = () => {
    const user = {email, password};

    axios.post("http://localhost:5000/users/login", user)
      .then((response) => {
        setMessage({data: response.message, status: "success"});
        localStorage.setItem('token', response.data.token);
        navigate("/AllJobs");
      }).catch((error) => {
        setMessage({data: error.response.message, status: "error"});
      });
  };

  return (
    <div className="loginDiv">
      <span>Login:</span><br/><br/>
      <div className="form-group">
        <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}/><br/>
        <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}/><br/>
      </div>
      {message && (
        <div className={`${message.status}`}>
          {message.data}
        </div>
      )}<br/>
      <button className='loginBtn' onClick={loginHandler}>Login</button><br/>
    </div>
  )
};

export default Login