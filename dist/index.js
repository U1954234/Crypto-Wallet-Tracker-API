"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use('/assets', express_1.default.static(path_1.default.join(__dirname, 'assets')));
app.set('views', path_1.default.join(__dirname, 'views'));
app.use((0, cors_1.default)());
app.set('view engine', 'ejs');
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false, }));
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
exports.default = app;
