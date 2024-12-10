const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const loanRoutes = require('./routes/loanRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));

mongoose.connect('mongodb://localhost:27017/library')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.use(bodyParser.json());

app.use('/books', bookRoutes);
app.use('/loans', loanRoutes);
app.use('/reservations', reservationRoutes);
app.use('/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});