import "./style.css";
import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from "../../context";

const PostJob = () => {
  const [title, setTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");
  const [message, setMessage] = useState(null);
  const { token } = useContext(AppContext);

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
    <div className="postDiv">
    <span>Post a Job:</span><br/><br/>
    <div className="form-group">
      <input type='text' placeholder='Title' className="form-item" onChange={(e) => setTitle(e.target.value)} /><br/>
      <textarea placeholder='Job Description' className="form-item" onChange={(e) => setJobDescription(e.target.value)}></textarea><br/>
      <textarea placeholder='Job Requirements' className="form-item" onChange={(e) => setJobRequirements(e.target.value)}></textarea><br/>
    </div>
    {message && (
      <div className={`${message.status}`}>
        {message.data}
      </div>
    )}<br/>
    <button className='postBtn' onClick={postJobHandler}>Post Job</button><br/>
  </div>
  )
};

export default PostJob