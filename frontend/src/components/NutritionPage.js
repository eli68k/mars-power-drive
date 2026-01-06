import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/FullPage.css';

const NutritionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract data from router state
  const { text, playerId, returnPath } = location.state || {};

  const handleBack = () => {
    if (returnPath && playerId) {
        navigate(returnPath, { state: { restorePlayerId: playerId } });
    } else {
        navigate(-1);
    }
  };

  return (
    <div className="full-page-container">
      <div className="page-header header-nutrition">
        <h1 className="page-title">🥦 תפריט תזונה</h1>
        <button className="btn-back" onClick={handleBack}>חזור לחלון השחקן ↩</button>
      </div>
      <div className="page-content">
        <pre className="text-content">{text || "לא הוזן תפריט תזונה"}</pre>
      </div>
    </div>
  );
};

export default NutritionPage;