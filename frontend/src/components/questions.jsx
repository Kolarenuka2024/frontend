import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/questions.css";

const Questions = () => {
  const [searchParams] = useSearchParams();
  const title = searchParams.get("title");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (title) {
      axios
        .get(`http://localhost/backend/get_java_questions.php?title=${title}`)
        .then((response) => {
          if (response.data.success) {
            setQuestions(response.data.questions);
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

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost/backend/get_submit_answer.php", {
        answers,
      });

      if (response.data.success) {
        setResults([...response.data.results]); // Ensure re-render
      } else {
        alert("Error submitting answers.");
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
      alert("There was an issue submitting your quiz. Please try again.");
    }
  };

  const handleBack = () => {
    navigate(-1);
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
            {questions.map((question, index) => {
              const userAnswer = answers[question.id];
              const result = results ? results.find((r) => r.question_id === question.id) : null;
              const isCorrect = result ? result.is_correct : null;

              return (
                <div key={question.id} className="question">
                  <p>
                    <strong>Q{index + 1}:</strong> {question.question}
                  </p>
                  <ul>
                    {["A", "B", "C", "D"].map((option) => {
                      const optionValue = question[`option_${option.toLowerCase()}`]; // ✅ Fixed
                      const isSelected = userAnswer === option;
                      let backgroundColor = "";

                      if (result) {
                        if (isSelected && isCorrect) {
                          backgroundColor = "green"; // Correct answer
                        } else if (isSelected && !isCorrect) {
                          backgroundColor = "red"; // Wrong answer
                        } else if (option === result?.correct_answer) {
                          backgroundColor = "green"; // Show correct answer
                        }
                      }

                      return (
                        <li key={option} style={{ backgroundColor }}>
                          <label>
                            <input
                              type="radio"
                              name={`question-${question.id}`} // ✅ Fixed
                              value={option}
                              checked={isSelected}
                              disabled={!!results} // Disable selection after submission
                              onChange={() => handleAnswerChange(question.id, option)}
                            />
                            {option}. {optionValue}
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
    </>
  );
};

export default Questions;
