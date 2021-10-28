import { v4 as uuid } from 'uuid';
import url = require('url');
import markdown = require('markdown-it');
import * as debugRaw from 'debug';
let debug = debugRaw("app:middleware/init");

import * as types from "../types";
import enumList from '../config/enumList';

export default (config: types.config.app) => (req, res, next) => {
    debug(`cookie ${JSON.stringify(req.cookies)}`);
    req.id = uuid();
    req.fullHostUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    req.config = config;
    res.locals._config = config;
    for (let key of [
        "nunjucks",
        "redis",
        "sql",
        "session",
        "lockable",
        "log",
        "superagent",
    ]) {
        req[key] = config.storage.get(key);
    }

    res.locals._appName = config.appName;
    res.locals._description = config.appDescription;
    res.locals._env = config.env;
    res.locals._query = req.query;
    res.locals._queryString = req.originalUrl.substring(req.originalUrl.indexOf("?") + 1);
    res.locals._markdown = new markdown({
        breaks: true
    });
    res.locals._flash = (k) => req.flash ? req.flash(k) : null;
    res.locals._enum = enumList.safe;
    res.locals._now = new Date();
    if (req.query._form_id) {
        let oldFormId = req.query._form_id;
        res.locals.modal = req.flash("modal_" + oldFormId)[0];
    }
    next();
}