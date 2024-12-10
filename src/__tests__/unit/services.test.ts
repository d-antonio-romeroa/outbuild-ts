
import dotenv from 'dotenv';
dotenv.config({});

import vi, { describe, expect, it, beforeAll, afterAll } from 'vitest';
import DbConnection from '../../config/database';
import ActivitiesService from '../../app/services/activities.service.js';
import { Activity } from '../../app/models/activity.model.js';
import SchedulesService from '../../app/services/schedules.service.js';
import { activityData, scheduleData } from '../data/data-mock';
import { User } from '../../app/models/user.model';
import { Schedule } from '../../app/models/schedule.model';
import { IGetScheduleByIdWithActivitesPaginatedRequest } from '../../app/http/requests/schedules/getByIdWithActivitiesPaginated.requests';
import AuthService from '../../app/services/auth.service';

let activitiesService: ActivitiesService;
let schedulesService: SchedulesService;

let createdActivity: Activity;
let authService: AuthService;
let createdSchedule: Schedule;
let createdUser: User;


describe('Auth services', () => {


    beforeAll(async () => {
        await DbConnection.authenticate();
        authService = new AuthService();
    });

    it('register an user', async () => {
        const userName = 'username' + Date.now();
        createdUser = await authService.register({
            username: userName,
            email: `${userName}@gmail.com`,
            password: userName + 'password1'
        });

    });

    it('login', async () => {
        const loginResult = await authService.login({
            email: createdUser.email,
            password: createdUser.username + 'password1',
            ua: 'USER-AGENT-HEADER',
            ip: '127.0.0.1'
        });
        expect(loginResult.email).toBe(createdUser.email);

    });

    it('login - wrong credentials', async () => {
        try {
            await authService.login({
                email: createdUser.email,
                password: 'password1',
                ua: 'USER-AGENT-HEADER',
                ip: '127.0.0.1'
            });
        } catch (error) {
            console.log(error);
            expect(error.message).toBe('Unauthorized');
        }

    });

});


describe('Schedules services', () => {


    beforeAll(async () => {
        await DbConnection.authenticate();
        activitiesService = new ActivitiesService();
        schedulesService = new SchedulesService();
    });

    // afterAll(async () => {
    //     await DbConnection.close();
    // });

    it('create a schedule - user doesnt exists error', async () => {
        try {
            await schedulesService.create({
                ...scheduleData,
                name: scheduleData.name + Date.now(),
                user_id: 10000000
            });
        } catch (error: any) {
            expect(error.name).toBe('SequelizeForeignKeyConstraintError');
        }

    });

    it('create an schedule', async () => {

        const scheduleName = scheduleData.name + Date.now();
        createdSchedule = await schedulesService.create({
            ...scheduleData,
            name: scheduleName,
        });
        expect(createdSchedule.name).toBe(scheduleName);

    });

    it('find a schedule by id with paginated activities', async () => {

        const params: IGetScheduleByIdWithActivitesPaginatedRequest = {
            id: createdSchedule.id,
            activities_page: 1,
            activities_limit: 5,
            user_id: 1
        };

        const findSchedule = await schedulesService.getByIdWithActivitiesPaginated(params);

        expect(findSchedule.id).toBe(createdSchedule.id);
        expect(Array.isArray(findSchedule.activities.rows)).toBe(true);
        expect(findSchedule.activities.page).toBe(1);
        expect(findSchedule.activities.perPage).toBe(5);
    });


    it('find a schedule by id - not found error', async () => {

        try {
            const findSchedule = await schedulesService.getById(123456896);
        } catch (error: any) {
            expect(error.message).toBe('Not found');
        }

    });

    it('find a schedule by id and update successfully', async () => {

        const findSchedule = await schedulesService.getById(createdSchedule.id);

        const newName = 'updated' + Date.now();
        const updateSchedule = await findSchedule.update({ name: newName });
        expect(updateSchedule.name).toBe(newName);

    });

    it('find a schedule by id and delete', async () => {

        const findSchedule = await schedulesService.getById(createdSchedule.id);

        const deleteSchedule = await findSchedule.destroy({ force: true });
        expect(Array.isArray(deleteSchedule)).toBe(true);
    });

});


describe('Activities services', () => {
    beforeAll(async () => {
        await DbConnection.authenticate();
        activitiesService = new ActivitiesService();
        schedulesService = new SchedulesService();
    });

    afterAll(async () => {
        await DbConnection.close();
    });

    it('create an activity', async () => {

        createdActivity = await activitiesService.create(activityData);
        expect(createdActivity.name).toBe(activityData.name);

    });

    it('create an activity - schedule doesnt belong to user error', async () => {
        try {
            await activitiesService.create({
                ...activityData,
                user_id: 123456
            });
        } catch (error: any) {
            expect(error.message).toBe('Not found');
        }

    });

    it('bulk create activities', async () => {

        const data = Array(10).fill(0).map(() => activityData);
        const bulkCreateActivity = await activitiesService.bulkCreate(data);
        expect(bulkCreateActivity.length).toBe(10);

    });

    it('find an activity by id', async () => {

        try {
            const findActivity = await activitiesService.getById(createdActivity.id);
            expect(findActivity.name).toBe(activityData.name);
        } catch (error) {
            console.log('ERROR', error);
        }

    });

    it('find an activity by id - not found error', async () => {

        try {
            const findActivity = await activitiesService.getById(123456896);
        } catch (error: any) {
            expect(error.message).toBe('Not found');
        }

    });

    it('find an activity by id and update successfully', async () => {

        const findActivity = await activitiesService.getById(createdActivity.id);

        const updateActivity = await findActivity.update({ name: 'updated' });
        expect(updateActivity.name).toBe('updated');

    });

    it('find an activity by id and delete', async () => {

        const findActivity = await activitiesService.getById(createdActivity.id);

        const deleteActivity = await findActivity.destroy({ force: true });
        expect(Array.isArray(deleteActivity)).toBe(true);
    });
});
