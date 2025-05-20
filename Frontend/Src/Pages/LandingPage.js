import React from 'react';
import './LandingPage.css';
import { FaUserShield, FaUserTie } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>Welcome to School Bus Attendance & Tracking System</h1>
      <p>Select your login type to proceed</p>

      <div className="login-options">
        <div className="login-card" onClick={() => navigate('/admin-login')}>
          <FaUserShield size={50} className="icon" />
          <h3>Admin Login</h3>
        </div>

        <div className="login-card" onClick={() => navigate('/attender-login')}>
          <FaUserTie size={50} className="icon" />
          <h3>Attender Login</h3>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
