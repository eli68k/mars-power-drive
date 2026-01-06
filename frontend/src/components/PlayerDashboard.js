import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../css/CoachDashboard.css'; 
import WelcomeMessage from './WelcomeMessage';

const PlayerDashboard = () => {
  const [player, setPlayer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setPlayer(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const calculateAge = (dateString) => {
    if (!dateString || dateString === 'לא צוין') return '---';
    const parts = dateString.split('/');
    if (parts.length !== 3) return '---';
    const birthDate = new Date(parts[2], parts[1] - 1, parts[0]);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  if (!player) return <div style={{textAlign:'center', marginTop:'50px'}}>טוען נתונים...</div>;

  return (
    <div className="coach-container">
      <WelcomeMessage text={`ל${player.name} - ברוך הבא לאזור האישי`} />

      <header className="coach-header">
         <div className="header-title"><h1>האזור האישי - Mars Power Drive 🏀</h1></div>
         <button className="btn-logout" onClick={() => {localStorage.clear(); window.location.href='/login'}}>יציאה</button>
      </header>

      <div style={{display:'flex', justifyContent:'center', marginTop:'20px'}}>
        <div className="player-modal-content" style={{width:'100%', maxWidth:'1000px', border:'1px solid #ddd', boxShadow:'none', position: 'static', background: 'white'}}>
            <div className="modal-body">
                {/* Right Side - Details */}
                <div className="player-details-side">
                    <img src={player.imageUrl} alt={player.name} className="player-large-img" onError={(e) => {e.target.src = 'https://via.placeholder.com/150'}} />
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
                    <h2 className="form-title">📋 התוכנית המקצועית שלי</h2>
                    
                    {/* 1. Shooting Button (View Only) */}
                    <div className="form-group">
                        <label className="form-label">🏀 אימון קליעה:</label>
                        <div 
                            onClick={() => navigate('/shooting', { 
                                state: { 
                                    text: player.trainingPlan?.shootingDrills, 
                                    title: player.trainingPlan?.shooting, 
                                    isReadOnly: true, // Enable Read-Only mode for players
                                    playerId: player._id 
                                } 
                            })}
                            className="clickable-input"
                            style={{border: '2px dashed #e67e22', background: '#fffdf0', color: '#e67e22'}}
                        >
                             <span>{player.trainingPlan?.shooting || 'אין נתונים'}</span>
                             <span style={{fontSize: '0.8rem'}}>פתח דף מלא 👈</span>
                        </div>
                    </div>

                    {/* 2. Fitness Button */}
                    <div className="form-group">
                        <label className="form-label">💪 כושר גופני:</label>
                        <div 
                            onClick={() => navigate('/fitness', { state: { text: player.trainingPlan?.fitnessDrills, title: 'כושר גופני', type: 'fitness' } })}
                            className="clickable-input"
                            style={{border: '2px solid #27ae60', background: '#f0fff4', color: '#27ae60'}}
                        >
                            <span>{player.trainingPlan?.fitness || 'אין נתונים'}</span>
                            <span style={{fontSize: '0.8rem'}}>פתח דף מלא 👁️</span>
                        </div>
                    </div>

                    {/* 3. Nutrition Button */}
                    <div className="form-group">
                        <label className="form-label">🥦 תזונה:</label>
                        <div 
                            onClick={() => navigate('/nutrition', { state: { text: player.nutritionMenu, title: 'תפריט תזונה', type: 'nutrition' } })}
                            className="clickable-input"
                            style={{border: '2px solid #3498db', background: '#f0f8ff', color: '#2980b9'}}
                        >
                            <span>{player.nutritionPlan || 'תפריט מאוזן'}</span>
                            <span style={{fontSize: '0.8rem'}}>פתח דף מלא 🥗</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard;