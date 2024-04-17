// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan"
import cors from "cors"
import helmet from "helmet"
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import commentRoute from "./routes/comment.route"

const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.6.3/swagger-ui.min.css";

dotenv.config();

const corsOptions = {
  origin: process.env.ORIGIN_URL || "http://localhost:5173",
  credentials: true,
  optionsSuccessStatus: 200
}

const app: Express = express();

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "React Workshop API",
      version: "1.0.0",
    },
    schemes: ["http", "https"],
    servers: [{ url: process.env.API_URL || "http://localhost:3001/" }],
  },
  apis: [
    `${__dirname}/routes/comment.route.ts`,
    "./dist/routes/comment.route.js",
  ],
};
const swaggerSpec = swaggerJSDoc(options);

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan("[:date] :method :url :status :res[content-length] - :remote-addr - :response-time ms"))
app.set("trust proxy", "loopback, linklocal, uniquelocal")
app.use(cors(corsOptions))
app.use(helmet())
const port = Number(process.env.PORT) || 3000;

app.use("/api/v1/docs", swaggerUi.serve,swaggerUi.setup(swaggerSpec, { customCss: CSS_URL }))

app.use("/api/v1", commentRoute)

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, function () {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});