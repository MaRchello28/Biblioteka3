const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publicationYear: { type: Number, required: true },
    isAvailable: { type: Boolean, required: true }
  }
);

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;