import React from 'react';
import '../css/ShootingModal.css';

const FitnessModal = ({ isOpen, onClose, planText }) => {
  if (!isOpen) return null;

  return (
    <div className="shooting-modal-overlay">
      {/* Modal Wrapper to ensure scrolling works properly */}
      <div className="modal-wrapper">
        
        <div className="shooting-modal-header" style={{background: 'linear-gradient(135deg, #27ae60, #2ecc71)'}}>
            <button onClick={onClose} className="btn-close-modal">✖ סגור</button>
            <h2>💪 תוכנית כושר גופני</h2>
        </div>

        <div className="shooting-modal-body">
            <div className="readonly-content" style={{textAlign: 'right', whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '1.1rem'}}>
                {planText || "לא הוזנה תוכנית כושר."}
            </div>
        </div>

      </div>
    </div>
  );
};

export default FitnessModal;