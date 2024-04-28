import { Request, Response } from 'express';
import { User } from '../../models/User';
import jwt from 'jsonwebtoken';
import { isTokenBlacklisted,blacklistToken } from '../../middleware/tokenBlacklist'; 
import { cryptocurrencies } from '../../../src/models/Cryptocurrency';

// Hardcoded user for demonstration purposes
const hardcodedUser = new User('admin@admin.com', 'adminpass');
const SECRET_KEY = 'UYIDHO28039298J'; 

export class userController {
    static login(req: Request, res: Response) {
        const { email, password } = req.body;
        console.log(req.body);
        let username = email
        if (username === hardcodedUser.username && hardcodedUser.validatePassword(password)) {
            // Generate token
            const token = jwt.sign({ username: hardcodedUser.username }, SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({
                status:true,
                message: "Login successful!",
                token: token
            });
        } else {
            res.status(401).json({
                status:false,
                message: "Invalid username or password."
            });
        }
    }

    static logout(req: Request, res: Response) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (token) {
            blacklistToken(token); 
            res.status(200).json({ message: "Logout successful!" });
        } else {
            res.status(400).json({ message: "No token provided." });
        }
    }
    authRedirect (req : Request, res:Response){
        if ((req as any).user) {
            return res.render('dashboard/overview')
        }else{
            return res.render('login')
        }
    }
    static index(req:Request,res:Response) : void {
        const user = (req as any).user
        return res.render('dashboard/overview',{user})
    }
    static user_details (req:Request,res:Response) : void {
        const user = (req as any).user
        user.cryptocurrencies = cryptocurrencies
         res.status(200).send({status:true,message:"Data fetched",data:user})
    }
}
