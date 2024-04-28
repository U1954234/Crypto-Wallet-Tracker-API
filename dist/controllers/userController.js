"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = require("../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenBlacklist_1 = require("../middleware/tokenBlacklist");
// Hardcoded user for demonstration purposes
const hardcodedUser = new User_1.User('admin', 'adminpass');
const SECRET_KEY = 'UYIDHO28039298J'; // In production, ensure this is a secure key and kept secret
class UserController {
    static login(req, res) {
        const { username, password } = req.body;
        if (username === hardcodedUser.username && hardcodedUser.validatePassword(password)) {
            // Generate token
            const token = jsonwebtoken_1.default.sign({ username: hardcodedUser.username }, SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({
                status: true,
                message: "Login successful!",
                token: token
            });
        }
        else {
            res.status(401).json({
                status: false,
                message: "Invalid username or password."
            });
        }
    }
    static logout(req, res) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Retrieve the token from the Authorization header
        if (token) {
            (0, tokenBlacklist_1.blacklistToken)(token); // Add the token to the blacklist
            res.status(200).json({ message: "Logout successful!" });
        }
        else {
            res.status(400).json({ message: "No token provided." });
        }
    }
}
exports.UserController = UserController;
