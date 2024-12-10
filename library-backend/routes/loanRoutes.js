const express = require('express');
const Loan = require('../models/Loan');
const router = express.Router();

router.get('/get', async (req, res) => {
  try {
    const loans = await Loan.find().populate('user book');
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/post', async (req, res) => {
  const { user, book, loanDate, returnDate, isReturned } = req.body;
  try {
    const loan = new Loan({
      user,
      book,
      loanDate,
      returnDate,
      isReturned,
    });

    await loan.save();
    res.status(201).json(loan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/put/:id', async (req, res) => {
  const loanId = req.params.id;
  const { user, book, loanDate, returnDate, isReturned } = req.body;

  try {
    const updatedLoan = await Loan.findByIdAndUpdate(
      loanId,
      { user, book, loanDate, returnDate, isReturned },
      { new: true }
    ).populate('user book');

    if (!updatedLoan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    res.status(200).json(updatedLoan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const loanId = req.params.id;

  try {
    const deletedLoan = await Loan.findByIdAndDelete(loanId);

    if (!deletedLoan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
