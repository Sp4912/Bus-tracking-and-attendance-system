require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const adminRoutes      = require('./routes/adminRoutes');
const studentRoutes    = require('./routes/studentRoutes');
const attenderRoutes   = require('./routes/attenderRoutes');
const busRoutes        = require('./routes/busRoutes');
const driverRoutes     = require('./routes/driverRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB Connected");

  // ── DROP OBSOLETE rollNumber_1 INDEX IF PRESENT ──
  mongoose.connection.db.listCollections({ name: 'students' })
    .next((err, collInfo) => {
      if (!err && collInfo) {
        mongoose.connection.db
          .collection('students')
          .dropIndex('rollNumber_1')
          .then(() => console.log('🗑  Dropped obsolete rollNumber_1 index'))
          .catch(() => {/* index didn’t exist, ignore */});
      }
    });
})
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Routes
app.use('/api/admin',      adminRoutes);
app.use('/api/attendance', attendanceRoutes);

app.use('/api/students',   studentRoutes);
app.use('/api/attenders',  attenderRoutes);
app.use('/api/buses',      busRoutes);
app.use('/api/drivers',    driverRoutes);

// Root Route
app.get('/', (req, res) => {
  res.send('🚍 School Bus Attendance & Tracking API Running');
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
