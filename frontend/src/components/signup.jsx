import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signup_pop from "./signup-pop";
import Login from "./login";
import "../styles/signup.css";
import image2 from "../assets/image2.png";

function Signup() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const toggleSignup = () => {
    setIsSignupOpen(true);
    setIsLoginOpen(false);
  };

  const toggleLogin = () => {
    setIsLoginOpen(true);
    setIsSignupOpen(false);
  };

  const closeAllPopups = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(false);
  };

  return (
    <div>
      <header className="signup-header">
        MyWebsite
        <button onClick={toggleSignup}>Sign up</button>
      </header>
      <section className="container">
        <h1>Start reading. Your concepts are available here!</h1>
                <button onClick={toggleSignup}>Get Started</button>
      </section>
      {isSignupOpen && <Signup_pop onClose={closeAllPopups} toggleLogin={toggleLogin} />}
      {isLoginOpen && <Login onClose={closeAllPopups} toggleSignup={toggleSignup} />}
     <div className="image_container">
      <img src={image2}  width="500" height="600" />
    </div> 
        
    </div>
    
    
  );
}

export default Signup;
