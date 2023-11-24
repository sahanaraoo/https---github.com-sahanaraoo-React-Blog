import React from 'react';
import {BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import './App.css';
import Blog from './pages/Blog';
import Home from './pages/Home';

const App = () => {
  return (
    <div className='container'>
        <Router>
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
      </Router>
    </div>
  );
};

export default App;