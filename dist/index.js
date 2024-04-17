"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.js
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const comment_route_1 = __importDefault(require("./routes/comment.route"));
const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.6.3/swagger-ui.min.css";
dotenv_1.default.config();
const corsOptions = {
    origin: process.env.ORIGIN_URL || "http://localhost:5173",
    credentials: true,
    optionsSuccessStatus: 200,
};
const app = (0, express_1.default)();
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
    customCssUrl: CSS_URL,
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)("[:date] :method :url :status :res[content-length] - :remote-addr - :response-time ms"));
app.set("trust proxy", "loopback, linklocal, uniquelocal");
app.use((0, cors_1.default)(corsOptions));
app.use((0, helmet_1.default)());
const port = Number(process.env.PORT) || 3000;
app.use("/api/v1/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.use("/api/v1", comment_route_1.default);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.listen(port, function () {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
