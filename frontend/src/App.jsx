import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './components/signup';
import Home from './components/home';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </Router>
  );
}
export default App
