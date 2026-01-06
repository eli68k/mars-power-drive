import React from 'react';
import '../css/Screensaver.css';

const Screensaver = ({ isActive }) => {
  // Return null immediately if screensaver shouldn't be visible
  if (!isActive) return null;

  return (
    <div className="screensaver-overlay">
      <div className="screensaver-content">
        <h1 className="screensaver-title">MARS POWER DRIVE - BC</h1>
        <img 
            src="/images/mars_bc.jpg" 
            alt="Mars BC Team" 
            className="screensaver-image"
        />
        <p className="screensaver-hint">הזז את העכבר או לחץ על מקש כדי להתחיל</p>
      </div>
    </div>
  );
};

export default Screensaver;