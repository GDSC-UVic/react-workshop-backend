import * as express from "express"
import * as commentController from "../controller/comment.controller"

const router = express.Router()

router.get("/comments", commentController.getAllComments)

export default router