import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { IRequestValidator } from '../../../utils/classes/request-validator';

export interface ILoginRequest {
    email: string;
    password: string;
    ua: string;
    ip: string;
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
    
        const validatedData = await validationSchema.validate({
            email,
            password,
        });

        return {
            ...validatedData,
            ua: request.get('user-agent')!,
            ip: request.ip!
        }
    };

}
