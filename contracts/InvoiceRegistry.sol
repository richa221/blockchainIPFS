// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InvoiceRegistry {
    mapping(string => bool) private invoiceHashes;

    event InvoiceHashStored(string indexed hash, address indexed sender);

    function storeInvoiceHash(string memory hash) public {
        require(!invoiceHashes[hash], "Hash already stored");
        invoiceHashes[hash] = true;
        emit InvoiceHashStored(hash, msg.sender);
    }

    function isInvoiceHashStored(string memory hash) public view returns (bool) {
        return invoiceHashes[hash];
    }
}