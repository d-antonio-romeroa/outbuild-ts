import { NextFunction, Request, Response } from "express";
import ApiResponse from '../../http/responses/ApiResponses'; // Import your response utility
import { ObjectSchema } from "yup";
import { ValidationError } from "./error";

export default class RequestValidator {
    // static validate: (request: Request) => Promise<any>;
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
            // return next(new ValidationError(error as any));
            throw new ValidationError(error as any);
        }
        // const { error } = validator.validate();

        // if (error) {
        //     // If validation fails, respond with error details
        //     const details = error.details.map((detail: { message: any; }) => detail.message);
        //     next(new ValidationError(details));
        // }

        // next(); // Continue to the next middleware or route
        // };
    }
}

export interface IRequestValidator<T> {
    validate: (request: Request, response: Response, next: NextFunction) => Promise<T>;
}

export const asyncHandler = (fn: Function) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(next);