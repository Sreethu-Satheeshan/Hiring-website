// models/job.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    requirements: { type: String, required: true },
    accommodations: { type: String, required: true },
    expirationDate: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
