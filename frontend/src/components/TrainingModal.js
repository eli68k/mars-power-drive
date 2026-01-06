import React, { useState, useEffect } from 'react';
import '../styles/TrainingModal.css';

const TrainingModal = ({ isOpen, onClose, onSave, initialText }) => {
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        
        {/* Header */}
        <div className="modal-header">
          <button onClick={onClose} className="close-btn">✖ סגור</button>
          <h2>🏀 אימון קליעה</h2> 
        </div>

        {/* Body */}
        <div className="modal-body">
          <textarea
            className="plan-editor"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="פרט כאן את מהלך האימון..."
          />
        </div>

        {/* Footer Actions */}
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>ביטול ללא שמירה</button>
          <button 
            className="btn-save" 
            onClick={() => onSave(text)} 
          >
            💾 שמור ועדכן כרטיס שחקן
          </button>
        </div>

      </div>
    </div>
  );
};

export default TrainingModal;