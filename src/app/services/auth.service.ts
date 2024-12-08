import UsersRepository from "../repositories/user.repository";
import { NotFoundError } from "../utils/classes/error";

export default class AuthService {
    usersRepository = new UsersRepository();

    constructor() {
        return this;
    }

    async getUserById(id: number) {
        const user = await this.usersRepository.getById(id);

        if (!user) { 
            throw new NotFoundError();
        }

        return user;
    }
}