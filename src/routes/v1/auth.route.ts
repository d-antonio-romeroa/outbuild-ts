// src/routes/users.ts
import express from 'express';
import AuthController from '../../app/http/controllers/auth.controller';
const authRouter = express.Router();

const authController = new AuthController();

// Handling login request
authRouter.post(
    '/login',
    authController.login
);

// Handling user register request
authRouter.post(
    '/signup',
    authController.register
);

export default authRouter;
