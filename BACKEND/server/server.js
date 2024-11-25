

// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const path = require('path');


// Import Routes
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobs');
const applicationRoutes = require('./routes/applications');
const employerRoutes = require('./routes/employers');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/adminRoutes');
// const uploadRoutes = require('./routes/uploads');


const app = express();

// Middleware setup
app.use(cors({
  origin: 'http://localhost:3000', // Adjust to match your frontend's URL
  methods: 'GET, POST, PUT, DELETE',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/employer', employerRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
// app.use('/api/uploads', uploadRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



// Error handling
app.use((err, req, res, next) => {
  res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
});

// 404 handling
app.use((req, res, next) => {
  res.status(404).json({ message: 'Resource not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

// //..............................................................................................

// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const connectDB = require('./config/db');
// require('dotenv').config();

// // Import Routes
// const authRoutes = require('./routes/authRoutes');
// const jobRoutes = require('./routes/jobs');
// const applicationRoutes = require('./routes/applications');
// const employerRoutes = require('./routes/employers');
// const userRoutes = require('./routes/user');
// const adminRoutes = require('./routes/adminRoutes'); // Import admin routes

// const app = express();

// // Middleware setup
// app.use(cors({
//   origin: 'http://localhost:3000', // Update to match your frontend's URL
//   methods: 'GET, POST, PUT, DELETE',
//   credentials: true,
// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Connect to MongoDB
// connectDB();

// // Use Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/jobs', jobRoutes);
// app.use('/api/applications', applicationRoutes);
// app.use('/api/employers', employerRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/admin', adminRoutes); // Use admin routes

// // Error handling
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'An unexpected error occurred', error: err.message });
// });

// // 404 handling
// app.use((req, res, next) => {
//   res.status(404).json({ message: 'Resource not found' });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


//...........................................................................................

