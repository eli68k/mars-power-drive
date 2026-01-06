import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api/axios';
import '../css/CoachDashboard.css'; 
import PlayerModal from './PlayerModal'; 
import WelcomeMessage from './WelcomeMessage'; 

const CoachDashboard = ({ initialData }) => {
  const [players, setPlayers] = useState(initialData?.players || []);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (!players || players.length === 0) {
      loadPlayers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-refresh data when returning from edit mode
  useEffect(() => {
    const refreshData = async () => {
        if (location.state?.restorePlayerId) {
            const updatedList = await loadPlayers(); 
            const updatedPlayer = updatedList.find(p => p._id === location.state.restorePlayerId);
            if (updatedPlayer) {
                setSelectedPlayer(updatedPlayer); 
            }
        }
    };
    refreshData();
  }, [location.state]);

  const loadPlayers = async () => {
    try {
      const res = await api.get('/players');
      setPlayers(res.data);
      return res.data;
    } catch (err) {
      console.error("Error loading players:", err);
      return [];
    }
  };

  const handleSave = () => {
    loadPlayers();
  };

  const activePlayer = selectedPlayer ? players.find(p => p._id === selectedPlayer._id) : null;

  return (
    <div className="coach-container">
      <WelcomeMessage text="מסך ניהול שחקנים למאמנים" />

      <header className="coach-header">
        <div className="header-title">
            <h1>פיקוד מאמנים - Mars Power Drive 🏀</h1>
        </div>
        <button className="btn-logout" onClick={() => {localStorage.clear(); window.location.href='/login'}}>יציאה</button>
      </header>

      <div className="players-grid">
        {players.map(p => (
            <div key={p._id} className="player-card" style={{textAlign: 'center'}}>
                <img 
                    src={p.imageUrl} 
                    alt={p.name} 
                    style={{width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #3498db', marginBottom: '10px'}}
                    onError={(e) => {e.target.src = 'https://via.placeholder.com/80'}} 
                />
                <h3 className="player-name">{p.name}</h3>
                <span style={{fontSize: '14px', color: '#666', display: 'block', marginBottom: '10px'}}>
                #{p.jerseyNumber} | {p.position}
                </span>
                
                <button 
                    className="tab-btn active" 
                    style={{fontSize: '14px', padding: '5px 15px'}}
                    onClick={() => setSelectedPlayer(p)}
                >
                ניהול תוכנית / דף שחקן
                </button>
            </div>
        ))}
      </div>

      {activePlayer && (
        <PlayerModal 
            player={activePlayer} 
            onClose={() => setSelectedPlayer(null)} 
            onSave={handleSave}
        />
      )}
    </div>
  );
};

export default CoachDashboard;