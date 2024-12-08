import { NextFunction, Request, Response } from "express";
import SchedulesService from "../../services/schedules.service";
import GetScheduleByIdRequest from "../requests/schedules/getById.requests";
import RequestValidator from "../../utils/classes/request-validator";
import CreateScheduleRequest from "../requests/schedules/create.requests";

export default class SchedulesController {
    schedulesService = new SchedulesService();

    constructor() {
        this.schedulesService = new SchedulesService();
    }

    create = async(req: Request, res: Response, next: NextFunction) => {

        const scheduleParams = await RequestValidator.validate(CreateScheduleRequest, req, res, next);

        const schedules = await this.schedulesService.create(scheduleParams);

        return res.json({
            data: schedules,
            success: true
        });

    }

    getById = async(req: Request, res: Response, next: NextFunction) => {

        const scheduleParams = await RequestValidator.validate(GetScheduleByIdRequest, req, res, next);

        // console.log({ scheduleParams, thiss: this });

        const schedules = await this.schedulesService.getById(scheduleParams.id);

        return res.json({
            data: schedules,
            success: true
        });

    }
}