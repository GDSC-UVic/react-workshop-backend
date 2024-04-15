import { Request, Response } from "express"
import * as commentService from "../services/comment.service"
import { authenticateToken } from "../auth/auth"

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      res.status(401).json({ message: 'Token is required' })
      return
    }
    const tokenDecrypt = authenticateToken(token)
    if (tokenDecrypt.name !== process.env.USER_TERM) {
      res.status(401).json({ message: "Invalid Token" })
      return
    }
    const comments = await commentService.getAllComments()
    res.status(200).json(comments)
  } catch (error: unknown) {
    if ((error as Error).message==='invalid signature') {
      res.status(401).json({ message: 'Invalid token' })
    }
    res.status(500).json({ message: (error as Error).message })
  }
}

export const postComment = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
      res.status(401).json({ message: 'Token is required' })
      return
    }
    const tokenDecrypt = authenticateToken(token)
    if (tokenDecrypt.name !== process.env.USER_TERM) {
      res.status(401).json({ message: "Invalid Token" })
      return
    }
    const comment = req.body.comment
    const author = req.body.author
    if (!comment || !author) {
      res.status(400).json({ message: 'Comment and author are required' })
      return
    }
    const newComment = await commentService.postComment(comment, author)
    res.status(201).json(newComment)
  } catch (error: unknown) {
    if ((error as Error).message==='invalid signature') {
      res.status(401).json({ message: 'Invalid token' })
    }
    res.status(500).json({ message: (error as Error).message })
  }
}