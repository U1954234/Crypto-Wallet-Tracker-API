"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authenticateToken_1 = require("../../src/middleware/authenticateToken");
const userController_1 = require("../controllers/auth/userController");
const walletController_1 = require("../../src/controllers/walletController");
const dashboardRouter = express_1.default.Router();
dashboardRouter.get('/', authenticateToken_1.authenticateToken, userController_1.userController.index);
dashboardRouter.get("/user-details", authenticateToken_1.authenticateToken, userController_1.userController.user_details);
dashboardRouter.get("/transactions", authenticateToken_1.authenticateToken, walletController_1.getTransactions);
dashboardRouter.post("/add-transaction", authenticateToken_1.authenticateToken, walletController_1.addTransaction);
dashboardRouter.post("/add-wallet", authenticateToken_1.authenticateToken, walletController_1.addWallet);
exports.default = dashboardRouter;
