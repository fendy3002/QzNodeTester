import moment = require('moment');
import * as coreType from '../../types';
export default (config: coreType.config.app, nunjucksEnv) => {
    nunjucksEnv.addFilter('boolean', function (val, trueLabel = "Yes", falseLabel = "No") {
        if (val) { return trueLabel; }
        else if (!val) { return falseLabel; }
    });
    return;
}