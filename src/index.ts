// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan"
import cors from "cors"
import helmet from "helmet"

import commentRoute from "./routes/comment.route"

dotenv.config();

const corsOptions = {
  origin: process.env.ORIGIN_URL || "http://localhost:5173/",
  credentials: true,
  optionsSuccessStatus: 200
}

const app: Express = express();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan("[:date] :method :url :status :res[content-length] - :remote-addr - :response-time ms"))
app.set("trust proxy", "loopback, linklocal, uniquelocal")
app.use(cors(corsOptions))
app.use(helmet())
const port = process.env.PORT || 3000;

app.use("/api/v1", commentRoute)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});