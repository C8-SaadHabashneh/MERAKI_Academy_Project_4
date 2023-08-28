import "./style.css";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../../context";

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
        setApplicants(response.data);
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
    <div>
      {jobPost && (
        <>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
              <textarea
                value={updatedJobDescription}
                onChange={(e) => setUpdatedJobDescription(e.target.value)}
              />
              <textarea
                value={updatedJobRequirements}
                onChange={(e) => setUpdatedJobRequirements(e.target.value)}
              />
              <button onClick={handleUpdatePost}>Submit Changes</button>
            </div>
          ) : (
            <>
              <h2>{jobPost.title}</h2>
              <span>{jobPost.location}</span>
              <p>{jobPost.jobDescription}</p>
              <p>{jobPost.jobRequirements}</p>
              {token.role === 'USER' && <button onClick={handleApply}>Apply</button>}
              {token.userId === jobPost.company && (
                <>
                  <button onClick={handleShowApplicants}>Applicants</button>
                  <button onClick={() => setIsEditing(true)}>Update Post</button>
                  <button onClick={handleDeletePost}>Delete Post</button>
                </>
              )}
            </>
          )}
          {applicants.map((applicant) => (
            <div key={applicant._id}>
              <h3>{applicant.firstName} {applicant.lastName}</h3>
              <p>Country: {applicant.country}</p>
              <p>Phone Number: {applicant.phoneNumber}</p>
              <p>Email: {applicant.email}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default JobPostInfo;