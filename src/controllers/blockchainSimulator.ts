
export class BlockchainSimulator {
    validateTransaction(transaction) {
        return transaction.amount > 0; 
    }
}
const BlockChain = new BlockchainSimulator()
export default BlockChain