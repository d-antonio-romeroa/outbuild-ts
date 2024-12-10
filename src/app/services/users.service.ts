import UsersRepository from "../repositories/user.repository";
import { NotFoundError } from "../utils/classes/error";

export default class UserService {
    #usersRepository = new UsersRepository();

    constructor() {}

    async getUserById(id: number) {
        const user = await this.#usersRepository.getById(id);

        if (!user) {
            throw new NotFoundError();
        }

        return user;
    }

    async getUserByEmail(email: string) {
        const user = await this.#usersRepository.getByEmail(email);

        if (!user) {
            throw new NotFoundError();
        }

        return user;
    }

}