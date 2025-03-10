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
import ProfilePage from './components/profile';
import { ProfileProvider } from "./context/ProfileContext";
function App() {
  return (
    <>
    <ProfileProvider>
    <Router>
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/content" element={<ContentPage />} />
      <Route path="/interview" element={<Inter/>} />
      <Route path="/profile" element={<ProfilePage/>}/>
    </Routes>
  </Router>
  </ProfileProvider>
  </>
  );
}
export default App
