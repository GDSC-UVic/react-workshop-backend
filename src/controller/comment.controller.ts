import { Request, Response } from "express"
import * as commentService from "../services/comment.service"

export const getAllComments = async (req: Request, res: Response) => {
  try {
    console.log(req.body)
    const comments = await commentService.getAllComments()
    res.status(200).json(comments)
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message })
  }
}