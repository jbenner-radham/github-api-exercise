import dotenv from 'dotenv';
import winston from 'winston';
import { APP_DEFAULT_LOG_LEVEL } from './config.js';

dotenv.config();

const formatLog = winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
});

export default winston.createLogger({
    exitOnError: false,
    format: winston.format.combine(winston.format.timestamp(), formatLog),
    level: process.env.APP_LOG_LEVEL ?? APP_DEFAULT_LOG_LEVEL,
    transports: [new winston.transports.Console()]
});
