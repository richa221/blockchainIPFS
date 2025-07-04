const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const invoiceRoutes = require('./routes/invoice.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', invoiceRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(5000, () => console.log('Server running on port 5000'));
});