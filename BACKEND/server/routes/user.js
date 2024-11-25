const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure this path is correct

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecret';

// Middleware to authenticate JWT for protected routes
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  
  if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};

// Candidate Registration Route
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, disabilityType } = req.body;

    // Validate required fields
    if (!username || !email || !password || !disabilityType) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user already exists
    const existingUser = await Candidate.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Candidate instance
    const newCandidate = new Candidate({
      username,
      email,
      password: hashedPassword,
      disabilityType, // Save disabilityType
    });

    // Save to the database
    await newCandidate.save();
    res.status(201).json({ message: 'Candidate registered successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to register candidate.', error: err.message });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Attempting to find candidate user with email:', email);

  const user = await User.findOne({ email });
  if (!user) {
    console.log('User not found with provided credentials');
    return res.status(400).json({ message: 'Invalid email or password.' });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log('Password mismatch');
    return res.status(400).json({ message: 'Invalid email or password.' });
  }

  const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ message: 'Login successful!', token });
});


// Get Candidate Profile (protected route)
router.get('/profile', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Candidate not found.' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve candidate details.', error: err.message });
  }
});

// Get list of all candidates (for admin access)
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch candidates.', error: err.message });
  }
});

// Delete Candidate Route
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.status(200).json({ message: 'Candidate deleted successfully' });
  } catch (error) {
    console.error('Error deleting candidate:', error);
    res.status(500).json({ message: 'Error deleting candidate', error });
  }
});

module.exports = router;
