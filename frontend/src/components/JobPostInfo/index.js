import "./style.css";
import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { AppContext } from "../../context";

const JobPostInfo = ({ jobId }) => {
  const { token } = useContext(AppContext);
  const [jobInfo, setJobInfo] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/jobs/${jobId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setJobInfo(response.data);
    })
    .catch(error => {
      console.error('Error fetching job info', error);
    });
  }, [token, jobId]);

  return (
    <div>

    </div>
  )
};

export default JobPostInfo