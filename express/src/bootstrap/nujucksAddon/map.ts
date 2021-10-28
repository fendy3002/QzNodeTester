import * as coreType from '../../types';
export default (config: coreType.config.app, nunjucksEnv) => {
    nunjucksEnv.addFilter('map', function (data, map) {
        return map(data);
    });
    return;
}
