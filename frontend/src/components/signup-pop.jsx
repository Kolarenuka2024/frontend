import "../styles/signup.css"
function Signup_pop({ onClose }) {
    return (
        <div className="popup">
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>
                    X
                </button>
                <h1>signup</h1>
                <h5>Already have an account ? <a href="/login">Login</a></h5>
                <section className="signupform">
                    <label> name:
                        <input name="name" type="input" placeholder="Enter your name"/>
                    </label>
                    <label> Email:
                        <input name="email" type="mail" placeholder="Enter your email"/>
                    </label>
                    <label> password:
                        <input name="password" type="password" placeholder="Enter your password"/>
                    </label>
                    <label> confirm password:
                        <input name="confirmpassword" type="password" placeholder="Enter your confirm password"/>
                    </label>
                    <br/>
                    <button type="submit">Sign-up</button>
                </section>
            </div>
        </div>
    )
}
export default Signup_pop;