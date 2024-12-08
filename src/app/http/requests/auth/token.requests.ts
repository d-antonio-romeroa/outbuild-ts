import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { IRequestValidator } from '../../../utils/classes/request-validator';
import { BadRequestError, UnAuthorizedError } from '../../../../app/utils/classes/error';
import { decodeToken } from '../../../../app/utils/auth/jwt.util';

export interface ITokenRequest {
    sub: number;
    iat: number;
    exp: number;
}

export default class TokenRequest implements IRequestValidator<ITokenRequest> {
    constructor () {}

    validate = async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<ITokenRequest> => {
        const requestBearerToken = request.headers.authorization;

        if (!requestBearerToken) {
            throw new BadRequestError();
        }
    
        const token = requestBearerToken.split(" ")[1];
        if (!token) {
            throw new UnAuthorizedError();
        };

        const { sub, exp, iat } = decodeToken(token);
    
        const validationSchema = yup.object().shape({
            sub: yup.number().required('required'),
            iat: yup.number().required('required'),
            exp: yup.number().required('required'),
        });
    
        return validationSchema.validate({
            sub,
            exp,
            iat
        });
    };

}
