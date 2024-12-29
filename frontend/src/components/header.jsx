import "../styles/home.css"
function Header() {
    return (
        <header className="home-header">
        <div className="logo">My Website Logo</div>
        <div id="select" className="selection-container">
          <select id="branch">
            <option value="">Branch</option>
            <optgroup label="Branches">
              <option value="CME">CME</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
              <option value="MECH">MECH</option>
            </optgroup>
          </select>
          <select id="subject">
            <option value="">Subject</option>
            <option value="c">C</option>
            <option value="c++">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="sql">SQL</option>
          </select>
        </div>
      </header>
    )
}
export default Header;