"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateToken = (token) => {
    if (!process.env.TOKEN_SECRET) {
        throw new Error("Token secret is not defined");
    }
    const tokenDecrypt = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    console.log(tokenDecrypt);
    return JSON.parse(JSON.stringify(tokenDecrypt));
};
exports.authenticateToken = authenticateToken;
