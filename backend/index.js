const express = require('express');
const crypto = require('crypto');
const { JsonRpcProvider, Wallet, Contract } = require('ethers');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
//process.env.MONGO_URI
mongoose.connect('mongodb+srv://richtyagi5:qcZhtjpqYnCzJtV3@cluster0.hdutjwm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

const invoiceSchema = new mongoose.Schema({
  id: String,
  date: String,
  total: Number,
  hash: String,
  txHash: String,
  blockNumber: Number,
  timestamp: Number
});

const Invoice = mongoose.model('Invoice', invoiceSchema);
const provider = new JsonRpcProvider(process.env.RPC_URL);
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
const contract = new Contract(process.env.CONTRACT_ADDRESS, require('./InvoiceRegistryABI.json'), wallet);
const readContract = new Contract(process.env.CONTRACT_ADDRESS, require('./InvoiceRegistryABI.json'), provider);

function generateHash({ id, date, total }) {
  const str = `${id}-${date}-${total}`;
  return crypto.createHash('sha256').update(str).digest('hex');
}

app.post('/api/invoice', async (req, res) => {
  const { id, date, total } = req.body;
  const hash = generateHash({ id, date, total });

  try {
    const tx = await contract.storeInvoiceHash(hash);
    const receipt = await tx.wait();
    const block = await provider.getBlock(receipt.blockNumber);

    const invoiceData = {
      id,
      date,
      total,
      hash,
      txHash: tx.hash,
      blockNumber: receipt.blockNumber,
      timestamp: block.timestamp
    };

    const updated = await Invoice.findOneAndUpdate({ id }, invoiceData, { upsert: true, new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/invoice/verify/:hash', async (req, res) => {
  const { hash } = req.params;
  try {
    const verified = await readContract.isInvoiceHashStored(hash);
    res.json({ verified });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));