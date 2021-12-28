import express = require('express');
import path = require('path');
import { healthcheck, errorHandler } from '@fendy3002/express-helper';

import * as types from '../types';
import init from '../middleware/init';
import apiErrorHandlerRaw from '../middleware/apiErrorHandler';

let routes = async (app, config: types.config.app) => {
    let router = express.Router();
    const apiErrorHandler = await apiErrorHandlerRaw(config);

    router.use(await init(config));
    router.use(await healthcheck({
        check: {
            mysql: async (req, res) => { return await req.sql("default").authenticate(); },
        },
        checkTimeout: 1000
    }));

    // api routes
    router.get("/", (req, res, next) => {
        return res.status(200).json({
            message: "Hello World"
        });
    });

    // 404 handler
    router.use("/*", (req, res, next) => {
        return res.status(404).json({
            message: "Not found"
        });
    });
    router.use(apiErrorHandler);
    return router;
};

export default routes;