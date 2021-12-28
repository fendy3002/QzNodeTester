import redis from './redis';
import sql from './sql';
import session from './session';
import lockable from './lockable';
import log from './log';
import superagent from './superagent';
import * as coreTypes from '../types';

export default async (config: coreTypes.config.app, app?: any) => {
    return await Promise.all([
        redis(config).then(() =>
            session(config, app)
        ),
        sql(config),
        lockable(config),
        log(config),
        superagent(config),
    ]);
};