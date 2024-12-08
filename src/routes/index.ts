// src/routes/users.ts
import express from 'express';
import apiV1Router from './v1';

const mainRouter = express.Router();

/**
 * @swagger
 *
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       name: Authorization
 *       in: header
 */


/**
 * @swagger
 * tags:
 *   - name: API
 *     description: API operations
 *   - name: Schedule
 *     description: Schedule management operations
 */

mainRouter.use('/schedules', apiV1Router);


export default mainRouter;