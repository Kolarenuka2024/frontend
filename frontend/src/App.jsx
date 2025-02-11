import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './components/signup';
import Home from './components/home';
import Questions from './components/questions';
import ContentPage from './components/content';
import Inter from './components/interview';
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/content" element={<ContentPage />} />
      <Route path="/interview" element={<Inter/>} />
    </Routes>
  </Router>
  );
}
export default App
