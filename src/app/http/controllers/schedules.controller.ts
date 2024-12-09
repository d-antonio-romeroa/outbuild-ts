import { NextFunction, Request, Response } from "express";
import SchedulesService from "../../services/schedules.service";
import GetScheduleByIdRequest from "../requests/schedules/getById.requests";
import RequestValidator from "../../utils/classes/request-validator";
import CreateScheduleRequest from "../requests/schedules/create.requests";
import ApiResponse from "../responses/ApiResponses";
import GetScheduleByIdWithActivitesPaginatedRequest, { IGetScheduleByIdWithActivitesPaginatedRequest as IGetScheduleByIdWithPaginatedActivitesRequest } from "../requests/schedules/getByIdWithActivitiesPaginated.requests";

export default class SchedulesController {
    #schedulesService = new SchedulesService();

    constructor() {
        this.#schedulesService = new SchedulesService();
    }

    create = async(req: Request, res: Response, next: NextFunction) => {

        const scheduleParams = await RequestValidator.validate(CreateScheduleRequest, req, res, next);

        const data = await this.#schedulesService.create(scheduleParams);

        ApiResponse.success(res, data);

    }

    getById = async(req: Request, res: Response, next: NextFunction) => {

        const scheduleParams = await RequestValidator.validate(GetScheduleByIdRequest, req, res, next);

        const data = await this.#schedulesService.getById(scheduleParams.id);

        ApiResponse.success(res, data);
    }

    getByIdWithActivities = async(req: Request, res: Response, next: NextFunction) => {

        const scheduleParams: IGetScheduleByIdWithPaginatedActivitesRequest = await RequestValidator.validate(GetScheduleByIdWithActivitesPaginatedRequest, req, res, next);

        const data = await this.#schedulesService.getByIdWithActivitiesPaginated(scheduleParams);

        ApiResponse.success(res, data);
    }
}