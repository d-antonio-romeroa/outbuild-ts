import { CreateOptions, FindOptions } from "sequelize";
import { IAddActivityToScheduleRequest } from "../http/requests/activities/create.requests";
import { Activity } from "../models/activity.model";

export default class ActivitiesRepository extends Activity {
    constructor() {
        super();

        return this;
    }

    bulkCreate(data: IAddActivityToScheduleRequest[], options?: CreateOptions ) {
        return Activity.bulkCreate(data as any, options)
    }

    create(data: IAddActivityToScheduleRequest, options?: CreateOptions ) {
        return Activity.create(data as any, options)
    }

    getById(id: number, options: FindOptions<Activity> ) {
        return Activity.findByPk(id, options)
    }

    getPaginatedByScheduleId(schedule_id: number, offset: number = 0, limit: number =  5) {
        return Activity.findAndCountAll({
            where: {
                schedule_id,
            },
            offset,
            limit
        })
    }
}