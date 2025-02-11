import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/profile.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storedUsername = localStorage.getItem("username");

  useEffect(() => {
    const fetchUserData = async () => {
      if (!storedUsername) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post(
          "http://localhost/backend/profile.php",
          { action: "getProfile", username: storedUsername },
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.data.status === 1) {
          setUser(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [storedUsername]);

  const getInitials = (email) => {
    if (!email) return "?";
    return email.charAt(0).toUpperCase();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>Profile Page</h1>
      </div>
      <div className="profile-info">
        <div className="profile-icon">{getInitials(user?.email)}</div>
        <h2>User Information</h2>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;