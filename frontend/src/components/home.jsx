import "../styles/home.css";

function Home() {
  return (
    <div className="home-container">
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
      <div className="container-home">
        <h1>Welcome to Our Educational Platform</h1>
        <p>Choose the best for your future</p>
          <input type="text" name="query" placeholder="Search here" />
          <button type="submit" className="button">Search</button>
      </div>
      <div class="local">
        <div class="box">
            <h2>python</h2>
            <button>check</button>
       </div>
        <div class="box">
        <h2>java</h2>
        <button>check</button>
        </div>
        <div class="box">
        <h2>c++</h2>
        <button>check</button>
        </div>
         </div><br></br><br></br><br></br><br></br>
         <div class="local">
         <div class="box">
            <h2>c programming</h2>
            <button>check</button>
       </div>
        <div class="box">
        <h2>sql</h2>
        <button>check</button>
        </div>
        <div class="box">
        <h2>web designing</h2>
        <button>check</button>
        </div>
        </div>

    </div>
  );
}

export default Home;
