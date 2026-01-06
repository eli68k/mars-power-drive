import React, { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Attempt login
      const res = await api.post('/login', { email, password });
      
      // Store token and user data in localStorage
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user)); 

      // Redirect based on user role
      if (res.data.user.role === 'player') {
        navigate('/player-zone'); 
      } else {
        navigate('/dashboard');   
      }
      
    } catch (err) {
      console.error(err);
      alert('שגיאה בהתחברות: בדוק את האימייל והסיסמה');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">🚀 MARS BC 🏀 ACCESS</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input 
            className="login-input"
            type="email" 
            placeholder="אימייל" 
            value={email} 
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input 
            className="login-input"
            type="password" 
            placeholder="סיסמה" 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-btn">
            התחבר למערכת
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;