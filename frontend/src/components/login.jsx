import { useState } from "react";
import "../styles/signup.css";

function Login({ onClose, toggleSignup }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in both the username and password.");
      return;
    }
    console.log("Username:", username);
    console.log("Password:", password);
    setError(""); // Clear the error if the input is valid
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
              onChange={(e) => setUsername(e.target.value)} // Update state
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
              onChange={(e) => setPassword(e.target.value)} // Update state
              required
            />
            <br />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit">Login</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;
