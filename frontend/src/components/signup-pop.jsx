import "../styles/signup.css";

function Signup_pop({ onClose, toggleLogin }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <h1>Signup</h1>
        <h5>
          Already have an account?{" "}
          <span
            onClick={() => {
              onClose(); 
              toggleLogin(); 
            }}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Login
          </span>
        </h5>
        <section className="signupform">
          <label> Name:
            <input name="name" type="text" placeholder="Enter your name" />
          </label>
          <label> Email:
            <input name="email" type="email" placeholder="Enter your email" />
          </label>
          <label> Password:
            <input name="password" type="password" placeholder="Enter your password" />
          </label>
          <label> Confirm password:
            <input name="confirmpassword" type="password" placeholder="Enter your confirm password" />
          </label>
          <br />
          <button type="submit">Sign-up</button>
        </section>
      </div>
    </div>
  );
}

export default Signup_pop;
