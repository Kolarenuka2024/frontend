import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../styles/home.css";

function Header() {
  const [search, setSearch] = useState(""); // State for search query
  const navigate = useNavigate(); // Hook for navigation

  // Handle search when user presses Enter or clicks search
  const handleSearch = () => {
    if (search.trim()) {
      // Navigate to the content page with the search term
      navigate(`/content?content=${search}`);
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
        <button onClick={handleSearch}>Search</button> {/* Add a Search button */}
      </div>
    </header>
  );
}

export default Header;
