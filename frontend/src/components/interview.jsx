import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import '../styles/interview.css';

function Inter() {
  const [searchParams] = useSearchParams();
  const subject = searchParams.get("subject") || "java"; // Default subject is PHP

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [codeAnswers, setCodeAnswers] = useState({});
  const [output, setOutput] = useState("");

  // Determine the correct backend file based on the subject
  const backendFile = subject === "cprogram" ? "interview2.php" : "interview.php";

  useEffect(() => {
    fetch(`http://localhost/backend/${backendFile}`)
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error("Error fetching questions:", error));
  }, [backendFile]);

  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const handleCodeChange = (index, value) => {
    setCodeAnswers({ ...codeAnswers, [index]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(answers).length !== questions.filter(q => q.type === "theory").length) {
      alert("Please answer all theoretical questions.");
      return;
    }

    fetch(`http://localhost/backend/${backendFile}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((error) => console.error("Error submitting answers:", error));
  };

  const handleCompile = async (index) => {
    if (!codeAnswers[index]) {
      alert("Please enter your code before compiling.");
      return;
    }

    const response = await fetch(`http://localhost/backend/${backendFile}?compile=true`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: codeAnswers[index] }),
    });

    const result = await response.json();
    setOutput(result.output);
  };

  return (
    <div className="interview-container">
      <h2>{subject === "cprogram" ? "C Programming Interview Questions" : "java Interview Questions"}</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((q, index) => (
          <div key={index} className="question">
            <p>{q.question}</p>

            {q.type === "theory" ? (
              <input
                type="text"
                value={answers[index] || ""}
                onChange={(e) => handleChange(index, e.target.value)}
                required
              />
            ) : (
              <div>
                <textarea
                  value={codeAnswers[index] || q.starter_code}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  rows="6"
                  cols="60"
                />
                <button type="button" onClick={() => handleCompile(index)}>Run Code</button>
              </div>
            )}
          </div>
        ))}
        <button type="submit" className="interview-btn">Submit</button>
      </form>

      {output && (
        <div className="output">
          <h3>Compiler Output:</h3>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
}

export default Inter;
