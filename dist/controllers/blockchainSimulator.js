"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainSimulator = void 0;
class BlockchainSimulator {
    validateTransaction(transaction) {
        return transaction.amount > 0;
    }
}
exports.BlockchainSimulator = BlockchainSimulator;
const BlockChain = new BlockchainSimulator();
exports.default = BlockChain;
