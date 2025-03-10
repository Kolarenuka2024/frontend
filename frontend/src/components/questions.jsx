import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/questions.css";
import Header from "./header";

const Questions = () => {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const encodedTitle = encodeURIComponent(title); // Encode title for API request
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [subject, setSubject] = useState("");
  const [username, setUsername] = useState(localStorage.getItem("username") || "guest_user");
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [isEligible, setIsEligible] = useState(false);
  const navigate = useNavigate();

  // Fetch questions
  useEffect(() => {
    if (title) {
      axios
        .get(`http://localhost/backend/get_java_questions.php?title=${encodedTitle}`)
        .then((response) => {
          if (response.data.success) {
            setQuestions(response.data.questions);
            setSubject(response.data.subject);
          } else {
            console.error(response.data.message);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching questions:", error);
          setLoading(false);
        });
    }
  }, [title]);

  // Handle Answer Selection
  const handleAnswerChange = (questionId, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  // Submit Quiz
  const handleSubmit = async () => {
    if (!username) {
      setPopupMessage("User not logged in!");
      setShowPopup(true);
      return;
    }

    try {
      const response = await axios.post("http://localhost/backend/get_submit_answer.php", {
        username,
        title,
        subject,
        answers,
      });

      if (response.data.success) {
        setResults(response.data.results);
        const score = response.data.score;

        // Check Interview Eligibility
        const totalScoreResponse = await axios.get(
          `http://localhost/backend/check_eligibility.php?username=${username}&subject=${subject}`
        );

        if (totalScoreResponse.data.success) {
          const totalScore = totalScoreResponse.data.total_score;
          if (totalScore > 35) {
            setIsEligible(true);
            setPopupMessage("Congratulations! You are eligible for the interview.");
          } else {
            setPopupMessage(`Your quiz has been submitted. Your score: ${score}. Keep practicing!`);
          }
        } else {
          console.error("Error fetching total score:", totalScoreResponse.data.message);
        }
      } else {
        setPopupMessage(response.data.message);
      }

      setShowPopup(true);
    } catch (error) {
      console.error("Error submitting answers:", error);
      setPopupMessage("There was an issue submitting your quiz. Please try again.");
      setShowPopup(true);
    }
  };

  // Close Popup
  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Go Back
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <div className="question-main">
        <button className="back-button" onClick={handleBack}>
          Back
        </button>
        <div className="questions-container">
          <h2>Quiz: {title}</h2>
          {loading ? (
            <p>Loading questions...</p>
          ) : questions.length > 0 ? (
            <form onSubmit={(e) => e.preventDefault()}>
              {questions.map((question, index) => {
                const userAnswer = answers[question.id];
                const result = results?.find((r) => r.question_id === question.id);
                const isCorrect = result?.is_correct;
                const correctAnswer = result?.correct_answer;

                return (
                  <div key={question.id} className="question">
                    <p>
                      <strong>Q{index + 1}:</strong> {question.question}
                    </p>
                    <ul>
                      {["A", "B", "C", "D"].map((option) => {
                        const optionValue = question[`option_${option.toLowerCase()}`];
                        const isSelected = userAnswer === option;
                        let backgroundColor = "";
                        let cornerText = "";

                        if (result) {
                          if (isSelected) {
                            backgroundColor = isCorrect ? "green" : "red";
                            cornerText = isCorrect ? "Correct" : "Wrong";
                          } else if (option === correctAnswer) {
                            backgroundColor = "green";
                            cornerText = "Correct";
                          }
                        }

                        return (
                          <li key={option} className="option" style={{ backgroundColor }}>
                            <label>
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                                value={option}
                                checked={isSelected}
                                disabled={!!results}
                                onChange={() => handleAnswerChange(question.id, option)}
                              />
                              {option}. {optionValue}
                              {cornerText && <span className="corner-text">{cornerText}</span>}
                            </label>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
              <button className="submit-button" onClick={handleSubmit} disabled={!!results}>
                Submit Quiz
              </button>
            </form>
          ) : (
            <p>No questions available for this topic.</p>
          )}
        </div>
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <p>{popupMessage}</p>
            <button onClick={handleClosePopup} className="close-popup">
              OK
            </button>
          </div>
        </div>
      )}
      {isEligible && (
        <button className="interview-button" onClick={() => navigate("/interview")}>
          Proceed to Interview
        </button>
      )}
    </>
  );
};

export default Questions;
