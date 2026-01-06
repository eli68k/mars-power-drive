import React, { useState, useEffect } from 'react';
import '../css/ShootingModal.css';

const ShootingModal = ({ isOpen, onClose, drills, onSave, isReadOnly }) => {
  const [text, setText] = useState(drills);

  useEffect(() => {
    setText(drills);
  }, [drills]);

  const handleSave = () => {
    // Extract summary from the first line
    const lines = text.split('\n');
    const firstLine = lines[0] || 'אימון ללא כותרת'; 
    const summary = firstLine.length > 30 ? firstLine.substring(0, 30) + '...' : firstLine;
    onSave(text, summary);
  };

  if (!isOpen) return null;

  return (
    <div className="shooting-modal-overlay">
      <div className="modal-wrapper">
        
        <div className="shooting-modal-header" style={{background: 'linear-gradient(135deg, #e67e22, #f39c12)'}}>
           <button onClick={onClose} className="btn-close-modal">✖ סגור</button>
           <h2>🏀 אימון קליעה</h2>
        </div>

        <div className="shooting-modal-body">
            {isReadOnly ? (
                /* Read-Only View */
                <div style={{textAlign: 'right', whiteSpace: 'pre-wrap', lineHeight: '1.6'}}>
                    {text}
                </div>
            ) : (
                /* Edit Mode */
                <textarea
                    style={{
                        width: '100%', 
                        height: '300px', 
                        padding: '10px', 
                        borderRadius: '5px', 
                        border: '1px solid #ddd', 
                        fontFamily: 'inherit',
                        resize: 'vertical'
                    }}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            )}
            
            {!isReadOnly && (
                <div style={{marginTop: '15px', display: 'flex', gap: '10px'}}>
                    <button onClick={handleSave} style={{flex:1, padding:'10px', background:'#27ae60', color:'white', border:'none', borderRadius:'5px', cursor:'pointer', fontWeight:'bold'}}>שמור וסגור</button>
                    <button onClick={onClose} style={{flex:1, padding:'10px', background:'#e74c3c', color:'white', border:'none', borderRadius:'5px', cursor:'pointer', fontWeight:'bold'}}>ביטול</button>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default ShootingModal;