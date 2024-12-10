import dotenv from 'dotenv';
dotenv.config({});

import { Sequelize } from 'sequelize-typescript';
import { User } from '../app/models/user.model';
import { Schedule } from '../app/models/schedule.model';
import { Activity } from '../app/models/activity.model';
import apiLogger from '../app/utils/logger/api.logger';
import { Job } from '../jobs/models/job.model';
import { FailedJob } from '../jobs/models/failed_job.model';

const {
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_HOST,
} = process.env;

// Example configuration
const DbConnection = new Sequelize(DB_DATABASE!, DB_USERNAME!, DB_PASSWORD!, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  host: DB_HOST,
  dialect: 'postgres', // 'postgres', 'sqlite', etc.,
  models: [User, Schedule, Activity, Job, FailedJob],
  logging: (q) => {
    console.log('')
    apiLogger.info(q);
    console.log('')

  }
});

export default DbConnection;
