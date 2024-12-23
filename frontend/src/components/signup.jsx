import "../styles/signup.css"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Signup_pop from "./signup-pop";
function Signup() {
  const [signpopup,setsignpopup] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/home");
  };
  const togglesignup = () => {
    setsignpopup(!signpopup);
  };
  return (
      <div>
        <header className="signup-header">
          MyWebsite
          <button onClick={togglesignup}>sign up</button>
        </header>
        <section className="container" >
          <h1>Start reading you concepts are avaliable here</h1>
          <button onClick={handleNavigation}>Get Started</button>
        </section>
        {signpopup && <Signup_pop onClose={togglesignup} />}
      </div>
      )
}

export default Signup;