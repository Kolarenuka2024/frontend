import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/home.css";
import "../styles/header.css";

function Header() {
  const [search, setSearch] = useState(""); 
  const [userName, setUserName] = useState(null); 
  const [showDropdown, setShowDropdown] = useState(false); 
  const navigate = useNavigate(); 
  const hideDropdownTimeout = useRef(null); 

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    console.log("Stored Username:", storedUsername); // Debugging

    if (storedUsername && storedUsername.trim() !== "") {
      setUserName(storedUsername);
    } else {
      setUserName(null);
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

  const handleLogout = () => {
    localStorage.removeItem("name"); 
    setUserName(null); 
    navigate("/");
  };

  const handleMouseEnter = () => {
    clearTimeout(hideDropdownTimeout.current); 
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    hideDropdownTimeout.current = setTimeout(() => {
      setShowDropdown(false);
    }, 1000);
  };

  const handleHome = () => {
    navigate("/home");
  }

  return (
    <header className="home-header">
      <div className="logo" onClick={handleHome}>Learn Hub</div>
      <div id="search" className="selection-container">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
        />
        <button onClick={handleSearch} className="search-header">Search</button> 
      </div>

      <div
        className="profile-container"
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave} 
      >
        <div className="profile-icon-1">
          {userName ? (
            <span className="profile-initial">{userName?.charAt(0)?.toUpperCase()}</span> 
          ) : (
            <span className="profile-initial">?</span>
          )}
        </div>

        {showDropdown && (
          <div className="profile-dropdown">
            <div className="dropdown-item" onClick={handleProfileClick}>Profile</div>
            <div className="dropdown-item" onClick={handleLogout}>Log out</div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
