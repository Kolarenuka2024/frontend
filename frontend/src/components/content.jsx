import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DOMPurify from "dompurify";
import Header from "./header";
import "../styles/content.css"; 

const ContentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [titles, setTitles] = useState([]);
  const [loading, setLoading] = useState(false);

  const subject = searchParams.get("subject") || "java"; // Default to Java
  const contentParam = searchParams.get("content");

  useEffect(() => {
    const fetchTitles = async () => {
      setLoading(true);
      try {
        let endpoint = "";
        if (subject === "java") {
          endpoint = "http://localhost/backend/get_java_titles.php";
        } else if (subject === "cprogram") {
          endpoint = "http://localhost/backend/get_cprogram_titles.php";
        } else if (subject === "python") {
          endpoint = "http://localhost/backend/get_python_titles.php";
        }

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

  useEffect(() => {
    if (!contentParam && titles.length > 0) {
      navigate(`?subject=${subject}&content=${encodeURIComponent(titles[0].title)}`, { replace: true });
    }
  }, [titles, subject]);

  useEffect(() => {
    if (!contentParam) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        let endpoint = "";
        if (subject === "java") {
          endpoint = `http://localhost/backend/get_java_content.php?title=${encodeURIComponent(contentParam)}`;
        } else if (subject === "cprogram") {
          endpoint = `http://localhost/backend/get_cprogram_content.php?title=${encodeURIComponent(contentParam)}`;
        } else if (subject === "python") {
          endpoint = `http://localhost/backend/get_python_content.php?title=${encodeURIComponent(contentParam)}`;
        }

        const response = await axios.get(endpoint);
        setLoading(false);

        if (response.data?.success) {
          setContent(response.data.content || "No content available.");
        } else {
          setContent("Select a topic.");
        }
      } catch (error) {
        console.error("Error fetching content:", error);
        setLoading(false);
        setContent("Unable to load content.");
      }
    };

    fetchData();
  }, [contentParam, subject]);

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
        {/* Sidebar for Topics */}
        <div className="sidebar">
          <h3>
            {subject === "java"
              ? "Java Concepts"
              : subject === "cprogram"
              ? "C Program Concepts"
              : "Python Concepts"}
          </h3>
          <ul>
            {titles.length > 0 ? (
              titles.map((title) => (
                <li key={title.id || title.title}>
                  <button
                    onClick={() =>
                      navigate(`?subject=${subject}&content=${encodeURIComponent(title.title)}`, { replace: true })
                    }
                  >
                    {title.title}
                  </button>
                </li>
              ))
            ) : (
              <p>No topics available.</p>
            )}
          </ul>

          {/* Interview Button (Navigates to Selected Subject's Interview) */}
          <button 
            className="interview-btn" 
            onClick={() => navigate(`/interview?subject=${subject}`)}
          >
            Take {subject === "java" ? "Java" : subject === "cprogram" ? "C Program" : "Python"} Interview
          </button>
        </div>

        {/* Main Content Section */}
        <div className="content-section">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content || "Select a concept to view content.") }} />
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
