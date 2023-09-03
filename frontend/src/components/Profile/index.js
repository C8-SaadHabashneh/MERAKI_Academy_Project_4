import "./style.css";
import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context";
import Card from 'react-bootstrap/Card';


const Profile = () => {
  const { token } = useContext(AppContext);
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setProfile(response.data.profile);
    })
    .catch(error => {
      console.error('Error fetching profile', error);
    });
  }, [token, userId]);

  return (
    <Card className="profileDiv">
    {profile && (
      <>
        <Card.Header>{profile.name}</Card.Header>
        <Card.Body>
          <Card.Text>Full Name: {profile.firstName} {profile.lastName}</Card.Text>
          <Card.Text>Country: {profile.country}</Card.Text>
          <Card.Text>Email: {profile.email}</Card.Text>
          <Card.Text>Mobile: {profile.phoneNumber}</Card.Text>
          <Card.Text>Skills: {profile.skills}</Card.Text>
        </Card.Body>
      </>
    )}
  </Card>
  )
};

export default Profile;