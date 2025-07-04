const { JsonRpcProvider, Contract } = require('ethers');
require('dotenv').config();

const provider = new JsonRpcProvider(process.env.RPC_URL);
const abi = require('./InvoiceRegistryABI.json'); // ✅ FIXED here
const contract = new Contract(process.env.CONTRACT_ADDRESS, abi, provider);

const hash = "9180c2165684cd6a1e016f0cb34530a1a681c87db685daadf51fe77d72c1bd17";

async function main() {
  try {
    const result = await contract.isInvoiceHashStored(hash);
    console.log("✅ isInvoiceHashStored:", result);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

main();