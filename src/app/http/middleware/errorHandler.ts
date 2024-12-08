// src/middleware/errorHandler.ts
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import ApiResponse from '../responses/ApiResponses';
import { BaseError, ValidationError } from '../../utils/classes/error';
import winstonLogger from '../../utils/logger/winston.logger';
import { UniqueConstraintError } from 'sequelize';


// error handler middleware
export const errorHandler = (err: Error, req: any, res: Response, next: NextFunction) => {
  console.log('CALLING ERROR HANDLER', err);
  winstonLogger.error(`[${req.requestId}] - ${err.message}`)

  if (err instanceof ValidationError || err instanceof UniqueConstraintError) {
    return ApiResponse.error(res, err.message, 400, err.name);
  } else if (err instanceof BaseError) {
    return ApiResponse.error(res, err.message, err.status);
  }
  return ApiResponse.error(res, 'Internal Server Error');

}