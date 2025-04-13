const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Application = require('../models/Application');
const User = require('../models/User');
const Internship = require('../models/Internship');

// ✅ 1. Student applies to internship
router.post('/', authMiddleware, async (req, res) => {
  const { internshipId } = req.body;

  // Only students can apply
  if (req.user.role !== 'student') {
    return res.status(403).json({ message: 'Only students can apply' });
  }

  try {
    // Check if already applied
    const alreadyApplied = await Application.findOne({
      internship: internshipId,
      student: req.user.id
    });

    if (alreadyApplied) {
      return res.status(400).json({ message: 'You already applied to this internship' });
    }

    const application = new Application({
      internship: internshipId,
      student: req.user.id
    });

    await application.save();

    res.status(201).json({ message: 'Application submitted successfully' });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// 🔎 2. Admin views all applications
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }

    const applications = await Application.find()
    .populate('internship', 'title description location duration stipend')    // shows title & location of internship
      .populate('student', 'name email');        // shows student name & email

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 👨‍🏫 Employer: View applications for their posted internships
router.get('/employer', authMiddleware, async (req, res) => {
    try {
      // Only employers allowed
      if (req.user.role !== 'employer') {
        return res.status(403).json({ message: 'Access denied. Only eployer can access this.' });
      }
  
      // Get internships posted by the current teacher
      const internships = await Internship.find({ postedBy: req.user.id });
  
      const internshipIds = internships.map(i => i._id);
  
      // Find all applications to those internships
      const applications = await Application.find({ internship: { $in: internshipIds } })
      .populate('internship', 'title description location duration stipend')
        .populate('student', 'name email');
  
      res.json(applications);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // 👨‍🎓 Student: View applications the student has submitted
router.get('/student-applied', authMiddleware, async (req, res) => {
  try {
    // Only students allowed
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied. Only students can access this.' });
    }

    // Find applications submitted by this student
    const applications = await Application.find({ student: req.user.id })
    .populate('internship', 'title description location duration stipend')

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

  

module.exports = router;
