import "./style.css";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const JobPostInfo = () => {
  const { token } = useContext(AppContext);
  const { id } = useParams();
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const [jobPost, setJobPost] = useState(null);
  const [applicants, setApplicants] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedJobDescription, setUpdatedJobDescription] = useState("");
  const [updatedJobRequirements, setUpdatedJobRequirements] = useState("");
  const role = localStorage.getItem("role");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`https://recruiter-inc.onrender.com/jobs/${id}`, {
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
        `https://recruiter-inc.onrender.com/jobs/${id}/apply`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setMessage({ data: response.data.message, status: "success" });
      })
      .catch((error) => {
        setMessage({ data: error.response.data.message, status: "error" });
      });
  };

  const handleShowApplicants = () => {
    axios
      .get(`https://recruiter-inc.onrender.com/jobs/${id}/applicants`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setApplicants(response.data.applicants);
      })
      .catch((error) => {
        setMessage({ data: error.response.data.message, status: "error" });
      });
  };

  const handleUpdatePost = () => {
    const updatedJob = {
      title: updatedTitle,
      jobDescription: updatedJobDescription,
      jobRequirements: updatedJobRequirements,
    };
    axios
      .put(`https://recruiter-inc.onrender.com/jobs/${id}`, updatedJob, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setMessage({ data: response.data.message, status: "success" });
        setJobPost(response.data.jobPost);
        setIsEditing(false);
      })
      .catch((error) => {
        setMessage({ data: error.response.data.message, status: "error" });
      });
  };

  const handleDeletePost = () => {
    axios
      .delete(`https://recruiter-inc.onrender.com/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        navigate("/AllJobs");
      })
      .catch((error) => {
        setMessage({ data: error.response.data.message, status: "error" });
      });
  };

  return (
    <Card className="jobInfo" style={{ marginTop: "3%" }}>
      {jobPost && (
        <>
          {isEditing ? (
            <Form className="updatePostForm">
              <Form.Group>
                <span className="updateLabel">Title:</span>
                <Form.Control
                  type="text"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                />
                <span className="updateLabel">Job Description:</span>
                <Form.Control
                  as="textarea"
                  value={updatedJobDescription}
                  onChange={(e) => setUpdatedJobDescription(e.target.value)}
                />
                <span className="updateLabel">Job Requirements:</span>
                <Form.Control
                  as="textarea"
                  value={updatedJobRequirements}
                  onChange={(e) => setUpdatedJobRequirements(e.target.value)}
                />
              </Form.Group>
              {message && (
                <div className={`${message.status}`}>{message.data}</div>
              )}
              <Button onClick={handleUpdatePost}>Submit Changes</Button>
            </Form>
          ) : (
            <>
              <Card.Header>{jobPost.title}</Card.Header>
              <Card.Body>
                <Card.Text>Location: {jobPost.company.country}</Card.Text>
                <Card.Text>Job Description: {jobPost.jobDescription}</Card.Text>
                <Card.Text>
                  Job Requirements: {jobPost.jobRequirements}
                </Card.Text>
                <Button onClick={() => navigate(-1)}>Back</Button>
                {token && role === "USER" && (
                  <Button onClick={handleApply}>Apply</Button>
                )}
                {message && (
                  <div className={`${message.status}`}>{message.data}</div>
                )}
                {token &&
                  role === "COMPANY" &&
                  userId === jobPost.company._id && (
                    <>
                      <Button onClick={handleShowApplicants}>
                        Show Applicants
                      </Button>
                      <Button onClick={() => setIsEditing(true)}>
                        Update Post
                      </Button>
                      <Button onClick={handleDeletePost}>Delete Post</Button>
                    </>
                  )}
                {message && (
                  <div className={`${message.status}`}>{message.data}</div>
                )}
              </Card.Body>
            </>
          )}
          {applicants.map((applicant) => (
            <Card key={applicant._id} className="JobInfo">
              <Card.Header>
                {applicant.firstName} {applicant.lastName}
              </Card.Header>
              <Card.Body>
                <Card.Text>Country: {applicant.country}</Card.Text>
                <Card.Text>Skills: {applicant.skills}</Card.Text>
                <Card.Text>Phone Number: {applicant.phoneNumber}</Card.Text>
                <Card.Text>Email: {applicant.email}</Card.Text>
                <Button onClick={() => navigate(-1)}>Hide</Button>
              </Card.Body>
            </Card>
          ))}
          {message && <div className={`${message.status}`}>{message.data}</div>}
        </>
      )}
    </Card>
  );
};

export default JobPostInfo;
