import { v4 as uuid } from 'uuid';
import * as debugRaw from 'debug';
let debug = debugRaw("app:middleware/init");

import * as types from "../types";
export default (config: types.config.app) => (req, res, next) => {
    debug(`cookie ${JSON.stringify(req.cookies)}`);
    req.id = uuid();
    debug(`id ${req.id}`);
    req.fullHostUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    req.config = config;
    for (let key of [
        "redis",
        "sql",
        "session",
        "lockable",
        "log",
        "superagent",
    ]) {
        req[key] = config.storage.get(key);
    }

    res.locals._query = req.query;
    res.locals._queryString = req.originalUrl.substring(req.originalUrl.indexOf("?") + 1);
    res.locals._flash = (k) => req.flash ? req.flash(k) : null;
    next();
}