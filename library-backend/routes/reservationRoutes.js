const express = require('express');
const Reservation = require('../models/Reservation');
const User = require('../models/User');
const Book = require('../models/Book');
const router = express.Router();

router.get('/get', async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('user').populate('book');
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/post', async (req, res) => {
  const { userId, bookId, reservationDate } = req.body;
  try {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) {
      return res.status(404).json({ message: 'User or Book not found' });
    }

    const reservation = new Reservation({
      user: userId,
      book: bookId,
      reservationDate: new Date(reservationDate),
      status: 'reserved',
    });

    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/put/:id', async (req, res) => {
  try {
    const updatedReservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json(updatedReservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedReservation = await Reservation.findByIdAndDelete(req.params.id);

    if (!deletedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
