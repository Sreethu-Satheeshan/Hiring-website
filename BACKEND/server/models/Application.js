// const mongoose = require('mongoose');

// // Define the application schema
// const ApplicationSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phoneNumber: { type: String, required: true },
//   gender: { type: String, required: true },
//   qualification: { type: String, required: true },
//   disabilityType: { type: String, required: true },
//   workMode: { type: String, required: true },  // Ensure workMode is defined
//   disabilityCertificate: { type: String, required: true },
//   resume: { type: String, required: true },
// }, { timestamps: true }); // Adding timestamps for created/updated at

// module.exports = mongoose.model('Application', ApplicationSchema);

// //.............................................................

// // models/Application.js

// // const mongoose = require('mongoose');
// // const mongoose = require('mongoose');

// // const ApplicationSchema = new mongoose.Schema({
// //   name: { type: String, required: true },
// //   email: { 
// //     type: String, 
// //     required: true, 
// //     match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address.']
// //   },
// //   phoneNumber: { type: String, required: true },
// //   gender: { type: String, required: true },
// //   qualification: { type: String, required: true },
// //   disabilityType: { type: String, required: true },
// //   workMode: { type: String, required: true },
// //   disabilityCertificate: { type: String, required: true },
// //   resume: { type: String, required: true },
// //   jobTitle: { type: String },     // Job title the candidate is applying for (optional)
// //   companyName: { type: String },  // Company name of the job (optional)
// // }, { timestamps: true });

// // module.exports = mongoose.model('Application', ApplicationSchema);


const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  workMode: {
    type: String,
    required: true
  },
  disabilityType: {
    type: String,
    required: true
  },
  disabilityCertificatePath: {
    type: String,
    required: true
  },
  resumePath: {
    type: String,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'accepted', 'rejected'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Application', applicationSchema);



