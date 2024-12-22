import "../styles/home.css"
function Home() {    

      return (
          <div className="home-container">
              <header>
                  <div className="logo">My Website Logo</div>
                  <div id="select">
                      <select id="branch">
                          <option value="">Branch</option>
                          <optgroup > branch</optgroup>
                          <option value="CME">CME</option>
                          <option value="ECE">ECE</option>
                          <option value="EEE">EEE</option>
                          <option value="MECH">MECH</option>
                      </select>
                      <select id="subject" >
                          <option value="">Subject</option>
                          <option value="c">c</option>
                          <option value="c++">c++</option>
                          <option value="java">java</option>
                          <option value="python">python</option>
                          <option value="sql">sql</option>
                      </select>
                  </div>
                  <div className="header-right">

                  </div>
              </header>
              <div className="container">
                  <h1>Welcome to Our Educational Platform</h1>
                  <p>choose best for your future</p>
                  <div class="button">
                      <input type="text" name="quary" placeholder="search here"></input>
                      <button type="submit">Search</button>
                  </div>
              </div>
          </div> 
      );
    }
    export default Home
    