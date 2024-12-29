import "../styles/signup.css";
import { useState } from "react";

function Signup_pop({ onClose, toggleLogin }) {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", password: "", confirmPassword: "" });

  const validateForm = () => {
    const emailRegex = /.com/;
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name should given properly";
    }

    if (!email.trim()) {
      newErrors.email = "Email should given";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert("Signup successful for " + name); 
    }
  };

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
            <input name="name" id="name" value={name} type="text" placeholder="Enter your name" onInput={(e)=> setname(e.target.value)} required />
            {errors.name && <p className="error">{errors.name}</p>}
            {console.log(name)}
          </label>
          <label> Email:
            <input name="email" id="email" value={email} type="email" placeholder="Enter your email" onInput={(e)=> setemail(e.target.value)} required/>
            {errors.email && <p className="error">{errors.email}</p>}
          </label>
          <label> Password:
            <input name="password" id="password" value={password} type="password" placeholder="Enter your password" onInput={(e)=> setpassword(e.target.value)} required/>
            {errors.password && <p className="error">{errors.password}</p>}
          </label>
          <label> Confirm password:
            <input name="confirmpassword" id="confirmPassword" value={confirmPassword} type="password" placeholder="Enter your confirm password" onInput={(e)=> setconfirmPassword(e.target.value)} required/>
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
          </label>
          <br />
          <button type="submit" onClick={handleSubmit}>Sign-up</button>
        </section>
      </div>
    </div>
  );
}

export default Signup_pop;
