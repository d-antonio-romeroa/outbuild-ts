import { IAddActivityToScheduleRequest } from "../http/requests/activities/create.requests";
import ActivitiesRepository from "../repositories/activities.repository";
import SchedulesRepository from "../repositories/schedules.repository";
import { NotFoundError } from "../utils/classes/error";

export default class ActivitiesService {
    activitiesRepository = new ActivitiesRepository();
    schedulesRepository = new SchedulesRepository();

    constructor() {
        return this;
    }

    async create(activityData: IAddActivityToScheduleRequest) {
        const scheduleBelongsToUser = await this.schedulesRepository.getById(activityData.schedule_id, {
            where: {
                user_id: activityData.user_id
            }
        });

        if(!scheduleBelongsToUser) {
            throw new NotFoundError();
        }

        const schedule = await this.activitiesRepository.create(activityData);

        return schedule;
    }

    async bulkCreate(activityData: IAddActivityToScheduleRequest[]) {
        const scheduleBelongsToUser = await this.schedulesRepository.getById(activityData[0].schedule_id, {
            where: {
                user_id: activityData[0].user_id
            }
        });

        if(!scheduleBelongsToUser) {
            throw new NotFoundError();
        }

        const schedule = await this.activitiesRepository.bulkCreate(activityData);

        return schedule;
    }


    async getById(id: number) {
        const schedule = await this.activitiesRepository.getById(id, {include: ['activities']});

        if (!schedule) { 
            throw new NotFoundError();
        }

        return schedule;
    }

    createJob = async (payload: IAddActivityToScheduleRequest) => {
        console.log({payload});
        this.create(payload);
    }
}