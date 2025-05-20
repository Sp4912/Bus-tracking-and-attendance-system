import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaUserTie,
  FaCarSide,
  FaBusAlt,
  FaSignOutAlt,
  FaUserGraduate,
  FaChartLine
} from 'react-icons/fa';
import './AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/admin-login'); // or wherever your admin-login lives
  };

  const cards = [
    { label: 'Attenders', icon: <FaUserTie size={40} />, path: '/attenders' },
    { label: 'Drivers', icon: <FaCarSide size={40} />, path: '/drivers' },
    { label: 'Buses', icon: <FaBusAlt size={40} />, path: '/buses' },
    { label: 'Students', icon: <FaUserGraduate size={40} />, path: '/students' },
    
  ];

  return (
    <div className="dashboard">
      <div className="main-content">
        <header className="header">
      
      <button className="navbar-btn" onClick={logout}>
        <FaSignOutAlt className="icon" /> Logout
      </button>
  

          <h1>Welcome Admin!</h1>
          <p></p>
        </header>

        <section className="dashboard-cards">
          {cards.map((card) => (
            <div
              key={card.label}
              className="card"
              onClick={() => navigate(card.path)}
            >
              {card.icon}
              <h4>{card.label}</h4>
            </div>
          ))}
        </section>

        <section className="analytics">
          
        </section>
      </div>
    </div>
  );
}

export default AdminDashboard;
