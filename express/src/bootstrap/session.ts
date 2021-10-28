import * as flash from 'connect-flash';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import * as connectRedis from 'connect-redis';

import * as coreTypes from '../types';

export default async (config: coreTypes.config.app, app?: any) => {
    let redisStore = connectRedis(session);
    let client = config.storage.get('redis');

    app.use(cookieParser());
    app.use(session({
        resave: false,
        saveUninitialized: true,
        store: new redisStore({ client }),
        secret: config.appSecret
    }));
    app.use(flash());
};