import { Response } from "express"
import jwt from "jsonwebtoken"

export const authenticateToken = (token: string) => {
  if (!process.env.TOKEN_SECRET) {
    throw new Error("Token secret is not defined")
  }
  const tokenDecrypt = jwt.verify(token, process.env.TOKEN_SECRET)
  console.log(tokenDecrypt)
  return JSON.parse(JSON.stringify(tokenDecrypt))
}
