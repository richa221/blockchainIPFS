const crypto = require('crypto');
const Invoice = require('../model/Invoice');
const { JsonRpcProvider, Wallet, Contract } = require('ethers');
const abi = require('../abi/InvoiceRegistryABI.json');

const provider = new JsonRpcProvider(process.env.RPC_URL);
const wallet = new Wallet(process.env.PRIVATE_KEY, provider);
const contract = new Contract(process.env.CONTRACT_ADDRESS, abi, wallet);
const readContract = new Contract(process.env.CONTRACT_ADDRESS, abi, provider);

const saveInvoice = async (req, res) => {
  const { invoiceId, date, total } = req.body;

  const hash = crypto.createHash('sha256').update(`${invoiceId}-${date}-${total}`).digest('hex');

  try {
    const tx = await contract.storeInvoiceHash(hash);
    const receipt = await tx.wait();
    const block = await provider.getBlock(receipt.blockNumber);

    const invoiceData = {
      invoiceId,
      date,
      total,
      hash,
      txHash: tx.hash,
      blockNumber: receipt.blockNumber,
      createdAt: block.timestamp
    };

    const newInvoice = await Invoice.findOneAndUpdate({ invoiceId }, invoiceData, { upsert: true, new: true });
    res.status(200).json({ message: 'Invoice saved', invoice: newInvoice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save invoice' });
  }
};

const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.status(200).json(invoices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
};

const verifyInvoice = async (req, res) => {
    const { hash } = req.params;
    console.log('++++++++++++', hash);
    try {
        const verified = await readContract.isInvoiceHashStored(hash);
        res.json({ verified });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  };

  module.exports = {
    getInvoices,
    verifyInvoice,
    saveInvoice
  };
