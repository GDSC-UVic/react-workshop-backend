import * as express from "express";
import * as commentController from "../controller/comment.controller";

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
 *                 comment:
 *                     type: string
 *                 author:
 *                     type: string
 *                 createdAt:
 *                     type: string
 *                     format: date-time
 *                 updatedAt:
 *                     type: string
 *                     format: date-time
 *     securitySchemes:
 *         bearerAuth:
 *             type: http
 *             scheme: bearer
 *             bearerFormat: JWT
 */
router.get("/comments", commentController.getAllComments);
router.post("/comments", commentController.postComment);

export default router;
