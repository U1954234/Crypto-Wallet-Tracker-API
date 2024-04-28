"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWallet = exports.getTransactions = exports.addTransaction = void 0;
const Transactions_1 = __importDefault(require("../../src/models/Transactions"));
const Wallet_1 = __importDefault(require("../../src/models/Wallet"));
const blockchainSimulator_1 = __importDefault(require("./blockchainSimulator"));
const Cryptocurrency_1 = require("../../src/models/Cryptocurrency");
const addTransaction = (req, res) => {
    const transaction = req.body;
    if (blockchainSimulator_1.default.validateTransaction(transaction)) {
        var { type, currency, address } = transaction;
        var amount = parseInt(transaction.amount);
        Transactions_1.default.push({ type, amount, currency, date: new Date(), userId: 1, id: 'REF' + Math.random(), address });
        var currentBalance = Wallet_1.default.getBalance();
        if (type == 'BUY') {
            Wallet_1.default.setBalance(currentBalance -= amount);
        }
        else {
            Wallet_1.default.setBalance(currentBalance += amount);
        }
        res.status(200).send({
            status: true, balance: Wallet_1.default.getBalance(), message: 'Transaction completed!', statusCode: 200
        });
    }
    else {
        res.status(403).send({
            status: false, statusCode: 403, message: "This transaction is invalid. Ensure the transaction contain valid details"
        });
    }
};
exports.addTransaction = addTransaction;
const getTransactions = (req, res) => {
    res.status(200).send({ status: true, message: "Data fetched!", data: Transactions_1.default });
};
exports.getTransactions = getTransactions;
const addWallet = (req, res) => {
    const { name, symbol, value } = req.body;
    Cryptocurrency_1.cryptocurrencies.push({ name, symbol, value, walletId: Cryptocurrency_1.cryptocurrencies.length + 1, currency: '$' });
    return res.status(200).send({ status: true, message: "Wallet successfully added!", data: Cryptocurrency_1.cryptocurrencies });
};
exports.addWallet = addWallet;
