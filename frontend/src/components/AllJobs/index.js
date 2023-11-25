import "./style.css";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AppContext } from "../../context";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AllJobs = () => {
  const { token } = useContext(AppContext);
  const [message, setMessage] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getJobs = () => {
    axios
      .get(`https://recruiter-inc.onrender.com/jobs/?page=${currentPage}&limit=4`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setJobs(response.data.jobs);
        setTotalPages(response.data.totalPages || 0);
      })
      .catch((error) => {
        setMessage({ data: error.response.data.message, status: "error" });
      });
  };

  const searchJobs = () => {
    axios
      .get(
        `https://recruiter-inc.onrender.com/jobs/search?title=${searchQuery}&page=${currentPage}&limit=4`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setJobs(response.data.jobs);
        setTotalPages(response.data.totalPages || 0);
      })
      .catch((error) => {
        setMessage({ data: error.response.data.message, status: "error" });
      });
  };

  useEffect(getJobs, [token, currentPage]);

  return (
    <div>
      <Form inline className="searchBar">
        <Form.Control
          type="text"
          placeholder="Search jobs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button onClick={searchJobs}>Search</Button>
      </Form>
      <div className="jobCardContainer">
        {jobs && (jobs.map((job) => (
          <Card className="jobCard" key={job._id}>
            <Card.Body>
              <Card.Title>{job.title}</Card.Title>
              <Card.Subtitle className="mt-3 text-muted">
                Company: {job.company.firstName} {job.company.lastName}
              </Card.Subtitle>
              <Card.Subtitle className="mt-3 text-muted">
                Location: {job.company.country}
              </Card.Subtitle>
              <Button className="mt-3" as={Link} to={`/JobPostInfo/${job._id}`}>
                View Job
              </Button>
            </Card.Body>
          </Card>
        )))}
      </div>
      {message && <div className={`${message.status}`}>{message.data}</div>}
      <div className="paginationContainer">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(
          (pageNumber) => (
            <Button
              key={pageNumber}
              variant="primary"
              onClick={() => {
                setCurrentPage(pageNumber);
              }}
            >
              {pageNumber}
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default AllJobs;
