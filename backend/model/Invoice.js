const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
  invoiceId: String,
  date: String,
  total: Number,
  hash: String,
  txHash: String,
  blockNumber: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
