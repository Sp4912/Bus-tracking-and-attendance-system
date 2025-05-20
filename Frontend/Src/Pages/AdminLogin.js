
import React, { useState, useEffect } from 'react';
import { FaUserShield ,FaArrowLeft} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { loginAdmin } from '../services/adminService';
import './AdminLogin.css';

function AdminLogin() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [form, setForm] = useState({ email: '', password: '', role: 'Admin' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await loginAdmin(form);
      // data.token contains the JWT
      localStorage.setItem('token', data.token);
       localStorage.setItem('user', JSON.stringify(data.user));  // ← store role
      navigate('/admin-dashboard');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className={`admin-login-container ${isLoaded ? 'loaded' : ''}`}>
     
      <div className="login-card">
        <div className="icon-header">
          <FaUserShield size={50} />
          <h2>Admin Login</h2>
        </div>
        {error && <div className="error-msg">{error}</div>}
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <label htmlFor="role">Role</label>
          <select
            name="role"
            id="role"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="Admin">Admin</option>
          </select>

          <button type="submit">Login</button>
          <button  onClick={() => navigate(-1)}>
              Back
            </button>
        </form>
        
      </div>
      
    </div>
  );
}

export default AdminLogin;
