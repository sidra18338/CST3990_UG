const express = require('express');
const router = express.Router();
const Internship = require('../models/Internship');
const authMiddleware = require('../middleware/authMiddleware');

// POST internship (employer only)
router.post('/', authMiddleware, async (req, res) => {
  const { title, description, location, duration, stipend } = req.body;

  if (req.user.role !== 'employer') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const internship = new Internship({
      title,
      description,
      location,
      duration,
      stipend,
      postedBy: req.user.id,
      status: 'pending', // default: needs admin approval
    });

    await internship.save();
    res.status(201).json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all internships (public view)
router.get('/', async (req, res) => {
  try {
    const internships = await Internship.find({ status: 'approved' }).populate('postedBy', 'name');
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all internships (admin view)
router.get('/admin', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  try {
    const internships = await Internship.find().populate('postedBy', 'name');
    res.json(internships);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve Internship
router.put('/approve/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  try {
    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      { status: 'approved' },
      { new: true } // Return the updated document
    );
    
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    res.json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Reject Internship
router.put('/reject/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  try {
    const internship = await Internship.findByIdAndUpdate(
      req.params.id,
      { status: 'rejected' },
      { new: true } // Return the updated document
    );

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    res.json(internship);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ✅ PUT: Edit internship by employer
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, description, location, duration, stipend } = req.body;

  if (req.user.role !== 'employer') {
    return res.status(403).json({ message: 'Access denied. Only employers can edit internships.' });
  }

  try {
    // Find internship and verify ownership
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }

    if (internship.postedBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to edit this internship' });
    }

    // Update fields
    internship.title = title || internship.title;
    internship.description = description || internship.description;
    internship.location = location || internship.location;
    internship.duration = duration || internship.duration;
    internship.stipend = stipend || internship.stipend;

    // Mark as pending again (optional, if you want admin to re-approve after changes)
    internship.status = 'pending';

    await internship.save();
    res.json({ message: 'Internship updated successfully', internship });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
