import React, { useState } from 'react';
import TrainingModal from './TrainingModal';
import '../styles/PlayerCard.css';

const PlayerCard = ({ player }) => {
  // State initialization
  const [trainingPlan, setTrainingPlan] = useState(player.workPlan);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSavePlan = (newText) => {
    // Update local state immediately
    setTrainingPlan(newText);
    
    // TODO: Add API call here to save to DB if needed in this context
    
    // Close modal
    setIsModalOpen(false);
  };

  return (
    <div className="card-container">
      {/* Card Information Section */}
      <div className="card-header">
        <h3>תוכנית עבודה מקצועית 📋</h3>
        
        <div className="training-section">
            <label>🏀 אימון קליעות (לחץ לפירוט ועריכה):</label>
            
            {/* Clickable area to open the edit modal */}
            <div 
              className="dashed-box" 
              onClick={() => setIsModalOpen(true)}
            >
              {/* Truncate text if too long */}
              {trainingPlan.length > 60 
                ? trainingPlan.substring(0, 60) + '...' 
                : trainingPlan
              }
            </div>
        </div>

        {/* Static fields for display */}
        <div className="field-group">
            <label>💪 כושר גופני:</label>
            <input type="text" value="אירובי קל" disabled className="simple-input" />
        </div>
      </div>

      {/* Profile Section (Image & Details) */}
      <div className="card-profile">
         <img src={player.image} alt={player.name} className="player-img" />
         <h2>{player.name}</h2>
         <div className="details">
            <p><strong>📍 עמדה:</strong> {player.position}</p>
            <p><strong>👕 מספר:</strong> {player.number}</p>
         </div>
      </div>

      {/* Edit Modal */}
      <TrainingModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePlan}
        initialText={trainingPlan}
        title="אימון קליעות"
      />
    </div>
  );
};

export default PlayerCard;