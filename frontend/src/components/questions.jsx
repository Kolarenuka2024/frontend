import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/questions.css"; // Assuming a CSS file for styling

const Questions = () => {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title"); // Get the title from query parameters
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({}); // Track selected answers for each question
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    if (title) {
      axios
        .get(`http://localhost/backend/get_java_questions.php?title=${title}`)
        .then((response) => {
          if (response.data.success) {
            setQuestions(response.data.questions); // Assuming questions are returned in an array
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

  const handleAnswerChange = (questionId, option) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", answers);
    alert("Your answers have been submitted!");
  };

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <>
    <button className="back-button" onClick={handleBack}>
    Back
  </button>
    <div className="questions-container">
      <h2>Quiz: {title}</h2>
      {loading ? (
        <p>Loading questions...</p>
      ) : questions.length > 0 ? (
        <form onSubmit={(e) => e.preventDefault()}>
          {questions.map((question, index) => (
            <div key={question.id} className="question">
              <p>
                <strong>Q{index + 1}:</strong> {question.question}
              </p>
              <ul>
                {["A", "B", "C", "D"].map((option) => (
                  <li key={option}>
                    <label>
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={option}
                        checked={answers[question.id] === option}
                        onChange={() => handleAnswerChange(question.id, option)}
                      />
                      {option}. {question[`option_${option.toLowerCase()}`]}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <button className="submit-button" onClick={handleSubmit}>
            Submit Quiz
          </button>
        </form>
      ) : (
        <p>No questions available for this topic.</p>
      )}

    </div>
    </>
  );
};

export default Questions;
