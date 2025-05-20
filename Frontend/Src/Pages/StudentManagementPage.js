// src/pages/StudentManagementPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaUserPlus,
  FaEdit,
  FaTrash,
  FaArrowLeft,
  FaSearch,
  FaTable,FaClipboardList
} from 'react-icons/fa';
import './StudentManagementPage.css';

import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/students';

const ATT_URL = 'http://localhost:5000/api/attenders';
const API_URL_ATTND = 'http://localhost:5000/api/attendance'

const getAuthConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export function RegisterStudent() {
  const [attenders, setAttenders] = useState([]);
  const [form, setForm] = useState({
    studentId: '',
    studentFullName: '',
    class: '',
    address: '',
    parentName: '',
    parentContact: '',
    parentEmail: '',
    attenderId: '',
    morningShift: true,
    afternoonShift: false
  });

  useEffect(() => {
    axios.get(ATT_URL, getAuthConfig())
      .then(r => setAttenders(r.data))
      .catch(console.error);
  }, []);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const payload = {
        studentId: form.studentId,
        studentFullName: form.studentFullName,
        class: form.class,
        address: form.address,
        attenderId: form.attenderId,
        parents: [{
          fullName: form.parentName,
          contact: form.parentContact,
          email: form.parentEmail
        }],
        shift: {
          morningShift: form.morningShift,
          afternoonShift: form.afternoonShift
        }
      };
      await axios.post(`${API_URL}/register`, payload, getAuthConfig());
      alert('Student registered successfully');
      setForm({
        studentId: '',
        studentFullName: '',
        class: '',
        address: '',
        parentName: '',
        parentContact: '',
        parentEmail: '',
        attenderId: '',
        morningShift: true,
        afternoonShift: false
      });
    } catch (err) {
      console.error(err.response || err);
      alert(err.response?.data?.message || 'Error registering student');
    }
  };

  return (
    <div className="section-content student-register">
      <h2><FaUserPlus className="section-icon" /> Register Student</h2>
      <form onSubmit={handleSubmit}>
        <input name="studentId" placeholder="Student ID" value={form.studentId} onChange={handleChange} required />
        <input name="studentFullName" placeholder="Full Name" value={form.studentFullName} onChange={handleChange} required />
        <input name="class" placeholder="Class" value={form.class} onChange={handleChange} required />
        <input name="address" placeholder="Address" value={form.address} onChange={handleChange} required />
        <input name="parentName" placeholder="Parent Name" value={form.parentName} onChange={handleChange} required />
        <input name="parentContact" placeholder="Parent Contact" value={form.parentContact} onChange={handleChange} required />
        <input name="parentEmail" placeholder="Parent Email" type="email" value={form.parentEmail} onChange={handleChange} required />

        <select
          name="attenderId"
          value={form.attenderId}
          onChange={handleChange}
          required
        >
          <option value="">Select Attender</option>
          {attenders.map(a => (
            <option key={a._id} value={a._id}>{a.name} ({a.assignedBusNo})</option>
          ))}
        </select>

        <div style={{ margin: '10px 0' }}>
          <label>
            <input
              type="checkbox"
              name="morningShift"
              checked={form.morningShift}
              onChange={handleChange}
            /> Morning Shift
          </label>
          <label style={{ marginLeft: '1rem' }}>
            <input
              type="checkbox"
              name="afternoonShift"
              checked={form.afternoonShift}
              onChange={handleChange}
            /> Afternoon Shift
          </label>
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export function AllStudents() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios.get(API_URL, getAuthConfig())
      .then(res => setStudents(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="section-content student-list">
      <h2><FaTable className="section-icon" /> All Students</h2>
      <table className="management-table">
        <thead>
          <tr>
            <th>Stud. ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Address</th>
            <th>Attender</th>
            <th>Shift</th>
            <th>Parents</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s._id}>
              <td>{s.studentId}</td>
              <td>{s.studentFullName}</td>
              <td>{s.class}</td>
              <td>{s.address}</td>
              <td>{s.attenderId?.name || '—'}</td>
              <td>
                {s.shift.morningShift && 'Morning '}
                {s.shift.afternoonShift && 'Afternoon'}
              </td>
              <td>
                {s.parents.map((p,i) =>
                  <div key={i}>
                    {p.fullName} ({p.email}, {p.contact})
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function UpdateStudent() {
  const [stuId, setStuId] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    studentFullName: '',
    address: '',
    parentName: '',
    parentEmail: '',
    parentContact: '',
    attenderName: '',
    attenderId: '',
    shiftMorning: false,
    shiftAfternoon: false
  });

  // 1) Load existing
  const handleLoad = async e => {
    e.preventDefault();
    if (!stuId) return alert('Enter Student ID to load');
    try {
      setLoading(true);
      const { data: s } = await axios.get(
        `${API_URL}/sid/${stuId}`,
        getAuthConfig()
      );
      // s.attenderId is already populated: { _id, name }
      setForm({
        studentFullName: s.studentFullName,
        address: s.address,
        parentName: s.parents[0]?.fullName || '',
        parentEmail: s.parents[0]?.email || '',
        parentContact: s.parents[0]?.contact || '',
        attenderName: s.attenderId?.name || '',
        attenderId: s.attenderId?._id || '',
        shiftMorning: !!s.shift.morningShift,
        shiftAfternoon: !!s.shift.afternoonShift
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Student ID not found');
      // reset form
      setForm({
        studentFullName: '',
        address: '',
        parentName: '',
        parentEmail: '',
        parentContact: '',
        attenderName: '',
        attenderId: '',
        shiftMorning: false,
        shiftAfternoon: false
      });
    } finally {
      setLoading(false);
    }
  };

  // 2) Update
  const handleUpdate = async e => {
    e.preventDefault();
    try {
      const payload = {
        studentFullName: form.studentFullName,
        address: form.address,
        parents: [{
          fullName: form.parentName,
          email: form.parentEmail,
          contact: form.parentContact
        }],
        attenderId: form.attenderId,
        shift: {
          morningShift: form.shiftMorning,
          afternoonShift: form.shiftAfternoon
        }
      };
      await axios.put(
        `${API_URL}/sid/${stuId}`,
        payload,
        getAuthConfig()
      );
      alert('Student updated successfully');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error updating student');
    }
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="section-content student-update">
      <h2><FaEdit className="section-icon" /> Update Student</h2>

      <form onSubmit={handleLoad} style={{ marginBottom: '1rem' }}>
        <input
          placeholder="Student ID"
          value={stuId}
          onChange={e => setStuId(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Loading…' : 'Load'}
        </button>
      </form>

      <form onSubmit={handleUpdate}>
        <input
          name="studentFullName"
          placeholder="Full Name"
          value={form.studentFullName}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />
        <input
          name="parentName"
          placeholder="Parent Name"
          value={form.parentName}
          onChange={handleChange}
        />
        <input
          name="parentEmail"
          placeholder="Parent Email"
          value={form.parentEmail}
          onChange={handleChange}
        />
        <input
          name="parentContact"
          placeholder="Parent Contact"
          value={form.parentContact}
          onChange={handleChange}
        />

        <input
          name="attenderName"
          placeholder="Attender Name"
          value={form.attenderName}
          readOnly
        />

        <label>
          <input
            name="shiftMorning"
            type="checkbox"
            checked={form.shiftMorning}
            onChange={handleChange}
          /> Morning Shift
        </label>
        <label>
          <input
            name="shiftAfternoon"
            type="checkbox"
            checked={form.shiftAfternoon}
            onChange={handleChange}
          /> Afternoon Shift
        </label>

        <button type="submit">Update</button>
      </form>
    </div>
  );
}


export function DeleteStudent() {
  const [stuId, setStuId] = useState('');

  const handleDelete = async e => {
    e.preventDefault();
    try {
      await axios.delete(`${API_URL}/sid/${stuId}`, getAuthConfig());
      alert('Student deleted successfully');
    } catch (err) {
      console.error(err.response || err);
      alert(err.response?.data?.message || 'Error deleting student');
    }
  };

  return (
    <div className="section-content student-delete">
      <h2><FaTrash className="section-icon" /> Delete Student</h2>
      <form onSubmit={handleDelete}>
        <input
          placeholder="Student ID"
          value={stuId}
          onChange={e => setStuId(e.target.value)}
          required
        />
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}

export function GetStudentById() {
  const [stuId, setStuId] = useState('');
  const [student, setStudent] = useState(null);

  const fetchStudent = async e => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/sid/${stuId}`, getAuthConfig());
      setStudent(res.data);
    } catch (err) {
      console.error(err.response || err);
      alert(err.response?.data?.message || 'Student ID not found');
      setStudent(null);
    }
  };

  return (
    <div className="section-content student-fetch">
      <h2><FaSearch className="section-icon" /> Get Student by ID</h2>
      <form onSubmit={fetchStudent}>
        <input
          placeholder="Student ID"
          value={stuId}
          onChange={e => setStuId(e.target.value)}
          required
        />
        <button type="submit">Fetch</button>
      </form>
      {student && (
        <div className="student-details">
          <p><strong>Name:</strong> {student.studentFullName}</p>
          <p><strong>Class:</strong> {student.class}</p>
          <p><strong>Address:</strong> {student.address}</p>
          <p><strong>Attender:</strong> {student.attenderId?.name || '—'}</p>
          <p>
            <strong>Shift:</strong>{' '}
            {student.shift.morningShift && 'Morning '}
            {student.shift.afternoonShift && 'Afternoon'}
          </p>
          <div>
            <strong>Parents:</strong>
            {student.parents.map((p, i) => (
              <div key={i}>
                {p.fullName} (📧 {p.email}, 📱 {p.contact})
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
export function AttendanceRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios
      .get(API_URL_ATTND, getAuthConfig())
      .then(res => setRecords(res.data))
      .catch(err => console.error(err));
  }, []);

  const fmtTime = dt =>
    dt
      ? new Date(dt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : '—';

  return (
    <div className="section-content attendance-records">
      <h2>
        <FaClipboardList className="section-icon" /> Attendance Records
      </h2>
      <table className="management-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Class</th>
            <th>Date</th>
            <th>Board Home</th>
            <th>Board School</th>
            <th>Drop School</th>
            <th>Drop Home</th>
            <th>Status</th>
            <th>Marked By</th>
          </tr>
        </thead>
        <tbody>
          {records.map(r => (
            <tr key={r._id}>
              <td>{r.student.studentId}</td>
              <td>{r.student.studentFullName}</td>
              <td>{r.student.class}</td>
              <td>{new Date(r.date).toLocaleDateString()}</td>
              <td>{fmtTime(r.boardingHome)}</td>
              <td>{fmtTime(r.boardingSchool)}</td>
              <td>{fmtTime(r.droppingSchool)}</td>
              <td>{fmtTime(r.droppingHome)}</td>
              <td>{r.status}</td>
              <td>{r.markedBy?.name || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function StudentManagementPage() {
  const [active, setActive] = useState('register');
  const navigate = useNavigate();
  const renderSection = () => {
    switch (active) {
      case 'register': return <RegisterStudent />;
      case 'all':      return <AllStudents />;
      case 'get':      return <GetStudentById />;
      case 'update':   return <UpdateStudent />;
      case 'delete':   return <DeleteStudent />;
      case 'attendance': return <AttendanceRecords />
      default:         return null;
    }
  };

  return (
    <div className="student-management">
      <aside className="student-management-sidebar">
      <button className="navbar5-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft className="icon" /> Back
      </button>
        <h2>Students Management</h2>
        <nav>
          <ul>
            <li className={active==='register'?'active':''} onClick={()=>setActive('register')}>
              <FaUserPlus className="icon" /> Register Student
            </li>
            <li className={active==='all'?'active':''} onClick={()=>setActive('all')}>
              <FaTable className="icon" /> All Students
            </li>
            <li className={active==='get'?'active':''} onClick={()=>setActive('get')}>
              <FaSearch className="icon" /> Get Student
            </li>
            <li className={active==='update'?'active':''} onClick={()=>setActive('update')}>
              <FaEdit className="icon" /> Update Student
            </li>
            <li className={active==='delete'?'active':''} onClick={()=>setActive('delete')}>
              <FaTrash className="icon" /> Delete Student
            </li>
            <li className={active==='attendance' ? 'active' : ''} onClick={()=>setActive('attendance')}>
              <FaClipboardList className="icon" /> Attendance Records
            </li>
          </ul>
        </nav>
      </aside>
      <main className="content-area">{renderSection()}</main>
    </div>
  );
}

export default StudentManagementPage;
