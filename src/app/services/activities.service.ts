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

    async create(scheduleData: IAddActivityToScheduleRequest) {
        const scheduleBelongsToUser = await this.schedulesRepository.getById(scheduleData.schedule_id, {
            where: {
                user_id: scheduleData.user_id
            }
        });

        if(!scheduleBelongsToUser) {
            throw new NotFoundError();
        }

        const schedule = await this.activitiesRepository.create(scheduleData);

        return schedule;
    }

    async bulkCreate(scheduleData: IAddActivityToScheduleRequest[]) {
        const scheduleBelongsToUser = await this.schedulesRepository.getById(scheduleData[0].schedule_id, {
            where: {
                user_id: scheduleData[0].user_id
            }
        });

        if(!scheduleBelongsToUser) {
            throw new NotFoundError();
        }

        const schedule = await this.activitiesRepository.bulkCreate(scheduleData);

        return schedule;
    }


    async getById(id: number) {
        const schedule = await this.activitiesRepository.getById(id, {include: ['activities']});

        if (!schedule) { 
            throw new NotFoundError();
        }

        return schedule;
    }
}