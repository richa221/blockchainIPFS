const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoice.controller');

router.post('/invoice', invoiceController.saveInvoice);
router.get('/invoices', invoiceController.getInvoices);
router.get('/invoice/verify/:hash', invoiceController.verifyInvoice);

module.exports = router;
