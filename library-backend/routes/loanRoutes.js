const express = require('express');
const router = express.Router();
const Loan = require('../models/Loan');
const User = require('../models/User');

router.get('/get', async (req, res) => {
  try {
    const loans = await Loan.find();
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/post', async (req, res) => {
  const { userId, bookId, reservationDate } = req.body;
  console.log("Received reservation data:", req.body);
  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) {
      return res.status(404).json({ message: 'User or Book not found' });
    }

    const reservation = new Reservation({
      userId: userId,
      bookId: bookId,
      reservationDate: new Date(reservationDate),
      status: 'reserved',
    });

    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    console.log("Error saving reservation:", error);
    res.status(500).json({ message: error.message });
  }
});

router.put('/put/:_id', async (req, res) => {
  const { _id } = req.params;
  const updates = req.body;

  try {
    const updatedLoan = await Loan.findByIdAndUpdate(
      _id,
      updates,
      { new: true }
    );

    if (!updatedLoan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    res.status(200).json(updatedLoan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedLoan = await Loan.findByIdAndDelete(req.params.id);
    if (!deletedLoan) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;