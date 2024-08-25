import './tracing';
import cors from "cors";
import express, {type Express} from "express";
import helmet from "helmet";
import {pino} from "pino";

import {openAPIRouter} from "@/api-docs/openAPIRouter";
import {healthCheckRouter} from "@/api/healthCheck/healthCheckRouter";

import errorHandler from "@/common/middleware/errorHandler";
import rateLimiter from "@/common/middleware/rateLimiter";
import requestLogger from "@/common/middleware/requestLogger";
import {env} from "@/common/utils/envConfig";
import {categoryRouter, productRouter} from "@/api/products/productRouter";
import {basketRouter} from "./api/basket/basketRouter";


const logger = pino({name: "server start", level: "trace"});
const app: Express = express();

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: env.CORS_ORIGIN, credentials: true}));
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);
BigInt.prototype.toJSON = function () {
    return Number(this);
};
// Routes
app.use("/health-check", healthCheckRouter);
app.use("/items", productRouter);
app.use("/categories", categoryRouter);
app.use("/", basketRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export {app, logger};
