import { CreateOptions, FindOptions } from "sequelize";
import { ICreateScheduleRequest } from "../http/requests/schedules/create.requests";
import { User } from "../models/user.model";

export default class UsersRepository extends User {
    constructor() {
        super();

        return this;
    }

    create(data: ICreateScheduleRequest, options?: CreateOptions ) {
        return User.create(data as any, options)
    }

    getById(id: number, options: FindOptions<User> = {}) {
        return User.findByPk(id, options)
    }
}