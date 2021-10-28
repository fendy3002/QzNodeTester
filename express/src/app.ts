require('dotenv').config();
import * as express from 'express';
import cookieParser = require('cookie-parser');
import path = require('path');
import routes from './routes';
import configRaw from './config';
import initData from './initData';
import bootstrap from './bootstrap';

const init = async () => {
    let app = express();
    let config = await configRaw();

    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    await bootstrap(config, app);

    app.use(express.static(path.resolve(__dirname, "..", "public")));
    app.use(await routes(app, config));
    await initData(config)();

    return {
        app: app
    };
};

export default init;