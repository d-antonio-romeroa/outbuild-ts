import { NextFunction, Request, Response } from "express";
import { ValidationError } from "./error";

export default class RequestValidator {
    /**
     * Middleware to validate request data.
     * @param RequestValidationHandler Joi schema to validate against.
     */
    static async validate(RequestValidationHandler: any, req: Request, res: Response, next: NextFunction) {
        const validator = new RequestValidationHandler();
        try {
            return await validator.validate(req, res, next)
        } catch (error) {
            console.log(error)
            throw new ValidationError(error as any);
        }
    }
}

export interface IRequestValidator<T> {
    validate: (request: Request, response: Response, next: NextFunction) => Promise<T>;
}

export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);