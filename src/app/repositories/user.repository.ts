import { CreateOptions, FindOptions } from "sequelize";
import { ICreateScheduleRequest } from "../http/requests/schedules/create.requests";
import { User } from "../models/user.model";
import { IRegisterRequest } from "../http/requests/auth/register.requests";

export default class UsersRepository extends User {
    constructor() {
        super();

        return this;
    }

    create(data: IRegisterRequest, options?: CreateOptions ) {
        return User.create(data as any, options)
    }

    getByEmail(email: string) {
        return User.findOne({where: {
            email
        }})
    }

    getById(id: number, options: FindOptions<User> = {}) {
        return User.findByPk(id, options)
    }
}