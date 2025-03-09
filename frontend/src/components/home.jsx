import "../styles/home.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./header";
function Home() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate(); 
  
  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/content?content=${search}&subject=${search}`);
    }
  };

  return (
    <>
    <div className="home-container">
    <Header/>
      <div className="container-home">
        <h1>Welcome to Our Educational Platform</h1>
        <p>Choose the best for your future</p>
          <input type="text" name="query" placeholder="Search here" value={search}
          onChange={(e) => setSearch(e.target.value)} />
          <button type="submit" onClick={handleSearch} className="button">Search</button>
      </div>
      <div className="local">
        <div className="box">
            <h2>python</h2>
            <button>check</button>
       </div>
        <div className="box">
        <h2>java</h2>
        <button>check</button>
        </div>
        <div className="box">
        <h2>c++</h2>
        <button>check</button>
        </div>
         </div><br></br><br></br><br></br><br></br>
         <div className="local">
         <div className="box">
            <h2>c programming</h2>
            <button>check</button>
       </div>
        <div className="box">
        <h2>sql</h2>
        <button>check</button>
        </div>
        <div className="box">
        <h2>web designing</h2>
        <button>check</button>
        </div>
        </div>

    </div>
    </>
  );
}

export default Home;