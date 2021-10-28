import dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone'); // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);

import * as coreType from '../../types';
export default (config: coreType.config.app, nunjucksEnv) => {
    nunjucksEnv.addFilter('fromNow', function (timestamp: string, dateFormat = "YYYY-MMM-DD HH:mm:ss", dateTimeFormat = config.dateTimeFullFormat) {
        if (!timestamp) { return ""; }

        let momentDate = null;
        if (parseInt(timestamp) > 9999999999) {
            momentDate = (dayjs as any).tz(parseInt(timestamp), config.timezone);
        }
        else {
            momentDate = (dayjs as any).tz(parseInt(timestamp) as any, 'X', config.timezone);
        }
        // if (moment().diff(momentDate, "days") > 0) {
        return `<span title="${momentDate.format(dateTimeFormat)}">${momentDate.format(dateFormat)}</span>`;
        // }
        // else {
        //     return `<span title="${momentDate.format(dateTimeFormat)}">${momentDate.fromNow()}</span>`;
        // }
    });
    return;
}