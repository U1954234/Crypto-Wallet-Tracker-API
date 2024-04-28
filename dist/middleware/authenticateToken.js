"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenBlacklist_1 = require("./tokenBlacklist");
const SECRET_KEY = 'UYIDHO28039298J';
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.status(401).send({
            statusCode: 401, message: "Token Expired", status: false
        });
    if ((0, tokenBlacklist_1.isTokenBlacklisted)(token)) {
        return res.status(401).json({ message: "Token has been blacklisted." });
    }
    jsonwebtoken_1.default.verify(token, SECRET_KEY, (err, decoded) => {
        if (err)
            return res.status(403).send({ message: "Invalid token", status: false, statusCode: 403 });
        req.user = decoded; //
        next();
    });
}
exports.authenticateToken = authenticateToken;
