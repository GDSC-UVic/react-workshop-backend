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
exports.postComment = exports.getAllComments = void 0;
const db_1 = __importDefault(require("../config/db"));
const getAllComments = () => __awaiter(void 0, void 0, void 0, function* () {
    const comments = yield db_1.default.comment.findMany();
    return comments;
});
exports.getAllComments = getAllComments;
const postComment = (comment, author) => __awaiter(void 0, void 0, void 0, function* () {
    const newComment = yield db_1.default.comment.create({
        data: {
            comment: comment,
            author: author
        }
    });
    return newComment;
});
exports.postComment = postComment;
