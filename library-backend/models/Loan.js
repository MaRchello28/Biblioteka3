const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    loanDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    isReturned: { type: Boolean, required: true },
  },
  { 
    _id: true 
  }
);

const Loan = mongoose.model('Loan', loanSchema);
module.exports = Loan;