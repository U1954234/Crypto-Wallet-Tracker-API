"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WalletClass {
    constructor() {
        this.walletbalance = 10000;
    }
    getBalance() {
        return this.walletbalance;
    }
    setBalance(newbalance) {
        this.walletbalance = newbalance;
    }
}
const Wallet = new WalletClass();
exports.default = Wallet;
