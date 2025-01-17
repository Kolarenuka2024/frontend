import { useState } from "react";
import axios from "axios";
import "../styles/signup.css";
import { useNavigate } from "react-router-dom";

function Login({ onClose, toggleSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const handleLogin = async (e) => {
  e.preventDefault();
  if (!username || !password) {
    setError("Please fill in both the username and password.");
    return;
  }
  const inputs = { action: "login", username, password };
  try {
    const response = await axios.post('http://localhost/backend/login.php', inputs);
    if (response.data.status == 1) {
      setSuccess("Login successful");
      setError(null);
      navigate("/home");
    } else if (response.data.message === "No account found with this username") {
      alert(response.data.message);
      toggleSignup();
      onClose();
    } else if (response.data.message === "Incorrect password") {
      alert(response.data.message);
    }
  } catch (error) {
    console.error(error);
    setError("An error occurred during login");
  }
};

  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h1>Login</h1>
        <h5>
          Don't have an account?{" "}
          <span
            onClick={() => {
              onClose();
              toggleSignup();
            }}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Sign up
          </span>
        </h5>
        <section className="signupform">
          <form onSubmit={handleLogin}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
            {success && <p style={{ color: "green", marginTop: "10px" }}>{success}</p>}
            <button type="submit" style={{ marginTop: "10px" }}>
              Login
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;
