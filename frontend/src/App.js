import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './components/Login';
import CoachDashboard from './components/CoachDashboard';
import PlayerDashboard from './components/PlayerDashboard';
import ShootingPage from './components/ShootingPage';
import FitnessPage from './components/FitnessPage';
import NutritionPage from './components/NutritionPage';

// ייבוא שומר המסך
import Screensaver from './components/Screensaver';

const AppContent = () => {
  const location = useLocation();
  const [isScreensaverActive, setIsScreensaverActive] = useState(false);
  
  // בדיקה האם אנחנו במסך לוגין
  const isLoginPage = location.pathname === '/' || location.pathname === '/login';

  // פונקציה להפעלת שומר המסך
  const activateScreensaver = useCallback(() => {
    if (!isLoginPage) {
      setIsScreensaverActive(true);
    }
  }, [isLoginPage]);

  // פונקציה לאיפוס הטיימר (קורית רק כשיש תזוזה)
  const resetTimer = useCallback(() => {
    // 1. ברגע שיש תזוזה - מסתירים את שומר המסך
    setIsScreensaverActive(false);
    
    // 2. מנקים את הטיימר הישן
    if (window.screensaverTimeout) {
      clearTimeout(window.screensaverTimeout);
    }

    // 3. מתחילים ספירה חדשה של דקה (רק אם לא בלוגין)
    if (!isLoginPage) {
      window.screensaverTimeout = setTimeout(activateScreensaver, 60000); 
    }
  }, [activateScreensaver, isLoginPage]);

  useEffect(() => {
    // אירועים שמבטלים את שומר המסך
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    
    events.forEach(event => {
      window.addEventListener(event, resetTimer);
    });

    // --- התיקון נמצא כאן ---
    if (!isLoginPage) {
        // אם עברנו לוגין בהצלחה - נדליק את המסך מיד!
        setIsScreensaverActive(true);
        
        // הערה חשובה: מחקנו מכאן את resetTimer()
        // כעת המערכת מחכה שתזיז את העכבר כדי להתחיל את הספירה לאחור
    } else {
        // אם חזרנו ללוגין - מכבים הכל
        setIsScreensaverActive(false);
        if (window.screensaverTimeout) clearTimeout(window.screensaverTimeout);
    }

    // ניקוי ביציאה
    return () => {
      events.forEach(event => {
        window.removeEventListener(event, resetTimer);
      });
      if (window.screensaverTimeout) clearTimeout(window.screensaverTimeout);
    };
  }, [resetTimer, isLoginPage]);

  return (
    <>
      <Screensaver isActive={isScreensaverActive} />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        
        <Route path="/dashboard" element={<CoachDashboard />} />
        <Route path="/player-zone" element={<PlayerDashboard />} />

        <Route path="/shooting" element={<ShootingPage />} />
        <Route path="/fitness" element={<FitnessPage />} />
        <Route path="/nutrition" element={<NutritionPage />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;