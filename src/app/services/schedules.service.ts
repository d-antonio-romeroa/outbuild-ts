import { ICreateScheduleRequest } from "../http/requests/schedules/create.requests";
import { IGetScheduleByIdWithActivitesPaginatedRequest } from "../http/requests/schedules/getByIdWithActivitiesPaginated.requests";
import ActivitiesRepository from "../repositories/activities.repository";
import SchedulesRepository from "../repositories/schedules.repository";
import { NotFoundError } from "../utils/classes/error";

export default class SchedulesService {
    #activitiesRepository = new ActivitiesRepository();
    #schedulesRepository = new SchedulesRepository();

    constructor() {
        return this;
    }

    async create(scheduleData: ICreateScheduleRequest) {
        const schedule = await this.#schedulesRepository.create(scheduleData);

        return schedule;
    }


    async getById(id: number) {
        const schedule = await this.#schedulesRepository.getById(id, { include: ['activities'] });

        if (!schedule) {
            throw new NotFoundError();
        }

        return schedule;
    }

    async getByIdWithActivitiesPaginated(params: IGetScheduleByIdWithActivitesPaginatedRequest) {
        const {id, activities_limit, activities_page, user_id} = params;

        // check that schedule belongs to user, if not throw not found error
        const scheduleBelongsToUser = await this.#schedulesRepository.getById(id, {
            where: {
                user_id: user_id
            }
        });

        if(!scheduleBelongsToUser) {
            throw new NotFoundError();
        }

        // if schedule exists and belongs to user then query paginated activities
        const activitiesPaginated = await this.#activitiesRepository.getPaginatedByScheduleId(
            id, 
            (activities_page - 1) * activities_limit, 
            activities_limit,
        );

        return {
            ...scheduleBelongsToUser.dataValues,
            activities: {
                page: activities_page,
                perPage: activities_limit,
                ...activitiesPaginated,
            }
        };
    }
}