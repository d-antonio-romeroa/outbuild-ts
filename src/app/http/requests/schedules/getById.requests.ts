import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import RequestValidator, { IRequestValidator } from '../../../utils/classes/request-validator';
import { BadRequestError } from '../../../utils/classes/error';

export interface IGetScheduleByIdRequest {
    id: number
}

export default class GetScheduleByIdRequest implements IRequestValidator<IGetScheduleByIdRequest> {
    constructor () {}

    validate = async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<IGetScheduleByIdRequest> => {
        const scheduleId = Number(request.params.scheduleId);
    
        const validationSchema = yup.object().shape({
            id: yup.number().required('User name is required'),
        });
    
        return validationSchema.validate({
            id: scheduleId,
        });
    };

}
