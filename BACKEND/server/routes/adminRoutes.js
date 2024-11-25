// routes/adminRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin'); // Adjust this path based on your project structure
const router = express.Router();

// Admin registration route (single registration)
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if an admin already exists
    const existingAdmin = await Admin.findOne();
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin account already exists.' });
    }

    // Hash password and create new admin
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, email, password: hashedPassword });

    await admin.save();
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

// Admin login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found with provided credentials.' });
    }


    // Generate JWT token
    const token = jwt.sign({ id: admin._id, name: admin.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      message: 'Admin logged in successfully',
      token,
      name: admin.username,
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error, please try again later.' });
  }
});

module.exports = router;
