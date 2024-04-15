"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postComment = exports.getAllComments = void 0;
const commentService = __importStar(require("../services/comment.service"));
const auth_1 = require("../auth/auth");
const getAllComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Token is required' });
            return;
        }
        const tokenDecrypt = (0, auth_1.authenticateToken)(token);
        if (tokenDecrypt.name !== process.env.USER_TERM) {
            res.status(401).json({ message: "Invalid Token" });
            return;
        }
        const comments = yield commentService.getAllComments();
        res.status(200).json(comments);
    }
    catch (error) {
        if (error.message === 'invalid signature') {
            res.status(401).json({ message: 'Invalid token' });
        }
        res.status(500).json({ message: error.message });
    }
});
exports.getAllComments = getAllComments;
const postComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'Token is required' });
            return;
        }
        const tokenDecrypt = (0, auth_1.authenticateToken)(token);
        if (tokenDecrypt.name !== process.env.USER_TERM) {
            res.status(401).json({ message: "Invalid Token" });
            return;
        }
        const comment = req.body.comment;
        const author = req.body.author;
        if (!comment || !author) {
            res.status(400).json({ message: 'Comment and author are required' });
            return;
        }
        const newComment = yield commentService.postComment(comment, author);
        res.status(201).json(newComment);
    }
    catch (error) {
        if (error.message === 'invalid signature') {
            res.status(401).json({ message: 'Invalid token' });
        }
        res.status(500).json({ message: error.message });
    }
});
exports.postComment = postComment;
