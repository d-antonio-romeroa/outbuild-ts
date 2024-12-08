
import winston from 'winston';
const { combine, timestamp, colorize, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level.toUpperCase()}: ${message}`;
});

const winstonLogger = winston.createLogger({
  level: 'debug',
  format: combine(
    label({ label: 'APIv1' }),
    // colorize(),
    timestamp(),
    myFormat,
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

export default winstonLogger;