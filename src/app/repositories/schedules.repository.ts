import { CreateOptions, FindOptions } from "sequelize";
import { Schedule } from "../models/schedule.model";
import { ICreateScheduleRequest } from "../http/requests/schedules/create.requests";

export default class SchedulesRepository extends Schedule {
    constructor() {
        super();

        return this;
    }

    create(data: ICreateScheduleRequest, options?: CreateOptions ) {
        return Schedule.create(data as any, options)
    }

    getById(id: number, options: FindOptions<Schedule> = {} ) {
        return Schedule.findOne({
            ...options,
            where: {
                id,
                ...options.where
            },
        })
    }
}