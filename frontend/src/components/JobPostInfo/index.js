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

  useEffect(() => {
    axios
      .get(`http://localhost:5000/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setJobPost(response.data);
        setUpdatedTitle(response.data.title);
        setUpdatedJobDescription(response.data.jobDescription);
        setUpdatedJobRequirements(response.data.jobRequirements);
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
    <Card>
      {jobPost && (
        <>
          {isEditing ? (
            <Form>
              <Form.Group>
                <Form.Control type="text" value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
                <Form.Control as="textarea" value={updatedJobDescription} onChange={(e) => setUpdatedJobDescription(e.target.value)} />
                <Form.Control as="textarea" value={updatedJobRequirements} onChange={(e) => setUpdatedJobRequirements(e.target.value)} />
              </Form.Group>
              <Button onClick={handleUpdatePost}>Submit Changes</Button>
            </Form>
          ) : (
            <>
              <Card.Header>{jobPost.title}</Card.Header>
              <Card.Body>
                <Card.Text>{jobPost.location}</Card.Text>
                <Card.Text>{jobPost.jobDescription}</Card.Text>
                <Card.Text>{jobPost.jobRequirements}</Card.Text>
                {token && role === "USER" && <Button onClick={handleApply}>Apply</Button>}
                {token && role === "COMPANY" && token.userId === jobPost.company && (
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
            <Card key={applicant._id}>
              <Card.Header>{applicant.firstName} {applicant.lastName}</Card.Header>
              <Card.Body>
                <Card.Text>Country: {applicant.country}</Card.Text>
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