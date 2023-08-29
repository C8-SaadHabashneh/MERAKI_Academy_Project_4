import "./style.css";
import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Profile = () => {
  const { token } = useContext(AppContext);
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedMobile, setUpdatedMobile] = useState('');
  const [updatedProfession, setUpdatedProfession] = useState('');
  const [updatedEducation, setUpdatedEducation] = useState('');
  const [updatedSkills, setUpdatedSkills] = useState('');
  const [updatedAbout, setUpdatedAbout] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/profiles/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setProfile(response.data);
      setUpdatedName(response.data.name);
      setUpdatedEmail(response.data.email);
      setUpdatedMobile(response.data.mobile);
      setUpdatedProfession(response.data.profession);
      setUpdatedEducation(response.data.education);
      setUpdatedSkills(response.data.skills);
      setUpdatedAbout(response.data.about);
    })
    .catch(error => {
      console.error('Error fetching profile', error);
    });
  }, [token, userId]);

  const handleSaveChanges = () => {
    const updatedProfile = { 
      name: updatedName,
      email: updatedEmail,
      mobile: updatedMobile,
      profession: updatedProfession,
      education: updatedEducation,
      skills: updatedSkills,
      about: updatedAbout
    };

    axios.put(`http://localhost:5000/profiles/${userId}`, updatedProfile, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      console.log('Profile updated successfully');
      setProfile(response.data);
      setIsEditing(false);
    })
    .catch((err) => {
      console.error('Error updating profile', err);
    });
  };

  return (
    <Card>
      {profile && (
        <>
          {isEditing ? (
            <Form>
              <Form.Group>
                <Form.Control type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
                <Form.Control type="email" value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} />
                <Form.Control type="tel" value={updatedMobile} onChange={(e) => setUpdatedMobile(e.target.value)} />
                <Form.Control type="text" value={updatedProfession} onChange={(e) => setUpdatedProfession(e.target.value)} />
                <Form.Control type="text" value={updatedEducation} onChange={(e) => setUpdatedEducation(e.target.value)} />
                <Form.Control type="text" value={updatedSkills} onChange={(e) => setUpdatedSkills(e.target.value)} />
                <Form.Control as="textarea" value={updatedAbout} onChange={(e) => setUpdatedAbout(e.target.value)} />
              </Form.Group>
              <Button onClick={handleSaveChanges}>Save Changes</Button>
            </Form>
          ) : (
            <>
              <Card.Header>{profile.name}</Card.Header>
              <Card.Body>
                <Card.Text>Email: {profile.email}</Card.Text>
                <Card.Text>Mobile: {profile.mobile}</Card.Text>
                <Card.Text>Profession: {profile.profession}</Card.Text>
                <Card.Text>Education: {profile.education}</Card.Text>
                <Card.Text>Skills: {profile.skills}</Card.Text>
                <Card.Text>About: {profile.about}</Card.Text>
                {token.userId === profile.userId && (
                  <>
                    <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
                  </>
                )}
              </Card.Body>
            </>
          )}
        </>
      )}
    </Card>
  )
};

export default Profile