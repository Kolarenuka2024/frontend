import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Header from './header';
import "../styles/home.css";
import "../styles/content.css"

const ContentPage = () => {
  const [searchParams] = useSearchParams(); // To read query parameters
  const [content, setContent] = useState(""); // State to store the content
  const [loading, setLoading] = useState(false); // Loading state
  const topic = searchParams.get("content"); // Extract 'content' query param (e.g., "cprogramming", "java")

  useEffect(() => {
    if (topic) {
      setLoading(true); // Start loading
      axios
        .get(`http://localhost/backend/content.php?content=${topic}`)
        .then((response) => {
          setLoading(false); // End loading
          if (response.data.success) {
            setContent(response.data.content); // Update state with fetched content
          } else {
            setContent(response.data.message || "Content not found."); // Handle "not found" case
          }
        })
        .catch((err) => {
          setLoading(false); // End loading
          console.error("Error fetching content:", err);
          setContent("Unable to load content."); // Display error message
        });
    }
  }, [topic]); // Re-run when 'topic' changes

  return (
    <>
      <Header />
      {/* <div className='content-popup'>
        <h1>Content Page</h1>
      </div> */}
      <div className="content-page">
        <h1>{topic ? `${topic} Content` : "Welcome to the Tutorials Page!"}</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <p>{content}</p>
        )}
      </div>
    </>
  );
};

export default ContentPage;
