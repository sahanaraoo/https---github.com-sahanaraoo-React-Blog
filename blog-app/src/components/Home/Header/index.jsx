import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './style.css';

const Header = () => {
  return (
    <header className="home-header">
      <h1 className='heading'> 
       
          <span>"</span> Inkspire <span>"</span>
        
      </h1>
      <h2>Blog</h2>
      <br />
      <p>The Best Place for Daily Updates.</p>
    </header>
  );
};

export default Header;
