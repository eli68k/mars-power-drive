import React from 'react';
import '../css/ShootingModal.css';

const NutritionModal = ({ isOpen, onClose, menuText }) => {
  if (!isOpen) return null;

  return (
    <div className="shooting-modal-overlay">
      {/* Modal Wrapper to ensure scrolling works properly */}
      <div className="modal-wrapper">

        <div className="shooting-modal-header" style={{background: 'linear-gradient(135deg, #3498db, #2980b9)'}}>
            <button onClick={onClose} className="btn-close-modal">✖ סגור</button>
            <h2>🥦 תפריט תזונה מומלץ</h2>
        </div>

        <div className="shooting-modal-body">
            <div className="readonly-content" style={{textAlign: 'right', whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '1.1rem'}}>
                {menuText || "לא הוזן תפריט תזונה."}
            </div>
        </div>

      </div>
    </div>
  );
};

export default NutritionModal;