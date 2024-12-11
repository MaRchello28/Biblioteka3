const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema(
  {
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    loanDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    isReturned: { type: Boolean, required: true },
  }
);

const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
