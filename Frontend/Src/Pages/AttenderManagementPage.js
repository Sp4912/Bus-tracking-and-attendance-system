
import React, { useState, useEffect } from 'react';
import './AttenderManagementPage.css';
import axios from 'axios';
import { FaUserPlus, FaEdit, FaTrash, FaUsers,FaArrowLeft, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/attenders';

// 🔐 Helper to get token config
const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export function RegisterAttender() {
  const [form, setForm] = useState({
    attenderId: '',
    name: '',
    email: '',
    password: '',
    role: 'attender',
    assignedBusNo: '',
    contact: '',
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/register`, form, getAuthConfig());
      alert('Attender registered');
    } catch (err) {
      alert(err.response?.data?.message || 'Error registering attender');
    }
  };

  return (
    <div className="section-content">
      <h2>Register Attender</h2>
      <form onSubmit={handleSubmit}>
        <input name="attenderId" placeholder="Attender ID" onChange={handleChange} required />
        <input name="name" placeholder="Name" onChange={handleChange} required />
        <input name="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="assignedBusNo" placeholder="Assigned Bus No" onChange={handleChange} required />
        <input name="contact" placeholder="Contact" onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}


export function UpdateAttender() {
  const [attenderId, setAttenderId] = useState('');
  const [form, setForm] = useState({
    name: '',
    email: '',
    assignedBusNo: '',
    contact: '',
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleIdChange = e => setAttenderId(e.target.value);

  const handleFetch = async () => {
    if (!attenderId.trim()) {
      alert("Please enter an Attender ID");
      return;
    }
    try {
      const res = await axios.get(`${API_URL}/${attenderId}`, getAuthConfig());
      setForm({
        name: res.data.name || '',
        email: res.data.email || '',
        assignedBusNo: res.data.assignedBusNo || '',
        contact: res.data.contact || '',
      });
    } catch (err) {
      alert(err.response?.data?.message || 'Attender not found');
      setForm({ name: '', email: '', assignedBusNo: '', contact: '' });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${attenderId}`, form, getAuthConfig());
      alert('Attender updated successfully');
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating attender');
    }
  };

  return (
    <div className="section-content">
      <h2>Update Attender Details</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Attender ID"
          value={attenderId}
          onChange={handleIdChange}
          required
        />
        <button type="button" onClick={handleFetch}>Fetch</button>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="assignedBusNo"
          placeholder="Assigned Bus No"
          value={form.assignedBusNo}
          onChange={handleChange}
          required
        />
        <input
          name="contact"
          placeholder="Contact"
          value={form.contact}
          onChange={handleChange}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}


export function DeleteAttender() {
  // Now using attenderId
  const [attenderId, setAttenderId] = useState('');

  const handleDelete = async e => {
    e.preventDefault();
    try {
      await axios.delete(`${API_URL}/${attenderId}`, getAuthConfig());
      alert('Attender deleted');
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting attender');
    }
  };

  return (
    <div className="section-content">
      <h2>Delete Attender</h2>
      <form onSubmit={handleDelete}>
        <input
          placeholder="Attender ID"
          value={attenderId}
          onChange={e => setAttenderId(e.target.value)}
          required
        />
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}

export function AllAttenders() {
  const [attenders, setAttenders] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL, getAuthConfig())
      .then(res => setAttenders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="section-content">
      <h2>All Attenders</h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              
              <th style={thStyle}>Attender ID</th>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Assigned Bus</th>
              
            </tr>
          </thead>
          <tbody>
            {attenders.map((attender, index) => (
              <tr key={attender._id}>
                
                <td style={tdStyle}>{attender.attenderId}</td>
                <td style={tdStyle}>{attender.name}</td>
                <td style={tdStyle}>{attender.email}</td>
                <td style={tdStyle}>{attender.contact}</td>
                <td style={tdStyle}>{attender.assignedBusNo}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
const thStyle = {
  padding: '12px',
  border: '1px solid #ccc',
  textAlign: 'left',
  fontWeight: 'bold',
};

const tdStyle = {
  padding: '10px',
  border: '1px solid #ddd',
};

export function GetAttenderById() {
  const [attenderId, setAttenderId] = useState('');
  const [attender, setAttender] = useState(null);

  const fetchAttender = async e => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/${attenderId}`, getAuthConfig());
      setAttender(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Attender not found');
    }
  };

  return (
    <div className="section-content">
      <h2>Get Attender by ID</h2>
      <form onSubmit={fetchAttender}>
        <input
          value={attenderId}
          onChange={e => setAttenderId(e.target.value)}
          placeholder="Attender ID"
          required
        />
        <button type="submit">Fetch</button>
      </form>
      {attender && (
        <div className="attender-details">
          <p><strong>Name:</strong> {attender.name}</p>
          <p><strong>Email:</strong> {attender.email}</p>
          <p><strong>Assigned Bus:</strong> {attender.assignedBusNo}</p>
          <p><strong>Contact:</strong> {attender.contact}</p>
        </div>
      )}
    </div>
  );
}

function AttenderManagementPage() {
  const [active, setActive] = useState('register');
  const navigate = useNavigate();

 
      

  const renderSection = () => {
    switch (active) {
      case 'register': return <RegisterAttender />;
      case 'update': return <UpdateAttender />;
      case 'delete': return <DeleteAttender />;
      case 'all': return <AllAttenders />;
      case 'get': return <GetAttenderById />;
      default: return null;
    }
  };

  return (
    <div className="attender-management">
      <aside className="sidebar">
      <button className="navbar1-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft className="icon" /> Back
      </button>
        <h2>Attender Management</h2>
        <nav>
          <ul>
            <li
              className={active === 'register' ? 'active' : ''}
              onClick={() => setActive('register')}
            >
              <FaUserPlus className="icon" /> Register Attender
            </li>
            <li
              className={active === 'update' ? 'active' : ''}
              onClick={() => setActive('update')}
            >
              <FaEdit className="icon" /> Update Attender
            </li>
            <li
              className={active === 'delete' ? 'active' : ''}
              onClick={() => setActive('delete')}
            >
              <FaTrash className="icon" /> Delete Attender
            </li>
            <li
              className={active === 'all' ? 'active' : ''}
              onClick={() => setActive('all')}
            >
              <FaUsers className="icon" /> All Attenders
            </li>
            <li
              className={active === 'get' ? 'active' : ''}
              onClick={() => setActive('get')}
            >
              <FaSearch className="icon" /> Get Attender by ID
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content-area">{renderSection()}</main>
    </div>
  );
}

export default AttenderManagementPage;
