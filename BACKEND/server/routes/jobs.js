// const express = require('express');
// const router = express.Router();
// const Job = require('../models/job');

// // POST a new j
// router.post('/post', async (req, res) => {
//   const { title, companyName, description, location, requirements, accommodations, expirationDate } = req.body;
//   try {
//       const newJob = new Job({ title, companyName, description, location, requirements, accommodations, expirationDate });
//       console.log('New Job Data:', newJob);  // Logging the job data before saving
//       await newJob.save();
//       res.status(201).json({ message: 'Job posted successfully', job: newJob });
//   } catch (error) {
//       console.error('Error saving job:', error);
//       res.status(500).json({ message: 'Error posting job', error });
//   }
// });

// // GET all jobs
// router.get('/', async (req, res) => {
//   try {
//     const jobs = await Job.find();
//     res.status(200).json(jobs);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching jobs', error });
//   }
// });

// module.exports = router;

//................................................

const express = require('express');
const router = express.Router();
const Job = require('../models/job');

// POST a new job
router.post('/post', async (req, res) => {
  const { title, companyName, description, location, requirements, accommodations, expirationDate } = req.body;
  console.log('Job post request received:', req.body);

  try {
      const job = new Job({
          title,
          companyName,
          description,
          location,
          requirements,
          accommodations,
          expirationDate,
      });

      const savedJob = await job.save();
      res.status(201).json({ message: 'Job posted successfully', job: savedJob });
  } catch (error) {
      console.error('Error posting job:', error);
      res.status(500).json({ message: 'Error posting job', error: error.message });
  }
});

// GET all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching jobs', error });
    }
});

// DELETE - Delete a job by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedJob = await Job.findByIdAndDelete(id);

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Error deleting job', error });
  }
});

module.exports = router;
