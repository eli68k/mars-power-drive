import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/FullPage.css';

const FitnessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract data passed via router state (from PlayerDashboard)
  const { text, playerId, returnPath } = location.state || {}; 

  const handleBack = () => {
    // If we have a specific return path (e.g., back to dashboard with modal open)
    if (returnPath && playerId) {
        navigate(returnPath, { state: { restorePlayerId: playerId } });
    } else {
        // Fallback: standard browser back
        navigate(-1);
    }
  };

  return (
    <div className="full-page-container">
      <div className="page-header header-fitness">
        <h1 className="page-title">💪 תוכנית כושר גופני</h1>
        <button className="btn-back" onClick={handleBack}>חזור לחלון השחקן ↩</button>
      </div>

      <div className="content-box">
        <div className="text-content">
          {text || "לא נמצאה תוכנית כושר."}
        </div>
      </div>
    </div>
  );
};

export default FitnessPage;