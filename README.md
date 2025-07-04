# 🧾 Blockchain-Integrated Invoice Module

A full-stack ERP/CRM extension that securely stores invoice hashes on the Ethereum blockchain (Sepolia testnet) for tamper-proof verification. Invoices are created, hashed using SHA-256, and stored both on MongoDB and Ethereum via smart contract. Users can also verify invoice integrity directly from the UI.

---

## 🚀 Features

- 📄 Create and list invoices
- 🔒 Store invoice hashes on Ethereum (Sepolia) using a smart contract
- ✅ Verify invoice hashes from UI (tampered or authentic)
- 🔗 Blockchain transparency with Etherscan links
- 🧠 Smart contract in Solidity
- 🌐 Frontend in React, backend in Node.js + Express
- 🗄️ Data stored in MongoDB

---

## 🧱 Tech Stack

| Layer      | Technology                        |
|------------|------------------------------------|
| Frontend   | React.js                          |
| Backend    | Node.js, Express.js               |
| Database   | MongoDB                           |
| Blockchain | Ethereum (Sepolia testnet)        |
| Web3       | Ethers.js                         |
| Wallet     | MetaMask                          |
| Smart Contract | Solidity (deployed via Remix or Hardhat) |
| Hashing    | SHA-256 via Node.js `crypto` module |

---

## 📂 Project Structure

```
backend/
├── abi/                         # Smart contract ABI
├── controllers/                 # Invoice logic
├── models/                      # MongoDB schemas
├── routes/                      # API routes
├── server.js                    # Express app entrypoint
frontend/
├── components/
│   └── InvoicePage.jsx          # Main invoice view
├── App.js
├── index.js
contracts/
└── InvoiceRegistry.sol          # Solidity contract
```

---

## ⚙️ Smart Contract

### `contracts/InvoiceRegistry.sol`

```solidity
function storeInvoiceHash(string memory hash) public;
function isInvoiceHashStored(string memory hash) public view returns (bool);
```

📍 Deployed to:  
`Sepolia Testnet`  
Contract Address: `0x...` *(replace with actual address)*

✅ [Verify on Etherscan](https://sepolia.etherscan.io)

---

## 🔧 Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

#### Create `.env` in `/backend`:

```env
MONGO_URI=mongodb://localhost:27017/invoices
PRIVATE_KEY=your_sepolia_wallet_private_key
CONTRACT_ADDRESS=0xYourDeployedContract
RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
```

Then:

```bash
node server.js
```

---

### 2. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Make sure the proxy is set to your backend (e.g., `http://localhost:5000`) in `package.json`.

---

## 📌 API Endpoints

| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| POST   | `/api/invoice`   | Save invoice + store hash |
| GET    | `/api/invoices`  | Get all invoices           |
| GET    | `invoice/verify/hash`  | Verify txn on blockchain           |

---

## 🧪 Sample Workflow

1. Fill the invoice form (ID, date, total)
2. Click **Save Invoice**
3. SHA-256 hash is generated and sent to the smart contract
4. Transaction hash + invoice data is saved in MongoDB
5. Invoices are listed with links to Etherscan for transparency

---

## 🛡️ Security Considerations

- Private key is used only in the backend (never exposed to client)
- All invoice data is hashed — only the hash goes on-chain
- Uses Ethers.js with MetaMask for secure Web3 interaction

---

## 🧠 Future Improvements

- IPFS backup for full invoice data
- Email/PDF export for clients
- Role-based access (Admin vs Finance team)
- Indexing via The Graph for blockchain events

---

## 👩‍💻 Author

Built by [Your Name] for Costo ERP-CRM Blockchain Integration Test  
📫 Reach out: [richatyagi1987@gmail.com]

---

## 📜 License

MIT — Free to use with attribution.