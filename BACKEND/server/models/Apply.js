// models/Apply.js
const mongoose = require('mongoose');

const applySchema = new mongoose.Schema({
  jobId: { type: String, required: true },
  jobTitle: { type: String, required: true },
  company: { type: String, required: true },
  applicantName: { type: String, required: true },
  applicantEmail: { type: String, required: true },
  userId: { type: String, required: true },
  appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Apply', applySchema);
