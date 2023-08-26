import "./style.css";
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from "../../context";

const AllJobs = () => {
  const { token } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/jobs/", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => {
      setJobs(response.data);
    }).catch((err) => {
      console.log("Error fetching jobs", err);
    });
  }, [token]);

  return (
    <div>
        
    </div>
  )
};

export default AllJobs