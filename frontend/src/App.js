import React, { useState, useEffect } from 'react';
import axios from 'axios';
const API_HOST =  'http://localhost:5000'
const App = () => {
  const [invoiceId, setInvoiceId] = useState('');
  const [date, setDate] = useState('');
  const [total, setTotal] = useState('');
  const [invoices, setInvoices] = useState([]);
  const [verified, setVerified] = useState(null);

  const fetchInvoices = async () => {
    const res = await axios.get(API_HOST+'/api/invoices');
    setInvoices(res.data);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(API_HOST+'/api/invoice', { invoiceId, date, total });
    setInvoiceId('');
    setDate('');
    setTotal('');
    setVerified(null);
    fetchInvoices(); // reload list
  };

  const handleVerify = async (hash) => {
    try {
      const res = await axios.get(API_HOST+`/api/invoice/verify/${hash}`);
      setVerified(res.data.verified);
    } catch (err) {
      alert('Verification failed');
    }
  };

  return (
    <div>
      <h2>Create Invoice</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Invoice ID" value={invoiceId} onChange={e => setInvoiceId(e.target.value)} />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        <input placeholder="Total" type="number" value={total} onChange={e => setTotal(e.target.value)} />
        <button type="submit">Save Invoice</button>
      </form>

      <h2>Invoices</h2>
      <ul>
        {invoices.map(inv => (
          <li key={inv._id}>
            <strong>{inv.invoiceId}</strong> - {inv.date} - ${inv.total} <br />
            ✅ Tx: <a href={`https://sepolia.etherscan.io/tx/${inv.txHash}`} target="_blank" rel="noreferrer">{inv.txHash.slice(0, 10)}...</a>
            <button onClick={() => handleVerify(inv.hash)}> VerifyOnBlockChain</button>
            {verified !== null && (
              <p>{verified ? '✅ Verified' : '❌ Tampered'}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
