
import express, { ErrorRequestHandler, Request, Response } from "express";
import DbConnection from '../config/database';

// src/app.ts
import {errorHandler} from '../app/http/middleware/errorHandler';


import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger';
import apiV1Router from "../routes/v1";
import apiLogger, { requestTimeLogger } from "../app/http/middleware/logger";
import rateLimitHandler from "../app/http/middleware/rateLimit";
import ApiResponse from "../app/http/responses/ApiResponses";
import winstonLogger from "../app/utils/logger/winston.logger";
import { randomUUID } from "crypto";

const PORT = process.env.PORT || 3000;

export class ExpressServerApp {

    #serverInstance: express.Application = express();

    constructor () {
        try {
            this.start();
        } catch (error) {
            winstonLogger.error(error);
        }
    }

    start() {

        this.#serverInstance.use((req: any, res: any, next: any) => {
            req.requestId = randomUUID();
            next();
        });

        this.#serverInstance.use(apiLogger);
        
        this.#serverInstance.use(requestTimeLogger);

        this.#serverInstance.use(rateLimitHandler);
        
        this.#serverInstance.use(express.json());
        
        // set logger middleware
        
        // set swagger docs middleware
        this.#serverInstance.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
        
        // this.#serverInstance.use(async (req, res, next) => {
        //     try {
        //         await next()
        //     } catch (error) {
        //         ApiResponse.error(res, 'Internal Server Error');
        //     }
        // })
        
        DbConnection.authenticate();
        
        // set api v1 routes
        this.#serverInstance.use('/api/v1', apiV1Router);
        
        // set error handler middleware
        this.#serverInstance.use(errorHandler as unknown as ErrorRequestHandler);
        
        this.#serverInstance.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
}