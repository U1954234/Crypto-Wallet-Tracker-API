import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { isTokenBlacklisted } from './tokenBlacklist';

const SECRET_KEY = 'UYIDHO28039298J';

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).send({
        statusCode:401,message:"Token Expired",status:false
    });
    if (isTokenBlacklisted(token)) {
        return res.status(401).json({ message: "Token has been blacklisted." });
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(403).send({message:"Invalid token",status:false,statusCode:403}); 
        (req as any).user = decoded;  //
        next();
    });
}
