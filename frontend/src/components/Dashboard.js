import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CoachDashboard from './CoachDashboard';
import PlayerDashboard from './PlayerDashboard';
import api from '../api/axios';
import '../css/Dashboard.css';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use configured axios instance (includes auth headers)
        const res = await api.get('/dashboard');
        
        // Determine user role from response
        const role = res.data.user ? res.data.user.role : res.data.role;
        
        setUserRole(role);
        setUserData(res.data);
        setLoading(false);

      } catch (err) {
        console.error("Dashboard Error:", err);
        // Handle authentication errors (401/403)
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
            handleLogout();
        } else {
            setError("שגיאה בטעינת נתונים. נסה לרענן.");
            setLoading(false);
        }
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <div className="loader-container"><div className="loader"></div><h3>טוען נתונים...</h3></div>;
  if (error) return <div className="dashboard-container center-content"><h2 className="error-text">{error}</h2></div>;

  // Render appropriate dashboard based on user role
  return (userRole === 'head-coach' || userRole === 'coach')
    ? <CoachDashboard initialData={userData} />
    : <PlayerDashboard initialData={userData} />;
};

export default Dashboard;