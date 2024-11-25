// models/Employer.js
const mongoose = require('mongoose');

const EmployerSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Check if the model is already defined to prevent OverwriteModelError
module.exports = mongoose.models.Employer || mongoose.model('Employer', EmployerSchema);
