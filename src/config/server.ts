
import express, { ErrorRequestHandler, Request, Response } from "express";
import DbConnection from '../config/database';

// src/app.ts
import {errorHandler} from '../app/http/middleware/errorHandler';


import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger';
import apiV1Router from "../routes/v1";
import apiLoggerMiddleware, { requestTimeLogger } from "../app/http/middleware/logger";
import rateLimitHandler from "../app/http/middleware/rateLimit";
import apiLogger from "../app/utils/logger/api.logger";
import { randomUUID } from "crypto";

const PORT = process.env.PORT || 3000;

export class ExpressServerApp {

    #serverInstance: express.Application = express();

    constructor () {
        try {
            this.start();
        } catch (error) {
            apiLogger.error(error);
        }
    }

    start() {

        this.#serverInstance.use((req: any, res: any, next: any) => {
            req.requestId = randomUUID();
            next();
        });

        this.#serverInstance.use(apiLoggerMiddleware);
        
        this.#serverInstance.use(requestTimeLogger);

        this.#serverInstance.use(express.json({ limit: '10mb' }));

        this.#serverInstance.use(rateLimitHandler);        
        
        // set logger middleware
        
        // set swagger docs middleware
        this.#serverInstance.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
        
        DbConnection.authenticate();
        
        // set api v1 routes
        this.#serverInstance.use('/api/v1', apiV1Router);
        
        // set error handler middleware
        this.#serverInstance.use(errorHandler as unknown as ErrorRequestHandler);
        
        this.#serverInstance.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
}