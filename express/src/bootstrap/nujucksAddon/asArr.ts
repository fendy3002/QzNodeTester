import moment = require('moment');
import * as coreType from '../../types';
export default (config: coreType.config.app, nunjucksEnv) => {
    nunjucksEnv.addFilter('asArr', function (val) {
        if (!val) { return []; }
        else if (Array.isArray(val)) { return val; }
        else { return [val]; }
    });
    return;
}