import React from 'react';
import {BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import './App.css';
import Blog from './pages/Blog';
import Home from './pages/Home';
import Header from './components/Header/Header';
import Footer from './Footer';


const App = () => {
  return (
    <div className='container'>
    
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        
      </Routes>
    </Router>
    <Header />
  </div>
  
  );
};

export default App;