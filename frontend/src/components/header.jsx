import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/home.css";
import "../styles/header.css";

function Header() {
  const [search, setSearch] = useState(""); 
  const [initial, setInitial] = useState(""); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setInitial(storedUsername.charAt(0).toUpperCase()); 
    }
  }, []);

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/content?content=${search}&subject=${search}`); 
    }
  };

  const handleProfileClick = () => {
    navigate("/profile"); 
  };

  return (
    <header className="home-header">
      <div className="logo">My Website Logo</div>
      <div id="search" className="selection-container">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
        <button onClick={handleSearch} className="search-header">Search</button> 
      </div>

      {/* Profile Section - First Letter of Username */}
      <div className="profile-container" onClick={handleProfileClick}> 
        <div className="profile-initial">{initial || "?"}</div>
      </div>
    </header>
  );
}

export default Header;
