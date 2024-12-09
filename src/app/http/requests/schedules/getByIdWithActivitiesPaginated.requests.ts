import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import RequestValidator, { IRequestValidator } from '../../../utils/classes/request-validator';
import { BadRequestError } from '../../../utils/classes/error';

export interface IGetScheduleByIdWithActivitesPaginatedRequest {
    id: number,
    activities_page: number;
    activities_limit: number;
    user_id: number;
}

export default class GetScheduleByIdWithActivitesPaginatedRequest implements IRequestValidator<IGetScheduleByIdWithActivitesPaginatedRequest> {
    constructor () {}

    validate = async (
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<IGetScheduleByIdWithActivitesPaginatedRequest> => {
        const scheduleId = Number(request.params.scheduleId);
        const userId = Number(request.params.userId);

        const {activities_limit, activities_page} = request.query;
    
        const validationSchema = yup.object().shape({
            id: yup.number().required('Schedule id is required'),
            activities_page: yup.number().required('Activities page is required').default(1),
            activities_limit: yup.number().required('Activities limit is required').default(5),
            user_id: yup.number().required('user id is required').default(5),
        });
    
        return validationSchema.validate({
            id: scheduleId,
            activities_page,
            activities_limit,
            user_id: userId,
        });
    };

}
