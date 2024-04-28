"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/auth/userController");
const authRouter = express_1.default.Router();
authRouter.post("/login", userController_1.userController.login);
authRouter.post("/logout", userController_1.userController.logout);
exports.default = authRouter;
