import nunjucks = require('nunjucks');
import path = require('path');
import nunjucksAddon from './nujucksAddon';
import * as coreTypes from '../types';

export default async (config: coreTypes.config.app, app?: any) => {
    let nunjucksEnv = nunjucks.configure(path.resolve(__dirname, "..", "..", 'views'), {
        autoescape: true,
        express: app,
        watch: true
    });
    config.storage.set('nunjucks', nunjucksEnv);
    await nunjucksAddon(config, nunjucksEnv)

    return nunjucksEnv;
};