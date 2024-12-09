import { NextFunction, Request, Response } from "express";
import AuthService from "../../services/auth.service";
import ApiResponse from "../responses/ApiResponses";
import { hashPassword } from "../../utils/encryption.utils";
import { User } from "../../models/user.model";
import RequestValidator from "../../utils/classes/request-validator";
import LoginRequest from "../requests/auth/login.requests";

export default class AuthController {
    #authService = new AuthService();

    constructor() {
    }

    login = async (req: Request, res: Response, next: NextFunction) => {
        const {email, password} = await RequestValidator.validate(LoginRequest, req, res, next);

        const data = await this.#authService.login(email, password, req);

        ApiResponse.success(res, data);
    };

    register = async (req: Request, res: Response, next: NextFunction) => {

        const {
            username,
            email,
            password
        } = req.body;

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