import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './Component/landing/LandingPage';
import Contact from './Component/Contact/Contact';
import Courses from './Component/Courses/Courses'; 
import Admin from './Component/Admin/Admin';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<Courses />} /> 
        <Route path="/admin" element={<Admin />} /> 

        

      </Routes>
    </Router>
  );
}

export default App;
