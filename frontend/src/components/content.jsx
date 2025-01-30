import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import Header from "./header";
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
      try {
        const endpoint =
          subject === "java"
            ? `http://localhost/backend/get_java_content.php?title=${encodeURIComponent(contentParam)}`
            : `http://localhost/backend/get_cprogram_content.php?title=${encodeURIComponent(contentParam)}`;

        const response = await axios.get(endpoint);
        setLoading(false);

        if (response.data?.success) {
          setContent(response.data.content || "No content available.");
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
      try {
        const endpoint =
          subject === "java"
            ? `http://localhost/backend/get_java_titles.php`
            : `http://localhost/backend/get_cprogram_titles.php`;

        const response = await axios.get(endpoint);
        setLoading(false);

        if (response.data?.success) {
          setTitles(response.data.titles || []);
        } else {
          console.error(response.data.message);
          setTitles([]);
        }
      } catch (error) {
        console.error("Error fetching titles:", error);
        setLoading(false);
        setTitles([]);
      }
    };

    fetchTitles();
  }, [subject]);

  const handleTakeQuiz = () => {
    if (contentParam) {
      navigate(`/questions?title=${encodeURIComponent(contentParam)}&subject=${subject}`);
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
            {titles.length > 0 ? (
              titles.map((title) => (
                <li key={title.id || title.title}>
                  <button
                    onClick={() => {
                      navigate(`?subject=${subject}&content=${encodeURIComponent(title.title)}`, { replace: true });
                    }}
                  >
                    {title.title}
                  </button>
                </li>
              ))
            ) : (
              <p>No topics available.</p>
            )}
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
