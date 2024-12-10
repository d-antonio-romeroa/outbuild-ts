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

/**
 * @swagger
 * /api/v1/user/{userId}/schedules:
 *   post:
 *     summary: Create new schedule for an user.
 *     description: Create a new schedule with request payload data authenticated user id.
 *     tags: [Schedule]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - url
 *             properties:
 *               name:
 *                 type: string
 *                 description: Construction schedule name.
 *               url:
 *                 type: string
 *                 description: URL of an image with the construction objective (e.g., a building).
 *     responses:
 *       201:
 *         description: Schedule created successfully.
 *       400:
 *         description: Request is not valid or has missing data.
 *       500:
 *         description: Server internal error.
 *     security:
 *       - required: true
 *       - bearerAuth: ['1234']
 */
userRouter.get('/:userId/schedules/:scheduleId', schedulesController.getByIdWithActivities as any)

userRouter.post('/:userId/schedules', schedulesController.create as any)

userRouter.post('/:userId/schedules/:scheduleId/activities', activitiesController.create as any)

userRouter.post('/:userId/schedules/:scheduleId/activities/bulk', activitiesController.bulkCreate as any)

userRouter.post('/:userId/schedules/:scheduleId/activities/bulk-queue', activitiesController.bulkCreateWithQueue as any)

export default apiV1Router;