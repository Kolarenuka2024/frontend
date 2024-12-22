import "../styles/signup.css"
import { useNavigate } from "react-router-dom";
function Signup() {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate("/home");
  };
  return (
      <div>
        <header className="signup-header">
          MyWebsite
          <button onClick={handleNavigation}>sign up</button>
        </header>
        <section className="container" >
          <h1>Start reading you concepts are avaliable here</h1>
          <button onClick={handleNavigation}>Get Started</button>
        </section>
      </div>
      )
}

export default Signup;