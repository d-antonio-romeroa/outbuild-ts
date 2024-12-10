// src/routes/users.ts
import express from 'express';
import authRouter from './auth.route';
import scheduleRouter from './schedule.route';
import { validateProtectedRoute } from '../../app/http/middleware/validateProtectedRoute';
import SchedulesController from '../../app/http/controllers/schedules.controller';
import ActivitiesController from '../../app/http/controllers/activities.controller';

const apiV1Router = express.Router();

const activitiesController = new ActivitiesController();
const schedulesController = new SchedulesController();


// define the home page route
/**
 * @swagger
 * /api/v1/healthz:
 *   get:
 *     summary: Endpoint to check app health.
 *     description: Returns 1 or 0 depending on server reponse state.
 *     tags: [API]
 *     responses:
 *       200:
 *         description: Success, returns 1 value.
 *       500:
 *         description: Error, returns 0 value.
 */
apiV1Router.get('/healthz', function (req, res) {
    res.json(1);
});

// Basic test endpoint
apiV1Router.get('/', (req, res) => {
    res.json({ message: 'Hello, world! Your Express API V1 is up and running' });
});

apiV1Router.use('/auth', authRouter);

apiV1Router.use(validateProtectedRoute);

const userRouter = express.Router();

// get schedule by id with nested activities
userRouter.get('/:userId/schedules/:scheduleId', schedulesController.getByIdWithActivities as any)

// create a new schedule with user id
userRouter.post('/:userId/schedules', schedulesController.create as any)

// add one activity to schedule
userRouter.post('/:userId/schedules/:scheduleId/activities', activitiesController.create as any)

// add many activity to schedule
userRouter.post('/:userId/schedules/:scheduleId/activities/bulk', activitiesController.bulkCreate as any)

// add many activity to schedule using queues
userRouter.post('/:userId/schedules/:scheduleId/activities/bulk-queue', activitiesController.bulkCreateWithQueue as any)

apiV1Router.use('/users', userRouter);

export default apiV1Router;