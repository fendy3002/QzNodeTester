import nunjucks from './nunjucks';
import openid from './openid';
import redis from './redis';
import sql from './sql';
import session from './session';
import lockable from './lockable';
import log from './log';
import superagent from './superagent';
import * as coreTypes from '../types';

export default async (config: coreTypes.config.app, app?: any) => {
    return await Promise.all([
        nunjucks(config, app),
        redis(config).then(() =>
            session(config, app)
        ),
        sql(config),
        openid(config),
        lockable(config),
        log(config),
        superagent(config),
    ]);
};