import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api/axios'; 
import '../css/FullPage.css';

const ShootingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { text: initialText, title: initialTitle, isReadOnly, playerId, returnPath } = location.state || {};
  
  const [text, setText] = useState(initialText || '');
  const [title, setTitle] = useState(initialTitle || '');

  // Calculate total shots from text using Regex
  const calculateTotalShots = (inputText) => {
    const regex = /(\d+)\s+זריקות/g;
    let match;
    let total = 0;
    while ((match = regex.exec(inputText)) !== null) {
        total += parseInt(match[1], 10);
    }
    return total;
  };

  const handleTextChange = (e) => {
      const newText = e.target.value;
      setText(newText);
      const total = calculateTotalShots(newText);
      if (total > 0) {
          setTitle(`${total} זריקות`);
      }
  };

  const handleBack = () => {
      if (returnPath && playerId) {
          navigate(returnPath, { state: { restorePlayerId: playerId } });
      } else {
          navigate(-1);
      }
  };

  const handleSave = async () => {
    if (!playerId) {
        alert("שגיאה: חסר מזהה שחקן");
        return;
    }
    try {
      // Retrieve current player data to avoid overwriting other fields
      const response = await api.get('/players'); 
      const currentPlayer = response.data.find(p => p._id === playerId);
      if (!currentPlayer) return;

      const currentPlan = currentPlayer.trainingPlan || {};
      const updatedTrainingPlan = {
          ...currentPlan,        
          shootingDrills: text,  
          shooting: title        
      };

      await api.post(`/propose-update/${playerId}`, {
        trainingPlan: updatedTrainingPlan
      });
      
      alert(`✅ נשמר בהצלחה!\nכותרת האימון עודכנה ל: ${title}`);
      handleBack(); 
    } catch (err) {
      console.error(err);
      alert('❌ שגיאה בשמירה');
    }
  };

  return (
    <div className="full-page-container">
      <div className="page-header header-shooting">
        <h1 className="page-title">
            {isReadOnly ? "🏀 אימון קליעה (צפייה)" : "🏀 עריכת אימון קליעה"}
        </h1>
        <button className="btn-back" onClick={handleBack}>חזור ↩</button>
      </div>

      <div className="content-box">
        {isReadOnly ? (
          /* View Mode (Player) */
          <>
            <div style={{
                textAlign: 'center', 
                marginBottom: '25px', 
                padding: '15px', 
                background: '#fffdf0', 
                border: '2px dashed #e67e22', 
                borderRadius: '10px'
            }}>
                <h2 style={{margin: 0, color: '#d35400', fontSize: '2rem'}}>{title || 'אימון ללא כותרת'}</h2>
            </div>
            
            <div className="text-content">
                {text || "טרם הוזן פירוט תרגילים."}
            </div>
          </>
        ) : (
          /* Edit Mode (Coach) */
          <>
            <div style={{marginBottom: '20px'}}>
                <label style={{fontWeight:'bold', display:'block', marginBottom:'5px', color:'#333'}}>כותרת האימון:</label>
                <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    style={{
                        width: '100%', 
                        padding: '10px', 
                        fontSize: '1.2rem', 
                        borderRadius: '5px', 
                        border: '1px solid #e67e22', 
                        background: '#fffdf0',
                        fontWeight: 'bold',
                        color: '#d35400'
                    }}
                />
            </div>

            <label style={{fontWeight:'bold', display:'block', marginBottom:'5px', color:'#333'}}>פירוט התרגילים:</label>
            <textarea 
              className="edit-textarea" 
              value={text} 
              onChange={handleTextChange}
              placeholder="כתוב כאן..."
            />
            <div className="action-buttons">
              <button className="btn-save" onClick={handleSave}>💾 שמור שינויים ועדכן שחקן</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ShootingPage;