import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/profile.css";
import Header from "./header";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [scores, setScores] = useState([]);
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
          { action: "getProfile", username: storedUsername }, // ✅ Send username
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, 
          }
        );
  
        if (response.data.status === 1) {
          setUser(response.data.user);
          setScores(response.data.scores);
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
    <>
    <Header/>
    <div className="profile-page">
      <div className="profile-header">
        <h1>Profile Page</h1>
      </div>

      <div className="profile-info">
        <div className="profile-icon">{getInitials(user?.name)}</div>
        <h2>User Information</h2>
        <p>Name: {user?.name}</p>
        <p>Email: {user?.email}</p>
      </div>

      <div className="scores-section">
        <h2>Quiz Scores</h2>
        {scores.length > 0 ? (
          <table className="scores-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Subject</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((score, index) => (
                <tr key={index}>
                  <td>{score.title}</td>
                  <td>{score.subject}</td>
                  <td>{score.score}</td>
                  <td>{new Date(score.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No quiz scores available.</p>
        )}
      </div>
    </div>
    </>
  );
};

export default ProfilePage;
