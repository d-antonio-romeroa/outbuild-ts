import { Request } from "express";
import UsersRepository from "../repositories/user.repository";
import { generateToken } from "../utils/auth/jwt.util";
import { NotFoundError, UnAuthorizedError } from "../utils/classes/error";
import { comparePassword, hashPassword } from "../utils/encryption.utils";
import { IRegisterRequest } from "../http/requests/auth/register.requests";
import { ILoginRequest } from "../http/requests/auth/login.requests";

export default class AuthService {
    #usersRepository = new UsersRepository();

    constructor() {
        return this;
    }

    async login(loginData: ILoginRequest) {
        let existingUser = await this.#usersRepository.getByEmail(loginData.email);

        if (!existingUser
            || !comparePassword(loginData.password, existingUser.password)
        ) {
            throw new UnAuthorizedError();
        }

        //Creating jwt token
        const token = generateToken(existingUser.id, loginData.ua, loginData.ip);

        return {
            userId: existingUser.id,
            email: existingUser.email,
            token,
        }
    }

    async register(userData: IRegisterRequest) {
        return await this.#usersRepository.create({
            username: userData.username,
            email: userData.email,
            password: hashPassword(userData.password),
        });
    }
}