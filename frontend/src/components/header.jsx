import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../styles/home.css";

function Header() {
  const [search, setSearch] = useState(""); // State for search query
  const navigate = useNavigate(); // Hook for navigation

  // Handle search when user presses Enter or clicks search
  const handleSearch = () => {
    if (search.trim()) {
      // Assuming subject is either 'java' or 'cprogram'
      const subject = "cprogram"; 
      navigate(`/content?content=${search}&subject=${search}`);
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
        <button onClick={handleSearch} className="search-header">Search</button> {/* Add a Search button */}
      </div>
    </header>
  );
}

export default Header;
