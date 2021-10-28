import express = require('express');
import path = require('path');
import { healthcheck, errorHandler } from '@fendy3002/express-helper';

import * as types from '../types';
import init from '../middleware/init';
import webErrorHandlerRaw from '../middleware/webErrorHandler';
import apiErrorHandlerRaw from '../middleware/apiErrorHandler';
import signedInRaw from '../middleware/webSignedIn';

import file from './file';
import vehicleMaintenance from './vehicle-maintenance';
import customerOrder from './customer-order';
import customerPayment from './customer-payment';
import actualCost from './actual-cost';
import vehicle from './vehicle';
import maintenanceMaster from './MaintenanceMaster';
import unitOfMeasurement from './UnitOfMeasurement';
import person from './person';
import supplier from './supplier';
import budgetCategory from './budget-category';
import project from './project';
import sourceOfFund from './source-of-fund';
import businessPartner from './business-partner';
import dashboardSourceOfFund from './dashboard-source-of-fund';

import api from './api';
import apispec from './apispec';

let routes = async (app, config: types.config.app) => {
    let router = express.Router();
    const signedIn = await signedInRaw();
    const webErrorHandler = await webErrorHandlerRaw(config);
    const apiErrorHandler = await apiErrorHandlerRaw(config);

    router.use(await init(config));
    router.use(await openid(config));
    router.use(await fileStorage(config));

    router.use(await healthcheck({
        check: {
            mysql: async (req, res) => { return await req.sqldb.authenticate(); },
            mongo: async (req, res) => { return await req.mongo.admin().ping(); }
        },
        checkTimeout: 1000
    }));

    router.use("/apispec", await apispec(config));
    router.use("/", await file(config));

    router.use("/", await _(config));
    router.use("/vehicle-maintenance", [signedIn], await vehicleMaintenance(config));
    router.use("/customer-order", [signedIn], await customerOrder(config));
    router.use("/actual-cost", [signedIn], await actualCost(config));
    router.use("/customer-payment", [signedIn], await customerPayment(config));
    
    router.use("/vehicle", [signedIn], await vehicle(config));
    router.use("/maintenance-master", [signedIn], await maintenanceMaster(config));
    router.use("/unit-of-measurement", [signedIn], await unitOfMeasurement(config));
    router.use("/person", [signedIn], await person(config));
    router.use("/supplier", [signedIn], await supplier(config));
    router.use("/budget-category", [signedIn], await budgetCategory(config));
    router.use("/project", [signedIn], await project(config));
    router.use("/source-of-fund", [signedIn], await sourceOfFund(config));
    router.use("/business-partner", [signedIn], await businessPartner(config));
    router.use("/dashboard-source-of-fund", [signedIn], await dashboardSourceOfFund(config));

    router.use(webErrorHandler);

    router.use("/api", await api(app, config));
    router.use(apiErrorHandler);

    router.use((req, res, next) => {
        return res.status(404).json({
            message: "Not found"
        })
    });
    return router;
};

export default routes;