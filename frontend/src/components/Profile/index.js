import "./style.css";
import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context";

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
    <div>
      {profile && (
        <>
          {isEditing ? (
            <div>
              <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
              <input type="email" value={updatedEmail} onChange={(e) => setUpdatedEmail(e.target.value)} />
              <input type="tel" value={updatedMobile} onChange={(e) => setUpdatedMobile(e.target.value)} />
              <input type="text" value={updatedProfession} onChange={(e) => setUpdatedProfession(e.target.value)} />
              <input type="text" value={updatedEducation} onChange={(e) => setUpdatedEducation(e.target.value)} />
              <input type="text" value={updatedSkills} onChange={(e) => setUpdatedSkills(e.target.value)} />
              <textarea value={updatedAbout} onChange={(e) => setUpdatedAbout(e.target.value)} />
              <button onClick={handleSaveChanges}>Save Changes</button>
            </div>
          ) : (
            <>
              <h2>{profile.name}</h2>
              <p>Email: {profile.email}</p>
              <p>Mobile: {profile.mobile}</p>
              <p>Profession: {profile.profession}</p>
              <p>Education: {profile.education}</p>
              <p>Skills: {profile.skills}</p>
              <p>About: {profile.about}</p>
              {token.userId === profile.userId && (
                <>
                  <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Profile