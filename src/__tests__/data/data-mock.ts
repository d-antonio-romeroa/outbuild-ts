import { IAddActivityToScheduleRequest } from "src/app/http/requests/activities/create.requests";
import { ILoginRequest } from "src/app/http/requests/auth/login.requests";
import { IRegisterRequest } from "src/app/http/requests/auth/register.requests";
import { ICreateScheduleRequest } from "src/app/http/requests/schedules/create.requests";

export const loginData: ILoginRequest = {
    "password": "password1",
    "email": "username1@gmail.com",
    ua: "USER-AGENT-HEADER",
    ip: "127.0.0.1"
}

export const userData: IRegisterRequest = {
    email: 'email1@gmail.com',
    password: 'password1',
    username: 'username1'
};

export const scheduleData: ICreateScheduleRequest = {
    "user_id": 1,
    "name": "schedule_7954kdkfk70",
    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-TPEnw3gWtSnrS28eChBKYVR94RkhSRBsjA&s"
};

export const activityData: IAddActivityToScheduleRequest = {
    name: 'New Activity 1',
    start_date: new Date(),
    end_date: new Date(),
    schedule_id: 1,
    user_id: 1,
    description: ''
};