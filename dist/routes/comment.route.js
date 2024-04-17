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
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const commentController = __importStar(require("../controller/comment.controller"));
const router = express.Router();
/**
 * @swagger
 * /api/v1/comments:
 *      get:
 *          summary: Get all comments
 *          parameters:
 *              -
 *                  name: authorization
 *                  description: Bearer token
 *                  in: header
 *                  type: string
 *                  required: true
 *          tags:
 *              - CommentEndpoints
 *          description: Send a request to get all comments from the database
 *          security:
 *              - bearerAuth: []
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Comment'
 *              401:
 *                 description: Unauthorized
 *              404:
 *                  description: Not found
 *              500:
 *                  description: Internal server error
 * components:
 *     schemas:
 *         Comment:
 *             type: object
 *             properties:
 *                 id:
 *                     type: string
 *                     example: clv38h9mx000013uyga53abcde
 *                 comment:
 *                     type: string
 *                     example: This is a comment
 *                 author:
 *                     type: string
 *                     example: John Doe
 *                 createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2021-09-01T00:00:00.000Z
 *                 updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: 2021-09-01T00:00:00.000Z
 *     securitySchemes:
 *         bearerAuth:
 *             type: http
 *             scheme: bearer
 *             bearerFormat: JWT
 */
router.get("/comments", commentController.getAllComments);
/**
 * @swagger
 * /api/v1/comments:
 *   post:
 *     summary: Post a new comment
 *     tags:
 *       - CommentEndpoints
 *     description: Send a request to post a new comment to the database
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *               author:
 *                 type: string
 *     parameters:
 *       -
 *         name: authorization
 *         description: Bearer token
 *         in: header
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
*/
router.post("/comments", commentController.postComment);
exports.default = router;
