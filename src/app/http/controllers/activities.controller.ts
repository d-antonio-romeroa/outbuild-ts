import { NextFunction, Request, Response } from "express";
import SchedulesService from "../../services/schedules.service";
import RequestValidator from "../../utils/classes/request-validator";
import AddActivityToScheduleRequest from "../requests/activities/create.requests";
import ActivitiesService from "../../../app/services/activities.service";
import AddManyActivitiesToScheduleRequest from "../requests/activities/bulkCreate.requests";

export default class ActivitiesController {
    activitiesService = new ActivitiesService();
    schedulesService = new SchedulesService();

    constructor() {
        this.schedulesService = new SchedulesService();
    }

    create = async(req: Request, res: Response, next: NextFunction) => {

        const activityData = await RequestValidator.validate(AddActivityToScheduleRequest, req, res, next);

        const activity = await this.activitiesService.create(activityData);

        return res.json({
            data: activity,
            success: true
        });

    }

    bulkCreate = async(req: Request, res: Response, next: NextFunction) => {

        const activitiesData = await RequestValidator.validate(AddManyActivitiesToScheduleRequest, req, res, next);
        console.log(activitiesData);

        const activity = await this.activitiesService.bulkCreate(activitiesData);

        return res.json({
            data: activity,
            success: true
        });

    }

}