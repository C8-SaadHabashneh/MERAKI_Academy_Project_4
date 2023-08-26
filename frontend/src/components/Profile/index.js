import "./style.css";
import React, { useState, useEffect, useContext } from 'react';
import axios from "axios";
import { AppContext } from "./context";

const Profile = ({ userId }) => {
  const { token } = useContext(AppContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/profiles/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      setProfile(response.data);
    })
    .catch(error => {
      console.error('Error fetching profile', error);
    });
  }, [token, userId]);

  return (
    <div>

    </div>
  )
};

export default Profile