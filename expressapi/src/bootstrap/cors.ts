import * as cors from 'cors';
import * as coreTypes from '../types';

export default async (config: coreTypes.config.app, app) => {
    let corsOption: any = {
        origin: config.cors.origin[0],
        optionsSuccessStatus: 200,
        exposedHeaders: [
            "x-total-count"
        ]
    };
    if (config.cors.origin.length > 0) {
        corsOption.origin = function (origin, callback) {
            if (!origin
                || config.cors.origin.indexOf("*") !== -1
                || config.cors.origin.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        }
    }
    let corsInstance = cors(corsOption);
    config.storage.set("cors", corsInstance);
    return corsInstance;
};