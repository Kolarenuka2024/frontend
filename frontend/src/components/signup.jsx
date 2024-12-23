import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signup_pop from "./signup-pop";
import Login from "./login";

function Signup() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/home");
  };

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
        <button onClick={handleNavigation}>Get Started</button>
      </section>
      {isSignupOpen && <Signup_pop onClose={closeAllPopups} toggleLogin={toggleLogin} />}
      {isLoginOpen && <Login onClose={closeAllPopups} toggleSignup={toggleSignup} />}
    </div>
  );
}

export default Signup;
