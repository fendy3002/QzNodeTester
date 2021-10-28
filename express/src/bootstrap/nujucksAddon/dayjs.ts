import dayjs = require('dayjs');
import * as coreType from '../../types';

export default (config: coreType.config.app, nunjucksEnv) => {
    nunjucksEnv.addGlobal("_dayjs", dayjs);
    nunjucksEnv.addGlobal("_filterDateFrom", () => {
        return dayjs().add(-config.filter.defaultDaysBefore, "days").format("YYYY-MM-DD");
    });
}