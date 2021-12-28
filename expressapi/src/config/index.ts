import path = require('path');
import * as types from '../types';
export default async (): Promise<types.config.app> => {
    let storage: any = {};
    return {
        "appName": process.env.APP_NAME,
        "hostName": process.env.APP_HOSTNAME,
        "env": process.env.NODE_ENV,
        "ignoreRole": process.env.IGNORE_ROLE === "true",
        "appSecret": process.env.APP_SECRET,
        "appDescription": process.env.APP_DESCRIPTION,
        "port": parseInt(process.env.PORT),
        "timezone": process.env.TZ || "UTC",
        "sequelize_timezone": process.env.SEQUELIZE_TZ,
        "corsOrigin": process.env.CORS_ORIGIN,
        "dateTimeFullFormat": "YYYY-MM-DDTHH:mm:ssZ",
        "upload": {
            "fileSizeLimit": 1024 * 1024 * 20, // 20 mb
            "storagePath": process.env.STORAGE_PATH,
        },
        "mysql": {
            "default": {
                "host": process.env.MYSQL_HOST,
                "port": process.env.MYSQL_PORT,
                "name": process.env.MYSQL_NAME,
                "username": process.env.MYSQL_USERNAME,
                "password": process.env.MYSQL_PASSWORD,
            }
        },
        "cors": {
            "origin": (process.env.CORS_ORIGIN ?? "*").split(",")
        },
        "storage": {
            set: (key, value) => {
                storage[key] = value;
            },
            get: (key) => storage[key]
        },
        "filter": {
            "defaultDaysBefore": process.env.DEFAULT_FILTER_DAYS_BEFORE ? parseInt(process.env.DEFAULT_FILTER_DAYS_BEFORE) : 30,
        },
        "loggingLevel": process.env.LOG_LEVEL,
        "redis": {
            "default": {
                "host": process.env.REDIS_HOST,
                "port": process.env.REDIS_PORT
            }
        }
    };
};