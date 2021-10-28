import express = require('express');
import path = require('path');
import { healthcheck, errorHandler } from '@fendy3002/express-helper';

import * as types from '../types';
import init from '../middleware/init';
import webErrorHandlerRaw from '../middleware/webErrorHandler';
import apiErrorHandlerRaw from '../middleware/apiErrorHandler';

let routes = async (app, config: types.config.app) => {
    let router = express.Router();
    const webErrorHandler = await webErrorHandlerRaw(config);
    const apiErrorHandler = await apiErrorHandlerRaw(config);

    router.use(await init(config));
    router.use(await healthcheck({
        check: {
            mysql: async (req, res) => { return await req.sqldb.authenticate(); },
            mongo: async (req, res) => { return await req.mongo.admin().ping(); }
        },
        checkTimeout: 1000
    }));

    // web routes
    router.use(webErrorHandler);
    router.use((req, res, next) => {
        return res.render("error/404.html");
    });

    // api routes
    router.use("/api/*", apiErrorHandler);
    router.use("/api/*", (req, res, next) => {
        return res.status(404).json({
            message: "Not found"
        })
    });
    return router;
};

export default routes;