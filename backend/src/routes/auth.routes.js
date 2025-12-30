const express = require('express');
const router = express.Router();
const User = require('../models/User');

// ✅ Signup route (stores user data in MongoDB)
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // create new user
    const user = new User({
      name,
      email,
      password,
      role: role || 'staff', // default role is staff
    });

    await user.save(); // ✅ store in MongoDB Atlas

    res.json({
      message: 'User created successfully',
      user,
    });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
});

// ✅ Login route (authenticates existing user)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ✅ Return role and token so frontend can redirect
    res.json({
      message: 'Login successful',
      role: user.role,          // "admin" or "staff"
      token: 'mock-token',      // replace with JWT later
      user,
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
});

module.exports = router;