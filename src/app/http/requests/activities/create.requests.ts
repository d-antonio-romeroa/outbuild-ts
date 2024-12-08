import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { IRequestValidator } from '../../../utils/classes/request-validator';

export interface IAddActivityToScheduleRequest {
    schedule_id: number;
    user_id: number;
    name: string;
    description: string;
    start_date: Date;
    end_date: Date;
}

export default class AddActivityToScheduleRequest implements IRequestValidator<IAddActivityToScheduleRequest> {
    constructor () {}

    validate = async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<IAddActivityToScheduleRequest> => {
        const scheduleId = Number(request.params.scheduleId);
        const userId = Number(request.params.userId);
        const body = request.body;
    
        const validationSchema = yup.object().shape({
            schedule_id: yup.number().required('required'),
            user_id: yup.number().required('required'),
            name: yup.string().required('required'),
            description: yup.string().required('required'),
            start_date: yup.date().required('required'),
            end_date: yup.date().required('required'),
        });
    
        return validationSchema.validate({
            schedule_id: scheduleId,
            user_id: userId,
            name: body.name,
            description: body.description,
            start_date: body.start_date,
            end_date: body.end_date,
        });
    };

}
