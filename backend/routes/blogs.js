// routes/blogs.js
const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');


// ✅ Get all blogs
router.get('/', authMiddleware, async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'name email'); // Populate author details (optional)
    res.json({ blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin adds a new blog
router.post('/', authMiddleware, async (req, res) => {
  const { title, content } = req.body;

  try {
    const newBlog = new Blog({
      title,
      content,
      author: req.user.id, // blog created by the logged-in admin
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// ✅ Admin updates an existing blog
router.put('/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  const { title, content } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Update blog fields
    if (title) blog.title = title;
    if (content) blog.content = content;

    await blog.save();
    res.json({ message: 'Blog updated successfully', blog });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Admin deletes a blog
router.delete('/:id', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
