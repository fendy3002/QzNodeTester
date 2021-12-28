import * as path from 'path';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import * as coreTypes from '../types';

export default async (config: coreTypes.config.app) => {
    let transport = new winston.transports.DailyRotateFile({
        filename: path.join(__dirname, "..", "..", "storage", 'application-%DATE%.log'),
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d',
    });
    let errorTransport = new winston.transports.DailyRotateFile({
        filename: path.join(__dirname, "..", "..", "storage", 'error-%DATE%.log'),
        level: "error",
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
    });

    let log = winston.createLogger({
        level: config.loggingLevel,
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.json()
        ),
        transports: [
            transport,
            errorTransport
        ]
    });

    config.storage.set("log", log);
    return log;
};