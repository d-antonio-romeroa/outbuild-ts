import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { IRequestValidator } from '../../../utils/classes/request-validator';
import { IAddActivityToScheduleRequest } from './create.requests';

export default class AddManyActivitiesToScheduleRequest implements IRequestValidator<IAddActivityToScheduleRequest[]> {
    constructor () {}

    validate = async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<IAddActivityToScheduleRequest[]> => {
        const schedule_id = Number(request.params.scheduleId);
        const user_id = Number(request.params.userId);
        const body = request.body;

        const activitiesData = body.map((activity: any) => {return { ...activity, schedule_id, user_id }});
    
        const activitySchema = yup.object().shape({
            schedule_id: yup.number().required('required'),
            user_id: yup.number().required('required'),
            name: yup.string().required('required'),
            description: yup.string().required('required'),
            start_date: yup.date().required('required'),
            end_date: yup.date().required('required'),
        });

        const validationSchema = yup.object().shape({
            activities: yup.array().of(activitySchema),
        });
    
        return (await validationSchema.validate({
            activities: activitiesData,
        })).activities!;
    };

}
