const express = require('express');
const User = require('../models/User');
const Loan = require('../models/Loan');
const router = express.Router();

router.get('/get', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/post', (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password,
  });

  newUser.save()
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json({ message: err.message }));
});

router.put('/put/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const updatedUser = await User.findOneAndUpdate(
      { _id: _id },
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

router.put('/add-loan/:_id', async (req, res) => {
  const { _id, loanDate, returnDate, isReturned } = req.body;
  try {
    const _id = req.params._id;

    const newLoan = new Loan({
      user: _id,
      book: _id,
      loanDate,
      returnDate,
      isReturned
    });

    await newLoan.save();


    res.status(200).json(newLoan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(_id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;