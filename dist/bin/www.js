"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const helpers_1 = require("../utilities/helpers");
const http_1 = __importDefault(require("http"));
const authRouter_1 = __importDefault(require("../routes/authRouter"));
const dashboardRouter_1 = __importDefault(require("../../src/routes/dashboardRouter"));
var port = (0, helpers_1.normalizePort)(process.env.PORT || "3000");
index_1.default.set('port', port);
var server = http_1.default.createServer(index_1.default);
//ROUTES
index_1.default.use("/auth", authRouter_1.default);
index_1.default.use("/user", dashboardRouter_1.default);
server.listen(index_1.default.get('port'), () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('server running on port:' + index_1.default.get('port'));
    }
    catch (error) {
        console.log(error);
    }
}));
server.on('error', helpers_1.onError);
server.on('listening', helpers_1.onListening);
