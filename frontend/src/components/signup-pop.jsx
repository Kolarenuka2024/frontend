import axios from "axios";
import "../styles/signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup_pop({ onClose, toggleLogin }) {
  const navigate = useNavigate();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmPassword] = useState("");
  const [errors, setErrors] = useState({ name: "", email: "", password: "", confirmpassword: "" });

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};
  
    if (!name.trim()) {
      newErrors.name = "Name should be provided";
    }
  
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email address";
    }
  
    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }
  
    if (!confirmpassword.trim()) {
      newErrors.confirmpassword = "Confirm password is required";
    } else if (password !== confirmpassword) {
      newErrors.confirmpassword = "Passwords do not match";
    }
  
    setErrors(newErrors);
  
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return; 
    }
  
    const created_at = new Date().toISOString();
    const signup_inputs = { name, email, password, confirmpassword, created_at };
  
    try {
      const response = await axios.post("http://localhost/backend/signup.php", signup_inputs);
      console.log(response.data); 
  
      if (response.data && response.data.success) {
        alert("Signup successful!");
        navigate("/home");
      } else if (response.data.error === "Email is already registered") {
        alert("This email is already registered. Please log in instead.");
        toggleLogin(); 
      } else {
        setErrors(response.data?.error || { global: "Signup failed. Please try again." });
      }
    } catch (error) {
      console.error(error);
      setErrors({ global: "An error occurred. Please check your connection and try again." });
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
            <input name="confirmpassword" id="confirmpassword" value={confirmpassword} type="password" placeholder="Enter your confirm password" onInput={(e)=> setconfirmPassword(e.target.value)} required/>
            {errors.confirmpassword && <p className="error">{errors.confirmpassword}</p>}
          </label>
          <br />
          <button type="submit" onClick={handleSubmit}>Sign-up</button>
        </section>
      </div>
    </div>
  );
}

export default Signup_pop;
