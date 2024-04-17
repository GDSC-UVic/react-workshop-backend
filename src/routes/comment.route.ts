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

export default router;
