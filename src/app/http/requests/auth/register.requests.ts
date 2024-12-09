import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { IRequestValidator } from '../../../utils/classes/request-validator';

export interface IRegisterRequest {
    username: string;
    email: string;
    password: string;
}

export default class RegisterRequest implements IRequestValidator<IRegisterRequest> {
    constructor () {}

    validate = async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<IRegisterRequest> => {
        const {email, password, username} = request.body;

        const validationSchema = yup.object().shape({
            email: yup.string().required('required'),
            username: yup.string().required('required'),
            password: yup.string().required('required'),
        });
    
        return validationSchema.validate({
            email,
            username,
            password,
        });
    };

}
