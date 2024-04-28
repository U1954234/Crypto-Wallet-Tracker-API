"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const User_1 = require("../../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenBlacklist_1 = require("../../middleware/tokenBlacklist");
const Cryptocurrency_1 = require("../../../src/models/Cryptocurrency");
// Hardcoded user for demonstration purposes
const hardcodedUser = new User_1.User('admin@admin.com', 'adminpass');
const SECRET_KEY = 'UYIDHO28039298J';
class userController {
    static login(req, res) {
        const { email, password } = req.body;
        console.log(req.body);
        let username = email;
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
        const token = authHeader && authHeader.split(' ')[1];
        if (token) {
            (0, tokenBlacklist_1.blacklistToken)(token);
            res.status(200).json({ message: "Logout successful!" });
        }
        else {
            res.status(400).json({ message: "No token provided." });
        }
    }
    authRedirect(req, res) {
        if (req.user) {
            return res.render('dashboard/overview');
        }
        else {
            return res.render('login');
        }
    }
    static index(req, res) {
        const user = req.user;
        return res.render('dashboard/overview', { user });
    }
    static user_details(req, res) {
        const user = req.user;
        user.cryptocurrencies = Cryptocurrency_1.cryptocurrencies;
        res.status(200).send({ status: true, message: "Data fetched", data: user });
    }
}
exports.userController = userController;
