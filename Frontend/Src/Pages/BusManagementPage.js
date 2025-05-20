// src/pages/BusManagementPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaBus,
  FaClipboardList,
  FaSearch,
  FaPencilAlt,
  FaTrashAlt,
  FaArrowLeft,
  FaInfoCircle
} from 'react-icons/fa';
import './BusManagementPage.css';
import { useNavigate } from 'react-router-dom';
const API_URL = 'http://localhost:5000/api/buses';

// 🔐 Helper to get token config
const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export function RegisterBus() {
  const [form, setForm] = useState({ busNo: '', route: '' });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(
             API_URL,
              form,
               getAuthConfig()    // include your JWT so protect/adminOnly pass
             );
      alert('Bus registered successfully');
      setForm({ busNo: '', route: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Error creating bus');
    }
  };

  return (
    <div className="section-content bus-register">
      <h2><FaBus className="section-icon" /> Register Bus</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="busNo"
          placeholder="Bus Number"
          value={form.busNo}
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export function AllBuses() {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL)
      .then(res => setBuses(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="section-content bus-list">
      <h2><FaClipboardList className="section-icon" /> All Buses</h2>
      <table className="management-table">
        <thead>
          <tr>
            <th>Bus No</th>
            <th>Route</th>
          </tr>
        </thead>
        <tbody>
          {buses.map(b => (
            <tr key={b._id}>
              <td>{b.busNo}</td>
              <td>{b.route}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function GetBusById() {
  const [id, setId] = useState('');
  const [bus, setBus] = useState(null);

  const fetchBus = async e => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/busno/${id}`);
      setBus(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Bus not found');
      setBus(null);
    }
  };

  return (
    <div className="section-content bus-fetch">
      <h2><FaSearch className="section-icon" /> Get Bus by ID</h2>
      <form onSubmit={fetchBus}>
        <input
          placeholder="Bus No"
          value={id}
          onChange={e => setId(e.target.value)}
          required
        />
        <button type="submit">Fetch</button>
      </form>
      {bus && (
        <div className="bus-details">
          <p><strong>No:</strong> {bus.busNo}</p>
          <p><strong>Route:</strong> {bus.route}</p>
        </div>
      )}
    </div>
  );
}

export function UpdateBus() {
  const [busNo, setBusNo] = useState('');
  const [form, setForm] = useState({ busNo: '', route: '' });
  const [loading, setLoading] = useState(false);

  // 1️⃣ Fetch existing bus data
  const handleLoad = async e => {
    e.preventDefault();
    if (!busNo) return alert('Please enter a Bus No to load');
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/busno/${busNo}`, getAuthConfig());
      setForm({ busNo: res.data.busNo, route: res.data.route });
    } catch (err) {
      alert(err.response?.data?.message || 'Bus not found');
      setForm({ busNo: '', route: '' });
    } finally {
      setLoading(false);
    }
  };

  // 2️⃣ Handle form input changes
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 3️⃣ Submit update
  const handleUpdate = async e => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_URL}/busno/${busNo}`,
        { busNo: form.busNo, route: form.route },
        getAuthConfig()
      );
      alert('Bus updated successfully');
      // Optionally, clear both fields:
      // setBusNo(''); setForm({ busNo: '', route: '' });
    } catch (err) {
      alert(err.response?.data?.message || 'Error updating bus');
    }
  };

  return (
    <div className="section-content bus-update">
      <h2><FaPencilAlt className="section-icon" /> Update Bus</h2>

      {/* Step 1: Load existing */}
      <form onSubmit={handleLoad} style={{ marginBottom: '1rem' }}>
        <input
          placeholder="Enter Bus No to Load"
          value={busNo}
          onChange={e => setBusNo(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading…' : 'Load'}
        </button>
      </form>

      {/* Step 2: Edit & Save */}
      <form onSubmit={handleUpdate}>
        <input
          name="busNo"
          placeholder="New Bus No"
          value={form.busNo}
          onChange={handleChange}
          required
        />
        <input
          name="route"
          placeholder="New Route"
          value={form.route}
          onChange={handleChange}
          required
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
export function DeleteBus() {
  const [id, setId] = useState('');

  const handleDelete = async e => {
    e.preventDefault();
    try {
      await axios.delete(`${API_URL}/busno/${id}`, getAuthConfig());
      alert('Bus deleted successfully');
      setId('');
    } catch (err) {
      alert(err.response?.data?.message || 'Error deleting bus');
    }
  };

  return (
    <div className="section-content bus-delete">
      <h2><FaTrashAlt className="section-icon" /> Delete Bus</h2>
      <form onSubmit={handleDelete}>
        <input
          placeholder="Bus DB ID"
          value={id}
          onChange={e => setId(e.target.value)}
          required
        />
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}

export function GetBusDetails() {
  const [busNo, setBusNo] = useState('');
  const [details, setDetails] = useState(null);

  const fetchDetails = async e => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/details/${busNo}`);
      setDetails(res.data);
    } catch (err) {
      alert(err.response?.data?.message || 'Details not found');
      setDetails(null);
    }
  };

  return (
    <div className="section-content bus-info">
      <h2><FaInfoCircle className="section-icon" /> Bus Details</h2>
      <form onSubmit={fetchDetails}>
        <input
          placeholder="Bus Number"
          value={busNo}
          onChange={e => setBusNo(e.target.value)}
          required
        />
        <button type="submit">Get Details</button>
      </form>
      {details && (
        <div className="bus-details">
          <p><strong>Bus:</strong> {details.bus.busNo}</p>
          <p><strong>Route:</strong> {details.bus.route}</p>
          <p><strong>Driver:</strong> {details.driver.name}</p>
          <p><strong>Attender:</strong> {details.attender.name}</p>
        </div>
      )}
    </div>
  );
}

function BusManagementPage() {
  const [active, setActive] = useState('register');
  const navigate = useNavigate();

  const renderSection = () => {
    switch (active) {
      case 'register': return <RegisterBus />;
      case 'all': return <AllBuses />;
      case 'get': return <GetBusById />;
      case 'update': return <UpdateBus />;
      case 'delete': return <DeleteBus />;
      case 'details': return <GetBusDetails />;
      default: return null;
    }
  };

  return (
    <div className="bus-management">
      <aside className="sidebar">
      <button className="navbar2-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft className="icon" /> Back
      </button>

        <h2><strong>Bus Management</strong></h2>
        <nav>
          <ul>
            <li className={active === 'register' ? 'active' : ''} onClick={() => setActive('register')}>
              <FaBus className="icon" /> Register Bus
            </li>
            <li className={active === 'all' ? 'active' : ''} onClick={() => setActive('all')}>
              <FaClipboardList className="icon" /> All Buses
            </li>
            <li className={active === 'get' ? 'active' : ''} onClick={() => setActive('get')}>
              <FaSearch className="icon" /> Get Bus by ID
            </li>
            <li className={active === 'update' ? 'active' : ''} onClick={() => setActive('update')}>
              <FaPencilAlt className="icon" /> Update Bus
            </li>
            <li className={active === 'delete' ? 'active' : ''} onClick={() => setActive('delete')}>
              <FaTrashAlt className="icon" /> Delete Bus
            </li>
            <li className={active === 'details' ? 'active' : ''} onClick={() => setActive('details')}>
              <FaInfoCircle className="icon" /> Bus Details
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content-area">{renderSection()}</main>
    </div>
  );
}

export default BusManagementPage;
