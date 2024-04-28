import express, { Router } from 'express'
import { authenticateToken as Auth } from '../../src/middleware/authenticateToken'
import {userController} from '../controllers/auth/userController'
import { addTransaction, addWallet, getTransactions } from '../../src/controllers/walletController'
const dashboardRouter :Router = express.Router()

dashboardRouter.get('/',Auth,userController.index)
dashboardRouter.get("/user-details",Auth,userController.user_details)
dashboardRouter.get("/transactions",Auth,getTransactions)
dashboardRouter.post("/add-transaction",Auth,addTransaction)
dashboardRouter.post("/add-wallet",Auth,addWallet)

export default dashboardRouter