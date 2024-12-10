import { NextFunction, Request, Response } from "express";
import AuthService from "../../services/auth.service";
import ApiResponse from "../responses/ApiResponses";
import { hashPassword } from "../../utils/encryption.utils";
import { User } from "../../models/user.model";
import RequestValidator from "../../utils/classes/request-validator";
import LoginRequest from "../requests/auth/login.requests";
import RegisterRequest from "../requests/auth/register.requests";

export default class AuthController {
    #authService = new AuthService();

    constructor() {
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        const loginData = await RequestValidator.validate(LoginRequest, req, res, next);

        const data = await this.#authService.login(loginData);

        ApiResponse.success(res, data);
    };

    register = async (req: Request, res: Response, next: NextFunction) => {

        const registerData = await RequestValidator.validate(RegisterRequest, req, res, next);

        const {
            username,
            email,
            password
        } = registerData;

        const newUser =
            new User({
                username,
                email,
                password: hashPassword(password),
            });

        await newUser.save();

        ApiResponse.success(res, {
            userId: newUser.id,
            email: newUser.email,
        });
    }

}