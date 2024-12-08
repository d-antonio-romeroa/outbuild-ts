import { Sequelize } from 'sequelize-typescript';
import { User } from '../app/models/user.model';
import { Schedule } from '../app/models/schedule.model';
import { Activity } from '../app/models/activity.model';
import winstonLogger from '../app/utils/logger/winston.logger';

const {
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE,
    DB_HOST,
} = process.env;

// Example configuration
const DbConnection = new Sequelize(DB_DATABASE!, DB_USERNAME!, DB_PASSWORD!, {
  host: DB_HOST,
  dialect:'postgres', // 'postgres', 'sqlite', etc.,
  models: [User, Schedule, Activity],
  logging: (q) => {
    // winstonLogger.info('\n');
    console.log('')
    winstonLogger.info(q);
    console.log('')

  }
  // modelMatch: (filename, member) => {
  //   return filename.substring(0, filename.indexOf('.model')) === member.toLowerCase();
  // },
});

export default DbConnection;
