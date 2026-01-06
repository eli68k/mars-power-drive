import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/PlayerModal.css';

const PlayerModal = ({ player, onClose }) => {
  const navigate = useNavigate();
  
  // Helper to calculate age from birthdate string (DD/MM/YYYY)
  const calculateAge = (dateString) => {
    if (!dateString) return '';
    const parts = dateString.split('/');
    if (parts.length < 3) return '';
    const birthDate = new Date(parts[2], parts[1] - 1, parts[0]);
    const ageDifMs = Date.now() - birthDate.getTime();
    return Math.abs(new Date(ageDifMs).getUTCFullYear() - 1970);
  };

  // Navigation handler that preserves current data state
  const navigateToPage = (path, textData, titleData = '') => {
      navigate(path, { 
          state: { 
              text: textData, 
              title: titleData,
              // Pass the full plan to ensure no data is lost during navigation
              fullPlan: player.trainingPlan, 
              playerId: player._id, 
              returnPath: '/dashboard'
          } 
      });
  };

  if (!player) return null;

  return (
    <div className="player-modal-overlay">
      <div className="player-modal-content">
        <button onClick={onClose} className="close-btn">✖ סגור</button>
        
        <div className="modal-body">
            {/* Right Side - Player Details */}
            <div className="player-details-side">
                <img src={player.imageUrl} alt={player.name} className="player-large-img" onError={(e) => e.target.src = 'https://via.placeholder.com/150'}/>
                <h2 className="player-name-red">{player.name}</h2>
                <div className="details-list">
                    <p><strong>📍 עמדה:</strong> {player.position}</p>
                    <p><strong>👕 מספר:</strong> {player.jerseyNumber}</p>
                    <p><strong>📏 גובה:</strong> {player.height} מ'</p>
                    <p><strong>🎂 גיל:</strong> {calculateAge(player.birthDate)}</p>
                </div>
            </div>

            {/* Left Side - Professional Plans */}
            <div className="form-side">
                <h2 className="form-title">📋 תוכנית עבודה מקצועית</h2>
                
                {/* Shooting Plan */}
                <div className="form-group">
                    <label className="form-label">🏀 אימון קליעה:</label>
                    <div 
                        className="clickable-input orange-border"
                        onClick={() => navigateToPage('/shooting', player?.trainingPlan?.shootingDrills, player?.trainingPlan?.shooting)}
                    >
                        <span>{player?.trainingPlan?.shooting || 'אין תוכנית'}</span>
                        <span>✎ ערוך</span>
                    </div>
                </div>

                {/* Fitness Plan */}
                <div className="form-group">
                    <label className="form-label">💪 כושר גופני:</label>
                    <div 
                        className="clickable-input green-border"
                        onClick={() => navigateToPage('/fitness', player?.trainingPlan?.fitnessDrills)}
                    >
                        <span>{player?.trainingPlan?.fitness || 'תוכנית כושר'}</span>
                        <span>👁️ צפה</span>
                    </div>
                </div>

                {/* Nutrition Plan */}
                <div className="form-group">
                    <label className="form-label">🥦 תזונה:</label>
                    <div 
                        className="clickable-input blue-border"
                        onClick={() => navigateToPage('/nutrition', player?.nutritionMenu)}
                    >
                        <span>{player?.nutritionPlan || 'תפריט תזונה'}</span>
                        <span>🥗 צפה</span>
                    </div>
                </div>

                <div className="btn-actions">
                    <button onClick={onClose} className="btn-cancel" style={{width:'100%'}}>סגור חלון</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerModal;