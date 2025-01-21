import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./header";
import "../styles/questions.css";

const Questions = () => {
    const [questions, setQuestions] = useState([]); // Initialize as an array
    const [loading, setLoading] = useState(true);
    const [selectedOptions, setSelectedOptions] = useState({}); // To store selected options

    useEffect(() => {
        axios
            .get("http://localhost/backend/questions.php")
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setQuestions(response.data);
                } else {
                    console.error("Unexpected response format:", response.data);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching questions:", error);
                setLoading(false);
            });
    }, []);

    const handleOptionChange = (questionId, selectedOption) => {
        setSelectedOptions({
            ...selectedOptions,
            [questionId]: selectedOption, 
        });
    };

    if (loading) {
        return <div className="loading">Loading questions...</div>;
    }

    if (!Array.isArray(questions) || questions.length === 0) {
        return <div className="no-questions">No questions available!</div>;
    }

    return (
        <>
        <Header/>
        <div className="questions_body">
            <div className="questions_container">
                <h1>All Questions</h1>
                {questions.map((question, index) => (
                    <div key={question.id} className="question_card">
                        <p className="question_text">
                            <strong>Question {index + 1}:</strong> {question.question}
                        </p>
                        <div className="options-container">
                            <label>
                                <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    value="1"
                                    checked={selectedOptions[question.id] === "1"}
                                    onChange={() => handleOptionChange(question.id, "1")}
                                />
                                {question.option1}
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    value="2"
                                    checked={selectedOptions[question.id] === "2"}
                                    onChange={() => handleOptionChange(question.id, "2")}
                                />
                                {question.option2}
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    value="3"
                                    checked={selectedOptions[question.id] === "3"}
                                    onChange={() => handleOptionChange(question.id, "3")}
                                />
                                {question.option3}
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    value="4"
                                    checked={selectedOptions[question.id] === "4"}
                                    onChange={() => handleOptionChange(question.id, "4")}
                                />
                                {question.option4}
                            </label>
                        </div>
                    </div>
                ))}

            </div>
        </div>
        </>
    );
};

export default Questions;
