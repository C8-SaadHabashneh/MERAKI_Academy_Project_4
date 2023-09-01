import "./style.css";
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AppContext } from "../../context";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const AllJobs = () => {
  const { token } = useContext(AppContext);
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getJobs = () => {
    axios.get(`http://localhost:5000/jobs/search?title=${searchQuery}&page=${currentPage}&limit=5`, {
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
      <Form inline>
        <Form.Control style={{ width: '90%' }} type='text' placeholder='Search jobs...' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <Button style={{ width: '10%' }} onClick={getJobs}>Search</Button>
      </Form>
      {jobs.map(job => (
        <Card key={job._id}>
          <Card.Body>
            <Card.Title>{job.title}</Card.Title>
            <Card.Text>{job.location}</Card.Text>
            <Button as={Link} to={`/JobPostInfo/${job._id}`}>View Job</Button>
          </Card.Body>
        </Card>
      ))}
      <div>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
          <Button key={pageNumber} onClick={() => setCurrentPage(pageNumber)}>
            {pageNumber}
          </Button>
        ))}
      </div>
    </div>
  )
};

export default AllJobs;