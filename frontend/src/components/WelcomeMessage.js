import React, { useState, useEffect } from 'react';
import '../css/WelcomeMessage.css';

const WelcomeMessage = ({ text }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide message after 4 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="welcome-toast-overlay">
      <div className="welcome-toast-box">
        {text}
      </div>
    </div>
  );
};

export default WelcomeMessage;