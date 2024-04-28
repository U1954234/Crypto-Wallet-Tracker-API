import { Request, Response } from "express";
import transactions from "../../src/models/Transactions";
import Wallet from "../../src/models/Wallet";
import BlockChain from "./blockchainSimulator";
import { cryptocurrencies } from "../../src/models/Cryptocurrency";
export const addTransaction = (req : Request,  res:Response) => {
    const transaction = req.body;
    if (BlockChain.validateTransaction(transaction)) {
            var { type, currency,address } = transaction
            var amount = parseInt(transaction.amount)
            transactions.push({type,amount,currency,date:new Date(),userId:1,id:'REF'+Math.random(),address})
            var currentBalance = Wallet.getBalance();
            if (type == 'BUY') {
                Wallet.setBalance(currentBalance -= amount)
            } else {
                Wallet.setBalance(currentBalance += amount)
            }
            res.status(200).send({
                status:true,balance:Wallet.getBalance(),message:'Transaction completed!',statusCode:200
            })
    } else {
        res.status(403).send({
            status:false,statusCode:403,message:"This transaction is invalid. Ensure the transaction contain valid details"
        })
    }
};
export const getTransactions = (req : Request, res:Response) => {
    res.status(200).send({status:true,message:"Data fetched!",data:transactions})
};
export const addWallet =  (req : Request, res:Response) => {
    const {name,symbol,value} = req.body
    cryptocurrencies.push({name,symbol,value,walletId:cryptocurrencies.length +1,currency:'$'})
    return res.status(200).send({status:true,message:"Wallet successfully added!",data:cryptocurrencies})
};