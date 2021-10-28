import markdown = require('markdown-it');

import changeCase from './changeCase';
import pagination from './pagination';
import dateFilter from './dateFilter';
import fromNow from './fromNow';
import boolean from './boolean';
import inArr from './inArr';
import asArr from './asArr';
import form from './form';
import propOnly from './propOnly';
import map from './map';
import mapToOption from './mapToOption';
import currencyFormat from './currencyFormat';

import enumList from '../../config/enumList';
import * as coreType from '../../types';
export default (config: coreType.config.app, nunjucksEnv) => {
    changeCase(config, nunjucksEnv);
    pagination(config, nunjucksEnv);
    dateFilter(config, nunjucksEnv);
    fromNow(config, nunjucksEnv);
    boolean(config, nunjucksEnv);
    inArr(config, nunjucksEnv);
    asArr(config, nunjucksEnv);
    currencyFormat(config, nunjucksEnv);
    form(config, nunjucksEnv);
    propOnly(config, nunjucksEnv);
    map(config, nunjucksEnv);
    mapToOption(config, nunjucksEnv);

    nunjucksEnv.addGlobal("_appName", config.appName);
    nunjucksEnv.addGlobal("_description", config.appDescription);
    nunjucksEnv.addGlobal("_env", config.env);
    nunjucksEnv.addGlobal("_config", config);

    nunjucksEnv.addGlobal("_now", () => {
        new Date();
    });
    nunjucksEnv.addGlobal("_enum", enumList.safe);
    nunjucksEnv.addGlobal("_markdown", new markdown({
        breaks: true
    }));
};