import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { IRequestValidator } from '../../../utils/classes/request-validator';

export interface ICreateScheduleRequest {
    name: string;
    user_id: number;
    url: string;
}

export default class CreateScheduleRequest implements IRequestValidator<ICreateScheduleRequest> {
    constructor () {}

    validate = async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<ICreateScheduleRequest> => {
        const userId = Number(request.params.userId);
        const body = request.body;
    
        const validationSchema = yup.object().shape({
            name: yup.string().required('required'),
            user_id: yup.number().required('required'),
            url: yup.string().required('required'),
        });
    
        return validationSchema.validate({
            user_id: userId,
            name: body.name,
            url: body.url
        });
    };

}
