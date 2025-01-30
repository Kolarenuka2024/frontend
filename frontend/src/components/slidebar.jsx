import React, { useState, useEffect } from 'react';
import './Slidebar.css';

const Slidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Fetch data from PHP backend
    fetch('http://localhost/your_project_folder/get_data.php')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <button onClick={toggleSidebar} className="open-btn">☰</button>
      <div className={`slidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>×</button>
        <ul>
          {data.map(item => (
            <li key={item.id}>
              <a href="#">{item.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Slidebar;
