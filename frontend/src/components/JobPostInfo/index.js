import "./style.css";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const JobPostInfo = () => {
  const { token } = useContext(AppContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobPost, setJobPost] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedJobDescription, setUpdatedJobDescription] = useState("");
  const [updatedJobRequirements, setUpdatedJobRequirements] = useState("");
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setJobPost(response.data.jobPost);
        setUpdatedTitle(response.data.jobPost.title);
        setUpdatedJobDescription(response.data.jobPost.jobDescription);
        setUpdatedJobRequirements(response.data.jobPost.jobRequirements);
      })
      .catch((err) => {
        console.error("Error fetching job post", err);
      });
  }, [token, id]);

  const handleApply = () => {
    axios
      .post(
        `http://localhost:5000/jobs/${id}/apply`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Applied successfully");
      })
      .catch((err) => {
        console.error("Error applying for job", err);
      });
  };

  const handleShowApplicants = () => {
    axios
      .get(`http://localhost:5000/jobs/${id}/applicants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setApplicants(response.data.applicants);
      })
      .catch((err) => {
        console.error("Error fetching applicants", err);
      });
  };

  const handleUpdatePost = () => {
    const updatedJob = {
      title: updatedTitle,
      jobDescription: updatedJobDescription,
      jobRequirements: updatedJobRequirements,
    };
    axios
      .put(`http://localhost:5000/jobs/${id}`, updatedJob, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        
        console.log("Job post updated successfully");
        setJobPost(response.data);
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("Error updating job post", err);
      });
  };

  const handleDeletePost = () => {
    axios
      .delete(`http://localhost:5000/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        console.log("Job post deleted successfully");
        navigate("/AllJobs");
      })
      .catch((err) => {
        console.error("Error deleting job post", err);
      });
  };

  return (
    <Card className="jobInfo" style={{marginTop: "3%"}}>
      {jobPost && (
        <>
          {isEditing ? (
            <Form className="updatePostForm">
              <Form.Group>
                <span className="updateLabel">Title:</span>
                <Form.Control type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
                <span className="updateLabel">Job Description:</span>
                <Form.Control as="textarea" value={updatedJobDescription} onChange={(e) => setUpdatedJobDescription(e.target.value)} />
                <span className="updateLabel">Job Requirements:</span>
                <Form.Control as="textarea" value={updatedJobRequirements} onChange={(e) => setUpdatedJobRequirements(e.target.value)} />
              </Form.Group>
              <Button onClick={handleUpdatePost}>Submit Changes</Button>
            </Form>
          ) : (
            <>
              <Card.Header>{jobPost.title}</Card.Header>
              <Card.Body>
                <Card.Text>Location: {jobPost.company.country}</Card.Text>
                <Card.Text>Job Description: {jobPost.jobDescription}</Card.Text>
                <Card.Text>Job Requirements: {jobPost.jobRequirements}</Card.Text>
                {token && role === "USER" && <Button onClick={handleApply}>Apply</Button>}
                {token && role === "COMPANY" && userId === jobPost.company._id && (
                  <>
                    <Button onClick={handleShowApplicants}>Show Applicants</Button>
                    <Button onClick={() => setIsEditing(true)}>Update Post</Button>
                    <Button onClick={handleDeletePost}>Delete Post</Button>
                  </>
                )}
              </Card.Body>
            </>
          )}
          {applicants.map((applicant) => (
            <Card key={applicant._id} className="JobInfo">
              <Card.Header>{applicant.firstName} {applicant.lastName}</Card.Header>
              <Card.Body>
                <Card.Text>Country: {applicant.country}</Card.Text>
                <Card.Text>Skills: {applicant.skills}</Card.Text>
                <Card.Text>Phone Number: {applicant.phoneNumber}</Card.Text>
                <Card.Text>Email: {applicant.email}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </>
      )}
    </Card>
  )
};

export default JobPostInfo;