// src/components/Home.js
import React from 'react';
import runningShoeImage from './running_shoe.jpeg';

import './Home.css'; // Create this CSS file for Home component styles

const Home = () => {
  return (
    <div className="container">
     <h1 style={{ textAlign: 'center', margin: '0', padding: '20px' }}>
  Welcome to Shoe Shop!
</h1>

      {/* <p>Find the best shoes for your style and comfort.</p> */}
      <div className="image-container">
      <img src={runningShoeImage} alt="Stylish Running Shoes" />
      </div>
      <h2 style={{ textAlign: 'center', margin: '0', padding: '20px' }}>
  Shop Now!
</h2>
    </div>
  );
};

export default Home;
