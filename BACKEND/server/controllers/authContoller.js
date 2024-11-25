const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Register
exports.register = [
  // Validation checks
  body('username').notEmpty().withMessage('Username is required.'),
  body('email').isEmail().withMessage('Email is invalid.'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long.')
    .matches(/\d/).withMessage('Password must contain at least one number.')
    .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter.')
    .matches(/[!#$%^&*]/).withMessage('Password must contain at least one special character.'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, email } = req.body;

    try {
      // Check if email or username already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email already in use.' });
      }

      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return res.status(400).json({ success: false, message: 'Username already in use.' });
      }


      // Create new user
      const user = new User({
        username,
        password: hashedPassword,
        email,
      });

      // Save user and send response
      const newUser = await user.save();
      console.log('New user :', newUser); // Log saved user to confirm

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        user: { id: newUser._id, username: newUser.username, email: newUser.email }
      });
    } catch (err) {
      console.error('Error saving user:', err.message);
      res.status(500).json({ success: false, message: 'Error registering user' });
    }
  }
];

// Login
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error('Error logging in:', err.message);
    res.status(500).json({ message: 'Error logging in' });
  }
};
