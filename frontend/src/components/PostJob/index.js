import "./style.css";
import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../context";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");
  const [message, setMessage] = useState(null);
  const { token } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (message && message.status === 'success') {
      navigate("/AllJobs");
    }
  }, [message, navigate]);

  const postJobHandler = () => {
    const job = {title, jobDescription, jobRequirements};

    axios.post("http://localhost:5000/jobs", job, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => {
      setMessage({ data: response.data.message, status: 'success' });
    }).catch((err) => {
      setMessage({ data: err.response.data.message, status: 'error' });
    });
  };

  return (
    <Form className="postDiv">
      <Form.Group>
        <Form.Label>Post a Job:</Form.Label><br/>
        <Form.Control type='text' placeholder='Title' className="form-item" onChange={(e) => setTitle(e.target.value)} /><br/>
        <Form.Control as="textarea" placeholder='Job Description' className="form-item" onChange={(e) => setJobDescription(e.target.value)} /><br/>
        <Form.Control as="textarea" placeholder='Job Requirements' className="form-item" onChange={(e) => setJobRequirements(e.target.value)} /><br/>
      </Form.Group>
      {message && (
        <div className={`${message.status}`}>
          {message.data}
        </div>
      )}<br/>
      <Button className='postBtn' onClick={postJobHandler}>Post Job</Button><br/>
    </Form>
  )
};

export default PostJob;