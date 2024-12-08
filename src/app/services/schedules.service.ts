import { ICreateScheduleRequest } from "../http/requests/schedules/create.requests";
import SchedulesRepository from "../repositories/schedules.repository";
import { BadRequestError, NotFoundError } from "../utils/classes/error";

export default class SchedulesService {
    schedulesRepository = new SchedulesRepository();

    constructor() {
        return this;
    }

    async create(scheduleData: ICreateScheduleRequest) {
        const schedule = await this.schedulesRepository.create(scheduleData);

        return schedule;
    }


    async getById(id: number) {
        const schedule = await this.schedulesRepository.getById(id, {include: ['activities']});

        if (!schedule) { 
            throw new NotFoundError();
        }

        return schedule;
    }
}