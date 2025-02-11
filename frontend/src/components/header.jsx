import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "../styles/home.css";
import "../styles/header.css";

function Header() {
  const [search, setSearch] = useState(""); 
  const [profileImage, setProfileImage] = useState(null); // For storing the image
  const navigate = useNavigate(); 

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/content?content=${search}&subject=${search}`);
    }
  };

  // Handle image change and file reader
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result); // Set base64 result
      };
      reader.readAsDataURL(file);  // Read as base64 URL
    }
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

      {/* Profile Section */}
      <div className="profile">
        <label htmlFor="profile-upload" className="profile-container">
          <input 
            id="profile-upload" 
            type="file" 
            className="profile-input" 
            onChange={handleProfileImageChange} 
            style={{ display: "none" }} 
          />
          <div className="profile-image-container">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="profile-image" />
            ) : (
              <span className="profile-placeholder">+</span> 
            )}
          </div>
        </label>
      </div>
    </header>
  );
}

export default Header;
