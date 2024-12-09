import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { IRequestValidator } from '../../../utils/classes/request-validator';
import { BadRequestError, UnAuthorizedError } from '../../../utils/classes/error';
import { decodeToken } from '../../../utils/auth/jwt.util';

export interface ILoginRequest {
    email: string;
    password: string;
}

export default class LoginRequest implements IRequestValidator<ILoginRequest> {
    constructor () {}

    validate = async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<ILoginRequest> => {
        const {email, password} = request.body;

        const validationSchema = yup.object().shape({
            email: yup.string().required('required'),
            password: yup.string().required('required'),
        });
    
        return validationSchema.validate({
            email,
            password,
        });
    };

}
