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
            mysql: async (req, res) => { return await req.sql("default").authenticate(); },
        },
        checkTimeout: 1000
    }));

    // api routes
    router.use("/api/*", apiErrorHandler);
    router.use("/api/*", (req, res, next) => {
        return res.status(404).json({
            message: "Not found"
        })
    });

    // static routes
    router.use("/js/*", (req, res) => {
        return res.status(404).end();
    });
    // web routes
    router.use("/*", (req, res) => {
        return res.status(200).render("index.html");
    });
    router.use(webErrorHandler);
    return router;
};

export default routes;