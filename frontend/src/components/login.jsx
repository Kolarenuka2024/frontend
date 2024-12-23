import "../styles/signup.css";

function Login({ onClose, toggleSignup }) {
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
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" placeholder="Enter your username"required />
          <br />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" placeholder="Enter your password"required />
          <br />
          <button type="submit">Login</button>
        </section>
      </div>
    </div>
  );
}

export default Login;
