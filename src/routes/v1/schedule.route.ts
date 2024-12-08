// src/routes/users.ts
import express, { NextFunction, Request, Response } from 'express';
import { Schedule } from '../../app/models/schedule.model';
import SchedulesController from '../../app/http/controllers/schedules.controller';
import { asyncHandler } from '../../app/utils/classes/request-validator';

const scheduleRouter = express.Router();

const schedulesController = new SchedulesController();

scheduleRouter.get(
    '/:scheduleId',
    // validateProtectedRoute,
    schedulesController.getById as any
);

export default scheduleRouter;