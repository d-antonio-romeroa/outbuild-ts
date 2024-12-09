import { NextFunction, Request, Response } from "express";
import { generateUserJwtSecret, verifyToken } from "../../utils/auth/jwt.util";
import { ForbiddenError, UnAuthorizedError } from "../../utils/classes/error";
import AuthService from "../../../app/services/auth.service";
import TokenRequest from "../requests/auth/token.requests";

export async function validateProtectedRoute(req: any, res: Response, next: NextFunction): Promise<void> {

    const authService = new AuthService();

    const decodedToken = await (new TokenRequest()).validate(req, res, next);
    let token: string = (req.headers.authorization! as string).split(' ')[1];

    const { sub } = decodedToken;
    const userJwtSecret = generateUserJwtSecret(
        Number(sub), req.get('user-agent')!, req.ip!
    );

    try {
        verifyToken(token, userJwtSecret);

    } catch (error) {
        throw new UnAuthorizedError(error as any);
    }

    // if(req.url.includes('users/') && Number(req.url.split('/').findIndex()) !== sub) {
    //     throw new ForbiddenError();
    // }

    try {
        const user = await authService.getUserById(sub);

        req.userId = Number(sub);

    } catch (error) {
        console.log(error);
    }

    // req.user = { userId: sub };
    next();

}
