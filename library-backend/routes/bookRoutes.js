const express = require('express');
const app = express();
const Book = require('../models/Book');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/get', async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/post', async (req, res) => {
  const { title, author, genre, publicationYear, isAvailable } = req.body;
  try {
    const book = new Book({
      title,
      author,
      genre,
      publicationYear,
      isAvailable,
    });

    await book.save();
    res.status(201).json(book); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/put/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const updatedBook = await Book.findOneAndUpdate(
      { _id: _id },
      req.body,
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedBook = await Book.findOneAndDelete(
      { _id: _id },
      req.body,
      { new: true }
    );

    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;