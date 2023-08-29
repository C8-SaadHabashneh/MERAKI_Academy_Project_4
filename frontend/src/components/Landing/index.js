import "./style.css";
import React from 'react';
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <Card className='landing'>
      <Card.Body className='landing-card'>
        <Card.Title className='card-title'>Welcome to Recruiter Inc !</Card.Title>
        <Card.Img variant="top" className='card-image' src='https://www.betterteam.com/images/betterteam-free-job-posting-sites-5877x3918-20210222.jpg?crop=16:9,smart&width=1200&dpr=2'/>
        <Button variant="primary" onClick={() => navigate("/AllJobs")}>Explore Jobs</Button>
      </Card.Body>
    </Card>
  )
};

export default Landing