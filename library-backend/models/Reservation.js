const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    reservationDate: { type: Date, required: true },
  },
  { 
    _id: true 
  }
);

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;