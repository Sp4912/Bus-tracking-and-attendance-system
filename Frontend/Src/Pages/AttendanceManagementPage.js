import React, { useState, useEffect } from 'react';
import axios                                 from 'axios';
import { FaClipboardCheck, FaListAlt, FaCalendarAlt, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate }                      from 'react-router-dom';
import './AttendanceManagementPage.css';

const API = 'http://localhost:5000/api/attendance';
const getAuthConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

// helper to get current HH:mm
function nowHHMM() {
  const d = new Date();
  const H = String(d.getHours()).padStart(2,'0');
  const M = String(d.getMinutes()).padStart(2,'0');
  return `${H}:${M}`;
}

export default function AttendanceManagementPage() {
  const [tab, setTab] = useState('mark');
  const navigate       = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/attender-login');
  };

  return (
    <div className="attendance-dashboard">
      <aside className="sidebar">
        <button className="navbar7-btn" onClick={logout}>
          <FaSignOutAlt className="icon" /> Logout
        </button>
        <ul>
          <li><h1>Attendance Management</h1></li>
          <li className={tab==='mark' ? 'active':''}   onClick={()=>setTab('mark')}  >
            <FaCalendarAlt /> Mark Attendance
          </li>
          <li className={tab==='mine' ? 'active':''}   onClick={()=>setTab('mine')}  >
            <FaListAlt /> My Attendance Records
          </li>
        </ul>
      </aside>
      <main className="content">
        {tab === 'mark' && <MarkAttendance />}
        {tab === 'mine' && <MyAttendance activeTab={tab} />}
      </main>
    </div>
  );
}

function MarkAttendance() {
  const [students, setStudents] = useState([]);
  const [openForm, setOpenForm] = useState(null);
  const [form, setForm]         = useState({});

  useEffect(() => {
    axios.get(`${API}/students/my-bus`, getAuthConfig())
      .then(r => setStudents(r.data))
      .catch(console.error);
  }, []);

  const open = id => {
    setOpenForm(id);
    setForm({
      studentId:     id,
      date:          new Date().toISOString().slice(0,10),
      boardingHome:   nowHHMM(),
      boardingSchool: nowHHMM(),
      droppingSchool: nowHHMM(),
      droppingHome:   nowHHMM(),
      status:        'Present'
    });
  };

  const handle = (field,val) => setForm(f => ({ ...f, [field]: val }));

  const submit = () => {
    axios.post(API, form, getAuthConfig())
      .then(() => {
        alert('Attendance recorded');
        setOpenForm(null);
      })
      .catch(e => alert(e.response?.data?.message||'Error'));
  };

  return (
    <div className="section">
      <h2><FaClipboardCheck /> Mark Attendance</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Name</th><th>Class</th><th>Address</th>
            <th>Shift</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map(s=>(
            <React.Fragment key={s._id}>
              <tr>
                <td>{s.studentFullName}</td>
                <td>{s.class}</td>
                <td>{s.address}</td>
                <td>{s.shift.morningShift?'Morning':'Afternoon'}</td>
                <td>
                  <button onClick={()=>open(s._id)}>
                    {openForm===s._id ? 'Cancel':'Mark'}
                  </button>
                </td>
              </tr>
              {openForm===s._id && (
                <tr>
                  <td colSpan={5}>
                    <div className="inline-form">
                      <label>Date:
                        <input type="date"
                               value={form.date}
                               onChange={e=>handle('date',e.target.value)}
                        />
                      </label>
                      <label>Board Home:
                        <input type="time"
                               value={form.boardingHome}
                               onChange={e=>handle('boardingHome',e.target.value)}
                        />
                      </label>
                      <label>Board School:
                        <input type="time"
                               value={form.boardingSchool}
                               onChange={e=>handle('boardingSchool',e.target.value)}
                        />
                      </label>
                      <label>Drop School:
                        <input type="time"
                               value={form.droppingSchool}
                               onChange={e=>handle('droppingSchool',e.target.value)}
                        />
                      </label>
                      <label>Drop Home:
                        <input type="time"
                               value={form.droppingHome}
                               onChange={e=>handle('droppingHome',e.target.value)}
                        />
                      </label>
                      <label>Status:
                        <select value={form.status}
                                onChange={e=>handle('status',e.target.value)}>
                          <option>Present</option>
                          <option>Absent</option>
                        </select>
                      </label>
                      <button onClick={submit}>Submit</button>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MyAttendance({ activeTab }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (activeTab!=='mine') return;
    axios.get(`${API}/mine`, getAuthConfig())
      .then(r=>setRecords(r.data))
      .catch(console.error);
  },[activeTab]);

  const fmt = dt => dt
    ? new Date(dt).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})
    : '–';

  return (
    <div className="section">
      <h2><FaListAlt /> My Attendance Records</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Student</th><th>Date</th>
            <th>Board Home</th><th>Board School</th>
            <th>Drop School</th><th>Drop Home</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {records.map(rec=>(
            <tr key={rec._id}>
              <td>{rec.student.studentFullName}</td>
              <td>{new Date(rec.date).toLocaleDateString()}</td>
              <td>{fmt(rec.boardingHome)}</td>
              <td>{fmt(rec.boardingSchool)}</td>
              <td>{fmt(rec.droppingSchool)}</td>
              <td>{fmt(rec.droppingHome)}</td>
              <td>{rec.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
