const express = require('express');
const app = express();
const Reservation = require('../models/Reservation');
const User = require('../models/User');
const Book = require('../models/Book');
const router = express.Router();

router.get('/get', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/post', async (req, res) => {
  console.log('Received data:', req.body);
  const { userId, bookId, reservationDate } = req.body;
  try {
    const user = await User.findById(userId);
    console.log(user);
    const book = await Book.findById(bookId);
    console.log(book);
    if (!user || !book) {
      return res.status(404).json({ message: 'User or Book not found' });
    }

    const reservation = new Reservation({
      userId: userId,
      bookId: bookId,
      reservationDate: new Date(reservationDate),
    });
    console.log(reservation);

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