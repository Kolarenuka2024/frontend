import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import Header from "./Header";
import "../styles/content.css"; 

const ContentPage = () => {
  const [searchParams] = useSearchParams();
  const [content, setContent] = useState("");
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(false);
  const contentParam = searchParams.get("content");
  const subject = searchParams.get("subject") || "java"; // Default to 'java'
  const navigate = useNavigate();

  // Fetch content based on subject and title
  useEffect(() => {
    if (!contentParam) return;

    const fetchData = async () => {
      setLoading(true);
      const endpoint = subject === "java"
        ? `http://localhost/backend/get_java_content.php?title=${contentParam}`  // For Java content
        : `http://localhost/backend/get_cprogram_content.php?title=${contentParam}`;  // For C content

      try {
        const response = await axios.get(endpoint);
        setLoading(false);
        if (response.data.success) {
          setContent(response.data.content);
        } else {
          setContent("Select the topic.");
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        setLoading(false);
        setContent("Unable to load content.");
      }
    };

    fetchData();
  }, [contentParam, subject]);

  // Fetch titles based on subject
  useEffect(() => {
    const fetchTitles = async () => {
      setLoading(true);
      const endpoint = subject === "java"
        ? `http://localhost/backend/get_java_titles.php`  // For Java titles
        : `http://localhost/backend/get_cprogram_titles.php`;  // For C titles

      try {
        const response = await axios.get(endpoint);
        setLoading(false);
        if (response.data.success) {
          setTitles(response.data.titles);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching titles:", error);
        setLoading(false);
      }
    };

    fetchTitles();
  }, [subject]);

  const handleTakeQuiz = () => {
    if (contentParam) {
      navigate(`/questions?title=${contentParam}&subject=${subject}`);
    } else {
      alert("Please select a concept before taking the quiz.");
    }
  };

  return (
    <>
      <Header />
      <div className="page-container">
        <div className="sidebar">
          <h3>{subject === "java" ? "Java Concepts" : "C Programming Concepts"}</h3>
          <ul>
            {titles.map((title) => (
              <li key={title.id}>
                <button
                  onClick={() => {
                    const newUrl = `?subject=${subject}&content=${title.title}`;
                    navigate(newUrl, { replace: true });
                  }}
                >
                  {title.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="content-section">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(content || "Select a concept to view content."),
              }}
            />
          )}
          <button className="quiz-button" onClick={handleTakeQuiz}>
            Take Quiz
          </button>
        </div>
      </div>
    </>
  );
};

export default ContentPage;
