import "./style.css";
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppContext } from "../../context";


const AllJobs = () => {
  const { token } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getJobs = () => {
    axios.get(`http://localhost:5000/jobs/search?title=${searchQuery}&page=${currentPage}&limit=10`, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    }).then((response) => {
      setJobs(response.data.jobs);
      setTotalPages(response.data.totalPages);
    }).catch((err) => {
      console.log("Error fetching jobs", err);
    });
  };

  useEffect(getJobs, [token, currentPage]);

  return (
    <div>
      <input type='text' placeholder='Search jobs...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
      <button onClick={fetchJobs}>Search</button>
      {jobs.map(job => (
        <div key={job._id}>
          <h2>{job.title}</h2>
          <span>{job.location}</span>
          <Link to={`/JobPostInfo/${job._id}`}>View Job</Link>
        </div>
      ))}
      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
          <button key={pageNumber} onClick={() => setCurrentPage(pageNumber)}>
            {pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllJobs;