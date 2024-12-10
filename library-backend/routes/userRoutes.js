const express = require('express');
const User = require('../models/User');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/get', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/post', async (req, res) => {
  const { firstName, lastName, email, role, password } = req.body;
  try {
    const user = new User({
      firstName,
      lastName,
      email,
      role,
      password
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/put/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      req.body,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  console.log('delete');
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
