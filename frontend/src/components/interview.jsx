import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import '../styles/interview.css';

function Inter() {
  const [searchParams] = useSearchParams();
  const subject = searchParams.get("subject") || "java";

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [codeAnswers, setCodeAnswers] = useState({});
  const [output, setOutput] = useState("");
  const [compilationTime, setCompilationTime] = useState("");
  const [error, setError] = useState("");

  const backendFile = 
    subject === "cprogram" ? "interview2.php" :
    subject === "python" ? "interview3.php" :
    subject === "cpp" ? "interview4.php" :
    subject === "webdesign" ? "interview5.php" :
    subject === "sqldb" ? "interview6.php" :
    subject === "networks" ? "interview7.php" : 
    "interview.php";

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
      alert("⚠ Please answer all theoretical questions.");
      return;
    }

    fetch(`http://localhost/backend/${backendFile}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    })
      .then((res) => res.json())
      .then((data) => alert(data.message))
      .catch((error) => console.error("❌ Error submitting answers:", error));
  };

  const handleCompile = async (index) => {
    if (!codeAnswers[index]) {
      alert("⚠ Please enter your code before compiling.");
      return;
    }

    const response = await fetch(`http://localhost/backend/${backendFile}?compile=true`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: codeAnswers[index] }),
    });

    const result = await response.json();
    if (result.run) {
      setOutput(result.run.stdout || "✅ No Output");
      setError(result.run.stderr || "");
      setCompilationTime(`⏱ Compilation Time: ${result.run.time}s`);
    } else {
      setOutput("❌ Compilation Failed");
      setError(result.error || "Unknown Error Occurred");
    }
  };

  return (
    <>
      <h2 className="interview-title">
        {subject.toUpperCase()} Interview Questions
      </h2>

      <div className="interview-container">
        {questions.filter(q => q.type === "theory").length > 0 && (
          <div className="theory-section">
            <h3>Theory Questions</h3>
            {questions.filter(q => q.type === "theory").map((q, index) => (
              <div key={index} className="question-box">
                <p className="question-text">{q.question}</p>
                <textarea
                  value={answers[index] || ""}
                  onChange={(e) => handleChange(index, e.target.value)}
                  rows="4"
                  cols="60"
                  className="text-area"
                  required
                />
              </div>
            ))}
          </div>
        )}

        {questions.filter(q => q.type === "code").length > 0 && (
          <div className="coding-section">
            <h3>Coding Questions</h3>
            {questions.filter(q => q.type === "code").map((q, index) => (
              <div key={index} className="question-box">
                <p className="question-text">{q.question}</p>
                <textarea
                  value={codeAnswers[index] || q.starter_code}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  rows="6"
                  cols="60"
                  className="text-area"
                />
                <button 
                  type="button" 
                  onClick={() => handleCompile(index)} 
                  className="compile-btn"
                >
                  🚀 Run Code
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button type="submit" className="submit-btn" onClick={handleSubmit}>
        ✅ Submit Answers
      </button>

      {output && (
        <div className="output-box">
          <h3>💻 Output:</h3>
          <pre className="output-text">{output}</pre>
          {error && (
            <div className="error-box">
              <h4>❌ Errors:</h4>
              <pre>{error}</pre>
            </div>
          )}
          <p>{compilationTime}</p>
        </div>
      )}
    </>
  );
}

export default Inter;