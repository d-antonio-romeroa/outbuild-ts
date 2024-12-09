import { Request } from "express";
import UsersRepository from "../repositories/user.repository";
import { generateToken } from "../utils/auth/jwt.util";
import { NotFoundError, UnAuthorizedError } from "../utils/classes/error";
import { comparePassword } from "../utils/encryption.utils";
import { IRegisterRequest } from "../http/requests/auth/register.requests";

export default class AuthService {
    #usersRepository = new UsersRepository();

    constructor() {
        return this;
    }

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

    async login(email: string, password: string, req: Request) {
        let existingUser = await this.#usersRepository.getByEmail(email);

        // console.log(existingUser);

        if (!existingUser
            || !comparePassword(password, existingUser.password)
        ) {
            const error =
                Error(
                    'Wrong details please check at once'
                );
            throw new UnAuthorizedError();
        }

        //Creating jwt token
        const token = generateToken(existingUser.id, req.get('user-agent')!, req.ip!);

        return {
            userId: existingUser.id,
            email: existingUser.email,
            token,
        }
    }

    async register(userData: IRegisterRequest) {
        return await this.#usersRepository.create(userData);
    }
}