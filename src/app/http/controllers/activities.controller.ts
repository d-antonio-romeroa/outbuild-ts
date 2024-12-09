import { NextFunction, Request, Response } from "express";
import RequestValidator from "../../utils/classes/request-validator";
import AddActivityToScheduleRequest, { IAddActivityToScheduleRequest } from "../requests/activities/create.requests";
import ActivitiesService from "../../../app/services/activities.service";
import AddManyActivitiesToScheduleRequest from "../requests/activities/bulkCreate.requests";
import ApiResponse from "../responses/ApiResponses";
import JobsController from "../../../jobs/controllers/jobs.controller";

export default class ActivitiesController {
    #activitiesService = new ActivitiesService();
    #jobsService = new JobsController();

    constructor() {
    }

    create = async(req: Request, res: Response, next: NextFunction) => {

        const activityData = await RequestValidator.validate(AddActivityToScheduleRequest, req, res, next);

        const activity = await this.#activitiesService.create(activityData);

        ApiResponse.created(res, activity);
    }

    bulkCreate = async(req: Request, res: Response, next: NextFunction) => {

        const activitiesData = await RequestValidator.validate(AddManyActivitiesToScheduleRequest, req, res, next);

        const activities = await this.#activitiesService.bulkCreate(activitiesData);

        ApiResponse.created(res, activities);
    }

    bulkCreateWithQueue = async(req: Request, res: Response, next: NextFunction) => {

        const activitiesData: IAddActivityToScheduleRequest[] = await RequestValidator.validate(AddManyActivitiesToScheduleRequest, req, res, next);

        // const activities = await this.#activitiesService.bul(activitiesData);
        activitiesData.map((activity) => {
            this.#jobsService.addJob('createActivity', activity, (req as any).userId);
        });

        ApiResponse.accepted(res);
    }

}