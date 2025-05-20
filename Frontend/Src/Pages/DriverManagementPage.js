// src/pages/DriverManagementPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DriverManagementPage.css';
import { 
  FaUserPlus, 
  FaEdit, 
  FaTrash, 
  FaUsers, 
  FaArrowLeft,
  FaSearch 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
const API_URL = 'http://localhost:5000/api/drivers';

// 🔐 Helper to get token config
const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

export function RegisterDriver() {
  const [form, setForm] = useState({
    driverId: '',
    name: '',
    contact: '',
    busAssignedNo: '',
    route: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/register`, form, getAuthConfig());
      alert('Driver registered successfully');
      setForm({ driverId: '', name: '', contact: '', busAssignedNo: '', route: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Error registering driver');
    }
  };

  return (
    <div className="section-content">
      <h2>Register Driver</h2>
      <form onSubmit={handleSubmit}>
        <input name="driverId" placeholder="Driver ID" value={form.driverId} onChange={handleChange} required />
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="contact" placeholder="Contact" value={form.contact} onChange={handleChange} required />
        <input name="busAssignedNo" placeholder="Bus Assigned No" value={form.busAssignedNo} onChange={handleChange} required />
        <input name="route" placeholder="Route" value={form.route} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

// src/pages/DriverManagementPage.js
export function UpdateDriver() {
  const [driverId, setDriverId] = useState('');
  const [form, setForm] = useState({
    name: '',
    contact: '',
    busAssignedNo: '',
    route: '',
  });
  const [fetched, setFetched] = useState(false);

  // 1) Whenever driverId changes, re-fetch
  useEffect(() => {
    if (driverId.trim() && !fetched) {
      axios
        .get(`${API_URL}/${driverId}`, getAuthConfig())
        .then(res => {
          const d = res.data;
          setForm({
            name: d.name || '',
            contact: d.contact || '',
            busAssignedNo: d.busAssignedNo || '',
            route: d.route || '',
          });
          setFetched(true);
        })
        .catch(() => {
          // ID not found → reset
          setForm({ name: '', contact: '', busAssignedNo: '', route: '' });
        });
    }
  }, [driverId, fetched]);

  // 2) reset fetched flag when ID changes
  const handleIdChange = e => {
    setDriverId(e.target.value);
    setFetched(false);
  };

  // 3) update form fields
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 4) submit updated data
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${driverId}`, form, getAuthConfig());
      alert('Driver updated successfully');
      setDriverId('');
      setForm({ name:'', contact:'', busAssignedNo:'', route:'' });
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating driver');
    }
  };

  return (
    <div className="section-content">
      <h2>Update Driver</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Driver ID"
          value={driverId}
          onChange={handleIdChange}
          required
        />
        <input
          name="name"
          placeholder="Name"
          value={form.name}
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
        <input
          name="busAssignedNo"
          placeholder="Bus Assigned No"
          value={form.busAssignedNo}
          onChange={handleChange}
          required
        />
        <input
          name="route"
          placeholder="Route"
          value={form.route}
          onChange={handleChange}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}


export function DeleteDriver() {
  const [driverId, setDriverId] = useState('');

  const handleDelete = async e => {
    e.preventDefault();
    try {
      await axios.delete(`${API_URL}/${driverId}`, getAuthConfig());
      alert('Driver deleted successfully');
      setDriverId('');
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting driver');
    }
  };

  return (
    <div className="section-content">
      <h2>Delete Driver</h2>
      <form onSubmit={handleDelete}>
        <input
          placeholder="Driver ID"
          value={driverId}
          onChange={e => setDriverId(e.target.value)}
          required
        />
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}

export function AllDrivers() {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL, getAuthConfig())
      .then(res => setDrivers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="section-content">
      <h2>All Drivers</h2>
      <table className="management-table">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Contact</th><th>Bus No</th><th>Route</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map(d => (
            <tr key={d._id}>
              <td>{d.driverId}</td>
              <td>{d.name}</td>
              <td>{d.contact}</td>
              <td>{d.busAssignedNo}</td>
              <td>{d.route}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GetDriverById() {
  const [driverId, setDriverId] = useState('');
  const [driver, setDriver] = useState(null);

  const fetchDriver = async e => {
    e.preventDefault();
    try {
      // backend expects /:id => uses findById, so we pass the Mongo _id.
      const res = await axios.get(`${API_URL}/${driverId}`, getAuthConfig());
      setDriver(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Driver not found');
      setDriver(null);
    }
  };

  return (
    <div className="section-content">
      <h2>Get Driver by ID</h2>
      <form onSubmit={fetchDriver}>
        <input
          placeholder="DriverId"
          value={driverId}
          onChange={e => setDriverId(e.target.value)}
          required
        />
        <button type="submit">Fetch</button>
      </form>
      {driver && (
        <div className="driver-details">
          <p><strong>ID:</strong> {driver.driverId}</p>
          <p><strong>Name:</strong> {driver.name}</p>
          <p><strong>Contact:</strong> {driver.contact}</p>
          <p><strong>Bus No:</strong> {driver.busAssignedNo}</p>
          <p><strong>Route:</strong> {driver.route}</p>
        </div>
      )}
    </div>
  );
}

function DriverManagementPage() {
  const [active, setActive] = useState('register');
  const navigate = useNavigate();

  const renderSection = () => {
    switch(active) {
      case 'register': return <RegisterDriver />;
      case 'update':   return <UpdateDriver />;
      case 'delete':   return <DeleteDriver />;
      case 'all':      return <AllDrivers />;
      case 'get':      return <GetDriverById />;
      default:         return null;
    }
  };

  return (
    <div className="driver-management">
      <aside className="sidebar">
      <button className="navbar3-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft className="icon" /> Back
      </button>
        <h2>Drivers Management</h2>
        <nav>
          <ul>
            <li className={active==='register'?'active':''} onClick={()=>setActive('register')}>
              <FaUserPlus className="icon" /> Register Driver
            </li>
            <li className={active==='update'?'active':''} onClick={()=>setActive('update')}>
              <FaEdit className="icon" /> Update Driver
            </li>
            <li className={active==='delete'?'active':''} onClick={()=>setActive('delete')}>
              <FaTrash className="icon" /> Delete Driver
            </li>
            <li className={active==='all'?'active':''} onClick={()=>setActive('all')}>
              <FaUsers className="icon" /> All Drivers
            </li>
            <li className={active==='get'?'active':''} onClick={()=>setActive('get')}>
              <FaSearch className="icon" /> Get Driver by ID
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content-area">{renderSection()}</main>
    </div>
  );
}

export default DriverManagementPage;
