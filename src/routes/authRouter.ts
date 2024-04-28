import express, { Router } from 'express'
import { userController } from '../controllers/auth/userController'
import { authenticateToken } from '../../src/middleware/authenticateToken'
const authRouter :Router = express.Router()

authRouter.post("/login",userController.login)
authRouter.post("/logout",userController.logout)


export default authRouter