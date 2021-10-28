import dayjs = require('dayjs');
import * as coreType from '../../types';
export default (config: coreType.config.app, nunjucksEnv) => {
    nunjucksEnv.addFilter('dateFilter', function(date, format = "YYYY-MMM-DD HH:mm:ss") {
        if(!date){ return ""; }
        if(!format){
            format = "DD-MMM-YYYY";
        }
        return dayjs(date).format(format);
    });
    return;
}