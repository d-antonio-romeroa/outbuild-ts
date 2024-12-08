// src/routes/users.ts
import express, { NextFunction, Request, Response } from 'express';
import { User } from '../../app/models/user.model';
import { generateToken } from '../../app/utils/auth/jwt.util';
import { comparePassword, hashPassword } from '../../app/utils/encryption.utils';
import { UnAuthorizedError } from '../../app/utils/classes/error';
const authRouter = express.Router();

// Handling post request
authRouter.post('/login',
    async (req: Request, res: Response, next: NextFunction) => {
        let { email, password } = req.body;

        let existingUser;
        try {
            existingUser =
                await User.findOne({ where: {email: email} });
        } catch (err) {
            console.log(err);
            const error =
                new Error(
                    'Error! Something went wrong.'
                );
            return next(error);
        }

        // console.log(existingUser);

        if (!existingUser
            || !comparePassword(password, existingUser.password)
        ) {
            const error =
                Error(
                    'Wrong details please check at once'
                );
            return next(new UnAuthorizedError());
        }
        let token;
        try {
            //Creating jwt token
            token = generateToken(existingUser.id, req.get('user-agent')!, req.ip!);
        } catch (err) {
            console.log(err);
            const error =
                new Error('Error! Something went wrong.');
            return next(error);
        }

        res
            .status(200)
            .json({
                success: true,
                data: {
                    userId: existingUser.id,
                    email: existingUser.email,
                    token: token,
                },
            });
    });

// Handling post request
authRouter.post('/signup',
    async (req: Request, res: Response, next: NextFunction) => {

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

        try {
            await newUser.save();
        } catch (err) {
            console.log(err);
            const error =
                new Error('Error! Something went wrong.');
            return next(error);
        }
        let token;
        try {
            token = generateToken(newUser.id, req.get('user-agent')!, req.ip!);

        } catch (err) {
            console.log(err);
            const error =
                new Error('Error! Something went wrong.');
            return next(error);
        }
        res
            .status(201)
            .json({
                success: true,
                data: {
                    userId: newUser.id,
                    email: newUser.email,
                    token: token
                },
            });
    });

export default authRouter;
