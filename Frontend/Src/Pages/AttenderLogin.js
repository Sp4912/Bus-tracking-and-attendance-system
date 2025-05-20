// import React, { useState, useEffect } from 'react';
// import './AttenderLogin.css';
// import { FaUserTie } from 'react-icons/fa';

// function AttenderLogin() {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     const timer = setTimeout(() => setIsLoaded(true), 500);
//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <div className={`attender-login-container ${isLoaded ? 'loaded' : ''}`}>
//       <div className="login-card">
//         <div className="icon-header">
//           <FaUserTie size={50} />
//           <h2>Attender Login</h2>
//         </div>
//         <form className="login-form">
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             id="username"
//             placeholder="Enter your username"
//             required
//           />

//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             placeholder="Enter your password"
//             required
//           />

//           <label htmlFor="role">Role</label>
//           <select id="role" required>
//             <option value="">Select Role</option>
//             <option value="attender">Attender</option>
//           </select>

//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AttenderLogin;
import React, { useState, useEffect } from 'react';
import { FaUserTie } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { loginAttender } from '../services/attenderService';
import './AttenderLogin.css';

function AttenderLogin() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'Attender'
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(t);
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await loginAttender(form);
      // data.token and data.attender
      // localStorage.setItem('token', data.token);
      // localStorage.setItem('attender', JSON.stringify(data.attender));
      // navigate('/attender-dashboard');
      localStorage.setItem('token', data.token);
localStorage.setItem('user', JSON.stringify(data.attender));  // ← key must be 'user'
navigate('/attendance-dashboard');

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className={`attender-login-container ${isLoaded ? 'loaded' : ''}`}>
      <div className="login-card">
        <div className="icon-header">
          <FaUserTie size={50} />
          <h2>Attender Login</h2>
        </div>
        {error && <div className="error-msg">{error}</div>}
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />

          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="Attender">Attender</option>
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

export default AttenderLogin;
